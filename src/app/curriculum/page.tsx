import { Metadata } from 'next';
import Link from 'next/link';
import { FaUserGraduate, FaChalkboardTeacher, FaBook } from 'react-icons/fa';
import CtaSection from '@/components/CtaSection';

export const metadata: Metadata = {
  title: '수업 안내 - 스파르탄 영어학원',
  description: '스파르탄 영어학원의 수업 커리큘럼과 방식을 안내합니다. 원장이 직접 진행하는 1:1 맞춤형 영어 수업',
};

const CurriculumCard = ({ title, description, icon, features }: { 
  title: string; 
  description: string;
  icon: React.ReactNode;
  features: string[];
}) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-accent">
    <div className="text-accent text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className="text-accent mr-2">✓</span>
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function CurriculumPage() {
  return (
    <div>
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-center mb-8">
            수업 안내
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            학생 수준과 목표에 맞춘 원장 직강 1:1 맞춤 수업
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">
              수업 시스템
            </h2>
            <p className="text-gray-700">
              스파르탄 영어학원은 학생의 수준을 정확히 진단하고, 그에 맞는 맞춤형 학습 전략을 제시합니다.
              모든 수업은 원장이 직접 진행하며, 학생의 성적 향상을 위해 지속적인 피드백을 제공합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">1</div>
              <h3 className="text-lg font-bold text-primary mb-2">수준 진단</h3>
              <p className="text-gray-600">현재 실력을 정확히 진단하여 강점과 약점 파악</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">2</div>
              <h3 className="text-lg font-bold text-primary mb-2">맞춤 설계</h3>
              <p className="text-gray-600">학생별 맞춤형 학습 전략과 커리큘럼 설계</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">3</div>
              <h3 className="text-lg font-bold text-primary mb-2">1:1 집중 수업</h3>
              <p className="text-gray-600">원장 직접 1:1 수업으로 실시간 피드백</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">4</div>
              <h3 className="text-lg font-bold text-primary mb-2">주간 관리</h3>
              <p className="text-gray-600">주간 단위 학습 성과 검토 및 전략 조정</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CurriculumCard 
              title="중학생 과정"
              description="영어 기초를 탄탄히 다지고 내신에 대비하는 과정"
              icon={<FaUserGraduate />}
              features={[
                "영어 기초 문법 및 어휘력 강화",
                "중등 내신 대비 집중 학습",
                "영어 독해 기초 다지기",
                "영어 듣기 및 말하기 실력 향상"
              ]}
            />
            
            <CurriculumCard 
              title="고등학생 과정"
              description="수능 및 내신을 위한 체계적인 학습 과정"
              icon={<FaChalkboardTeacher />}
              features={[
                "수능 영어 독해 전략 학습",
                "고등 내신 대비 문법 및 어휘 정리",
                "실전 유형별 문제 해결 전략",
                "시간 관리 및 오답 분석 방법"
              ]}
            />
            
            <CurriculumCard 
              title="수능 집중 과정"
              description="수능을 앞둔 학생들을 위한 집중 과정"
              icon={<FaBook />}
              features={[
                "수능 기출 분석 및 예상 문제 대비",
                "취약 유형 집중 학습",
                "실전 모의고사 및 피드백",
                "수능 당일 전략 및 멘탈 관리"
              ]}
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-primary text-center mb-8">
              수업 운영 안내
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-primary mb-3">수업 시간</h3>
                <p className="text-gray-700 mb-2">• 평일: 오후 1시 ~ 오후 10시</p>
                <p className="text-gray-700">• 주말: 오전 10시 ~ 오후 6시</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-primary mb-3">수업 방식</h3>
                <p className="text-gray-700 mb-2">• 1:1 개인 맞춤 수업</p>
                <p className="text-gray-700 mb-2">• 소규모 그룹 수업 (최대 3명)</p>
                <p className="text-gray-700">• 모든 수업은 원장이 직접 진행</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-primary mb-3">사용 교재</h3>
                <p className="text-gray-700 mb-2">• 수능 기출문제 및 자체 제작 교재</p>
                <p className="text-gray-700">• 학생 수준에 맞는 맞춤 교재</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">수업료</h3>
                <p className="text-gray-700 mb-2">• 수업 방식(1:1 또는 그룹)과 횟수에 따라 달라집니다.</p>
                <p className="text-gray-700">• 자세한 내용은 상담을 통해 안내해 드립니다.</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/consult"
                className="inline-block bg-accent text-white font-medium px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors"
              >
                무료 진단 테스트 신청하기
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <CtaSection />
    </div>
  );
}