import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import CtaSection from '@/components/CtaSection';
import { FaGraduationCap, FaAward, FaMedal, FaUserTie, FaChalkboardTeacher, FaBookReader } from 'react-icons/fa';
import InstructorSection from '@/components/InstructorSection';
import FaqSection from '@/components/FaqSection';

export const metadata: Metadata = {
  title: '원장 소개 - 스파르탄 영어학원',
  description: '스파르탄 영어학원 원장의 교육 철학과 프로필을 소개합니다. 우리 아이의 영어 실력 향상을 위한 10년 경력의 전문가',
};

export default function AboutPage() {
  return (
    <div>
      <section className="py-12 md:py-20 bg-primary text-white relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full -ml-48 -mb-48 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-center mb-8">
            우리 아이를 <span className="text-accent">책임지는</span> 원장 소개
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            10년 경력의 영어 교육 전문가가 자녀의 영어 실력 향상을 직접 책임집니다.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24 relative">
        {/* 배경 장식 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl overflow-hidden shadow-2xl">
              <div className="p-8 md:p-10 text-white relative h-full">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/pattern.svg')]"></div>
                <div className="relative z-10">
                  <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                    <span className="text-5xl font-serif font-bold text-white">S</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-6 text-center">Spartan 영어학원 원장</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                        <FaGraduationCap className="text-xl text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold">학력</h3>
                        <p className="text-sm text-white/80">서울대학교 영어교육학과 졸업</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                        <FaUserTie className="text-xl text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold">경력</h3>
                        <p className="text-sm text-white/80">10년+ 영어 교육 및 강의 경력</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                        <FaAward className="text-xl text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold">자격</h3>
                        <p className="text-sm text-white/80">TESOL 자격증, 영어교육 석사</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                        <FaMedal className="text-xl text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold">성과</h3>
                        <p className="text-sm text-white/80">500+ 수강생, 82% 1등급 달성률</p>
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="mt-8 bg-white/10 p-4 rounded-lg italic">
                    "아이의 영어 성적을 책임지는 것은 저의 사명입니다. 우리 아이의 미래를 함께 만들어가겠습니다."
                  </blockquote>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                학부모님께 드리는 <span className="text-accent">약속</span>
              </h2>
              
              <p className="text-gray-700 mb-6">
                안녕하세요, 스파르탄 영어학원 원장입니다. 10년 이상의 영어 교육 경험과 수많은 성공 사례를 바탕으로, 
                <strong className="text-primary"> 자녀분의 영어 실력 향상</strong>을 위해 최선을 다하겠습니다.
              </p>
              
              <p className="text-gray-700 mb-6">
                우리 아이의 영어 학습에 있어 가장 중요한 것은 <strong className="text-primary">개인별 맞춤 학습</strong>입니다. 
                아이마다 다른 학습 성향과 취약점을 정확히 파악하고, 이에 맞는 전략적 학습법을 제시하는 것이 
                스파르탄 영어학원의 핵심 철학입니다.
              </p>
              
              <p className="text-gray-700 mb-6">
                매주 학습 상황을 학부모님께 상세히 공유드리며, 아이의 성장 과정을 함께 지켜보고 
                최적의 방향으로 지도하겠습니다. <strong className="text-primary">결과로 증명하는 영어 교육</strong>을 약속드립니다.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg shadow border-l-4 border-accent">
                  <p className="font-bold text-accent text-xl mb-1">95%</p>
                  <p className="text-sm text-gray-600">학부모 만족도</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow border-l-4 border-accent">
                  <p className="font-bold text-accent text-xl mb-1">10+</p>
                  <p className="text-sm text-gray-600">강의 경력</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow border-l-4 border-accent">
                  <p className="font-bold text-accent text-xl mb-1">500+</p>
                  <p className="text-sm text-gray-600">누적 수강생</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow border-l-4 border-accent">
                  <p className="font-bold text-accent text-xl mb-1">82%</p>
                  <p className="text-sm text-gray-600">1등급 달성률</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/consult"
                  className="inline-block bg-accent text-white font-medium px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors text-center"
                >
                  원장과 1:1 상담 신청하기
                </Link>
                <Link
                  href="/curriculum"
                  className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors text-center"
                >
                  커리큘럼 자세히 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold text-primary text-center mb-8">
            원장 교육 경력 <span className="text-accent">타임라인</span>
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* 중앙 타임라인 선 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
            
            {/* 타임라인 아이템들 */}
            <div className="space-y-12">
              {/* 첫 번째 아이템 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <div className="bg-white p-5 rounded-lg shadow-md inline-block">
                    <h3 className="text-lg font-bold text-primary mb-2">2013년</h3>
                    <p className="text-gray-700">서울대학교 영어교육학과 졸업</p>
                  </div>
                </div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white"></div>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
              
              {/* 두 번째 아이템 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12"></div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                  <div className="bg-white p-5 rounded-lg shadow-md inline-block">
                    <h3 className="text-lg font-bold text-primary mb-2">2014-2017년</h3>
                    <p className="text-gray-700">대형 영어학원에서 강사로 활동</p>
                  </div>
                </div>
              </div>
              
              {/* 세 번째 아이템 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <div className="bg-white p-5 rounded-lg shadow-md inline-block">
                    <h3 className="text-lg font-bold text-primary mb-2">2017-2019년</h3>
                    <p className="text-gray-700">영어교육 석사 취득 및 수능 강의 전문</p>
                  </div>
                </div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white"></div>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
              
              {/* 네 번째 아이템 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12"></div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                  <div className="bg-white p-5 rounded-lg shadow-md inline-block">
                    <h3 className="text-lg font-bold text-primary mb-2">2019-2022년</h3>
                    <p className="text-gray-700">유명 학원 수능영어 총괄 디렉터</p>
                  </div>
                </div>
              </div>
              
              {/* 다섯 번째 아이템 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <div className="bg-white p-5 rounded-lg shadow-md inline-block">
                    <h3 className="text-lg font-bold text-primary mb-2">2022년-현재</h3>
                    <p className="text-gray-700">스파르탄 영어학원 설립 및 운영</p>
                  </div>
                </div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white"></div>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold text-primary text-center mb-12">
            교육 철학
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg border-t-4 border-accent">
              <div className="text-accent text-4xl mb-4 flex justify-center">
                <FaChalkboardTeacher />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 text-center">맞춤형 교육</h3>
              <p className="text-gray-700">
                우리 아이마다 다른 학습 성향과 특성을 존중하는 맞춤형 교육을 제공합니다. 
                일방적인 주입식 교육이 아닌, 아이의 참여를 이끌어내는 교육을 지향합니다.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg border-t-4 border-accent">
              <div className="text-accent text-4xl mb-4 flex justify-center">
                <FaBookReader />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 text-center">실전 중심</h3>
              <p className="text-gray-700">
                실제 시험에 적용할 수 있는 실전 중심의 수업을 진행합니다.
                문제 풀이 전략과 시간 관리 방법 등 실질적인 도움을 주는 교육을 제공합니다.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg border-t-4 border-accent">
              <div className="text-accent text-4xl mb-4 flex justify-center">
                <FaUserTie />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 text-center">책임감</h3>
              <p className="text-gray-700">
                아이의 성적 향상에 대한 책임감을 가지고 수업을 진행합니다.
                원장이 직접 수업을 진행하며 우리 아이의 영어 성적 향상을 책임집니다.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/consult"
              className="inline-block bg-accent text-white font-medium px-8 py-4 rounded-md hover:bg-opacity-90 transition-colors"
            >
              무료 상담 신청하기
            </Link>
          </div>
        </div>
      </section>
      
      <CtaSection />
    </div>
  );
} 