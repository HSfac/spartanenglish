import { createClient } from '@supabase/supabase-js'

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 인증 서비스
export const auth = {
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  },
  signOut: async () => {
    return await supabase.auth.signOut()
  },
  getSession: async () => {
    return await supabase.auth.getSession()
  },
  getCurrentUser: async () => {
    return await supabase.auth.getUser()
  }
}

// 데이터베이스 서비스
export const db = {
  // 학생 관련 함수
  getStudents: async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('name')
    
    return { data, error }
  },
  
  getStudentById: async (id: string) => {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        classes:student_classes(
          class:classes(*)
        ),
        attendance:attendance(
          date,
          status
        ),
        exams:student_exams(
          exam_id,
          exam:exams(name, date),
          score,
          rank
        ),
        payments:payments(
          id,
          amount,
          dueDate,
          status,
          paymentDate
        )
      `)
      .eq('id', id)
      .single()
    
    return { data, error }
  },
  
  addStudent: async (student: any) => {
    const { data, error } = await supabase
      .from('students')
      .insert(student)
      .select()
    
    return { data, error }
  },
  
  updateStudent: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select()
    
    return { data, error }
  },
  
  deleteStudent: async (id: string) => {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id)
    
    return { error }
  },

  // 학생 수업 관련 함수
  getStudentClasses: async (studentId: string) => {
    const { data, error } = await supabase
      .from('student_classes')
      .select(`
        *,
        class:classes(*)
      `)
      .eq('student_id', studentId)
    
    return { data, error }
  },

  addStudentToClass: async (studentId: string, classId: string) => {
    const { data, error } = await supabase
      .from('student_classes')
      .insert({
        student_id: studentId,
        class_id: classId
      })
      .select()
    
    return { data, error }
  },

  removeStudentFromClass: async (studentId: string, classId: string) => {
    const { error } = await supabase
      .from('student_classes')
      .delete()
      .eq('student_id', studentId)
      .eq('class_id', classId)
    
    return { error }
  },

  // 학생 시험 성적 관련 함수
  getStudentExams: async (studentId: string) => {
    const { data, error } = await supabase
      .from('student_exams')
      .select(`
        *,
        exam:exams(*)
      `)
      .eq('student_id', studentId)
      .order('date', { ascending: false })
    
    return { data, error }
  },

  addStudentExam: async (examResult: any) => {
    const { data, error } = await supabase
      .from('student_exams')
      .insert(examResult)
      .select()
    
    return { data, error }
  },

  updateStudentExam: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('student_exams')
      .update(updates)
      .eq('id', id)
      .select()
    
    return { data, error }
  },

  deleteStudentExam: async (id: string) => {
    const { error } = await supabase
      .from('student_exams')
      .delete()
      .eq('id', id)
    
    return { error }
  },

  // 학생 출결 관련 함수
  getStudentAttendance: async (studentId: string, startDate?: string, endDate?: string) => {
    let query = supabase
      .from('attendance')
      .select('*')
      .eq('student_id', studentId)
      .order('date', { ascending: false })
    
    if (startDate) {
      query = query.gte('date', startDate)
    }
    
    if (endDate) {
      query = query.lte('date', endDate)
    }
    
    const { data, error } = await query
    
    return { data, error }
  },

  addStudentAttendance: async (attendanceData: any) => {
    const { data, error } = await supabase
      .from('attendance')
      .insert(attendanceData)
      .select()
    
    return { data, error }
  },
  
  // 수업 관련 함수
  getClasses: async () => {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('name')
    
    if (error) throw error
    return { data, error }
  },
  
  getClassById: async (id: string) => {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return { data, error }
  },
  
  addClass: async (classData: any) => {
    const { data, error } = await supabase
      .from('classes')
      .insert(classData)
      .select()
    
    if (error) throw error
    return { data, error }
  },
  
  updateClass: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('classes')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return { data, error }
  },
  
  deleteClass: async (id: string) => {
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return { error: null }
  },
  
  // 출석 관련 함수
  getAttendance: async (classId: string, date: string) => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('class_id', classId)
      .eq('date', date)
    
    if (error) throw error
    return { data, error }
  },
  
  saveAttendance: async (attendanceData: any) => {
    // 기존 레코드가 있는지 확인
    const { data: existingData } = await supabase
      .from('attendance')
      .select('id')
      .eq('class_id', attendanceData.class_id)
      .eq('date', attendanceData.date)
    
    if (existingData && existingData.length > 0) {
      // 업데이트
      const { data, error } = await supabase
        .from('attendance')
        .update({ students: attendanceData.students })
        .eq('id', existingData[0].id)
        .select()
      
      if (error) throw error
      return { data, error }
    } else {
      // 새로 추가
      const { data, error } = await supabase
        .from('attendance')
        .insert(attendanceData)
        .select()
      
      if (error) throw error
      return { data, error }
    }
  },
  
  // 상담 관련 함수
  getConsultations: async () => {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) throw error
    return { data, error }
  },
  
  addConsultation: async (consultation: any) => {
    const { data, error } = await supabase
      .from('consultations')
      .insert(consultation)
      .select()
    
    if (error) throw error
    return { data, error }
  },
  
  updateConsultationStatus: async (id: string, status: string) => {
    const { data, error } = await supabase
      .from('consultations')
      .update({ status })
      .eq('id', id)
      .select()
    
    if (error) throw error
    return { data, error }
  },
  
  // 학비 결제 관련 함수
  getPayments: async () => {
    const { data, error } = await supabase
      .from('payments')
      .select('*, students(name)')
      .order('dueDate')
    
    if (error) throw error
    return { data, error }
  },
  
  getUnpaidPayments: async () => {
    const { data, error } = await supabase
      .from('payments')
      .select('*, students(name)')
      .eq('status', '미납')
      .order('dueDate')
    
    if (error) throw error
    return { data, error }
  },
  
  addPayment: async (payment: any) => {
    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select()
    
    if (error) throw error
    return { data, error }
  },
  
  updatePaymentStatus: async (id: string, status: string) => {
    const updates: any = { status }
    
    if (status === '완료') {
      updates.paymentDate = new Date()
    }
    
    const { data, error } = await supabase
      .from('payments')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return { data, error }
  },
  
  // 시험 일정 관련 함수
  getExams: async () => {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('date')
    
    if (error) throw error
    return { data, error }
  },
  
  addExam: async (exam: any) => {
    const { data, error } = await supabase
      .from('exams')
      .insert(exam)
      .select()
    
    if (error) throw error
    return { data, error }
  },
  
  updateExam: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('exams')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return { data, error }
  },
  
  deleteExam: async (id: string) => {
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return { error: null }
  },
  
  // 대시보드 통계 관련 함수
  getDashboardStats: async () => {
    // 학생 현황 통계
    const { data: studentStats, error: studentError } = await supabase
      .from('students')
      .select('status')
    
    if (studentError) throw studentError
    
    // 수업 통계
    const { data: classStats, error: classError } = await supabase
      .from('classes')
      .select('id')
    
    if (classError) throw classError
    
    // 미납 학비 건수
    const { data: unpaidStats, error: unpaidError } = await supabase
      .from('payments')
      .select('id')
      .eq('status', '미납')
    
    if (unpaidError) throw unpaidError
    
    // 상담 요청 건수
    const { data: consultationStats, error: consultationError } = await supabase
      .from('consultations')
      .select('id')
      .eq('status', '대기중')
    
    if (consultationError) throw consultationError
    
    // 학생 현황 통계 계산
    const studentStatusData = [
      { name: '재원중', value: studentStats.filter(s => s.status === '재원중').length },
      { name: '휴학', value: studentStats.filter(s => s.status === '휴원중').length },
      { name: '퇴원', value: studentStats.filter(s => s.status === '퇴원').length }
    ]
    
    return {
      studentStatusData,
      totalStudents: studentStats.length,
      totalClasses: classStats.length,
      unpaidPayments: unpaidStats.length,
      pendingConsultations: consultationStats.length
    }
  }
} 