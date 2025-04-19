'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif font-bold">
          Spartan<span className="text-accent">영어학원</span>
        </Link>
        
        {/* 데스크톱 메뉴 */}
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
        
        {/* 모바일 메뉴 버튼 */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        
        <Link 
          href="/consult" 
          className="hidden md:block bg-accent text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
        >
          상담신청
        </Link>
      </div>
      
      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-dark py-4 px-4">
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/about" 
              className="hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              강사소개
            </Link>
            <Link 
              href="/curriculum" 
              className="hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              수업안내
            </Link>
            <Link 
              href="/reviews" 
              className="hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              수업후기
            </Link>
            <Link 
              href="/faq" 
              className="hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              자주묻는질문
            </Link>
            <Link 
              href="/consult" 
              className="bg-accent text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors self-start"
              onClick={() => setIsMenuOpen(false)}
            >
              상담신청
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
} 