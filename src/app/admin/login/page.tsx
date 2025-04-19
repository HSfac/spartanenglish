'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/supabase';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // 이미 로그인되어 있는지 확인
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const { session } = await auth.getSession();
        if (session) {
          router.push('/admin/dashboard');
        }
      } catch (err) {
        console.error('로그인 확인 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      if (data && data.session) {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      setError('로그인 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary">스파르탄 영어학원</h1>
          <p className="text-gray-600">관리자 로그인</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="관리자 이메일 주소"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="비밀번호"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" /> 로그인 중...
              </span>
            ) : (
              '로그인'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link href="/" className="text-primary hover:underline">
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
} 