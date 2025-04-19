'use client';

import Link from 'next/link';
import { FaLocationArrow, FaPhone, FaEnvelope, FaClock, FaInstagram, FaYoutube, FaBlog, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Instagram', icon: <FaInstagram />, url: '#', color: 'hover:text-pink-500' },
    { name: 'YouTube', icon: <FaYoutube />, url: '#', color: 'hover:text-red-600' },
    { name: 'Blog', icon: <FaBlog />, url: '#', color: 'hover:text-green-500' }
  ];
  
  const quickLinks = [
    { name: '강사소개', href: '/about' },
    { name: '수업안내', href: '/curriculum' },
    { name: '수업후기', href: '/reviews' },
    { name: '자주묻는질문', href: '/faq' },
    { name: '상담신청', href: '/consult' }
  ];
  
  const contactInfo = [
    { icon: <FaPhone className="text-accent" />, text: '010-0000-0000', href: 'tel:010-0000-0000' },
    { icon: <FaEnvelope className="text-accent" />, text: 'contact@spartanenglish.com', href: 'mailto:contact@spartanenglish.com' },
    { icon: <FaLocationArrow className="text-accent" />, text: '서울특별시 강남구', href: 'https://maps.google.com' },
    { icon: <FaClock className="text-accent" />, text: '평일 오후 1시 ~ 10시 | 주말 오전 10시 ~ 오후 6시', href: null }
  ];

  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-white relative overflow-hidden">
      {/* 장식 요소 */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full -mb-72 -ml-48 opacity-30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -mt-72 -mr-48 opacity-30"></div>
      
      {/* 최상단 부분 */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center flex-wrap">
          <div className="text-sm text-white/70 mb-4 md:mb-0">
            🔥 <span className="font-medium text-white">스파르탄 정신:</span> 열정, 집중, 결과
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                className={`transition-colors duration-300 text-white/70 ${link.color}`}
                title={link.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* 메인 푸터 콘텐츠 */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* 로고 및 간략한 소개 */}
          <div className="md:col-span-4">
            <h2 className="text-2xl font-serif font-bold mb-4 text-white">
              Spartan<span className="text-accent font-bold">영어학원</span>
            </h2>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              스파르탄 영어학원은 원장이 직접 가르치는 맞춤형 수업으로 
              학생들의 영어 실력 향상에 최선을 다하고 있습니다. 
              특화된 수능 영어 전략과 철저한 학생 관리로 결과를 증명합니다.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mt-4">
              <p className="font-medium text-white">📋 사업자 정보</p>
              <p className="text-sm text-white/70 mt-2">
                상호명: 스파르탄 영어학원<br />
                사업자등록번호: 000-00-00000<br />
                대표: 홍길동
              </p>
            </div>
          </div>
          
          {/* 빠른 링크 */}
          <div className="md:col-span-3 md:ml-auto">
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              빠른 메뉴
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-accent/50"></span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index} className="group">
                  <Link 
                    href={link.href} 
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center group-hover:translate-x-1 transform transition-transform"
                  >
                    <span className="text-xs mr-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 연락처 정보 */}
          <div className="md:col-span-5">
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              연락처 정보
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-accent/50"></span>
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className="text-white/80 hover:text-white transition-colors"
                        target={item.href.startsWith('http') ? "_blank" : undefined}
                        rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-white/80">{item.text}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            
            {/* 지도 미리보기 */}
            <div className="mt-6 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm p-2 relative group hover:bg-white/20 transition-colors">
              <div className="aspect-[16/9] bg-gray-800/50 rounded flex items-center justify-center">
                <div className="flex flex-col items-center text-white/70">
                  <FaMapMarkerAlt className="text-accent text-2xl mb-1" />
                  <p className="text-sm font-medium">지도 보기</p>
                </div>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0"
                aria-label="지도에서 위치 보기"
              ></a>
            </div>
          </div>
        </div>
      </div>
      
      {/* 저작권 정보 */}
      <div className="border-t border-white/10 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
            <p>&copy; {currentYear} Spartan 영어학원. All rights reserved.</p>
            <div className="mt-2 md:mt-0 flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
              <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 