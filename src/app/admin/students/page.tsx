'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaChartLine, FaSignOutAlt, FaBars, FaTimes, FaSearch, FaEdit, FaTrash, FaPlus, FaSort, FaSortUp, FaSortDown, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '@/lib/supabase';

// 관리자 인증 상태 확인 커스텀 훅
const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { session } = await auth.getSession();
        setIsAuthenticated(!!session);
        
        if (!session) {
          router.push('/admin/login');
        }
      } catch (err) {
        console.error('인증 확인 오류:', err);
        setIsAuthenticated(false);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, isLoading };
};

export default function StudentsPage() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 데이터 로드
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchStudents = async () => {
      setLoadingData(true);
      try {
        const { data, error } = await db.getStudents();
        if (error) throw error;
        
        if (data) {
          setStudents(data);
        }
      } catch (err) {
        console.error('학생 데이터 가져오기 오류:', err);
        setError('학생 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoadingData(false);
      }
    };

    fetchStudents();
  }, [isAuthenticated]);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  // 사이드바 토글
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 정렬 핸들러
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // 정렬 아이콘 표시
  const getSortIcon = (field: string) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="text-primary" /> : <FaSortDown className="text-primary" />;
  };

  // 필터링된 학생 목록
  const filteredStudents = students
    .filter(student => 
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.level.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || student.status === statusFilter) &&
      (gradeFilter === 'all' || student.grade === gradeFilter)
    )
    .sort((a, b) => {
      if (a[sortField as keyof typeof a] < b[sortField as keyof typeof b]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField as keyof typeof a] > b[sortField as keyof typeof b]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

  // 학생 추가 모달
  const StudentModal = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState(
      editingStudent || {
        name: '',
        grade: '고1',
        level: '중',
        enrollDate: new Date().toISOString().substring(0, 10),
        status: '재원중',
        parentContact: ''
      }
    );
    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      
      try {
        if (editingStudent) {
          // 학생 정보 수정
          const { data, error } = await db.updateStudent(editingStudent.id, formData);
          if (error) throw error;
          
          setStudents(prev => 
            prev.map(student => 
              student.id === editingStudent.id ? data[0] : student
            )
          );
        } else {
          // 새 학생 추가
          const { data, error } = await db.addStudent(formData);
          if (error) throw error;
          
          if (data) {
            setStudents(prev => [...prev, data[0]]);
          }
        }
        
        onClose();
      } catch (err) {
        console.error('학생 저장 오류:', err);
        alert('학생 정보 저장 중 오류가 발생했습니다.');
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {editingStudent ? '학생 정보 수정' : '새 학생 추가'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">학년</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="고1">고1</option>
                  <option value="고2">고2</option>
                  <option value="고3">고3</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">수준</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="상">상</option>
                  <option value="중상">중상</option>
                  <option value="중">중</option>
                  <option value="중하">중하</option>
                  <option value="하">하</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">등록일</label>
                <input
                  type="date"
                  name="enrollDate"
                  value={formData.enrollDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="재원중">재원중</option>
                  <option value="휴원중">휴원중</option>
                  <option value="퇴원">퇴원</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">학부모 연락처</label>
                <input
                  type="text"
                  name="parentContact"
                  value={formData.parentContact}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="010-0000-0000"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                {editingStudent ? '수정하기' : '추가하기'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  // 학생 삭제 핸들러
  const handleDeleteStudent = async (id: number) => {
    if (window.confirm('정말로 이 학생을 삭제하시겠습니까?')) {
      try {
        const { error } = await db.deleteStudent(id);
        if (error) throw error;
        
        setStudents(prev => prev.filter(student => student.id !== id));
      } catch (err) {
        console.error('학생 삭제 오류:', err);
        alert('학생 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 학생 수정 모달 열기
  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setShowAddModal(true);
  };
  
  // 학생 상세 페이지로 이동
  const handleViewStudentDetail = (id: number) => {
    router.push(`/admin/students/${id}`);
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
                  <a href="/admin/students" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/10 text-white">
                    <FaUsers />
                    <span>학생 관리</span>
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
              <h1 className="text-2xl font-bold text-gray-800">학생 관리</h1>
              <p className="text-gray-600">총 {filteredStudents.length}명의 학생이 있습니다.</p>
            </div>
            
            <button
              onClick={() => {
                setEditingStudent(null);
                setShowAddModal(true);
              }}
              className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FaPlus className="mr-2" />
              학생 추가
            </button>
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
                  placeholder="학생 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex items-center">
                  <FaFilter className="text-gray-400 mr-2" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">모든 상태</option>
                    <option value="재원중">재원중</option>
                    <option value="휴원중">휴원중</option>
                    <option value="퇴원">퇴원</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <select
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">모든 학년</option>
                    <option value="고1">고1</option>
                    <option value="고2">고2</option>
                    <option value="고3">고3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* 학생 목록 테이블 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('id')} className="flex items-center focus:outline-none">
                        No. {getSortIcon('id')}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('name')} className="flex items-center focus:outline-none">
                        이름 {getSortIcon('name')}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('grade')} className="flex items-center focus:outline-none">
                        학년 {getSortIcon('grade')}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('level')} className="flex items-center focus:outline-none">
                        수준 {getSortIcon('level')}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('enrollDate')} className="flex items-center focus:outline-none">
                        등록일 {getSortIcon('enrollDate')}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort('status')} className="flex items-center focus:outline-none">
                        상태 {getSortIcon('status')}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      학부모 연락처
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.enrollDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          student.status === '재원중' ? 'bg-green-100 text-green-800' :
                          student.status === '휴원중' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.parentContact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewStudentDetail(student.id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          상세보기
                        </button>
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                조건에 맞는 학생이 없습니다.
              </div>
            )}
          </div>
        </main>
        
        {/* 푸터 */}
        <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t">
          <p>© {new Date().getFullYear()} 스파르탄 영어학원 관리자 시스템. All rights reserved.</p>
        </footer>
      </div>
      
      {/* 학생 추가/수정 모달 */}
      <AnimatePresence>
        {showAddModal && <StudentModal onClose={() => setShowAddModal(false)} />}
      </AnimatePresence>
    </div>
  );
} 