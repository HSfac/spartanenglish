import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: string;
  subject: string;
  message: string;
  created_at?: string;
};

// 문의 목록 가져오기
export async function getInquiries() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('문의 목록 조회 오류:', error);
    return { data: null, error };
  }
}

// 문의 상태 업데이트
export async function updateInquiryStatus(id: number, status: string) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('문의 상태 업데이트 오류:', error);
    return { data: null, error };
  }
}

// 새 문의 추가
export async function addInquiry(inquiry: Omit<Inquiry, 'id'>) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiry])
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('문의 추가 오류:', error);
    return { data: null, error };
  }
}

// 문의 삭제
export async function deleteInquiry(id: number) {
  try {
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('문의 삭제 오류:', error);
    return { error };
  }
} 