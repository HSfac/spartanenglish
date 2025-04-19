'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaChartLine, FaSignOutAlt, FaBars, FaTimes, FaArrowLeft, FaPhone, FaEnvelope, FaIdCard, FaPen, FaHistory, FaGraduationCap, FaMoneyBillWave, FaCheck, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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

// 샘플 학생 데이터
const sampleStudents = [
  { 
    id: 1, 
    name: '김민준', 
    grade: '고3', 
    level: '상', 
    enrollDate: '2023-09-01', 
    status: '재원중', 
    parentName: '김철수',
    parentContact: '010-1234-5678',
    parentEmail: 'kim.parent@example.com',
    address: '서울시 강남구 테헤란로 123',
    birthdate: '2006-05-15',
    memo: '수능 독해에 어려움을 겪고 있어 추가 학습 필요',
    classes: [
      { id: 1, name: '수능 독해 심화', day: '월,수,금', time: '16:00-18:00', teacher: '김영철' },
      { id: 4, name: '수능 영어 기출 분석', day: '화,목', time: '19:00-21:00', teacher: '김영철' },
    ],
    attendance: [
      { date: '2024-04-15', className: '수능 독해 심화', status: 'present' },
      { date: '2024-04-16', className: '수능 영어 기출 분석', status: 'present' },
      { date: '2024-04-17', className: '수능 독해 심화', status: 'present' },
      { date: '2024-04-18', className: '수능 영어 기출 분석', status: 'late' },
      { date: '2024-04-19', className: '수능 독해 심화', status: 'absent' },
    ],
    consultations: [
      { date: '2024-03-10', content: '중간고사 대비 학습 계획 상담', staff: '박지영' },
      { date: '2024-02-15', content: '수능 모의고사 결과 분석 및 취약점 파악', staff: '김영철' },
    ],
    payments: [
      { date: '2024-04-01', amount: 450000, status: '납부완료', method: '카드' },
      { date: '2024-03-01', amount: 450000, status: '납부완료', method: '계좌이체' },
      { date: '2024-02-01', amount: 450000, status: '납부완료', method: '카드' },
    ],
    testResults: [
      { date: '2024-04-10', test: '4월 모의고사', score: 85, maxScore: 100, ranking: '상위 15%' },
      { date: '2024-03-15', test: '3월 모의고사', score: 82, maxScore: 100, ranking: '상위 18%' },
      { date: '2024-02-10', test: '2월 모의고사', score: 78, maxScore: 100, ranking: '상위 22%' },
    ]
  },
  // 더 많은 학생 데이터...
  { 
    id: 2, 
    name: '이서연', 
    grade: '고2', 
    level: '중상', 
    enrollDate: '2023-11-15', 
    status: '재원중', 
    parentName: '이영희',
    parentContact: '010-2345-6789',
    parentEmail: 'lee.parent@example.com',
    address: '서울시 서초구 반포대로 456',
    birthdate: '2007-08-22',
    memo: '영어 회화에 관심이 많음, 토익 시험 준비 희망',
    classes: [
      { id: 2, name: '내신 대비 영문법', day: '화,목', time: '17:00-19:00', teacher: '박지영' },
      { id: 5, name: '영어 회화 중급', day: '월,수,금', time: '14:00-15:00', teacher: '스미스' },
    ],
    attendance: [
      { date: '2024-04-15', className: '영어 회화 중급', status: 'present' },
      { date: '2024-04-16', className: '내신 대비 영문법', status: 'present' },
      { date: '2024-04-17', className: '영어 회화 중급', status: 'late' },
      { date: '2024-04-18', className: '내신 대비 영문법', status: 'present' },
      { date: '2024-04-19', className: '영어 회화 중급', status: 'present' },
    ],
    consultations: [
      { date: '2024-03-25', content: '토익 시험 준비 상담', staff: '이미라' },
      { date: '2024-02-28', content: '2학기 내신 대비 학습 계획', staff: '박지영' },
    ],
    payments: [
      { date: '2024-04-01', amount: 380000, status: '납부완료', method: '카드' },
      { date: '2024-03-01', amount: 380000, status: '납부완료', method: '현금' },
      { date: '2024-02-01', amount: 380000, status: '납부완료', method: '계좌이체' },
    ],
    testResults: [
      { date: '2024-04-10', test: '4월 학력평가', score: 88, maxScore: 100, ranking: '상위 12%' },
      { date: '2024-03-15', test: '3월 학력평가', score: 85, maxScore: 100, ranking: '상위 15%' },
      { date: '2024-02-10', test: '교내 모의고사', score: 82, maxScore: 100, ranking: '2등급' },
    ]
  },
];

export default function StudentDetail() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const params = useParams();
  const studentId = params.id as string;
  
  const [activeTab, setActiveTab] = useState('profile');
  const [student, setStudent] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 학생 데이터 로드
  useEffect(() => {
    if (studentId) {
      // 실제로는 API를 통해 학생 데이터를 가져오는 코드가 들어갑니다
      const foundStudent = sampleStudents.find(s => s.id === parseInt(studentId));
      setStudent(foundStudent || null);
    }
  }, [studentId]);

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };

  // 사이드바 토글
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

  // 학생이 존재하지 않는 경우
  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-700 mb-4">학생 정보를 찾을 수 없습니다.</p>
          <button 
            onClick={() => router.push('/admin/students')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            학생 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
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
                  <a href="/admin/classes" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 transition-colors">
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
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleSidebar}
              className="text-primary focus:outline-none"
            >
              {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
            <button
              onClick={() => router.push('/admin/students')}
              className="flex items-center text-gray-600 hover:text-primary transition-colors"
            >
              <FaArrowLeft className="mr-2" /> 학생 목록으로
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
              <span className="hidden md:block text-sm font-medium">관리자</span>
            </div>
          </div>
        </header>
        
        {/* 학생 상세 정보 콘텐츠 */}
        <main className="flex-1 p-6 overflow-auto">
          {/* 학생 기본 정보 카드 */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                  {student.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
                  <div className="flex flex-wrap items-center mt-1">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                      {student.grade}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                      수준: {student.level}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                      student.status === '재원중' ? 'bg-green-100 text-green-800' :
                      student.status === '휴원중' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                    <span className="text-gray-500 text-sm">
                      등록일: {student.enrollDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                  <FaPen className="mr-2" /> 정보 수정
                </button>
                <button className="flex items-center px-3 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors">
                  <FaPhone className="mr-2" /> 학부모 연락
                </button>
              </div>
            </div>
          </div>
          
          {/* 탭 메뉴 */}
          <div className="bg-white rounded-t-xl shadow-md mb-px">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'profile' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                기본 정보
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'attendance' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                출결 관리
              </button>
              <button
                onClick={() => setActiveTab('grades')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'grades' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                성적 관리
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'payments' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                학비 관리
              </button>
              <button
                onClick={() => setActiveTab('consultations')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'consultations' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                상담 이력
              </button>
            </div>
          </div>
          
          {/* 탭 내용 */}
          <div className="bg-white rounded-b-xl shadow-md p-6">
            {/* 기본 정보 탭 */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">학생 정보</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-md font-semibold text-gray-700 mb-3">개인 정보</h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <div className="w-32 text-gray-500">생년월일</div>
                        <div>{student.birthdate}</div>
                      </div>
                      <div className="flex">
                        <div className="w-32 text-gray-500">주소</div>
                        <div>{student.address}</div>
                      </div>
                      <div className="flex">
                        <div className="w-32 text-gray-500">학년</div>
                        <div>{student.grade}</div>
                      </div>
                      <div className="flex">
                        <div className="w-32 text-gray-500">수준</div>
                        <div>{student.level}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-md font-semibold text-gray-700 mt-6 mb-3">학부모 정보</h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <div className="w-32 text-gray-500">학부모명</div>
                        <div>{student.parentName}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32 text-gray-500">연락처</div>
                        <div className="flex items-center">
                          {student.parentContact}
                          <a href={`tel:${student.parentContact}`} className="ml-2 text-blue-500 hover:text-blue-700">
                            <FaPhone className="text-sm" />
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32 text-gray-500">이메일</div>
                        <div className="flex items-center">
                          {student.parentEmail}
                          <a href={`mailto:${student.parentEmail}`} className="ml-2 text-blue-500 hover:text-blue-700">
                            <FaEnvelope className="text-sm" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-semibold text-gray-700 mb-3">현재 수강 중인 수업</h3>
                    <div className="space-y-3">
                      {student.classes.map((cls: any, index: number) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="font-medium">{cls.name}</div>
                          <div className="text-sm text-gray-600">
                            {cls.day} {cls.time} | 강사: {cls.teacher}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-md font-semibold text-gray-700 mt-6 mb-3">메모</h3>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-gray-700">{student.memo}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 출결 관리 탭 */}
            {activeTab === 'attendance' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">출결 관리</h2>
                  <div className="flex space-x-2">
                    <select className="p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="all">모든 수업</option>
                      {student.classes.map((cls: any, index: number) => (
                        <option key={index} value={cls.id}>{cls.name}</option>
                      ))}
                    </select>
                    <input 
                      type="month" 
                      className="p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue={new Date().toISOString().slice(0, 7)}
                    />
                  </div>
                </div>
                
                {/* 출결 현황 요약 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                        <FaCheck />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">출석</div>
                        <div className="text-xl font-bold text-gray-800">12회</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
                        <FaHistory />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">지각</div>
                        <div className="text-xl font-bold text-gray-800">2회</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
                        <FaTimes />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">결석</div>
                        <div className="text-xl font-bold text-gray-800">1회</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 출결 달력 (실제로는 더 복잡한 달력 컴포넌트를 구현해야 함) */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                    <div className="text-sm font-medium text-gray-500">일</div>
                    <div className="text-sm font-medium text-gray-500">월</div>
                    <div className="text-sm font-medium text-gray-500">화</div>
                    <div className="text-sm font-medium text-gray-500">수</div>
                    <div className="text-sm font-medium text-gray-500">목</div>
                    <div className="text-sm font-medium text-gray-500">금</div>
                    <div className="text-sm font-medium text-gray-500">토</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 30 }, (_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square p-1 rounded-lg text-center flex flex-col items-center justify-center ${
                          i < 2 ? 'text-gray-400 bg-gray-100' : 
                          i === 15 ? 'bg-red-100 text-red-800 font-medium' :
                          i === 18 ? 'bg-yellow-100 text-yellow-800 font-medium' :
                          i % 7 === 0 ? 'text-red-500' : 
                          ''
                        }`}
                      >
                        <div className="text-sm">{i < 2 ? 30 + i : i}</div>
                        {i === 15 && <div className="text-xs">결</div>}
                        {i === 18 && <div className="text-xs">지</div>}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 최근 출결 기록 */}
                <h3 className="text-md font-semibold text-gray-700 mb-3">최근 출결 기록</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수업</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {student.attendance.map((record: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.className}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              record.status === 'present' ? 'bg-green-100 text-green-800' :
                              record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {record.status === 'present' ? '출석' :
                               record.status === 'late' ? '지각' : '결석'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* 성적 관리 탭 */}
            {activeTab === 'grades' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">성적 관리</h2>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2">
                    <FaPlus className="text-sm" />
                    <span>시험 결과 추가</span>
                  </button>
                </div>
                
                {/* 성적 추이 그래프 (실제로는 차트 라이브러리 사용) */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                  <h3 className="text-md font-semibold text-gray-700 mb-3">성적 추이</h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">여기에 성적 추이 그래프가 표시됩니다.</p>
                  </div>
                </div>
                
                {/* 시험 결과 목록 */}
                <h3 className="text-md font-semibold text-gray-700 mb-3">시험 결과</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시험 날짜</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시험명</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">점수</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등급/순위</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {student.testResults.map((result: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{result.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.test}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{result.score}/{result.maxScore}</div>
                            <div className="text-xs text-gray-500">{Math.round((result.score / result.maxScore) * 100)}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{result.ranking}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary hover:text-primary/80 mr-3">상세</button>
                            <button className="text-gray-600 hover:text-gray-900">수정</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* 성취도 분석 */}
                <h3 className="text-md font-semibold text-gray-700 mt-6 mb-3">성취도 분석</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-gray-800 mb-2">강점</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>독해력이 뛰어나며 지문 분석 능력이 우수함</li>
                      <li>영어 어휘력이 풍부하고 문맥에 맞게 활용 가능</li>
                      <li>문법 이해도가 높음</li>
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-gray-800 mb-2">개선 필요 영역</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>듣기 파트에서 세부 내용 파악에 어려움 있음</li>
                      <li>복잡한 추론 문제에서 오답률이 높음</li>
                      <li>시간 관리가 필요함 (마지막 문제들 풀이 시간 부족)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* 학비 관리 탭 */}
            {activeTab === 'payments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">학비 관리</h2>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2">
                    <FaPlus className="text-sm" />
                    <span>납부 기록 추가</span>
                  </button>
                </div>
                
                {/* 학비 요약 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-1">월 수강료</h3>
                    <div className="text-xl font-bold text-gray-800">₩450,000</div>
                    <div className="text-xs text-gray-500 mt-1">수능 독해 심화, 수능 영어 기출 분석</div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-1">다음 납부일</h3>
                    <div className="text-xl font-bold text-gray-800">2024-05-01</div>
                    <div className="text-xs text-gray-500 mt-1">D-10</div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-1">납부 상태</h3>
                    <div className="text-xl font-bold text-green-600">완료</div>
                    <div className="text-xs text-gray-500 mt-1">최근 납부일: 2024-04-01</div>
                  </div>
                </div>
                
                {/* 납부 이력 */}
                <h3 className="text-md font-semibold text-gray-700 mb-3">납부 이력</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">납부일</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">결제 방법</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {student.payments.map((payment: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(payment.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.method}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              payment.status === '납부완료' ? 'bg-green-100 text-green-800' :
                              payment.status === '미납' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary hover:text-primary/80 mr-3">영수증</button>
                            <button className="text-gray-600 hover:text-gray-900">수정</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* 상담 이력 탭 */}
            {activeTab === 'consultations' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">상담 이력</h2>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2">
                    <FaPlus className="text-sm" />
                    <span>상담 기록 추가</span>
                  </button>
                </div>
                
                {/* 상담 이력 목록 */}
                <div className="space-y-4">
                  {student.consultations.map((consultation: any, index: number) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">{consultation.date}</span>
                            <span className="text-sm text-gray-600">담당: {consultation.staff}</span>
                          </div>
                          <p className="text-gray-800">{consultation.content}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-primary hover:text-primary/80">
                            <FaPen className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 학부모 소통 이력 */}
                <h3 className="text-md font-semibold text-gray-700 mt-6 mb-3">학부모 소통 기록</h3>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold mr-3">
                        A
                      </div>
                      <div className="flex-1 bg-primary/10 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">관리자</span>
                          <span className="text-xs text-gray-500">2024-04-10 14:30</span>
                        </div>
                        <p className="text-gray-800">4월 모의고사 결과에 대해 학부모님께 전화 안내드렸습니다. 학생의 독해력 향상이 두드러지며, 다음 달 특강 참여 의사를 확인했습니다.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white text-lg font-bold mr-3">
                        P
                      </div>
                      <div className="flex-1 bg-yellow-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{student.parentName} (학부모)</span>
                          <span className="text-xs text-gray-500">2024-03-22 10:15</span>
                        </div>
                        <p className="text-gray-800">중간고사 대비 추가 학습 자료를 요청하셨습니다. 특히 문법 부분 보강이 필요하다고 하셨습니다.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <textarea 
                      placeholder="새 소통 내용을 입력하세요..." 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24"
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                        기록 추가
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        
        {/* 푸터 */}
        <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t">
          <p>© {new Date().getFullYear()} 스파르탄 영어학원 관리자 시스템. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 