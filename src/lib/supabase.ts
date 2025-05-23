import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// 사용자 인증 관련 함수들
export const auth = {
  // 이메일과 비밀번호로 로그인
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // 로그아웃
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // 현재 사용자 가져오기
  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },

  // 세션 확인
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  }
};

// 데이터베이스 관련 함수들
export const db = {
  // 학생 데이터 가져오기
  async getStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('name');
    return { data, error };
  },

  // 학생 데이터 추가
  async addStudent(student: any) {
    const { data, error } = await supabase
      .from('students')
      .insert([student])
      .select();
    return { data, error };
  },

  // 학생 데이터 수정
  async updateStudent(id: number, updates: any) {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select();
    return { data, error };
  },

  // 학생 데이터 삭제
  async deleteStudent(id: number) {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);
    return { error };
  },

  // 학생 상세 정보 가져오기
  async getStudentById(id: number) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  // 수업 데이터 가져오기
  async getClasses() {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('name');
    return { data, error };
  },

  // 수업 데이터 추가
  async addClass(classData: any) {
    const { data, error } = await supabase
      .from('classes')
      .insert([classData])
      .select();
    return { data, error };
  },

  // 수업 데이터 수정
  async updateClass(id: number, updates: any) {
    const { data, error } = await supabase
      .from('classes')
      .update(updates)
      .eq('id', id)
      .select();
    return { data, error };
  },

  // 수업 데이터 삭제
  async deleteClass(id: number) {
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id);
    return { error };
  },

  // 출석 데이터 가져오기
  async getAttendance(classId: number, date: string) {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('class_id', classId)
      .eq('date', date);
    return { data, error };
  },

  // 출석 데이터 저장
  async saveAttendance(attendance: any) {
    // 이미 존재하는 데이터 확인
    const { data: existingData } = await supabase
      .from('attendance')
      .select('id')
      .eq('class_id', attendance.class_id)
      .eq('date', attendance.date);

    if (existingData && existingData.length > 0) {
      // 기존 데이터 업데이트
      const { data, error } = await supabase
        .from('attendance')
        .update({ students: attendance.students })
        .eq('id', existingData[0].id)
        .select();
      return { data, error };
    } else {
      // 새 데이터 추가
      const { data, error } = await supabase
        .from('attendance')
        .insert([attendance])
        .select();
      return { data, error };
    }
  },

  // 학생 시험 결과 가져오기
  async getTestResults(studentId: number) {
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('student_id', studentId)
      .order('date', { ascending: false });
    return { data, error };
  },

  // 시험 데이터 가져오기
  async getExams() {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('date', { ascending: true });
    return { data, error };
  },

  // 학생 시험 결과 추가
  async addTestResult(result: any) {
    const { data, error } = await supabase
      .from('test_results')
      .insert([result])
      .select();
    return { data, error };
  },

  // 학비 데이터 가져오기
  async getPayments(studentId?: number) {
    let query = supabase
      .from('payments')
      .select('*')
      .order('date', { ascending: false });
    
    if (studentId) {
      query = query.eq('student_id', studentId);
    }
    
    const { data, error } = await query;
    return { data, error };
  },
  
  // 미납 학비 데이터 가져오기
  async getUnpaidPayments() {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('status', '미납')
      .order('due_date', { ascending: true });
    return { data, error };
  },

  // 학비 데이터 추가
  async addPayment(payment: any) {
    const { data, error } = await supabase
      .from('payments')
      .insert([payment])
      .select();
    return { data, error };
  },

  // 상담 기록 가져오기
  async getConsultations(studentId?: number) {
    let query = supabase
      .from('consultations')
      .select('*')
      .order('date', { ascending: false });
    
    if (studentId) {
      query = query.eq('student_id', studentId);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  // 상담 기록 추가
  async addConsultation(consultation: any) {
    const { data, error } = await supabase
      .from('consultations')
      .insert([consultation])
      .select();
    return { data, error };
  },
  
  // 대시보드 통계 데이터 가져오기
  async getDashboardStats() {
    try {
      // 학생 수 조회
      const { data: students } = await supabase.from('students').select('id');
      
      // 수업 수 조회
      const { data: classes } = await supabase.from('classes').select('id');
      
      // 대기 중인 상담 조회
      const { data: pendingConsultations } = await supabase
        .from('consultations')
        .select('id')
        .eq('status', '대기중');
      
      // 미납 학비 조회
      const { data: unpaidPayments } = await supabase
        .from('payments')
        .select('amount')
        .eq('status', '미납');
      
      const totalUnpaidAmount = unpaidPayments
        ? unpaidPayments.reduce((sum, payment) => sum + payment.amount, 0)
        : 0;
      
      return {
        totalStudents: students?.length || 0,
        totalClasses: classes?.length || 0,
        pendingConsultations: pendingConsultations?.length || 0,
        unpaidPayments: totalUnpaidAmount,
        studentStatusData: []  // 필요시 추가 구현
      };
    } catch (error) {
      console.error('대시보드 통계 데이터 가져오기 오류:', error);
      return {
        totalStudents: 0,
        totalClasses: 0,
        pendingConsultations: 0,
        unpaidPayments: 0,
        studentStatusData: []
      };
    }
  }
}; 