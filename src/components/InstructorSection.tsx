'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUserGraduate, FaChartLine, FaUsers } from 'react-icons/fa';

export default function InstructorSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const statItems = [
    { icon: <FaUserGraduate />, value: "95%", label: "학생 만족도" },
    { icon: <FaGraduationCap />, value: "10+", label: "강의 경력" },
    { icon: <FaUsers />, value: "500+", label: "누적 수강생" },
    { icon: <FaChartLine />, value: "82%", label: "1등급 달성률" }
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden" ref={ref}>
      {/* 장식 요소 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mb-32 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
            <span className="text-accent relative">
              우리 아이의 영어 성적
              <span className="absolute -inset-1 bg-accent/10 -z-10 blur-sm rounded-lg"></span>
            </span>을 책임집니다
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            일반 강사가 아닌 원장이 직접 자녀를 지도합니다. 아이의 성적 향상을 제가 직접 책임지겠습니다.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
          >
            <div className="relative h-[28rem] bg-gradient-to-br from-primary/80 to-primary/95 flex items-center justify-center p-8">
              <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/40 via-transparent to-transparent"></div>
              
              <div className="text-center text-white z-10">
                <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl font-serif font-bold text-white">S</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Spartan 영어학원 원장</h3>
                <p className="text-gray-200 max-w-md">
                  학부모님께 드리는 약속: 10년간의 수능 영어 지도 경험으로 아이의 영어 성적 향상을 위해 끝까지 책임지고 지도하겠습니다.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">
              500명 이상의 학생들이 검증한 학습 시스템
            </h3>
            <p className="text-gray-700 mb-8">
              지난 10년간 500명 이상의 학생들이 저의 지도 아래 목표 성적을 달성했습니다.
              우리 아이의 영어 학습 성향과 특성을 정확히 파악하여 맞춤형 학습 계획을 설계하고
              성적 향상까지 함께 하겠습니다.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {statItems.map((item, i) => (
                <motion.div 
                  key={i}
                  custom={i}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-accent group hover:bg-accent/5 transition-colors duration-300"
                >
                  <div className="flex items-center mb-2">
                    <div className="text-accent group-hover:text-accent/80 transition-colors duration-300 mr-3">
                      {item.icon}
                    </div>
                    <p className="font-bold text-accent group-hover:text-accent/90 transition-colors duration-300 text-2xl">{item.value}</p>
                  </div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary"
            >
              <p className="text-gray-700 italic">
                "학부모님께 약속드립니다. <span className="font-medium">제가 직접 가르치고, 아이의 영어 성적을 책임지겠습니다.</span> 믿고 맡겨주신다면 반드시 결과로 보답하겠습니다."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 