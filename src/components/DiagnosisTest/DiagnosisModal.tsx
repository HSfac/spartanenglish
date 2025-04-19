'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowRight, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { getRandomQuestions } from './testQuestions';
import { calculateScore, evaluateLevel, generateRecommendation, analyzeWrongAnswers } from './util';
import { createSupabaseClient } from '@/utils/supabase/client';

// 타입 정의
type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type TestResult = {
  testType: 'middle' | 'high';
  score: number;
  feedback: string;
  questions: Question[];
  userAnswers: number[];
  level: string;
  recommendation: string;
};

type DiagnosisModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DiagnosisModal({ isOpen, onClose }: DiagnosisModalProps) {
  const supabase = createSupabaseClient();
  
  // 상태 관리
  const [step, setStep] = useState<'start' | 'test' | 'result' | 'form'>('start');
  const [testType, setTestType] = useState<'middle' | 'high' | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [contact, setContact] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    privacyAgreement: false, 
    marketingAgreement: false 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // 현재 테스트 질문 가져오기
  const currentQuestion = questions[currentQuestionIndex];
  
  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('start');
        setTestType(null);
        setCurrentQuestionIndex(0);
        setQuestions([]);
        setUserAnswers([]);
        setSelectedOption(null);
        setTestResult(null);
        setContact({ name: '', phone: '', email: '', privacyAgreement: false, marketingAgreement: false });
        setIsSubmitting(false);
        setSubmitSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  // 테스트 시작 핸들러
  const handleStartTest = (type: 'middle' | 'high') => {
    // 테스트 타입 설정
    setTestType(type);
    
    // 랜덤으로 5개 문제 선택
    const selectedQuestions = getRandomQuestions(type);
    setQuestions(selectedQuestions);
    
    // 사용자 답변 배열 초기화
    setUserAnswers(Array(selectedQuestions.length).fill(-1));
    
    // 테스트 화면으로 이동
    setStep('test');
  };

  // 다음 문제로 이동
  const handleNextQuestion = () => {
    // 현재 답변 저장
    if (selectedOption !== null) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = selectedOption;
      setUserAnswers(newAnswers);
    }
    
    // 다음 문제로 이동 또는 결과 계산
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(userAnswers[currentQuestionIndex + 1] !== -1 ? userAnswers[currentQuestionIndex + 1] : null);
    } else {
      calculateTestResult();
    }
  };

  // 이전 문제로 이동
  const handlePrevQuestion = () => {
    // 현재 답변 저장
    if (selectedOption !== null) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = selectedOption;
      setUserAnswers(newAnswers);
    }
    
    // 이전 문제로 이동
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(userAnswers[currentQuestionIndex - 1]);
    }
  };

  // 결과 계산
  const calculateTestResult = () => {
    if (!testType) return;
    
    // 답변을 id 기반 객체로 변환
    const answersById: Record<number, number> = {};
    userAnswers.forEach((answer, index) => {
      answersById[questions[index].id] = answer;
    });
    
    // 점수 계산
    const scoreData = calculateScore(answersById, testType);
    
    // 수준 평가
    const level = evaluateLevel(scoreData.score);
    
    // 추천사항 생성
    const recommendation = generateRecommendation(scoreData.score, testType);
    
    // 피드백 생성
    let feedback = '';
    if (scoreData.correctCount === questions.length) {
      feedback = "모든 문제를 맞추셨습니다! 실전형 문제풀이 수업을 추천합니다.";
    } else if (scoreData.correctCount >= Math.floor(questions.length * 0.6)) {
      feedback = "기초는 안정적입니다. 유형별 문제 훈련이 필요합니다.";
    } else {
      feedback = "기초 문법/독해 정리부터 다시 시작하는 것이 좋습니다.";
    }
    
    // 결과 설정
    setTestResult({
      testType,
      score: scoreData.correctCount,
      feedback,
      questions,
      userAnswers,
      level,
      recommendation
    });
    
    // 결과 화면으로 이동
    setStep('result');
  };

  // 상담 신청
  const handleSubmitConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testResult) return;
    
    setIsSubmitting(true);
    
    try {
      // Supabase에 진단 결과 저장
      const { error: diagnosisError } = await supabase
        .from('diagnosis_results')
        .insert({
          test_type: testResult.testType,
          score: testResult.score,
          feedback: testResult.feedback,
          level: testResult.level,
          recommendation: testResult.recommendation,
          contact_name: contact.name,
          contact_phone: contact.phone,
          contact_email: contact.email,
          privacy_agreement: contact.privacyAgreement,
          marketing_agreement: contact.marketingAgreement,
          converted_to_consult: true,
          created_at: new Date().toISOString()
        });
      
      if (diagnosisError) throw diagnosisError;
      
      // 상담 요청 저장 (관리자 대시보드용)
      const { error: consultError } = await supabase
        .from('consultations')
        .insert({
          name: contact.name,
          contact: contact.phone,
          email: contact.email,
          message: `진단 테스트 결과: ${testResult.testType === 'middle' ? '중등' : '고등'} - ${testResult.score}문제 정답. 수준: ${testResult.level}. ${testResult.recommendation}`,
          privacy_agreement: contact.privacyAgreement,
          marketing_agreement: contact.marketingAgreement,
          status: '대기중',
          date: new Date().toISOString(),
        });
      
      if (consultError) throw consultError;

      // 이메일 발송을 위한 서버리스 함수 호출 (선택사항)
      try {
        await fetch('/api/send-consultation-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: contact.name,
            contact: contact.phone,
            email: contact.email,
            testType: testResult.testType,
            score: testResult.score,
            level: testResult.level,
            recommendation: testResult.recommendation
          }),
        });
      } catch (emailError) {
        console.error('이메일 발송 중 오류:', emailError);
        // 이메일 발송 실패해도 전체 프로세스는 계속 진행
      }
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error('상담 신청 중 오류 발생:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
        >
          {/* 모달 헤더 */}
          <div className="sticky top-0 z-10 flex justify-between items-center p-5 border-b bg-white rounded-t-xl">
            <h2 className="text-xl font-bold text-gray-800">
              {step === 'start' ? '영어 실력 진단 테스트' : 
               step === 'test' ? `문제 ${currentQuestionIndex + 1}/${questions.length}` : 
               step === 'result' ? '진단 결과' : '상담 신청'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          
          {/* 모달 내용 */}
          <div className="p-6">
            {/* 시작 화면 */}
            {step === 'start' && (
              <div className="space-y-6">
                <p className="text-gray-700">
                  간단한 진단 테스트를 통해 영어 실력을 확인해보세요. 약 3~5분 정도 소요됩니다.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">테스트 안내</h3>
                  <ul className="list-disc pl-5 space-y-1 text-blue-700">
                    <li>총 5문제의 객관식 문제가 제공됩니다.</li>
                    <li>독해 및 문법 실력을 진단합니다.</li>
                    <li>테스트 결과를 통해 맞춤형 학습 방향을 제안해드립니다.</li>
                  </ul>
                </div>
                
                <p className="font-medium text-gray-700 text-center">학년을 선택해주세요</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleStartTest('middle')}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg transition-colors font-medium flex flex-col items-center"
                  >
                    <span className="text-xl mb-1">중학생</span>
                    <span className="text-sm text-blue-100">1-3학년</span>
                  </button>
                  
                  <button
                    onClick={() => handleStartTest('high')}
                    className="bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-lg transition-colors font-medium flex flex-col items-center"
                  >
                    <span className="text-xl mb-1">고등학생</span>
                    <span className="text-sm text-green-100">1-3학년</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* 테스트 화면 */}
            {step === 'test' && testType && currentQuestion && (
              <div className="space-y-6">
                <div className="mb-8">
                  {/* 진행 상태 표시 */}
                  <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* 문제 */}
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">{currentQuestion.question}</h3>
                    
                    {/* 선택지 */}
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <div 
                          key={index}
                          onClick={() => setSelectedOption(index)}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedOption === index 
                              ? 'bg-primary/10 border-primary' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                              selectedOption === index 
                                ? 'bg-primary text-white' 
                                : 'bg-white border border-gray-300'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="text-black">{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* 네비게이션 버튼 */}
                <div className="flex justify-between">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaArrowLeft className="mr-2" />
                    이전
                  </button>
                  
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedOption === null}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {currentQuestionIndex < questions.length - 1 ? (
                      <>
                        다음
                        <FaArrowRight className="ml-2" />
                      </>
                    ) : (
                      '결과 확인하기'
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {/* 결과 화면 */}
            {step === 'result' && testResult && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5 text-center mb-6">
                  <div className="font-bold text-3xl text-primary mb-2">
                    {testResult.score} / {testResult.questions.length}
                  </div>
                  <div className="mb-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      testResult.level === '상' ? 'bg-blue-100 text-blue-800' :
                      testResult.level === '중' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {testResult.level}급
                    </span>
                  </div>
                  <p className="text-xl text-gray-700 mb-2">
                    {testResult.feedback}
                  </p>
                  <p className="text-gray-600 text-sm border-t border-gray-200 pt-3 mt-3">
                    {testResult.recommendation}
                  </p>
                </div>
                
                {/* 문제 해설 */}
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-gray-800">문제 해설</h3>
                  
                  {testResult.questions.map((question, index) => {
                    const isCorrect = testResult.userAnswers[index] === question.answer;
                    
                    return (
                      <div 
                        key={index}
                        className={`border rounded-lg overflow-hidden ${
                          isCorrect ? 'border-green-200' : 'border-red-200'
                        }`}
                      >
                        <div className={`p-4 ${
                          isCorrect ? 'bg-green-50' : 'bg-red-50'
                        }`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">문제 {index + 1}</span>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {isCorrect ? '정답' : '오답'}
                            </span>
                          </div>
                          <p className="text-gray-800">{question.question}</p>
                        </div>
                        
                        <div className="p-4 border-t border-gray-200">
                          <div className="mb-2">
                            <span className="font-medium">내 답안:</span> {String.fromCharCode(65 + testResult.userAnswers[index])}. {question.options[testResult.userAnswers[index]]}
                          </div>
                          
                          {!isCorrect && (
                            <div className="mb-2 text-green-700">
                              <span className="font-medium">정답:</span> {String.fromCharCode(65 + question.answer)}. {question.options[question.answer]}
                            </div>
                          )}
                          
                          <div className="mt-3 text-gray-700 bg-gray-50 p-3 rounded">
                            <span className="font-medium">해설:</span> {question.explanation}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* 상담신청 CTA */}
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mt-8">
                  <h3 className="font-bold text-xl text-blue-800 mb-2">맞춤 수업 제안받기</h3>
                  <p className="text-blue-700 mb-4">
                    진단 결과를 바탕으로 학생에게 맞는 수업 계획을 받아보세요.
                    간단한 정보를 입력하시면 24시간 이내에 전문 선생님이 연락드립니다.
                  </p>
                  
                  <button
                    onClick={() => setStep('form')}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    무료 상담 신청하기
                  </button>
                </div>
              </div>
            )}
            
            {/* 상담 신청 폼 */}
            {step === 'form' && (
              <div className="space-y-6">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">상담 신청이 완료되었습니다</h3>
                    <p className="text-gray-600 mb-6">
                      24시간 이내에 입력하신 연락처로 연락드리겠습니다.
                      진단 결과를 바탕으로 최적의 학습 계획을 제안해드립니다.
                    </p>
                    <button
                      onClick={onClose}
                      className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      닫기
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitConsultation} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        이름
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        placeholder="학생 이름 또는 학부모 이름"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        연락처
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        placeholder="010-0000-0000"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        이메일
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        placeholder="선택 사항"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="privacyAgreement"
                          required
                          checked={contact.privacyAgreement}
                          onChange={(e) => setContact({ ...contact, privacyAgreement: e.target.checked })}
                          className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="privacyAgreement" className="ml-2 block text-sm text-gray-700">
                          <span className="font-medium">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                        </label>
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="marketingAgreement"
                          checked={contact.marketingAgreement}
                          onChange={(e) => setContact({ ...contact, marketingAgreement: e.target.checked })}
                          className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="marketingAgreement" className="ml-2 block text-sm text-gray-700">
                          <span className="font-medium">[선택]</span> 마케팅 정보 수신에 동의합니다.
                        </label>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-700">
                      <p>
                        ✓ 입력하신 개인정보는 상담 목적으로만 사용됩니다.
                      </p>
                      <p>
                        ✓ 진단 테스트 결과는 상담에 참고됩니다.
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-70 flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            처리 중...
                          </>
                        ) : (
                          '상담 신청하기'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 