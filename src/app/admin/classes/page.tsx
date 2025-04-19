'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaChartLine, FaSignOutAlt, FaBars, FaTimes, FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaCheck, FaTimes as FaCross, FaBook, FaHistory } from 'react-icons/fa';
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

// 샘플 수업 데이터
const initialClasses = [
  { id: 1, name: '수능 독해 심화', day: '월,수,금', time: '16:00-18:00', room: '1', teacher: '김영철', students: 8, capacity: 10, materials: '수능 기출 문제집, 어휘 노트', progress: '2/10주차' },
  { id: 2, name: '내신 대비 영문법', day: '화,목', time: '17:00-19:00', room: '2', teacher: '박지영', students: 6, capacity: 8, materials: '영문법 기본서, 문제집', progress: '3/8주차' },
  { id: 3, name: '토익 실전 대비', day: '토', time: '13:00-17:00', room: '1', teacher: '이미라', students: 12, capacity: 15, materials: 'ETS 공식 문제집, 단어장', progress: '5/12주차' },
  { id: 4, name: '수능 영어 기출 분석', day: '화,목', time: '19:00-21:00', room: '3', teacher: '김영철', students: 9, capacity: 10, materials: '기출문제 모음집, 분석 자료', progress: '4/10주차' },
  { id: 5, name: '영어 회화 중급', day: '월,수,금', time: '14:00-15:00', room: '2', teacher: '스미스', students: 5, capacity: 8, materials: '회화 교재, 외국 영상물', progress: '6/12주차' },
];

// 샘플 출석 데이터
const initialAttendance = [
  {
    classId: 1,
    date: '2024-04-15',
    students: [
      { id: 1, name: '김민준', status: 'present' },
      { id: 2, name: '이서연', status: 'present' },
      { id: 3, name: '박지호', status: 'late' },
      { id: 4, name: '최예린', status: 'present' },
      { id: 5, name: '정우진', status: 'absent' },
      { id: 6, name: '강하은', status: 'present' },
      { id: 7, name: '윤도현', status: 'present' },
      { id: 8, name: '장수빈', status: 'present' },
    ]
  },
  {
    classId: 1,
    date: '2024-04-17',
    students: [
      { id: 1, name: '김민준', status: 'present' },
      { id: 2, name: '이서연', status: 'present' },
      { id: 3, name: '박지호', status: 'present' },
      { id: 4, name: '최예린', status: 'late' },
      { id: 5, name: '정우진', status: 'present' },
      { id: 6, name: '강하은', status: 'absent' },
      { id: 7, name: '윤도현', status: 'present' },
      { id: 8, name: '장수빈', status: 'present' },
    ]
  },
];

// 수업 카드 컴포넌트
const ClassCard = ({ classItem, onEdit, onDelete, onViewAttendance }: { 
  classItem: any, 
  onEdit: (classItem: any) => void, 
  onDelete: (id: number) => void,
  onViewAttendance: (classItem: any) => void
}) => (
  <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
    <div className="flex justify-between">
      <h3 className="text-lg font-bold text-gray-800">{classItem.name}</h3>
      <div className="flex space-x-2">
        <button 
          onClick={() => onViewAttendance(classItem)}
          className="text-blue-500 hover:text-blue-700 transition-colors"
          title="출석부 보기"
        >
          <FaCalendarAlt className="text-lg" />
        </button>
        <button 
          onClick={() => onEdit(classItem)}
          className="text-green-500 hover:text-green-700 transition-colors"
          title="수업 수정"
        >
          <FaEdit className="text-lg" />
        </button>
        <button 
          onClick={() => onDelete(classItem.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="수업 삭제"
        >
          <FaTrash className="text-lg" />
        </button>
      </div>
    </div>
    
    <div className="mt-4 space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-600">요일/시간:</span>
        <span className="font-medium">{classItem.day} {classItem.time}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">강의실:</span>
        <span className="font-medium">{classItem.room}호</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">강사:</span>
        <span className="font-medium">{classItem.teacher}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">수강생:</span>
        <span className="font-medium">{classItem.students}/{classItem.capacity}명</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">진도:</span>
        <span className="font-medium">{classItem.progress}</span>
      </div>
      <div className="mt-3 text-sm text-gray-500">
        <FaBook className="inline mr-1" /> 교재: {classItem.materials}
      </div>
    </div>
  </div>
);

export default function ClassesPage() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dayFilter, setDayFilter] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 수업 데이터 로드
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchClasses = async () => {
      setLoadingData(true);
      try {
        const { data, error } = await db.getClasses();
        if (error) throw error;
        
        if (data) {
          setClasses(data);
        }
      } catch (err) {
        console.error('수업 데이터 가져오기 오류:', err);
        setError('수업 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoadingData(false);
      }
    };

    fetchClasses();
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

  // 수업 수정 모달 열기
  const handleEditClass = (classItem: any) => {
    setEditingClass(classItem);
    setShowModal(true);
  };

  // 수업 삭제 핸들러
  const handleDeleteClass = async (id: number) => {
    if (window.confirm('정말로 이 수업을 삭제하시겠습니까?')) {
      try {
        const { error } = await db.deleteClass(id);
        if (error) throw error;
        
        setClasses(prev => prev.filter(cls => cls.id !== id));
      } catch (err) {
        console.error('수업 삭제 오류:', err);
        alert('수업 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 출석부 모달 열기
  const handleViewAttendance = async (classItem: any) => {
    setSelectedClass(classItem);
    setShowAttendanceModal(true);
    
    try {
      const { data, error } = await db.getAttendance(classItem.id, selectedDate);
      if (error) throw error;
      
      if (data && data.length > 0) {
        setAttendance(data);
      }
    } catch (err) {
      console.error('출석 데이터 가져오기 오류:', err);
    }
  };

  // 필터링된 수업 목록
  const filteredClasses = classes.filter(cls => 
    (cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (dayFilter === 'all' || cls.day.includes(dayFilter))
  );

  // 인증 상태가 아니면 로그인 페이지로 리다이렉트 (useEffect에서 처리됨)
  if (!isAuthenticated && !isLoading) {
    return null;
  }

  // 수업 추가/수정 모달 컴포넌트
  const ClassModal = () => {
    const [formData, setFormData] = useState(
      editingClass || {
        name: '',
        day: '월,수,금',
        time: '16:00-18:00',
        room: '1',
        teacher: '',
        students: 0,
        capacity: 10,
        materials: '',
        progress: '1/10주차'
      }
    );
    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      
      try {
        if (editingClass) {
          // 기존 수업 수정
          const { data, error } = await db.updateClass(editingClass.id, formData);
          if (error) throw error;
          
          setClasses(prev => 
            prev.map(cls => 
              cls.id === editingClass.id ? data[0] : cls
            )
          );
        } else {
          // 새 수업 추가
          const { data, error } = await db.addClass(formData);
          if (error) throw error;
          
          if (data) {
            setClasses(prev => [...prev, data[0]]);
          }
        }
        
        setShowModal(false);
      } catch (err) {
        console.error('수업 저장 오류:', err);
        alert('수업 정보 저장 중 오류가 발생했습니다.');
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
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {editingClass ? '수업 정보 수정' : '새 수업 추가'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">수업명</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">수업 요일</label>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="월,수,금">월,수,금</option>
                  <option value="화,목">화,목</option>
                  <option value="토">토</option>
                  <option value="일">일</option>
                  <option value="월,화,수,목,금">월-금</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">수업 시간</label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="예: 16:00-18:00"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">강의실</label>
                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">강사</label>
                <input
                  type="text"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">현재 수강생 수</label>
                  <input
                    type="number"
                    name="students"
                    value={formData.students}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">최대 정원</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">교재 및 학습 자료</label>
                <textarea
                  name="materials"
                  value={formData.materials}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary h-24"
                  placeholder="사용하는 교재와 학습 자료를 입력하세요"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">진도</label>
                <input
                  type="text"
                  name="progress"
                  value={formData.progress}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="예: 2/10주차"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
              >
                {editingClass ? '수정 완료' : '추가하기'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  // 출석부 모달 컴포넌트
  const AttendanceModal = () => {
    const [attendanceData, setAttendanceData] = useState<any[]>([]);
    const [currentDate, setCurrentDate] = useState(selectedDate);
    const [saving, setSaving] = useState(false);
    
    // 해당 날짜에 대한 출석 데이터 불러오기
    useEffect(() => {
      if (!selectedClass) return;
      
      const fetchAttendance = async () => {
        try {
          const { data, error } = await db.getAttendance(selectedClass.id, currentDate);
          if (error) throw error;
          
          if (data && data.length > 0) {
            setAttendanceData(data[0].students || []);
          } else {
            // 기본 출석부 생성 (모두 출석으로 초기화)
            const defaultAttendance = Array.from({ length: selectedClass.students }, (_, i) => ({
              id: i + 1,
              name: `학생 ${i + 1}`,
              status: 'present'
            }));
            setAttendanceData(defaultAttendance);
          }
        } catch (err) {
          console.error('출석 데이터 가져오기 오류:', err);
        }
      };
      
      fetchAttendance();
    }, [currentDate, selectedClass]);
    
    // 출석 상태 변경 핸들러
    const handleStatusChange = (studentId: number, newStatus: 'present' | 'late' | 'absent') => {
      setAttendanceData(prev => 
        prev.map(student => 
          student.id === studentId ? { ...student, status: newStatus } : student
        )
      );
    };
    
    // 출석부 저장 핸들러
    const handleSaveAttendance = async () => {
      if (!selectedClass || !attendanceData.length) return;
      setSaving(true);
      
      try {
        const attendanceRecord = {
          class_id: selectedClass.id,
          date: currentDate,
          students: attendanceData
        };
        
        const { data, error } = await db.saveAttendance(attendanceRecord);
        if (error) throw error;
        
        setShowAttendanceModal(false);
      } catch (err) {
        console.error('출석 데이터 저장 오류:', err);
        alert('출석 데이터 저장 중 오류가 발생했습니다.');
      } finally {
        setSaving(false);
      }
    };
    
    if (!selectedClass) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {selectedClass.name} 출석부
          </h2>
          <p className="text-gray-600 mb-6">
            강사: {selectedClass.teacher} | 요일: {selectedClass.day} | 시간: {selectedClass.time}
          </p>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">날짜 선택</label>
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-700">출석</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-700">지각</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-gray-700">결석</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-4 text-left">번호</th>
                  <th className="py-2 px-4 text-left">이름</th>
                  <th className="py-2 px-4 text-center">출석 상태</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((student, index) => (
                  <tr key={student.id} className="border-b border-gray-200 last:border-0">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{student.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            student.status === 'present' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-600 hover:bg-green-100'
                          }`}
                          title="출석"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'late')}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            student.status === 'late' 
                              ? 'bg-yellow-500 text-white' 
                              : 'bg-gray-200 text-gray-600 hover:bg-yellow-100'
                          }`}
                          title="지각"
                        >
                          <FaHistory />
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            student.status === 'absent' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gray-200 text-gray-600 hover:bg-red-100'
                          }`}
                          title="결석"
                        >
                          <FaCross />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAttendanceModal(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSaveAttendance}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
            >
              출석부 저장
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

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
                  <a href="/admin/classes" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/10 text-white">
                    <FaCalendarAlt />
                    <span>수업 관리</span>
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
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
              <span className="hidden md:block text-sm font-medium">관리자</span>
            </div>
          </div>
        </header>
        
        {/* 수업 관리 페이지 콘텐츠 */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">수업 관리</h1>
              <p className="text-gray-600">수업 일정과 출석을 관리하세요.</p>
            </div>
            <button
              onClick={() => {
                setEditingClass(null);
                setShowModal(true);
              }}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FaPlus />
              <span>새 수업 추가</span>
            </button>
          </div>
          
          {/* 검색 및 필터 */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="수업명 또는 강사명으로 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-500" />
                <select
                  value={dayFilter}
                  onChange={(e) => setDayFilter(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">모든 요일</option>
                  <option value="월">월요일</option>
                  <option value="화">화요일</option>
                  <option value="수">수요일</option>
                  <option value="목">목요일</option>
                  <option value="금">금요일</option>
                  <option value="토">토요일</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* 수업 목록 */}
          {filteredClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((classItem) => (
                <ClassCard 
                  key={classItem.id} 
                  classItem={classItem} 
                  onEdit={handleEditClass} 
                  onDelete={handleDeleteClass}
                  onViewAttendance={handleViewAttendance}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FaCalendarAlt className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">수업이 없습니다</h3>
              <p className="text-gray-600">새 수업을 추가하거나 검색 필터를 변경해보세요.</p>
            </div>
          )}
        </main>
        
        {/* 푸터 */}
        <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t">
          <p>© {new Date().getFullYear()} 스파르탄 영어학원 관리자 시스템. All rights reserved.</p>
        </footer>
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {showModal && <ClassModal />}
        {showAttendanceModal && <AttendanceModal />}
      </AnimatePresence>
    </div>
  );
} 