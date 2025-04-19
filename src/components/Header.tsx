'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif font-bold">
          Spartan<span className="text-accent">영어학원</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/about" className="hover:text-accent transition-colors">
            강사소개
          </Link>
          <Link href="/curriculum" className="hover:text-accent transition-colors">
            수업안내
          </Link>
          <Link href="/reviews" className="hover:text-accent transition-colors">
            수업후기
          </Link>
          <Link href="/faq" className="hover:text-accent transition-colors">
            자주묻는질문
          </Link>
        </nav>
        <Link 
          href="/consult" 
          className="bg-accent text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
        >
          상담신청
        </Link>
      </div>
    </header>
  );
} 