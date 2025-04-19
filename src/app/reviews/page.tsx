import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaQuoteLeft, FaStar, FaStarHalfAlt, FaRegStar, FaQuoteRight } from 'react-icons/fa';
import CtaSection from '@/components/CtaSection';

export const metadata: Metadata = {
  title: '수업 후기 - 스파르탄 영어학원',
  description: '스파르탄 영어학원 수강생들의 생생한 후기와 성적 향상 사례를 확인하세요. 원장 직접 강의로 이루어낸 결과입니다.',
};

const TestimonialCard = ({ name, grade, result, content }: {
  name: string;
  grade: string;
  result: string;
  content: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-lg relative">
    <div className="text-accent opacity-20 absolute top-4 left-4">
      <FaQuoteLeft size={24} />
    </div>
    <div className="pl-8 pt-6">
      <p className="text-gray-700 mb-6">"{content}"</p>
      <div>
        <p className="font-bold text-primary">{name}</p>
        <p className="text-sm text-gray-500">{grade}</p>
        <p className="text-sm font-medium text-accent">{result}</p>
      </div>
    </div>
  </div>
);

const ResultCard = ({ student, before, after, subject, period }: {
  student: string;
  before: string;
  after: string;
  subject: string;
  period: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="mb-4">
      <p className="font-bold text-primary">{student}</p>
      <p className="text-sm text-gray-500">{subject} | {period}</p>
    </div>
    <div className="flex items-center mb-2">
      <div className="bg-gray-100 rounded px-2 py-1 text-gray-700">{before}</div>
      <div className="mx-2 text-gray-400">→</div>
      <div className="bg-accent bg-opacity-10 rounded px-2 py-1 text-accent font-medium">{after}</div>
    </div>
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar key={star} className="text-yellow-400" />
      ))}
    </div>
  </div>
);

export default function ReviewsPage() {
  return (
    <div>
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-center mb-8">
            수업 후기
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            실제 수강생들의 생생한 후기와 성적 향상 사례를 확인하세요.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">
              성적 향상 사례
            </h2>
            <p className="text-gray-700">
              스파르탄 영어학원에서 성적 향상을 경험한 학생들의 실제 사례입니다.
              원장의 맞춤형 지도와 체계적인 학습 시스템을 통해 많은 학생들이 목표를 달성했습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ResultCard 
              student="김OO 학생"
              before="3등급"
              after="1등급"
              subject="수능 영어"
              period="3개월 수강"
            />
            
            <ResultCard 
              student="이OO 학생"
              before="70점"
              after="92점"
              subject="중간고사"
              period="2개월 수강"
            />
            
            <ResultCard 
              student="박OO 학생"
              before="4등급"
              after="2등급"
              subject="수능 영어"
              period="4개월 수강"
            />
            
            <ResultCard 
              student="최OO 학생"
              before="65점"
              after="88점"
              subject="기말고사"
              period="3개월 수강"
            />
            
            <ResultCard 
              student="정OO 학생"
              before="5등급"
              after="2등급"
              subject="모의고사"
              period="6개월 수강"
            />
            
            <ResultCard 
              student="송OO 학생"
              before="73점"
              after="90점"
              subject="기말고사"
              period="2개월 수강"
            />
          </div>
          
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">
              학생 후기
            </h2>
            <p className="text-gray-700">
              스파르탄 영어학원에서 수업을 들은 학생들의 생생한 후기입니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard 
              name="김OO"
              grade="고3 수험생"
              result="3등급 → 1등급"
              content="원장님께서 직접 수업을 진행해주시고, 제 약점을 정확히 짚어주셔서 효율적으로 공부할 수 있었습니다. 특히 지문 독해 전략이 큰 도움이 되었습니다. 수능에서 1등급을 받을 수 있었던 건 원장님 덕분입니다!"
            />
            
            <TestimonialCard 
              name="이OO"
              grade="고2 학생"
              result="모의고사 70점 → 92점"
              content="문제 풀이 전략과 시간 관리 방법을 배우면서 효율적으로 공부하는 방법을 알게 되었어요. 불안감도 줄고 자신감이 생겼습니다. 학교 시험에서도 좋은 성적을 거둘 수 있었습니다."
            />
            
            <TestimonialCard 
              name="박OO 학부모"
              grade="고3 학생 학부모"
              result="아이의 성적 향상"
              content="원장님이 직접 가르치신다는 점이 가장 마음에 들었습니다. 아이에게 맞는 맞춤형 교육 방식이 아이의 성적 향상으로 이어졌습니다. 무엇보다 아이가 영어에 자신감을 갖게 된 것이 가장 큰 변화입니다."
            />
            
            <TestimonialCard 
              name="정OO"
              grade="고1 학생"
              result="내신 5등급 → 2등급"
              content="영어가 정말 싫었는데, 원장님 수업을 듣고 재미있게 공부하는 방법을 알게 되었어요. 지문을 분석하는 방법과 문제 풀이 전략이 특히 도움이 많이 되었습니다. 이제는 영어 시간이 기다려져요!"
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold text-primary mb-8">
              학부모 한마디
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8 relative">
              <div className="text-accent opacity-10 absolute top-8 left-8">
                <FaQuoteLeft size={48} />
              </div>
              <div className="relative z-10">
                <p className="text-lg text-gray-700 mb-6 italic">
                  "아이가 영어에 자신감을 잃고 있을 때 스파르탄 영어학원을 만났습니다. 
                  원장님이 직접 수업을 진행하신다는 점이 큰 신뢰를 주었고, 실제로 아이의 성적이 
                  크게 향상되었습니다. 무엇보다 아이가 영어를 즐기게 된 것이 가장 큰 변화입니다."
                </p>
                <p className="font-medium text-primary">
                  김OO 학부모님 (고3 학생)
                </p>
              </div>
            </div>
            
            <Link
              href="/consult"
              className="inline-block bg-accent text-white font-medium px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              무료 진단 테스트 신청하기
            </Link>
          </div>
        </div>
      </section>
      
      <CtaSection />
    </div>
  );
} 