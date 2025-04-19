'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaChartLine, FaSignOutAlt, FaBars, FaTimes, FaBell } from 'react-icons/fa';
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

// 현재 시간 포맷 함수
const formatCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// 통계 카드 컴포넌트
const StatsCard = ({ icon: Icon, title, value, trend, color }: { icon: any, title: string, value: string, trend: string, color: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl shadow-md p-5 border-l-4 hover:shadow-lg transition-shadow"
    style={{ borderLeftColor: color }}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-gray-800">{value}</h3>
        <p className={`text-xs mt-2 ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {trend} 지난주 대비
        </p>
      </div>
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
        <Icon className="text-xl" style={{ color: color }} />
      </div>
    </div>
  </motion.div>
);

// 최근 상담 요청 컴포넌트
const RecentConsultation = ({ name, date, status }: { name: string, date: string, status: '대기중' | '상담완료' | '취소' }) => {
  const statusColor = 
    status === '대기중' ? 'bg-yellow-100 text-yellow-800' :
    status === '상담완료' ? 'bg-green-100 text-green-800' :
    'bg-red-100 text-red-800';
  
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
        {status}
      </span>
    </div>
  );
};

// 예정된 수업 컴포넌트
const UpcomingClass = ({ time, student, subject }: { time: string, student: string, subject: string }) => (
  <div className="flex gap-4 py-3 border-b last:border-0">
    <div className="bg-primary/10 text-primary font-bold rounded px-3 py-1 text-sm self-start">
      {time}
    </div>
    <div>
      <p className="font-medium">{student}</p>
      <p className="text-sm text-gray-500">{subject}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [currentTime, setCurrentTime] = useState(formatCurrentTime());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  // 타이머 설정
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
                  <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/10 text-white">
                    <FaChartLine />
                    <span>대시보드</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 transition-colors">
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
            <div className="hidden md:block">
              <span className="text-sm text-gray-500">현재 시간:</span>
              <span className="ml-2 text-sm font-medium">{currentTime}</span>
            </div>
            
            <div className="relative">
              <FaBell className="text-xl text-gray-600 cursor-pointer hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
              <span className="hidden md:block text-sm font-medium">관리자</span>
            </div>
          </div>
        </header>
        
        {/* 대시보드 콘텐츠 */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">대시보드</h1>
            <p className="text-gray-600">학원 현황과 통계를 한눈에 확인하세요.</p>
          </div>
          
          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              icon={FaUsers} 
              title="총 학생 수" 
              value="87명" 
              trend="+5%" 
              color="#4F46E5" 
            />
            <StatsCard 
              icon={FaChalkboardTeacher} 
              title="이번 주 수업" 
              value="32회" 
              trend="+2%" 
              color="#0EA5E9" 
            />
            <StatsCard 
              icon={FaCalendarAlt} 
              title="상담 신청" 
              value="12건" 
              trend="+8%" 
              color="#10B981" 
            />
            <StatsCard 
              icon={FaChartLine} 
              title="월별 성장률" 
              value="12.5%" 
              trend="-3%" 
              color="#F59E0B" 
            />
          </div>
          
          {/* 추가 정보 섹션 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 최근 상담 요청 */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1">
              <h2 className="text-lg font-bold text-gray-800 mb-4">최근 상담 요청</h2>
              <div className="space-y-1">
                <RecentConsultation name="김영희 학부모" date="2024-04-19 11:30" status="대기중" />
                <RecentConsultation name="이철수 학부모" date="2024-04-18 15:45" status="상담완료" />
                <RecentConsultation name="박민지 학부모" date="2024-04-18 09:20" status="상담완료" />
                <RecentConsultation name="정재훈 학부모" date="2024-04-17 14:00" status="취소" />
              </div>
              <a href="#" className="block text-center mt-4 text-sm text-primary font-medium hover:underline">
                모든 상담 요청 보기
              </a>
            </div>
            
            {/* 오늘의 수업 일정 */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1">
              <h2 className="text-lg font-bold text-gray-800 mb-4">오늘의 수업 일정</h2>
              <div className="space-y-1">
                <UpcomingClass time="14:00" student="김민준 학생" subject="수능 독해 심화" />
                <UpcomingClass time="16:00" student="박서연 학생" subject="내신 대비 영문법" />
                <UpcomingClass time="18:30" student="이지훈 학생" subject="수능 영어 기출 분석" />
                <UpcomingClass time="20:00" student="최예린 학생" subject="토익 실전 대비" />
              </div>
              <a href="#" className="block text-center mt-4 text-sm text-primary font-medium hover:underline">
                모든 일정 보기
              </a>
            </div>
            
            {/* 최근 게시글 */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1">
              <h2 className="text-lg font-bold text-gray-800 mb-4">최근 공지사항</h2>
              <div className="space-y-3">
                <div className="border-b pb-3">
                  <h3 className="font-medium">5월 연휴 휴원 안내</h3>
                  <p className="text-sm text-gray-500 mt-1">어린이날과 석가탄신일 연휴 기간 휴원 안내입니다.</p>
                  <p className="text-xs text-gray-400 mt-2">2024-04-18</p>
                </div>
                <div className="border-b pb-3">
                  <h3 className="font-medium">중간고사 특강 안내</h3>
                  <p className="text-sm text-gray-500 mt-1">5월 중간고사 대비 특강 일정이 확정되었습니다.</p>
                  <p className="text-xs text-gray-400 mt-2">2024-04-15</p>
                </div>
                <div className="border-b pb-3">
                  <h3 className="font-medium">학부모 상담주간 운영</h3>
                  <p className="text-sm text-gray-500 mt-1">4월 마지막 주 학부모 상담주간을 운영합니다.</p>
                  <p className="text-xs text-gray-400 mt-2">2024-04-10</p>
                </div>
              </div>
              <a href="#" className="block text-center mt-4 text-sm text-primary font-medium hover:underline">
                모든 공지사항 보기
              </a>
            </div>
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