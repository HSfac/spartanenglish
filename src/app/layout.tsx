import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '스파르탄 영어학원 - 원장이 직접 가르치는 1:1 맞춤 영어 수업',
  description: '수능 영어 1:1 과외, Spartan 영어학원 원장 직강으로 결과로 증명합니다.',
  openGraph: {
    title: '스파르탄 영어학원 - 원장이 직접 가르치는 영어',
    description: '원장 선생님이 직접 책임집니다. 수능 영어, 결과로 증명합니다.',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
