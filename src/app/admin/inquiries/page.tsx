'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaChartLine, FaSignOutAlt, FaBars, FaTimes, FaSearch, FaFilter, FaRegEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/utils/supabase';
import { Inquiry } from '@/app/api/inquiries';

// 관리자 인증 상태 확인 커스텀 훅
const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);

      if (!isLoggedIn) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, isLoading };
};

export default function InquiriesPage() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 문의 데이터 불러오기
  useEffect(() => {
    async function fetchInquiries() {
      if (!isAuthenticated) return;
      
      try {
        setIsLoadingData(true);
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setInquiries(data || []);
      } catch (err) {
        console.error('문의 데이터 조회 오류:', err);
        setError('문의 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoadingData(false);
      }
    }

    fetchInquiries();
  }, [isAuthenticated]);

  // 실시간 데이터 업데이트 구독
  useEffect(() => {
    if (!isAuthenticated) return;

    const subscription = supabase
      .channel('inquiries_channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'inquiries' }, 
        (payload) => {
          // 데이터 변경 시 처리
          if (payload.eventType === 'INSERT') {
            setInquiries(prev => [payload.new as Inquiry, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setInquiries(prev => 
              prev.map(item => item.id === payload.new.id ? payload.new as Inquiry : item)
            );
            if (selectedInquiry?.id === payload.new.id) {
              setSelectedInquiry(payload.new as Inquiry);
            }
          } else if (payload.eventType === 'DELETE') {
            setInquiries(prev => prev.filter(item => item.id !== payload.old.id));
            if (selectedInquiry?.id === payload.old.id) {
              setSelectedInquiry(null);
            }
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [isAuthenticated, selectedInquiry]);

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };

  // 사이드바 토글
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 문의 상태 변경 핸들러
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      // 로컬 상태 업데이트 (실시간 구독으로 처리될 수도 있지만, 즉각적인 UI 반응을 위해 추가)
      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
        )
      );
      
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error('상태 변경 오류:', err);
      alert('상태를 변경하는 중 오류가 발생했습니다.');
    }
  };

  // 필터링된 문의 목록
  const filteredInquiries = inquiries
    .filter(inquiry => 
      (inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       inquiry.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || inquiry.status === statusFilter)
    );

  // 상세 모달
  const InquiryDetailModal = ({ inquiry, onClose }: { inquiry: Inquiry, onClose: () => void }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    
    const handleChangeStatus = async (newStatus: string) => {
      setIsUpdating(true);
      await handleStatusChange(inquiry.id, newStatus);
      setIsUpdating(false);
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800">문의 상세</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="border-b pb-4 mb-4">
            <div className="flex flex-wrap gap-2 justify-between mb-2">
              <span className="text-sm text-gray-500">접수일: {new Date(inquiry.created_at || inquiry.date).toLocaleDateString('ko-KR')}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                inquiry.status === '미확인' ? 'bg-yellow-100 text-yellow-800' :
                inquiry.status === '확인완료' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {inquiry.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold">{inquiry.subject}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">이름</p>
              <p className="font-medium">{inquiry.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">이메일</p>
              <p className="font-medium">{inquiry.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">연락처</p>
              <p className="font-medium">{inquiry.phone}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">문의 내용</p>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line">
              {inquiry.message}
            </div>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-2">상태 변경</p>
              <div className="flex gap-2">
                <button
                  disabled={isUpdating}
                  onClick={() => handleChangeStatus('미확인')}
                  className={`px-3 py-1 text-xs rounded ${
                    isUpdating ? 'opacity-50 cursor-not-allowed' : 
                    inquiry.status === '미확인' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                >
                  미확인
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleChangeStatus('확인완료')}
                  className={`px-3 py-1 text-xs rounded ${
                    isUpdating ? 'opacity-50 cursor-not-allowed' : 
                    inquiry.status === '확인완료' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  확인완료
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleChangeStatus('답변완료')}
                  className={`px-3 py-1 text-xs rounded ${
                    isUpdating ? 'opacity-50 cursor-not-allowed' : 
                    inquiry.status === '답변완료' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  답변완료
                </button>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              닫기
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-700">로그인 확인 중...</p>
        </div>
      </div>
    );
  }

  // 인증 상태가 아니면 로그인 페이지로 리다이렉트 (useEffect에서 처리됨)
  if (!isAuthenticated && !isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* 사이드바 */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'tween' }}
            className="fixed z-20 bg-primary text-white w-64 h-full shadow-xl md:relative"
          >
            <div className="p-6 border-b border-primary-700">
              <h1 className="text-xl font-bold">스파르탄 영어학원</h1>
              <p className="text-sm opacity-75">관리자 시스템</p>
            </div>
            
            <div className="p-4">
              <ul className="space-y-2">
                <li>
                  <a href="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 transition-colors">
                    <FaChartLine />
                    <span>대시보드</span>
                  </a>
                </li>
                <li>
                  <a href="/admin/students" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 transition-colors">
                    <FaUsers />
                    <span>학생 관리</span>
                  </a>
                </li>
                <li>
                  <a href="/admin/inquiries" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/10 text-white">
                    <FaRegEnvelope />
                    <span>문의 관리</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 transition-colors">
                    <FaCalendarAlt />
                    <span>수업 일정</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 transition-colors">
                    <FaChalkboardTeacher />
                    <span>교육 자료</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="absolute bottom-0 w-full p-4 border-t border-primary-700">
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <FaSignOutAlt />
                <span>로그아웃</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 네비게이션 */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <button 
            onClick={toggleSidebar}
            className="text-primary focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="hidden md:block text-sm font-medium">관리자</span>
            </div>
          </div>
        </header>
        
        {/* 페이지 콘텐츠 */}
        <main className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">문의 관리</h1>
              <p className="text-gray-600">총 {filteredInquiries.length}건의 문의가 있습니다.</p>
            </div>
            
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded">
                {error}
              </div>
            )}
          </div>
          
          {/* 검색 및 필터 */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="문의 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="flex items-center">
                <FaFilter className="text-gray-400 mr-2" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">모든 상태</option>
                  <option value="미확인">미확인</option>
                  <option value="확인완료">확인완료</option>
                  <option value="답변완료">답변완료</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* 문의 목록 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {isLoadingData ? (
              <div className="p-10 flex justify-center items-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mr-2"></div>
                <p>데이터 로딩 중...</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          날짜
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          이름
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          제목
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          이메일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          연락처
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredInquiries.map((inquiry) => (
                        <tr 
                          key={inquiry.id} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedInquiry(inquiry)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(inquiry.created_at || inquiry.date).toLocaleDateString('ko-KR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {inquiry.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[200px]">
                            {inquiry.subject}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              inquiry.status === '미확인' ? 'bg-yellow-100 text-yellow-800' :
                              inquiry.status === '확인완료' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {inquiry.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {inquiry.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {inquiry.phone}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredInquiries.length === 0 && (
                  <div className="py-8 text-center text-gray-500">
                    {searchTerm || statusFilter !== 'all' 
                      ? '조건에 맞는 문의가 없습니다.' 
                      : '문의 내역이 없습니다.'}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
        
        {/* 푸터 */}
        <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t">
          <p>© {new Date().getFullYear()} 스파르탄 영어학원 관리자 시스템. All rights reserved.</p>
        </footer>
      </div>
      
      {/* 문의 상세 모달 */}
      <AnimatePresence>
        {selectedInquiry && (
          <InquiryDetailModal 
            inquiry={selectedInquiry} 
            onClose={() => setSelectedInquiry(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
} 