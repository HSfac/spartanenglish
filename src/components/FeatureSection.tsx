'use client';

import { useState } from 'react';
import { FaUserTie, FaTrophy, FaBookOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
};

const FeatureCard = ({ icon, title, description, index, isActive, onClick }: FeatureCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer group ${
        isActive 
          ? 'bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl transform scale-[1.02] z-10' 
          : 'bg-white text-primary hover:shadow-xl z-0'
      }`}
    >
      {/* 배경 패턴 */}
      <div className={`absolute inset-0 bg-[url('/dots.svg')] opacity-10 transition-opacity duration-300 ${
        isActive ? 'opacity-20' : 'opacity-5 group-hover:opacity-10'
      }`}></div>
      
      {/* 하이라이트 효과 */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${
        isActive ? 'bg-accent' : 'bg-transparent group-hover:bg-accent/40'
      }`}></div>
      
      <div className="relative p-8">
        <div className={`text-4xl mb-6 transition-all duration-300 ${
          isActive ? 'text-white' : 'text-accent'
        }`}>
          {icon}
        </div>
        
        <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 ${
          isActive ? 'text-white' : 'text-primary'
        }`}>
          {title}
        </h3>
        
        <p className={`transition-all duration-300 ${
          isActive ? 'text-white/90' : 'text-gray-600'
        }`}>
          {description}
        </p>
        
        {/* 숫자 인디케이터 */}
        <div className={`absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
          isActive ? 'bg-white text-primary' : 'bg-primary/10 text-primary/60'
        }`}>
          {index + 1}
        </div>
      </div>
    </motion.div>
  );
};

export default function FeatureSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const features = [
    {
      icon: <FaUserTie />,
      title: "원장 1:1 책임 교육",
      description: "학원 강사가 아닌 원장이 직접 우리 아이를 가르칩니다. 아이의 실력과 특성을 정확히 파악하여 맞춤형 학습을 제공합니다."
    },
    {
      icon: <FaTrophy />,
      title: "자녀 맞춤 영어 전략",
      description: "수능 영어의 출제 경향을 분석해 아이에게 가장 효율적인 학습 전략을 수립합니다. 암기식이 아닌 이해 중심 학습으로 실력이 쌓입니다."
    },
    {
      icon: <FaBookOpen />,
      title: "성적 향상 집중 시스템",
      description: "실제 시험 기출문제 기반의 학습과 체계적인 관리 시스템으로 아이의 영어 성적이 단계적으로 향상됩니다."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden" ref={ref}>
      {/* 배경 장식 요소 */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mb-48"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
            우리 아이가 <span className="text-accent relative">
              Spartan
              <span className="absolute -inset-1 bg-accent/10 -z-10 blur-sm rounded-lg"></span>
            </span>을 선택해야 하는 이유
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            스파르탄 영어학원이 제공하는 3가지 핵심 학습 시스템으로 자녀의 영어 실력이 달라집니다
          </p>
          
          {/* 진행 상태 인디케이터 */}
          <div className="flex justify-center space-x-2 mt-8">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveFeature(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeFeature ? 'bg-accent w-10' : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Feature ${i+1}`}
              />
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={i}
              isActive={i === activeFeature}
              onClick={() => setActiveFeature(i)}
            />
          ))}
        </div>
        
        {/* 추가 정보 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-primary mb-2">우리 아이의 영어 성적, 결과로 증명합니다</h3>
              <p className="text-gray-600">
                스파르탄만의 차별화된 학습 시스템으로 아이의 영어 실력 향상과 목표 달성을 돕습니다.
              </p>
            </div>
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <span className="text-3xl font-serif font-bold text-primary">S</span>
              </div>
              <div className="text-gray-800">
                <p className="font-bold">스파르탄 정신</p>
                <p className="text-sm text-gray-500">체계적 관리 · 맞춤형 학습 · 실질적 성과</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 