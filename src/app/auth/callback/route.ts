import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next') || '/'

  if (code) {
    const supabase = createClient()
    
    if (type === 'recovery') {
      // 비밀번호 재설정 토큰인 경우 update-password 페이지로 리디렉션
      await supabase.auth.exchangeCodeForSession(code)
      return NextResponse.redirect(new URL('/update-password', requestUrl.origin))
    }
    
    // 이메일 확인 또는 가입 초대와 같은 다른 인증 흐름 처리
    await supabase.auth.exchangeCodeForSession(code)
  }

  // 다음 경로로 리디렉션 (기본값은 홈페이지)
  return NextResponse.redirect(new URL(next, requestUrl.origin))
} 