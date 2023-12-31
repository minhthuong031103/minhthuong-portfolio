import Script from 'next/script';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css';
import { Montserrat } from 'next/font/google';
import { AnimatePresence } from 'framer-motion';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
});

export const metadata = {
  title: 'MinhThuong-Portfolio',
  description: 'Coded by MinhThuong',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen h-full`}
      >
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
