'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaChartLine, FaSignOutAlt, FaBars, FaTimes, FaSearch, FaFilter, FaRegEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// 샘플 문의 데이터
const initialInquiries = [
  { 
    id: 1, 
    name: '김영희', 
    email: 'kim@example.com', 
    phone: '010-1234-5678', 
    date: '2024-04-19', 
    status: '미확인', 
    subject: '수업 일정 문의', 
    message: '안녕하세요, 5월 중간고사 대비 특강 일정에 대해 문의드립니다. 고등학교 2학년 영어 내신 대비를 위한 특별 프로그램이 있는지 알고 싶습니다.' 
  },
  { 
    id: 2, 
    name: '이철수', 
    email: 'lee@example.com', 
    phone: '010-2345-6789', 
    date: '2024-04-18', 
    status: '확인완료', 
    subject: '수강료 문의', 
    message: '안녕하세요, 고3 수능 대비반의 월 수강료와 교재비에 대해 알고 싶습니다. 또한 형제 할인이 있는지도 궁금합니다.' 
  },
  { 
    id: 3, 
    name: '박지훈', 
    email: 'park@example.com', 
    phone: '010-3456-7890', 
    date: '2024-04-17', 
    status: '답변완료', 
    subject: '체험수업 신청', 
    message: '고1 학생인데 체험수업을 받아보고 싶습니다. 어떤 절차로 신청하면 되나요? 가능한 날짜와 시간대도 알려주시면 감사하겠습니다.' 
  },
  { 
    id: 4, 
    name: '최민서', 
    email: 'choi@example.com', 
    phone: '010-4567-8901', 
    date: '2024-04-16', 
    status: '미확인', 
    subject: '교재 관련 문의', 
    message: '현재 사용하고 있는 교재의 추가 구매가 필요한데, 학원에서 직접 구매가 가능한지 아니면 외부에서 구매해야 하는지 문의드립니다.' 
  },
  { 
    id: 5, 
    name: '정수연', 
    email: 'jung@example.com', 
    phone: '010-5678-9012', 
    date: '2024-04-15', 
    status: '확인완료', 
    subject: '교사 이력 문의', 
    message: '담당 선생님들의 학력과 경력에 대해 좀 더 자세히 알고 싶습니다. 특히 고3 수능반 지도 선생님의 이력이 궁금합니다.' 
  },
  { 
    id: 6, 
    name: '강도현', 
    email: 'kang@example.com', 
    phone: '010-6789-0123', 
    date: '2024-04-14', 
    status: '답변완료', 
    subject: '수업 시간 조정 요청', 
    message: '현재 수강 중인 수업의 시간을 조정하고 싶습니다. 학교 일정이 변경되어 한 시간 정도 늦춰질 수 있을지 문의드립니다.' 
  },
  { 
    id: 7, 
    name: '윤서연', 
    email: 'yoon@example.com', 
    phone: '010-7890-1234', 
    date: '2024-04-13', 
    status: '미확인', 
    subject: '온라인 수업 문의', 
    message: '코로나로 인해 온라인 수업이 가능한지 궁금합니다. 가능하다면 어떤 플랫폼을 사용하고 수업 방식은 어떻게 진행되나요?' 
  },
  { 
    id: 8, 
    name: '임재현', 
    email: 'lim@example.com', 
    phone: '010-8901-2345', 
    date: '2024-04-12', 
    status: '확인완료', 
    subject: '환불 규정 문의', 
    message: '개인 사정으로 인해 수업을 계속 들을 수 없게 되었습니다. 환불 규정에 대해 자세히 알려주시면 감사하겠습니다.' 
  }
];

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
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const router = useRouter();

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
  const handleStatusChange = (id: number, newStatus: string) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
      )
    );
    
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
    }
  };

  // 필터링된 문의 목록
  const filteredInquiries = inquiries
    .filter(inquiry => 
      (inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
       inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || inquiry.status === statusFilter)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 상세 모달
  const InquiryDetailModal = ({ inquiry, onClose }: { inquiry: any, onClose: () => void }) => {
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
              <span className="text-sm text-gray-500">접수일: {inquiry.date}</span>
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
                  onClick={() => handleStatusChange(inquiry.id, '미확인')}
                  className={`px-3 py-1 text-xs rounded ${
                    inquiry.status === '미확인' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                >
                  미확인
                </button>
                <button
                  onClick={() => handleStatusChange(inquiry.id, '확인완료')}
                  className={`px-3 py-1 text-xs rounded ${
                    inquiry.status === '확인완료' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  확인완료
                </button>
                <button
                  onClick={() => handleStatusChange(inquiry.id, '답변완료')}
                  className={`px-3 py-1 text-xs rounded ${
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
          <p className="mt-4 text-gray-700">로딩 중...</p>
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
                        {inquiry.date}
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
                조건에 맞는 문의가 없습니다.
              </div>
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