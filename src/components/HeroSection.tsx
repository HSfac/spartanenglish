'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import FireEffect from './FireEffect';

export default function HeroSection() {
  const [showSpartan, setShowSpartan] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  useEffect(() => {
    // 애니메이션 효과를 위한 타이머
    const timer = setTimeout(() => {
      setShowSpartan(true);
    }, 800);
    
    // 스파르탄 방식 특징 자동 슬라이드
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(featureInterval);
    };
  }, []);

  const features = [
    {
      title: "원장의 직접 지도",
      description: "학원 강사가 아닌 원장이 모든 학생을 직접 관리하고 지도합니다.",
      icon: "👨‍🏫"
    },
    {
      title: "치열한 관리",
      description: "스파르탄 정신으로 철저하고 엄격한 학습 관리 시스템을 운영합니다.",
      icon: "🔥"
    },
    {
      title: "데이터 기반 학습",
      description: "개인별 학습 데이터를 분석하여 맞춤형 커리큘럼을 제공합니다.",
      icon: "📊"
    }
  ];

  return (
    <section className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
      {/* 불 효과 배경 */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2/3 z-0">
        <FireEffect />
      </div>
      
      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeIn">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              원장이 직접 가르치는 영어,<br />
              <span className={`text-accent relative ${showSpartan ? 'animate-pulse' : ''}`}>
                Spartan
                <span className="absolute -inset-1 bg-accent opacity-20 blur-sm rounded-lg"></span>
              </span>에서 시작됩니다
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              학원 강사가 아닌, <strong>원장 선생님이 직접</strong> 책임집니다.<br />
              수능 영어, <strong className="text-accent relative">
                결과로 증명
                <span className="absolute -inset-1 bg-accent opacity-10 blur-sm rounded-lg"></span>
              </strong>합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/consult"
                className="inline-block bg-accent text-white font-medium px-8 py-3 rounded-md text-lg hover:bg-opacity-90 transition-colors hover:scale-105 transform duration-200 shadow-lg"
              >
                📞 지금 원장 상담 신청하기
              </Link>
              <Link
                href="/curriculum"
                className="inline-block bg-transparent border-2 border-white text-white font-medium px-8 py-3 rounded-md text-lg hover:bg-white hover:text-primary transition-colors"
              >
                커리큘럼 살펴보기
              </Link>
            </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-xl flex items-center justify-center overflow-hidden group perspective">
            {/* 배경 효과 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-black/80 backdrop-blur-sm z-0"></div>
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500 z-0">
              <FireEffect />
            </div>
            
            {/* 스파르탄 로고와 테두리 효과 */}
            <div className="absolute inset-0 border border-accent/30 rounded-xl z-0"></div>
            <div className="absolute -inset-0.5 bg-accent/5 rounded-xl blur-sm z-0 group-hover:bg-accent/10 transition-colors duration-300"></div>
            
            {/* 메인 콘텐츠 */}
            <div className="relative z-10 text-center p-6 w-full transform transition-all duration-700">
              <div className="spartan-logo-container mb-6 relative mx-auto w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-md animate-pulse-slow"></div>
                <span className="relative inline-block text-6xl font-serif font-bold text-accent drop-shadow-glow transform group-hover:scale-110 transition-transform duration-300">S</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif">스파르탄 방식</h2>
              
              {/* 특징 슬라이더 */}
              <div className="relative h-36">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 transform 
                      ${index === activeFeature 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8 pointer-events-none'}`}
                  >
                    <div className="text-4xl mb-2">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm md:text-base">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              {/* 인디케이터 */}
              <div className="flex justify-center gap-2 mt-4">
                {[0, 1, 2].map(i => (
                  <button 
                    key={i}
                    onClick={() => setActiveFeature(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${i === activeFeature ? 'bg-accent w-6' : 'bg-white/50 hover:bg-white/80'}`}
                    aria-label={`특징 ${i+1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 하단 장식 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-10"></div>
    </section>
  );
} 