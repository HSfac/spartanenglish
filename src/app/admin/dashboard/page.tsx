'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, orderBy, limit, where, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { FaUsers, FaChalkboardTeacher, FaUserGraduate, FaComment, FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useAdminAuth from '@/hooks/useAdminAuth';
import { FaBell, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

// 차트 라이브러리 추가
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  LineChart, Line, 
  ResponsiveContainer, 
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from 'recharts';

// 관리자 인증 상태 확인 커스텀 훅
const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await auth.getSession();
        setIsAuthenticated(!!data.session);
        
        if (!data.session) {
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

// 미납 학비 알림 컴포넌트
const TuitionAlert = ({ student, amount, dueDate }: { student: string, amount: string, dueDate: string }) => (
  <div className="flex items-center justify-between py-3 border-b last:border-0">
    <div>
      <p className="font-medium">{student}</p>
      <p className="text-sm text-gray-500">마감일: {dueDate}</p>
    </div>
    <div className="text-red-500 font-bold">{amount}</div>
  </div>
);

// 다가오는 시험 일정 컴포넌트
const UpcomingExam = ({ title, date, students }: { title: string, date: string, students: string }) => (
  <div className="py-3 border-b last:border-0">
    <div className="flex justify-between">
      <p className="font-medium">{title}</p>
      <p className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{date}</p>
    </div>
    <p className="text-sm text-gray-500 mt-1">대상: {students}</p>
  </div>
);

// 샘플 차트 데이터 - 실제로는 API에서 가져옴
const attendanceData = [
  { name: '수능 독해', 출석률: 92 },
  { name: '영문법', 출석률: 88 },
  { name: '토익', 출석률: 76 },
  { name: '내신 대비', 출석률: 95 },
  { name: '영어 회화', 출석률: 85 },
];

const monthlyRevenueData = [
  { name: '1월', 수입: 3200000 },
  { name: '2월', 수입: 3500000 },
  { name: '3월', 수입: 3800000 },
  { name: '4월', 수입: 4100000 },
  { name: '5월', 수입: 4300000 },
  { name: '6월', 수입: 4000000 },
];

const COLORS = ['#4F46E5', '#10B981', '#F59E0B'];

// 타입 정의
interface DashboardData {
  students: number;
  classes: number;
  pendingConsultations: number;
  upcomingClasses: ClassInfo[];
  recentConsultations: ConsultationInfo[];
}

interface ClassInfo {
  id: string;
  studentName: string;
  date: Date;
  time: string;
  duration: number;
  type: string;
}

interface ConsultationInfo {
  id: string;
  name: string;
  phone: string;
  date: Date;
  status: string;
  message: string;
}

export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [currentTime, setCurrentTime] = useState(formatCurrentTime());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>({
    totalStudents: 0,
    totalClasses: 0,
    pendingConsultations: 0,
    unpaidPayments: 0,
    studentStatusData: [],
    consultations: [],
    exams: [],
    payments: []
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 타이머 설정
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  // 대시보드 데이터 가져오기
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 통계 데이터
        const stats = await db.getDashboardStats();
        
        // 최근 상담 요청
        const { data: consultations } = await db.getConsultations();
        
        // 다가오는 시험
        const { data: exams } = await db.getExams();
        
        // 미납 학비
        const { data: payments } = await db.getUnpaidPayments();
        
        setDashboardData({
          totalStudents: stats.totalStudents,
          totalClasses: stats.totalClasses,
          pendingConsultations: stats.pendingConsultations,
          unpaidPayments: stats.unpaidPayments,
          studentStatusData: stats.studentStatusData,
          consultations: consultations?.slice(0, 4) || [],
          exams: exams?.slice(0, 4) || [],
          payments: payments?.slice(0, 4) || []
        });
      } catch (error) {
        console.error('대시보드 데이터 가져오기 오류:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
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

  // 로딩 상태 표시
  if (isLoading || loading) {
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

  // 성장률 계산 (임시 데이터, 실제로는 DB에서 가져옴)
  const growthRates = {
    students: '+5%',
    classes: '+2%',
    consultations: '+8%',
    revenue: '+4.6%'
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
                  <a href="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/10 text-white">
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
                  <a href="/admin/classes" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 transition-colors">
                    <FaCalendarAlt />
                    <span>수업 관리</span>
                  </a>
                </li>
                <li>
                  <a href="/admin/resources" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 transition-colors">
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
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {dashboardData.pendingConsultations || 0}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
              <span className="hidden md:block text-sm font-medium">관리자</span>
            </div>
          </div>
        </header>
        
        {/* 대시보드 콘텐츠 */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">대시보드</h1>
            <p className="text-gray-600">학원 현황과 통계를 한눈에 확인하세요.</p>
          </div>
          
          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              icon={FaUsers} 
              title="총 학생 수" 
              value={`${dashboardData.totalStudents}명`} 
              trend={growthRates.students} 
              color="#4F46E5" 
            />
            <StatsCard 
              icon={FaChalkboardTeacher} 
              title="진행 중인 수업" 
              value={`${dashboardData.totalClasses}개`} 
              trend={growthRates.classes} 
              color="#0EA5E9" 
            />
            <StatsCard 
              icon={FaCalendarAlt} 
              title="상담 신청" 
              value={`${dashboardData.pendingConsultations}건`} 
              trend={growthRates.consultations} 
              color="#10B981" 
            />
            <StatsCard 
              icon={FaWonSign} 
              title="미납 학비" 
              value={`${dashboardData.unpaidPayments}건`} 
              trend={growthRates.revenue} 
              color="#F59E0B" 
            />
          </div>
          
          {/* 학생 현황 및 차트 섹션 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* 실시간 학생 현황 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">실시간 학생 현황</h2>
              <div className="flex">
                <div className="w-1/2">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={dashboardData.studentStatusData || []}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {(dashboardData.studentStatusData || []).map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 flex flex-col justify-center">
                  {(dashboardData.studentStatusData || []).map((status: any, index: number) => (
                    <div key={index} className="flex items-center mb-4">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <div>
                        <p className="text-sm font-medium">{status.name}</p>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold mr-1">{status.value}</span>
                          <span className="text-sm text-gray-500">명</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 수업별 출석률 그래프 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">수업별 출석률</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={attendanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, '출석률']} />
                  <Bar dataKey="출석률" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* 월별 매출 통계 */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">월별 매출 통계</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={monthlyRevenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} 
                />
                <Tooltip 
                  formatter={(value) => [
                    new Intl.NumberFormat('ko-KR', { 
                      style: 'currency', 
                      currency: 'KRW',
                      maximumFractionDigits: 0 
                    }).format(value as number), 
                    '매출'
                  ]} 
                />
                <Legend />
                <Line type="monotone" dataKey="수입" stroke="#4F46E5" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* 추가 정보 섹션 - 3열 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 최근 상담 요청 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">최근 문의 및 상담 요청</h2>
              <div className="space-y-1">
                {dashboardData.consultations.length > 0 ? (
                  dashboardData.consultations.map((consultation: any, index: number) => (
                    <RecentConsultation 
                      key={index}
                      name={consultation.name}
                      date={new Date(consultation.date).toLocaleString('ko-KR')}
                      status={consultation.status as any}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm py-3">최근 상담 요청이 없습니다.</p>
                )}
              </div>
              <a href="#" className="block text-center mt-4 text-sm text-primary font-medium hover:underline">
                모든 상담 요청 보기
              </a>
            </div>
            
            {/* 다가오는 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">다가오는 시험 일정</h2>
              <div className="space-y-1">
                {dashboardData.exams.length > 0 ? (
                  dashboardData.exams.map((exam: any, index: number) => (
                    <UpcomingExam
                      key={index}
                      title={exam.title}
                      date={new Date(exam.date).toLocaleDateString('ko-KR')}
                      students={exam.target_students}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm py-3">다가오는 시험 일정이 없습니다.</p>
                )}
              </div>
              <a href="#" className="block text-center mt-4 text-sm text-primary font-medium hover:underline">
                모든 시험 일정 보기
              </a>
            </div>
            
            {/* 미납 학비 알림 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">미납 학비 알림</h2>
              <div className="space-y-1">
                {dashboardData.payments.length > 0 ? (
                  dashboardData.payments.map((payment: any, index: number) => (
                    <TuitionAlert
                      key={index}
                      student={payment.students.name}
                      amount={new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(payment.amount)}
                      dueDate={new Date(payment.dueDate).toLocaleDateString('ko-KR')}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm py-3">미납 학비가 없습니다.</p>
                )}
              </div>
              <a href="#" className="block text-center mt-4 text-sm text-primary font-medium hover:underline">
                모든 미납 학비 보기
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