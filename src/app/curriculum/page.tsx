'use client';

import Link from 'next/link';
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaRegLightbulb, FaChartLine, FaCheckCircle, FaClock, FaCalendarAlt, FaUsers, FaUserCog } from 'react-icons/fa';
import CtaSection from '@/components/CtaSection';
import Image from 'next/image';
import DiagnosisModal from '@/components/DiagnosisTest/DiagnosisModal';
import { useState } from 'react';

const CurriculumCard = ({ title, description, icon, features, isRecommended = false }: { 
  title: string; 
  description: string;
  icon: React.ReactNode;
  features: string[];
  isRecommended?: boolean;
}) => (
  <div className={`bg-white p-6 rounded-lg shadow-lg border-t-4 ${isRecommended ? 'border-accent relative' : 'border-primary'}`}>
    {isRecommended && (
      <div className="absolute top-0 right-0 bg-accent text-white px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg">
        추천
      </div>
    )}
    <div className={`text-4xl mb-4 ${isRecommended ? 'text-accent' : 'text-primary'}`}>{icon}</div>
    <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className={`mr-2 text-${isRecommended ? 'accent' : 'primary'}`}>
            <FaCheckCircle className="text-accent" />
          </span>
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function CurriculumPage() {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  
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
            우리 아이 <span className="text-accent">맞춤형</span> 수업 안내
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            원장이 직접 진행하는 1:1 맞춤 수업으로 확실한 성적 향상을 경험하세요
          </p>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setIsTestModalOpen(true)}
              className="bg-accent text-white font-medium px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              무료 진단 테스트 시작하기
            </button>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 relative">
        {/* 배경 장식 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">SPARTAN 수업 특징</span>
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">
              스파르탄 영어학원만의 <span className="text-accent">차별화된</span> 수업 시스템
            </h2>
            <p className="text-gray-700">
              스파르탄 영어학원은 우리 아이의 영어 학습 성향과 현재 실력을 정밀하게 진단하고, 그에 맞는 맞춤형 학습 전략을 제시합니다.
              원장이 직접 수업을 진행하며, 아이의 성적 향상을 위해 철저한 관리 시스템을 운영합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-accent hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                <FaRegLightbulb />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2 text-center">정밀 진단</h3>
              <p className="text-gray-600 text-center">
                영어 실력과 학습 성향을 정확히 진단하여 맞춤형 학습 설계
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-accent hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                <FaUserCog />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2 text-center">개인 맞춤 설계</h3>
              <p className="text-gray-600 text-center">
                학생별 취약점과 목표에 맞는 전략적 커리큘럼 제공
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-accent hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                <FaChalkboardTeacher />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2 text-center">원장 직강</h3>
              <p className="text-gray-600 text-center">
                10년 경력의 원장이 모든 수업 직접 진행
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-accent hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                <FaChartLine />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2 text-center">주간 피드백</h3>
              <p className="text-gray-600 text-center">
                학부모님께 정기적인 학습 현황과 성장 보고
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg mb-16">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              우리 아이 단계별 <span className="text-accent">성적 향상</span> 프로세스
            </h3>
            
            <div className="relative">
              {/* 연결선 */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-lg shadow relative z-10">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto -mt-10 mb-4 border-4 border-white">1</div>
                  <h4 className="text-lg font-bold text-primary mb-2 text-center">무료 진단 테스트</h4>
                  <p className="text-gray-600 text-sm text-center">
                    현재 영어 실력과 학습 성향 파악
                  </p>
                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => setIsTestModalOpen(true)}
                      className="text-sm text-accent font-medium hover:underline"
                    >
                      지금 시작하기 →
                    </button>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow relative z-10">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto -mt-10 mb-4 border-4 border-white">2</div>
                  <h4 className="text-lg font-bold text-primary mb-2 text-center">맞춤형 학습 계획</h4>
                  <p className="text-gray-600 text-sm text-center">
                    아이에게 최적화된 학습 전략 수립
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow relative z-10">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto -mt-10 mb-4 border-4 border-white">3</div>
                  <h4 className="text-lg font-bold text-primary mb-2 text-center">원장 1:1 집중 수업</h4>
                  <p className="text-gray-600 text-sm text-center">
                    체계적인 학습 및 실시간 피드백
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow relative z-10">
                  <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto -mt-10 mb-4 border-4 border-white">4</div>
                  <h4 className="text-lg font-bold text-primary mb-2 text-center">성적 향상 관리</h4>
                  <p className="text-gray-600 text-sm text-center">
                    정기적인 성과 측정 및 학습 최적화
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="font-serif text-3xl font-bold text-primary text-center mb-12">
            우리 아이 <span className="text-accent">맞춤형</span> 커리큘럼
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <CurriculumCard 
              title="중학생 과정"
              description="중학교 내신 및 영어 기초를 탄탄히 다지는 과정입니다."
              icon={<FaUserGraduate />}
              features={[
                "중학교 내신 대비 맞춤 학습",
                "기초 문법 및 어휘력 강화",
                "영어 독해 기초 다지기",
                "학교별 특성에 맞춘 학습 전략",
                "주 2회 수업 + 주간 테스트"
              ]}
            />
            
            <CurriculumCard 
              title="고등학생 과정"
              description="내신과 수능을 동시에 대비하는 체계적인 학습 과정입니다."
              icon={<FaChalkboardTeacher />}
              features={[
                "내신과 수능 병행 학습 전략",
                "개념 이해 중심의 깊이있는 학습",
                "유형별 문제 해결 능력 강화",
                "학교별 내신 완벽 대비",
                "주 2-3회 수업 + 주간 테스트"
              ]}
              isRecommended={true}
            />
            
            <CurriculumCard 
              title="수능 집중 과정"
              description="수능을 앞둔 학생들을 위한 맞춤형 집중 과정입니다."
              icon={<FaBook />}
              features={[
                "수능 기출 분석 및 예상 문제 대비",
                "취약 유형 집중 보완",
                "시간 관리 및 실전 문제 훈련",
                "주간 모의고사 및 1:1 피드백",
                "주 3회 수업 + 특별 관리"
              ]}
            />
          </div>
          
          <div className="bg-primary/5 p-8 rounded-xl mb-16">
            <h3 className="text-2xl font-bold text-primary mb-6">수업 진행 이미지</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="aspect-video bg-gray-200 rounded relative mb-4">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    [1:1 맞춤 수업 이미지]
                  </div>
                </div>
                <h4 className="font-bold text-primary mb-2">1:1 맞춤 수업</h4>
                <p className="text-gray-600 text-sm">
                  원장이 직접 진행하는 1:1 맞춤 수업으로 효율적인 학습 진행
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="aspect-video bg-gray-200 rounded relative mb-4">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    [소규모 그룹 수업 이미지]
                  </div>
                </div>
                <h4 className="font-bold text-primary mb-2">소규모 그룹 수업 (최대 3명)</h4>
                <p className="text-gray-600 text-sm">
                  비슷한 수준의 학생들과 함께하는 상호작용이 활발한 소그룹 수업
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-primary text-center mb-8">
              수업 운영 안내
            </h2>
            
            <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4 text-accent text-2xl">
                    <FaClock />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-3">수업 시간</h3>
                    <p className="text-gray-700 mb-2">
                      • 평일: 오후 1시 ~ 오후 10시
                    </p>
                    <p className="text-gray-700">
                      • 주말: 오전 10시 ~ 오후 6시
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4 text-accent text-2xl">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-3">수업 일정</h3>
                    <p className="text-gray-700 mb-2">
                      • 주 2-3회 정규 수업
                    </p>
                    <p className="text-gray-700">
                      • 월별 학습 계획에 따른 진행
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4 text-accent text-2xl">
                    <FaUsers />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-3">수업 방식</h3>
                    <p className="text-gray-700 mb-2">
                      • 1:1 개인 맞춤 수업
                    </p>
                    <p className="text-gray-700 mb-2">
                      • 소규모 그룹 수업 (최대 3명)
                    </p>
                    <p className="text-gray-700">
                      • 모든 수업은 원장이 직접 진행
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4 text-accent text-2xl">
                    <FaBook />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-3">사용 교재</h3>
                    <p className="text-gray-700 mb-2">
                      • 학생 맞춤형 교재 및 자체 제작 자료
                    </p>
                    <p className="text-gray-700">
                      • 내신 및 수능 대비 전문 교재
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
                  <FaChartLine className="mr-2 text-accent" /> 수업료 안내
                </h3>
                <p className="text-gray-700 mb-4">
                  스파르탄 영어학원은 학생의 수준과 목표에 맞는 맞춤형 프로그램을 제공합니다.
                  수업 방식(1:1 또는 그룹)과 수업 횟수에 따라 수업료가 달라지며,
                  정확한 수업료는 무료 진단 테스트와 상담을 통해 안내해 드립니다.
                </p>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-primary font-medium">
                    ※ 첫 방문 시 무료 진단 테스트와 1:1 상담이 제공됩니다.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/consult"
                className="inline-block bg-accent text-white font-medium px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors text-center"
              >
                무료 상담 신청하기
              </Link>
              <button
                onClick={() => setIsTestModalOpen(true)}
                className="inline-block bg-primary text-white font-medium px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors text-center"
              >
                무료 진단 테스트 시작하기
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <DiagnosisModal 
        isOpen={isTestModalOpen} 
        onClose={() => setIsTestModalOpen(false)} 
      />
      
      <CtaSection />
    </div>
  );
}