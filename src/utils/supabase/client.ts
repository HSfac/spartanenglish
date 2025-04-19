'use client';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null;

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
  }
  
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient(supabaseUrl, supabaseKey);
  }
  
  return supabaseClient;
}; 