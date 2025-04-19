// 학생 정보 타입
export type Student = {
  id: number;
  name: string;
  grade: string;
  level: string;
  enrollDate: string;
  status: '재원중' | '휴원중' | '퇴원';
  parentContact: string;
  registrationFee?: boolean;
  lastPaymentDate?: string;
  nextPaymentDue?: string;
  attendance?: number;
  absences?: number;
  notes?: string;
  avatar?: string;
  email?: string;
  birthdate?: string;
  address?: string;
  parentName?: string;
  parentEmail?: string;
  emergencyContact?: string;
  classes?: number[];
};

// 수업 정보 타입
export type Class = {
  id: number;
  name: string;
  subject: string;
  level: string;
  teacher: string;
  schedule: ClassSchedule[];
  maxCapacity: number;
  currentEnrollment: number;
  room?: string;
  description?: string;
  materials?: string[];
  startDate: string;
  endDate?: string;
  price: number;
  status: '진행중' | '예정' | '종료';
  studentIds: number[];
};

// 수업 시간표 타입
export type ClassSchedule = {
  day: '월' | '화' | '수' | '목' | '금' | '토' | '일';
  startTime: string; // HH:MM 형식
  endTime: string; // HH:MM 형식
};

// 교사 정보 타입
export type Teacher = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  profileImage?: string;
  bio?: string;
  qualifications?: string[];
  hireDate: string;
  status: '재직중' | '휴직중' | '퇴사';
};

// 문의 타입
export type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  created_at?: string;
  status: '미확인' | '확인완료' | '답변완료';
  subject: string;
  message: string;
  response?: string;
  responseDate?: string;
};

// 결제 정보 타입
export type Payment = {
  id: number;
  studentId: number;
  studentName: string;
  amount: number;
  paymentDate: string;
  dueDate: string;
  paymentMethod: '카드' | '현금' | '계좌이체' | '기타';
  status: '완료' | '대기중' | '미납';
  receiptNumber?: string;
  description?: string;
  classId?: number;
  className?: string;
};

// 출석 정보 타입
export type Attendance = {
  id: number;
  studentId: number;
  studentName: string;
  classId: number;
  className: string;
  date: string;
  status: '출석' | '지각' | '결석' | '조퇴' | '공결';
  notes?: string;
};

// 시험 결과 타입
export type TestResult = {
  id: number;
  studentId: number;
  studentName: string;
  testName: string;
  date: string;
  score: number;
  maxScore: number;
  grade?: string;
  notes?: string;
};

// 교재 정보 타입
export type Material = {
  id: number;
  title: string;
  type: '교재' | '워크북' | '문제집' | '참고서' | '기타';
  publisher?: string;
  level: string;
  subject: string;
  price: number;
  stock: number;
  isbn?: string;
  description?: string;
};

// 알림 타입
export type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
  type: '일반' | '중요' | '긴급';
  read: boolean;
  targetUsers?: 'all' | 'students' | 'teachers' | 'parents';
};

// 대시보드 통계 타입
export type DashboardStats = {
  totalStudents: number;
  activeStudents: number;
  totalClasses: number;
  totalTeachers: number;
  newInquiries: number;
  totalPayments: number;
  pendingPayments: number;
  studentsByGrade: Record<string, number>;
  studentsByLevel: Record<string, number>;
  recentPayments: Payment[];
  upcomingClasses: UpcomingClass[];
  attendanceRate: number;
  recentAttendance: Attendance[];
};

// 다가오는 수업 타입
export type UpcomingClass = {
  id: number;
  className: string;
  teacher: string;
  time: string;
  room?: string;
  studentCount: number;
}; 