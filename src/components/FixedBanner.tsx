'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPhone, FaComment, FaTimes, FaArrowLeft, FaChevronUp, FaHeadset, FaBell } from 'react-icons/fa';

// 가상의 실시간 문의 메시지 데이터
const recentInquiries = [
  { name: '김지훈', time: '방금 전' },
  { name: '이서아', time: '2분 전' },
  { name: '박현우', time: '5분 전' },
  { name: '최예은', time: '10분 전' },
  { name: '정준호', time: '15분 전' },
  { name: '한미나', time: '20분 전' },
];

export default function FixedBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMobileButton, setShowMobileButton] = useState(true);
  const [currentInquiry, setCurrentInquiry] = useState(0);
  const [showInquiryToast, setShowInquiryToast] = useState(false);
  
  useEffect(() => {
    // 모바일 여부 확인
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 페이지 로드 즉시 배너 표시 및 모바일 체크
    setIsVisible(true);
    checkMobile();
    
    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', checkMobile);
    
    // 스크롤 이벤트 리스너 등록 (모바일에서 스크롤 방향에 따라 버튼 표시/숨김)
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (isMobile) {
        // 스크롤 다운 - 버튼만 표시
        if (currentScrollY > lastScrollY + 10) {
          setIsExpanded(false);
          setShowMobileButton(true);
        } 
        // 스크롤 업 - 배너 표시
        else if (currentScrollY < lastScrollY - 10 && currentScrollY > 100) {
          setShowMobileButton(true);
        }
        // 페이지 최상단일 때 또는 정지 상태 일정 시간 유지 시 배너 완전히 표시
        else if (currentScrollY < 50) {
          setShowMobileButton(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // 배너가 깜빡이는 효과 (PC에서만 적용)
    const blinkInterval = setInterval(() => {
      if (isVisible && !isExpanded && !isMobile) {
        setIsVisible(false);
        setTimeout(() => setIsVisible(true), 300);
      }
    }, 5000);
    
    // 모바일에서 실시간 문의 알림 효과
    let inquiryInterval: NodeJS.Timeout | null = null;
    if (isMobile && showMobileButton) {
      inquiryInterval = setInterval(() => {
        // 랜덤하게 표시 여부 결정 (60% 확률로 표시)
        if (Math.random() < 0.6) {
          setCurrentInquiry((prev) => (prev + 1) % recentInquiries.length);
          setShowInquiryToast(true);
          
          // 5초 후에 토스트 숨김
          setTimeout(() => {
            setShowInquiryToast(false);
          }, 5000);
        }
      }, 15000); // 15초마다 체크
    }
    
    return () => {
      clearInterval(blinkInterval);
      if (inquiryInterval) clearInterval(inquiryInterval);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, isExpanded, isMobile, lastScrollY, showMobileButton]);
  
  const handleClose = () => {
    if (isMobile) {
      setShowMobileButton(false);
      // 30초 후에 다시 표시
      setTimeout(() => {
        setShowMobileButton(true);
      }, 30000);
    } else {
      setIsVisible(false);
      // 3초 후에 배너 다시 표시
      setTimeout(() => {
        setIsVisible(true);
      }, 3000);
    }
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // 토스트 메시지 닫기
    setShowInquiryToast(false);
  };
  
  // 모바일 버전 렌더링
  if (isMobile) {
    return (
      <>
        {/* 모바일 실시간 문의 알림 토스트 */}
        {showMobileButton && showInquiryToast && !isExpanded && (
          <div className="fixed right-4 bottom-24 z-50 max-w-[220px] bg-white rounded-lg shadow-lg p-3 animate-fadeIn">
            <div className="flex items-start">
              <div className="bg-accent/10 rounded-full p-2 mr-2">
                <FaBell className="text-accent text-sm" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-primary flex items-center mb-1">
                  <span className="flex-1">실시간 문의</span>
                  <span className="text-gray-400 text-[10px]">{recentInquiries[currentInquiry].time}</span>
                </div>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">{recentInquiries[currentInquiry].name}</span>님이 문의했습니다.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* 모바일 플로팅 버튼 */}
        {showMobileButton && !isExpanded && (
          <button
            onClick={toggleExpand}
            className="fixed right-4 bottom-4 z-50 bg-accent text-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 animate-pulse"
            aria-label="상담 문의"
          >
            <FaHeadset size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {Math.floor(Math.random() * 5) + 1}
            </span>
          </button>
        )}
        
        {/* 모바일 확장 배너 */}
        <div 
          className={`fixed left-0 right-0 bottom-0 z-50 transition-all duration-300 ${
            isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className="bg-white shadow-xl rounded-t-xl border-t-2 border-accent overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
              <div className="flex items-center">
                <FaHeadset className="text-accent mr-2" />
                <span className="font-bold text-primary">빠른 문의</span>
                <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">LIVE</span>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={toggleExpand}
                  className="text-gray-400 p-1 mr-1"
                >
                  <FaChevronUp size={16} />
                </button>
                <button 
                  onClick={handleClose}
                  className="text-gray-400 p-1"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {/* 실시간 문의 내역 */}
              <div className="mb-4 max-h-32 overflow-y-auto bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500 mb-2">🔴 실시간 문의 현황</p>
                {recentInquiries.map((inquiry, index) => (
                  <div key={index} className="flex items-center justify-between text-xs border-b border-gray-100 py-1.5 last:border-0">
                    <span className="font-medium text-gray-700">{inquiry.name}님이 문의했습니다</span>
                    <span className="text-gray-400 text-[10px] ml-2">{inquiry.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="tel:01012345678" 
                  className="flex items-center justify-center bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg py-3 shadow-md transition-all active:scale-95"
                >
                  <FaPhone className="mr-2" /> 전화 상담
                </a>
                
                <Link 
                  href="/consult" 
                  className="flex items-center justify-center bg-gradient-to-r from-accent to-accent/90 text-white rounded-lg py-3 shadow-md transition-all active:scale-95"
                  onClick={() => setIsExpanded(false)}
                >
                  <FaComment className="mr-2" /> 온라인 문의
                </Link>
              </div>
              
              <div className="mt-3 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  지금 문의하시면 <span className="text-primary font-semibold">첫 수업 20% 할인</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  // 데스크톱 버전 렌더링
  return (
    <div 
      className={`fixed right-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      } ${isExpanded ? 'scale-110' : 'scale-100'}`}
    >
      {/* 펼침 버튼 */}
      <button 
        onClick={toggleExpand}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-accent text-white p-2 rounded-l-md shadow-lg transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
      >
        <FaArrowLeft size={16} />
      </button>
      
      <div className={`relative bg-white shadow-xl rounded-l-lg border-l-4 border-accent overflow-hidden transition-all duration-300 ${isExpanded ? 'w-64' : 'w-56'}`}>
        {/* 상단 장식 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
        
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full -mt-12 -mr-12 z-0"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/10 to-accent/5 rounded-full -mb-8 -ml-8 z-0"></div>
        
        <button 
          onClick={handleClose}
          className="absolute top-1 right-1 text-gray-500 hover:text-accent p-1 transition-colors z-10"
          aria-label="닫기"
        >
          <FaTimes size={14} />
        </button>
        
        <div className="relative p-4 z-10">
          <div className="text-center font-bold text-sm text-primary mb-3 border-b pb-2 border-gray-100">
            <span className="relative">
              빠른 문의
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/40"></span>
            </span>
          </div>
          
          <div className="space-y-3">
            <a 
              href="tel:01012345678" 
              className="flex items-center justify-center bg-gradient-to-r from-primary to-primary/90 text-white rounded-md py-2.5 px-4 text-sm font-medium hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="bg-white/20 p-1.5 rounded-full mr-2 backdrop-blur-sm">
                <FaPhone size={14} />
              </div>
              <span>전화 상담</span>
            </a>
            
            <Link 
              href="/consult" 
              className="flex items-center justify-center bg-gradient-to-r from-accent to-accent/90 text-white rounded-md py-2.5 px-4 text-sm font-medium hover:from-accent/90 hover:to-accent shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="bg-white/20 p-1.5 rounded-full mr-2 backdrop-blur-sm">
                <FaComment size={14} />
              </div>
              <span>온라인 문의</span>
            </Link>
            
            {isExpanded && (
              <div className="mt-3 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  지금 문의하시면<br />
                  <span className="text-primary font-semibold">첫 수업 20% 할인</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 