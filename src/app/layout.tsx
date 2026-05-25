import type { Metadata } from 'next';
import '@/styles/style.scss';
import '@/../public/css/style.css';
import 'swiper/css';
import TopNav from '@/components/TopNav';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Anvogue - Next.js',
  description: 'E-commerce project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <Header />
        <main>{children}</main>
        <Footer />
        <Script
          src="/js/phosphor-icons.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/js/main.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
