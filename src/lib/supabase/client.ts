import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Supabase 클라이언트 생성 함수
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}; 