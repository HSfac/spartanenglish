import ConsultForm from '@/components/ConsultForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상담 신청 - 스파르탄 영어학원',
  description: '스파르탄 영어학원 맞춤형 수업 상담 신청 페이지입니다. 원장이 직접 상담해드립니다.',
};

export default function ConsultPage() {
  return (
    <div className="pt-8">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary text-center">
          상담 신청
        </h1>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
          원장이 직접 상담해드리며, 학생에게 맞는 맞춤형 학습 계획을 제안해드립니다.
        </p>
      </div>
      <ConsultForm />
    </div>
  );
} 