'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function PrivacyPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            개인정보처리방침
          </h1>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-500 mb-8 text-center">
                최종 업데이트: 2024년 4월 19일
              </p>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">1. 개인정보의 처리 목적</h2>
                <p className="mb-4">
                  스파르탄 영어학원('spartanenglish.com', 이하 '학원')은 다음의 목적을 위하여 개인정보를 처리하고 있으며, 
                  다음의 목적 이외의 용도로는 이용하지 않습니다.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>학원 수강 상담 및 신청 관리</li>
                  <li>학원 교육 서비스 제공</li>
                  <li>학원 운영 관련 공지 및 정보 제공</li>
                  <li>민원사항 확인 및 처리</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">2. 수집하는 개인정보의 항목</h2>
                <p className="mb-4">
                  학원은 수강 상담 및 신청, 서비스 제공 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>필수항목: 이름, 연락처, 이메일</li>
                  <li>선택항목: 학교, 학년, 현재 영어 수준, 상담 희망 내용</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">3. 개인정보의 보유 및 이용기간</h2>
                <p className="mb-4">
                  원칙적으로 개인정보는 수집 및 이용목적이 달성된 후에는 지체 없이 파기합니다. 
                  단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>상담 및 수강 관련 기록: 3년 (학원의 설립·운영 및 과외교습에 관한 법률)</li>
                  <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자 보호에 관한 법률)</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">4. 개인정보의 파기 절차 및 방법</h2>
                <p className="mb-4">
                  학원은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>전자적 파일 형태로 저장된 개인정보는 기술적 방법을 사용하여 복구 및 재생이 불가능하도록 영구적으로 삭제합니다.</li>
                  <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">5. 정보주체의 권리와 행사방법</h2>
                <p className="mb-4">
                  정보주체는 학원에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>개인정보 열람 요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제 요구</li>
                  <li>처리정지 요구</li>
                </ul>
                <p className="mt-4">
                  위 권리 행사는 학원에 대해 전화, 이메일, 서면 등을 통하여 하실 수 있으며 학원은 이에 대해 지체 없이 조치하겠습니다.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">6. 개인정보 보호책임자</h2>
                <p className="mb-4">
                  학원은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 
                  등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium">개인정보 보호책임자</p>
                  <p>이름: 홍길동</p>
                  <p>직위: 원장</p>
                  <p>연락처: 010-0000-0000, contact@spartanenglish.com</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">7. 개인정보처리방침의 변경</h2>
                <p>
                  이 개인정보처리방침은 2024년 4월 19일부터 적용됩니다. 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 
                  변경사항의 시행 7일 전부터 학원 웹사이트를 통하여 고지할 것입니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 