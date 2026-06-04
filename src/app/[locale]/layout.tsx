import type { Metadata } from 'next';
// import 'swiper/css';
import '@/styles/style.scss';
import '@/../public/css/style.css';
import TopNav from '@/components/TopNav';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from "next/script";
import Cart from '@/components/ui/Cart';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Anvogue - Next.js',
  description: 'E-commerce project',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};


export default async function RootLayout({
  children, params
}: Props) {

  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Cart />
          <TopNav />
          <Header />
          <main>{children}</main>
          <Footer />
          <Script
            src="/js/phosphor-icons.js"
            strategy="beforeInteractive"
          />
          {/* <Script
            src="/js/main.js"
            strategy="beforeInteractive"
          /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
