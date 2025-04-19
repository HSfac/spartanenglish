import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

// GET 요청 처리 - 모든 문의 조회
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('GET 문의 목록 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
}

// POST 요청 처리 - 새 문의 추가
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다 (이름, 이메일, 제목, 내용)' }, 
        { status: 400 }
      );
    }
    
    // 상태 기본값 설정
    if (!body.status) {
      body.status = '미확인';
    }
    
    const { data, error } = await supabase
      .from('inquiries')
      .insert([body])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data[0] }, { status: 201 });
  } catch (error) {
    console.error('POST 문의 추가 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
}

// PATCH 요청 처리 - 문의 상태 업데이트
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.id || !body.status) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다 (id, status)' }, 
        { status: 400 }
      );
    }
    
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status: body.status })
      .eq('id', body.id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: '해당 문의를 찾을 수 없습니다' }, { status: 404 });
    }

    return NextResponse.json({ data: data[0] });
  } catch (error) {
    console.error('PATCH 문의 업데이트 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
} 