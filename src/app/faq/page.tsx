import { Metadata } from 'next';
import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import CtaSection from '@/components/CtaSection';

export const metadata: Metadata = {
  title: '자주 묻는 질문 - 스파르탄 영어학원',
  description: '스파르탄 영어학원에 대한 자주 묻는 질문과 답변을 확인하세요. 수업 방식, 시간, 비용 등에 대한 정보를 제공합니다.',
};

export default function FaqPage() {
  return (
    <div>
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-center mb-8">
            자주 묻는 질문
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            학생과 학부모님들이 자주 물어보시는 질문들을 모았습니다.
          </p>
        </div>
      </section>
      
      <FaqSection />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">
              더 궁금한 점이 있으신가요?
            </h2>
            <p className="text-gray-700 mb-8">
              위 질문에서 원하는 답변을 찾지 못하셨다면, 언제든지 문의해주세요.
              원장이 직접 상담해 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/consult"
                className="px-8 py-3 bg-accent text-white font-medium rounded-md hover:bg-opacity-90 transition-colors text-center"
              >
                상담 신청하기
              </Link>
              <a
                href="tel:010-0000-0000"
                className="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 transition-colors text-center"
              >
                전화 문의하기
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <CtaSection />
    </div>
  );
} 