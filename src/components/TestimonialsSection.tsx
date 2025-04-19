'use client';

import Image from 'next/image';
import { FaQuoteLeft, FaStar, FaChartLine, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Link from 'next/link';
import DiagnosisModal from './DiagnosisTest/DiagnosisModal';

type TestimonialCardProps = {
  name: string;
  grade: string;
  result: string;
  content: string;
  image?: string;
  index: number;
};

const TestimonialCard = ({ name, grade, result, content, image, index }: TestimonialCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-xl relative transform transition-transform duration-300 hover:shadow-2xl"
    >
      <div className="text-accent text-3xl mb-4 opacity-20 absolute top-6 left-6">
        <FaQuoteLeft />
      </div>
      
      <div className="pl-8 pt-8">
        <p className="text-gray-700 mb-6 relative">
          <span className="text-primary font-bold text-lg">"</span>
          {content}
          <span className="text-primary font-bold text-lg">"</span>
        </p>
        
        <div className="flex items-center border-t border-gray-100 pt-4">
          {image ? (
            <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4 border-2 border-primary/10">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary font-bold mr-4">
              {name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-bold text-primary">{name}</p>
            <p className="text-sm text-gray-500">{grade}</p>
            <div className="flex items-center mt-1">
              <span className="text-accent font-medium text-sm mr-2">{result}</span>
              <span className="text-accent text-xs">
                <FaChartLine />
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 bg-accent text-white px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg">
        VERIFIED
      </div>
    </motion.div>
  );
};

const ResultBox = ({ before, after, subject, index }: { before: string; after: string; subject: string, index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-accent group hover:bg-gray-50 transition-all duration-300"
    >
      <p className="text-sm text-gray-500 mb-2">{subject}</p>
      <div className="flex items-center">
        <span className="text-gray-700">{before}</span>
        <motion.span 
          initial={{ width: 0 }}
          animate={inView ? { width: 'auto' } : { width: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
          className="mx-3 h-0.5 w-12 bg-gradient-to-r from-primary/40 to-accent"
        ></motion.span>
        <span className="text-xl font-bold text-accent">{after}</span>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [activeTab, setActiveTab] = useState(0);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  
  const testimonials = [
    {
      name: "김OO 학부모님",
      grade: "고3 수험생 학부모",
      result: "3등급 → 1등급",
      content: "영어 성적이 항상 고민이었는데, 원장님께서 우리 아이 특성에 맞는 맞춤형 전략을 제시해주셨어요. 아이의 영어 성적이 3등급에서 1등급으로 올랐고, 무엇보다 아이가 영어에 자신감을 가지게 되었습니다."
    },
    {
      name: "이OO 학부모님",
      grade: "고2 학생 학부모",
      result: "70점 → 92점",
      content: "다른 학원에서는 느껴보지 못한 원장님의 책임감이 인상적이었습니다. 매주 자녀의 학습 상황을 상세히 알려주시고, 꾸준한 관리로 모의고사 점수가 크게 향상되었어요. 아이도 영어 수업을 즐겁게 다닙니다."
    },
    {
      name: "박OO 학부모님",
      grade: "고3 학생 학부모",
      result: "4등급 → 2등급",
      content: "원장님이 직접 가르치신다는 점이 가장 큰 장점입니다. 우리 아이의 취약점을 정확히 파악하고 맞춤형 학습으로 단기간에 영어 성적이 2등급이나 향상되었습니다. 학부모로서 정말 만족스러운 결과입니다."
    }
  ];
  
  const resultBoxes = [
    { before: "3등급", after: "1등급", subject: "수능 영어" },
    { before: "4등급", after: "2등급", subject: "수능 영어" },
    { before: "70점", after: "92점", subject: "중간고사" },
    { before: "65점", after: "88점", subject: "기말고사" }
  ];
  
  const tabs = ["학생 후기", "성적 변화"];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50" ref={ref}>
      {/* 배경 장식 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-accent/5 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
            우리 아이도 <span className="text-accent relative">
              영어 성적 상승
              <span className="absolute -inset-1 bg-accent/10 -z-10 blur-sm rounded-lg"></span>
            </span>을 경험하실 수 있습니다
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            실제 학부모님들의 생생한 후기와 아이들의 눈에 띄는 성적 변화를 확인하세요.
          </p>
        </motion.div>

        {/* 탭 선택 */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === index 
                    ? 'bg-white text-primary shadow-md' 
                    : 'text-gray-500 hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 학생 후기 탭 */}
        <div className={`transition-all duration-300 ${activeTab === 0 ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard 
                key={i}
                name={testimonial.name}
                grade={testimonial.grade}
                result={testimonial.result}
                content={testimonial.content}
                index={i}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 bg-primary/5 p-6 rounded-xl text-center"
          >
            <p className="text-primary mb-4">학부모님들이 평가한 만족도</p>
            <div className="flex justify-center items-center gap-1">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <FaStar key={i} className="text-accent text-2xl" />
              ))}
            </div>
            <p className="font-bold text-2xl mt-2">4.9/5.0</p>
            
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/consult"
                className="inline-flex items-center justify-center bg-accent text-white font-medium px-6 py-3 rounded-lg hover:bg-accent/90 transition-all duration-300"
              >
                무료 상담 신청하기
              </Link>
              <button
                onClick={() => setIsTestModalOpen(true)}
                className="inline-flex items-center justify-center bg-white border border-primary text-primary font-medium px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                영어 진단 테스트 풀기
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* 진단 테스트 모달 */}
        <DiagnosisModal 
          isOpen={isTestModalOpen} 
          onClose={() => setIsTestModalOpen(false)} 
        />
        
        {/* 성적 변화 탭 */}
        <div className={`transition-all duration-300 ${activeTab === 1 ? 'block' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={inView && activeTab === 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.7 }}
              className="flex-1"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <FaChartLine className="mr-2 text-accent" /> 점수 변화 사례
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resultBoxes.map((result, i) => (
                    <ResultBox 
                      key={i} 
                      before={result.before} 
                      after={result.after} 
                      subject={result.subject}
                      index={i}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <FaGraduationCap className="mr-2 text-accent" /> 등급 향상 비율
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-gray-100 h-7 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={inView && activeTab === 1 ? { width: '78%' } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-accent rounded-full"
                    ></motion.div>
                  </div>
                  <span className="font-bold text-accent">78%</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  수강생 중 78%가 한 학기 내에 1등급 이상 향상
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView && activeTab === 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex-1"
            >
              <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] opacity-10"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-6">성적 향상의 비결</h3>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0">
                        <span className="font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">체계적인 진단</h4>
                        <p className="text-white/80 text-sm">
                          학생별 정확한 현재 수준 파악 및 맞춤형 학습 설계
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0">
                        <span className="font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">원장 직강 시스템</h4>
                        <p className="text-white/80 text-sm">
                          10년 이상의 전문가가 직접 수업하는 차별화된 방식
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0">
                        <span className="font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">데이터 기반 피드백</h4>
                        <p className="text-white/80 text-sm">
                          주간 단위 성과 측정 및 학습 전략 최적화
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-white/10 rounded-lg">
                    <p className="text-center italic">
                      "스파르탄 영어학원의 시스템은 과학적이고 체계적입니다. 
                      학생 개개인에게 맞는 학습법을 제시하고, 
                      끝까지 책임지는 자세로 임합니다."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 