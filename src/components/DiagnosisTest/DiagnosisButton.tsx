'use client';

import { useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import DiagnosisModal from './DiagnosisModal';

interface DiagnosisButtonProps {
  className?: string;
  buttonText?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function DiagnosisButton({
  className = '',
  buttonText = '영어 실력 진단하기',
  variant = 'primary',
  size = 'md',
}: DiagnosisButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 버튼 스타일 설정
  const getButtonStyle = () => {
    const baseStyle = 'rounded-lg font-medium transition-all duration-300 flex items-center justify-center';
    
    let variantStyle = '';
    if (variant === 'primary') {
      variantStyle = 'bg-primary text-white hover:bg-primary/90';
    } else if (variant === 'secondary') {
      variantStyle = 'bg-blue-600 text-white hover:bg-blue-700';
    } else if (variant === 'outline') {
      variantStyle = 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10';
    }
    
    let sizeStyle = '';
    if (size === 'sm') {
      sizeStyle = 'py-2 px-4 text-sm';
    } else if (size === 'md') {
      sizeStyle = 'py-3 px-6 text-base';
    } else if (size === 'lg') {
      sizeStyle = 'py-4 px-8 text-lg';
    }
    
    return `${baseStyle} ${variantStyle} ${sizeStyle} ${className}`;
  };

  return (
    <>
      <button
        className={getButtonStyle()}
        onClick={() => setIsModalOpen(true)}
      >
        <FaGraduationCap className="mr-2" />
        {buttonText}
      </button>
      
      <DiagnosisModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
} 