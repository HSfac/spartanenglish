'use client';

import { useState } from 'react';
import { IconType } from 'react-icons';
import { FaClipboardCheck, FaChartLine, FaBookReader, FaComments } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';

type ProcessStepProps = {
  icon: IconType;
  title: string;
  description: string;
  step: number;
  isActive: boolean;
  onClick: () => void;
};

const ProcessStep = ({ icon: Icon, title, description, step, isActive, onClick }: ProcessStepProps) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
    className={`relative cursor-pointer group ${isActive ? 'z-10' : 'z-0'}`}
    onClick={onClick}
  >
    <div className={`relative p-6 rounded-xl transition-all duration-300 ${
      isActive 
        ? 'bg-primary text-white shadow-xl' 
        : 'bg-white text-primary hover:bg-gray-50 shadow'
    }`}>
      <div className="flex items-center mb-4">
        <div className={`flex items-center justify-center h-14 w-14 rounded-full text-2xl mr-4 transition-all duration-300 ${
          isActive ? 'bg-white text-primary' : 'bg-primary/10 text-primary'
        }`}>
          <Icon />
        </div>
        <div className={`absolute -left-3 -top-3 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
          isActive ? 'bg-accent text-white' : 'bg-gray-200 text-gray-700'
        }`}>
          {step}
        </div>
        <h3 className={`text-xl font-bold transition-all duration-300 ${
          isActive ? 'text-white' : 'text-primary'
        }`}>
          {title}
        </h3>
      </div>
      <p className={`ml-16 transition-all duration-300 ${
        isActive ? 'text-white/90' : 'text-gray-600'
      }`}>
        {description}
      </p>
    </div>
    {/* 연결선 */}
    {step < 4 && (
      <div className="hidden md:block absolute h-12 w-1 bg-gray-200 left-[28px] -bottom-12"></div>
    )}
  </motion.div>
);

// 프로세스 설명 데이터
const processSteps = [
  {
    icon: FaClipboardCheck,
    title: "수준 진단 테스트",
    description: "학생의 현재 영어 실력을 정확히 진단하여 강점과 약점을 파악합니다. 이를 통해 맞춤형 학습 계획을 수립합니다.",
    step: 1,
  },
  {
    icon: FaChartLine,
    title: "학습 전략 설계",
    description: "진단 결과를 바탕으로 학생별 맞춤형 학습 전략을 설계합니다. 수능 영어에 최적화된 접근법을 제시합니다.",
    step: 2,
  },
  {
    icon: FaBookReader,
    title: "1:1 집중 수업",
    description: "원장이 직접 1:1로 집중 수업을 진행합니다. 학생의 이해도를 실시간으로 확인하며 수업을 진행합니다.",
    step: 3,
  },
  {
    icon: FaComments,
    title: "주간 피드백 및 조정",
    description: "주간 단위로 학습 성과를 검토하고 피드백을 제공합니다. 필요한 경우 학습 전략을 조정합니다.",
    step: 4,
  }
];

export default function CurriculumSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" ref={ref}>
      {/* 배경 장식 */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/5 rounded-full"></div>
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent/5 rounded-full"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
            수준 진단 → 맞춤 설계 → <span className="text-accent">집중 수업</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            스파르탄 영어학원만의 체계적인 프로세스로 학생 맞춤형 수업을 진행합니다.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1"
          >
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-4">맞춤형 학습 프로세스</h3>
              <p className="text-gray-600 mb-6">
                스파르탄 영어학원은 학생 개개인의 특성과 현재 실력을 정확히 파악하고, 
                맞춤형 학습 전략을 수립하여 가장 효율적인 방법으로 결과를 만들어냅니다.
              </p>
              <div className="flex space-x-2 mb-4">
                {[1, 2, 3, 4].map(step => (
                  <button
                    key={step}
                    onClick={() => setActiveStep(step)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      step === activeStep ? 'bg-accent w-8' : 'bg-gray-200 w-3 hover:bg-gray-300'
                    }`}
                    aria-label={`Step ${step}`}
                  />
                ))}
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                <p className="text-primary font-medium">
                  현재 보고계신 단계: <span className="text-accent font-bold">{processSteps[activeStep-1].title}</span>
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex-1 relative h-80 md:h-96 w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
              <div className="relative p-8 h-full flex flex-col justify-center">
                <span className="text-5xl text-white/30 font-bold mb-4">0{activeStep}</span>
                <h3 className="text-2xl font-bold text-white mb-3">{processSteps[activeStep-1].title}</h3>
                <p className="text-white/80">{processSteps[activeStep-1].description}</p>
                <div className="absolute bottom-8 right-8 text-5xl text-white/20">
                  {React.createElement(processSteps[activeStep-1].icon)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {processSteps.map((step) => (
            <motion.div key={step.step} variants={itemVariants}>
              <ProcessStep
                {...step}
                isActive={step.step === activeStep}
                onClick={() => setActiveStep(step.step)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 