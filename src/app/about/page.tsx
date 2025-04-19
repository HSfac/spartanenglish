import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import CtaSection from '@/components/CtaSection';

export const metadata: Metadata = {
  title: '강사 소개 - 스파르탄 영어학원',
  description: '스파르탄 영어학원 원장의 교육 철학과 프로필을 소개합니다. 원장이 직접 가르치는 1:1 맞춤 영어 수업',
};

export default function AboutPage() {
  return (
    <div>
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-center mb-8">
            강사 소개
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            원장이 직접 가르치는 스파르탄 영어학원을 소개합니다.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">[원장님 사진]</p>
              </div>
            </div>
            
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                10년 이상의 수능 영어 지도 경험
              </h2>
              
              <p className="text-gray-700 mb-6">
                안녕하세요, 스파르탄 영어학원 원장입니다. 저는 10년 이상 수능 영어를 지도하며 
                매년 다수의 1등급 학생들을 배출해왔습니다. 대형 학원에서의 강의 경험과 
                개인 과외 경험을 바탕으로 스파르탄 영어학원을 설립하게 되었습니다.
              </p>
              
              <p className="text-gray-700 mb-6">
                저는 학생 개개인의 특성을 파악하고, 그에 맞는 맞춤형 수업을 진행하는 것이 
                가장 중요하다고 생각합니다. 또한, 수능 영어의 출제 경향과 특성을 분석하여 
                가장 효율적인 학습 전략을 수립하는 것이 제 수업의 핵심입니다.
              </p>
              
              <p className="text-gray-700 mb-6 italic">
                "제 수업은 대체되지 않습니다. 직접 가르치니까요. 
                학생의 점수를 제 책임처럼 생각합니다."
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="font-bold text-accent text-xl mb-1">95%</p>
                  <p className="text-sm text-gray-600">학생 만족도</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="font-bold text-accent text-xl mb-1">10+</p>
                  <p className="text-sm text-gray-600">강의 경력</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="font-bold text-accent text-xl mb-1">500+</p>
                  <p className="text-sm text-gray-600">누적 수강생</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="font-bold text-accent text-xl mb-1">82%</p>
                  <p className="text-sm text-gray-600">1등급 달성률</p>
                </div>
              </div>
              
              <Link
                href="/consult"
                className="inline-block bg-accent text-white font-medium px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
              >
                원장과 직접 상담하기
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold text-primary text-center mb-12">
            교육 철학
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-primary mb-3">맞춤형 교육</h3>
              <p className="text-gray-700">
                학생마다 다른 특성과 학습 스타일을 고려한 맞춤형 교육을 제공합니다. 
                일방적인 주입식 교육이 아닌 학생의 참여를 이끌어내는 교육을 지향합니다.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-primary mb-3">실전 중심</h3>
              <p className="text-gray-700">
                실제 시험에 적용할 수 있는 실전 중심의 수업을 진행합니다. 
                문제 풀이 전략과 시간 관리 방법 등 실질적인 도움을 주는 교육을 제공합니다.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-primary mb-3">책임감</h3>
              <p className="text-gray-700">
                학생의 성적 향상에 대한 책임감을 가지고 수업을 진행합니다. 
                원장이 직접 수업을 진행하며 학생의 성장을 책임집니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <CtaSection />
    </div>
  );
} 