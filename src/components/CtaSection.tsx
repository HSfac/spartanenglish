'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight, FaPhoneAlt, FaBook, FaChartLine, FaQuoteRight } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// ThreeJS를 클라이언트 사이드에서만 로드
const ThreeBackground = dynamic(() => import('../components/ThreeBackground'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0" />
});

const GradeChangeGraph = () => {
  const [currentGrade, setCurrentGrade] = useState(3);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5
  });
  
  const x = useMotionValue(0);
  const grade = useTransform(x, [0, 100], [3, 1]);
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        x.set(100);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [inView, x]);
  
  useEffect(() => {
    const unsubscribe = grade.onChange(v => {
      setCurrentGrade(Math.ceil(v));
    });
    
    return unsubscribe;
  }, [grade]);
  
  return (
    <div ref={ref} className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <FaChartLine className="mr-2 text-accent" /> 학생 성적 변화
      </h3>
      
      <div className="relative h-60">
        {/* 그래프 배경 */}
        <div className="absolute inset-0">
          <div className="h-full flex flex-col justify-between">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((grade) => (
              <div key={grade} className="border-b border-white/10 flex items-center">
                <span className="text-xs text-white/50 w-8">{grade}등급</span>
                <div className="flex-grow border-dashed border-t border-white/10 h-0"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 그래프 라인 */}
        <div className="absolute inset-0 mt-12">
          <svg className="w-full h-full">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d="M 0,120 C 50,120 100,100 150,70 C 200,40 250,0 300,0"
              stroke="#ff6b6b"
              strokeWidth="3"
              fill="none"
              className="drop-shadow-[0_0_4px_rgba(255,107,107,0.7)]"
            />
          </svg>
          
          {/* 움직이는 포인트 */}
          <motion.div
            className="absolute top-0 left-0 h-4 w-4 bg-accent rounded-full shadow-[0_0_10px_rgba(255,107,107,0.8)] z-10"
            style={{
              x: useTransform(x, [0, 100], [0, 300]),
              y: useTransform(x, [0, 100], [120, 0])
            }}
          />
        </div>
        
        {/* 현재 등급 표시 */}
        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-accent text-white text-2xl font-bold rounded-lg px-6 py-3 flex items-center"
          style={{
            y: useTransform(x, [0, 100], [0, -40])
          }}
        >
          {currentGrade}등급
        </motion.div>
      </div>
      
      <div className="mt-4 text-white/80 text-sm">
        <p>스파르탄 영어 전략 적용 후 평균 <span className="text-accent font-bold">2등급 상승</span></p>
      </div>
    </div>
  );
};

const TestimonialSlider = () => {
  const testimonials = [
    {
      content: "3등급에서 1등급까지 올라갔어요. 선생님의 전략적인 학습 방법이 정말 도움이 되었습니다.",
      student: "강남고 김○○",
      grade: "1등급 달성"
    },
    {
      content: "문법이 너무 약했는데, 원장님의 전략으로 취약점을 집중 보완해서 2등급이 됐어요!",
      student: "서울고 이○○",
      grade: "4등급 → 2등급"
    },
    {
      content: "수능 직전까지 불안했는데, 마지막 파이널 전략으로 예상보다 높은 점수를 받았습니다.",
      student: "경기고 박○○",
      grade: "3등급 → 1등급"
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5
  });
  
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [inView, testimonials.length]);
  
  return (
    <div ref={ref} className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 min-h-[220px]">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <FaQuoteRight className="mr-2 text-accent" /> 학생 후기
      </h3>
      
      <div className="relative h-32 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <p className="text-white/80 italic mb-4">{testimonials[currentIndex].content}</p>
            <div className="flex justify-between items-end">
              <p className="text-white font-medium">{testimonials[currentIndex].student}</p>
              <span className="text-accent text-sm font-bold">{testimonials[currentIndex].grade}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center space-x-2 mt-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-accent w-4' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function CtaSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
      {/* ThreeJS 배경 */}
      <ThreeBackground />
      
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 z-0 opacity-95"></div>
      
      {/* 배경 그래픽 요소 */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -right-20 top-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      </div>
      
      {/* 주요 내용 */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Spartan과 함께 
              <span className="relative inline-block mx-2">
                변화의 
                <motion.span 
                  initial={{ width: '0%' }}
                  animate={inView ? { width: '100%' } : { width: '0%' }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 h-1 bg-accent rounded-full"
                ></motion.span>
              </span>
              첫걸음을 시작하세요
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              원장이 직접 가르치는 맞춤형 수업으로 영어 실력을 향상시키세요.<br />
              지금 바로 상담 신청하고 무료 진단 테스트를 받아보세요.
            </motion.p>
          </motion.div>
          
          {/* 소개 문구 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-12 text-center border border-white/10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              3등급에서 1등급으로, <span className="text-accent">바뀐 건 전략입니다</span>
            </h3>
            <p className="text-white/80">
              실제 학생들의 성적 변화와 생생한 후기를 확인하세요.
            </p>
          </motion.div>
          
          {/* 성적 변화 그래프와 후기 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            <GradeChangeGraph />
            <TestimonialSlider />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <motion.div 
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/consult"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-medium rounded-xl overflow-hidden shadow-lg hover:shadow-accent/30 transition-shadow duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-accent to-accent/80 transition-all duration-300"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition-all duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white/10 opacity-30 group-hover:rotate-90 ease"></span>
                <span className="relative flex items-center">
                  <FaPhoneAlt className="mr-2" />
                  지금 원장 상담 신청하기
                  <FaArrowRight className="ml-2 text-sm opacity-70 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
            
            <motion.div 
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/about"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium border border-white/20 rounded-xl overflow-hidden hover:bg-white/20 transition-colors duration-300"
              >
                <span className="relative flex items-center">
                  <FaBook className="mr-2" />
                  더 알아보기
                </span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* 부가 정보 카드 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10 hover:bg-white/15 transition-colors">
              <div className="font-bold text-3xl text-white mb-1">95%</div>
              <p className="text-white/70 text-sm">학생 만족도</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10 hover:bg-white/15 transition-colors">
              <div className="font-bold text-3xl text-white mb-1">82%</div>
              <p className="text-white/70 text-sm">1등급 달성률</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10 hover:bg-white/15 transition-colors">
              <div className="font-bold text-3xl text-white mb-1">10년+</div>
              <p className="text-white/70 text-sm">원장 교육 경력</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 