'use client'

import Link from 'next/link'

export default function PasswordResetSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            비밀번호 재설정 링크가 발송되었습니다
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            이메일을 확인하여 비밀번호 재설정 링크를 클릭해주세요.
          </p>
        </div>

        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                이메일 발송 완료
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  입력하신 이메일 주소로 비밀번호 재설정 링크가 발송되었습니다. 이메일을 확인하여 재설정 과정을 완료해주세요.
                </p>
                <p className="mt-2">
                  이메일이 도착하지 않는 경우, 스팸 폴더를 확인하거나 잠시 후 다시 시도해주세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link 
            href="/login" 
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
} 