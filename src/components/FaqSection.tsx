'use client';

import { useState } from 'react';
import { FaChevronDown, FaSearch, FaQuestionCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DiagnosisModal from './DiagnosisTest/DiagnosisModal';

type FaqItemProps = {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  category: string;
};

const FaqItem = ({ question, answer, index, isOpen, onToggle, category }: FaqItemProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-0"
    >
      <div className="flex items-center text-xs text-accent/70 mt-3 mb-1 ml-1">
        <span className="px-2 py-0.5 bg-accent/10 rounded-full mr-2">{category}</span>
      </div>

      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-4 text-left font-medium text-primary hover:text-accent transition-all duration-300 group"
      >
        <div className="flex items-center">
          <span className="inline-block mr-3 text-accent opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <FaQuestionCircle />
          </span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">{question}</span>
        </div>
        <span className={`ml-2 text-accent transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <FaChevronDown />
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="pl-8 pr-4 pb-6 text-gray-600"
            >
              <p className="bg-gray-50 p-4 rounded-lg border-l-4 border-accent/30">{answer}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false);

  const faqs = [
    {
      question: '왜 원장이 직접 우리 아이를 가르치나요?',
      answer: '아이의 영어 실력 향상을 위해서는 깊이 있는 관찰과 맞춤형 지도가 필요합니다. 원장이 직접 가르침으로써 아이의 학습 상황을 정확히 파악하고 최적의 학습 방향을 제시합니다. 자세한 교육 철학은 1:1 상담에서 더 자세히 말씀드리겠습니다.',
      category: '교육 방식'
    },
    {
      question: '우리 아이에게 맞는 학습 계획을 어떻게 세우나요?',
      answer: '무료 진단 테스트와 1:1 상담을 통해 아이의 현재 영어 실력과 취약점을 정확히 파악합니다. 이를 바탕으로 아이의 특성과 목표에 맞는 맞춤형 학습 계획을 설계해 드립니다. 지금 바로 무료 진단을 신청하세요.',
      category: '학습 계획'
    },
    {
      question: '단기간에 우리 아이 영어 성적이 향상될 수 있나요?',
      answer: '영어는 꾸준한 학습이 필요한 과목이지만, 정확한 취약점 분석과 집중적인 맞춤 학습으로 단기간에도 눈에 띄는 향상이 가능합니다. 실제로 많은 학생들이 3개월 이내에 1-2등급 상승을 경험했습니다. 아이의 현재 상황에 대해 상담해 보세요.',
      category: '효과/결과'
    },
    {
      question: '수업료는 얼마인가요?',
      answer: '학습 계획에 따라 맞춤형으로 구성됩니다. 아이의 현재 영어 수준, 목표 등급, 학습 기간 등을 고려하여 최적의 프로그램을 구성해 드립니다. 정확한 수업료는 무료 진단과 상담 후에 안내해 드립니다.',
      category: '수강료'
    },
    {
      question: '타 영어학원과 어떤 차이가 있나요?',
      answer: '①원장의 직접 수업 ②학생별 맞춤형 학습 전략 ③철저한 관리 시스템이 핵심 차별점입니다. 특히 매주 학습 현황을 부모님께 직접 보고드리는 시스템을 운영하고 있어 아이의 학습 상황을 투명하게 확인하실 수 있습니다.',
      category: '교육 방식'
    },
    {
      question: '첫 상담은 어떻게 진행되나요?',
      answer: '첫 상담은 무료로 진행되며, 약 30분 동안 아이의 현재 영어 실력과 학습 성향을 파악합니다. 원하시면 간단한 진단 테스트도 함께 진행할 수 있습니다. 부담 없이 신청해 보세요.',
      category: '상담/등록'
    }
  ];

  const categories = ['전체', ...new Set(faqs.map(faq => faq.category))];

  const handleFaqToggle = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => {
    // 카테고리 필터링
    const categoryMatch = activeCategory === '전체' || faq.category === activeCategory;
    
    // 검색어 필터링
    const searchMatch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" ref={ref}>
      {/* 배경 장식 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/5 rounded-full"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
            <span className="text-accent relative">
              학부모님들이
              <span className="absolute -inset-1 bg-accent/10 -z-10 blur-sm rounded-lg"></span>
            </span> 자주 묻는 질문
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            우리 아이의 영어 실력 향상에 대한 궁금증을 해결해 드립니다
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* 검색창 */}
            <div className="relative w-full md:w-auto flex-1">
              <input 
                type="text" 
                placeholder="질문 검색하기..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    activeCategory === category 
                      ? 'bg-accent text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 overflow-hidden border border-gray-100">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <FaqItem 
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  category={faq.category}
                  index={index}
                  isOpen={openFaqIndex === index}
                  onToggle={() => handleFaqToggle(index)}
                />
              ))
            ) : (
              <div className="py-12 text-center text-gray-500">
                <FaQuestionCircle className="text-4xl mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">검색 결과가 없습니다</p>
                <p>다른 검색어로 다시 시도해보세요.</p>
              </div>
            )}
          </div>
          
          {/* 추가 버튼 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 mb-4">아이의 영어 학습에 대해 더 궁금한 점이 있으신가요?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/consult" 
                className="inline-flex items-center justify-center bg-accent text-white font-medium px-6 py-3 rounded-lg hover:bg-accent/90 transition-all duration-300"
              >
                무료 상담 신청하기
              </a>
              <button
                onClick={() => setIsTestModalOpen(true)}
                className="inline-flex items-center justify-center bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
              >
                영어 진단 테스트 풀기
              </button>
            </div>
          </motion.div>
          
          {/* 진단 테스트 모달 */}
          <DiagnosisModal 
            isOpen={isTestModalOpen} 
            onClose={() => setIsTestModalOpen(false)} 
          />
        </motion.div>
      </div>
    </section>
  );
} 