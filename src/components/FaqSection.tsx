'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaQuestionCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

  const faqs = [
    {
      question: '수업은 어떤 방식으로 진행되나요?',
      answer: '1:1 또는 소규모 그룹(최대 3명)으로 진행됩니다. 모든 수업은 원장이 직접 진행하며, 학생의 수준과 목표에 맞춰 맞춤형 수업을 제공합니다.',
      category: '수업방식'
    },
    {
      question: '수업 시간은 어떻게 되나요?',
      answer: '평일 오후 1시부터 10시까지, 주말 오전 10시부터 오후 6시까지 운영됩니다. 학생의 일정에 맞춰 수업 시간을 조율할 수 있습니다.',
      category: '시간/일정'
    },
    {
      question: '수업료는 얼마인가요?',
      answer: '수업 방식(1:1 또는 그룹)과 수업 횟수에 따라 달라집니다. 자세한 내용은 상담을 통해 안내해 드립니다.',
      category: '수강료'
    },
    {
      question: '사용하는 교재는 무엇인가요?',
      answer: '기본적으로 수능 기출문제와 자체 제작 교재를 사용합니다. 학생의 수준과 취약점에 맞춰 추가 교재가 제공될 수 있습니다.',
      category: '수업방식'
    },
    {
      question: '단기간에 영어 성적을 올릴 수 있나요?',
      answer: '영어는 단기간에 극적인 향상을 보기 어려운 과목입니다. 하지만 학생의 취약점을 정확히 파악하고 맞춤형 전략을 제시함으로써 비교적 짧은 시간에 효율적인 성적 향상을 이끌어낼 수 있습니다.',
      category: '효과/결과'
    },
    {
      question: '원장님이 모든 수업을 직접 진행하시나요?',
      answer: '네, 모든 수업은 원장이 직접 진행합니다. 이는 수업의 질을 높이고 학생들의 성적 향상에 직접적인 책임을 지기 위함입니다.',
      category: '강사/원장'
    },
    {
      question: '수업 결석 시 보강이 가능한가요?',
      answer: '사전에 연락 주시면 일정을 조율하여 보강 수업을 진행해 드립니다. 다만, 당일 취소의 경우 보강이 어려울 수 있으니 가능한 미리 연락 부탁드립니다.',
      category: '시간/일정'
    },
    {
      question: '학습 상담은 어떻게 신청하나요?',
      answer: '홈페이지 상담 신청 양식을 통해 신청하시거나, 전화로 직접 문의하실 수 있습니다. 상담은 무료로 진행됩니다.',
      category: '기타'
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
            자주 묻는 <span className="text-accent relative">
              질문들
              <span className="absolute -inset-1 bg-accent/10 -z-10 blur-sm rounded-lg"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            학생과 학부모님들이 자주 물어보시는 질문들을 모았습니다.
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
            <p className="text-gray-600 mb-4">더 궁금한 점이 있으신가요?</p>
            <a 
              href="/consult" 
              className="inline-flex items-center text-primary font-medium border-2 border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              1:1 원장님께 직접 문의하기
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 