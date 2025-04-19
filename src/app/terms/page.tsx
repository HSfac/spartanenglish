'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function TermsPage() {
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
            이용약관
          </h1>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-500 mb-8 text-center">
                최종 업데이트: 2024년 4월 19일
              </p>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">제1조 (목적)</h2>
                <p>
                  이 약관은 스파르탄 영어학원(이하 '학원')이 제공하는 교육 서비스 및 홈페이지(spartanenglish.com)의 이용과 관련하여 
                  학원과 회원 사이의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">제2조 (정의)</h2>
                <p className="mb-4">
                  이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>"서비스"란 학원이 제공하는 온/오프라인 교육 서비스, 콘텐츠 및 관련 서비스를 의미합니다.</li>
                  <li>"회원"이란 학원의 회원가입을 한 학생, 학부모 또는 서비스를 이용하는 이용자를 의미합니다.</li>
                  <li>"콘텐츠"란 학원이 서비스 상에서 제공하는 온라인 강의, 학습 자료, 기타 정보 등을 의미합니다.</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">제3조 (약관의 효력 및 변경)</h2>
                <p className="mb-4">
                  ① 이 약관은 서비스를 이용하고자 하는 모든 회원에게 적용됩니다.
                </p>
                <p className="mb-4">
                  ② 학원은 합리적인 사유가 있는 경우 약관을 변경할 수 있으며, 변경된 약관은 웹사이트에 공지함으로써 효력이 발생합니다.
                </p>
                <p>
                  ③ 회원은 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있으며, 계속 서비스를 이용하는 경우 변경된 약관에 동의한 것으로 간주합니다.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">제4조 (서비스 이용 신청)</h2>
                <p className="mb-4">
                  ① 서비스를 이용하고자 하는 자는 학원이 정한 절차에 따라 이용신청을 합니다.
                </p>
                <p className="mb-4">
                  ② 학원은 다음 각 호에 해당하는 이용신청에 대하여는 승낙하지 않을 수 있습니다.
                </p>
                <ul className="list-decimal pl-6 space-y-2">
                  <li>실명이 아니거나 타인의 명의를 사용하여 신청한 경우</li>
                  <li>이용신청서의 내용을 허위로 기재한 경우</li>
                  <li>기타 학원이 정한 이용신청 요건이 미비된 경우</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">제5조 (회원의 의무)</h2>
                <p className="mb-4">
                  회원은 다음 각 호의 행위를 하여서는 안됩니다.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>신청 또는 변경 시 허위내용의 등록</li>
                  <li>타인의 정보 도용</li>
                  <li>학원이 제공하는 콘텐츠의 무단 복제, 배포, 전송, 게시</li>
                  <li>학원 및 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                  <li>학원 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                  <li>외설적, 폭력적인 메시지, 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">제6조 (수업료 및 환불)</h2>
                <p className="mb-4">
                  ① 학원의 수업료 및 교재비는 학원이 정한 금액에 따릅니다.
                </p>
                <p className="mb-4">
                  ② 수업료의 환불은 학원의 환불규정 및 「학원의 설립·운영 및 과외교습에 관한 법률」 등 관련 법령에 따릅니다.
                </p>
                <p>
                  ③ 학원은 합리적인 사유가 있는 경우 학원 요금을 변경할 수 있으며, 변경 사항은 사전에 공지합니다.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">제7조 (서비스 중단)</h2>
                <p className="mb-4">
                  ① 학원은 천재지변, 전시, 사변, 국가비상사태, 기간통신사업자의 서비스 중단, 기타 불가항력적 사유로 서비스를 제공할 수 없는 경우에는 서비스 제공을 중단할 수 있습니다.
                </p>
                <p>
                  ② 학원은 서비스의 개선, 장비의 보수 등 부득이한 사유로 서비스를 일시적으로 중단할 수 있으며, 이 경우 사전에 공지합니다.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">제8조 (면책사항)</h2>
                <p className="mb-4">
                  ① 학원은 천재지변, 전쟁, 기간통신사업자의 서비스 중단 등 불가항력적인 사유로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임을 지지 않습니다.
                </p>
                <p>
                  ② 학원은 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">제9조 (분쟁해결)</h2>
                <p className="mb-4">
                  ① 학원과 회원 간에 발생한 분쟁은 상호 협의하여 해결합니다.
                </p>
                <p>
                  ② 협의가 이루어지지 않을 경우, 관련 법령 및 상관례에 따릅니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 