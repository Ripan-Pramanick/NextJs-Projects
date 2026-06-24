// src/app/layout.js

import './globals.css';
import { Inter } from 'next/font/google';
import LayoutWrapper from '../components/LayoutWrapper'; 
import CustomCursor from '../components/CustomCursor'; // <-- 1. Imported the Custom Cursor component

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Minervasutra: The All-in-One AI Powered HR Management Software',
  description: 'Automate your entire workforce with Minervasutra. Our AI HR platform streamlines hiring, payroll, and employee management to scale your business faster.',
  icons: {
    icon: '/logo1-removebg-preview.png',
    shortcut: '/logo1-removebg-preview.png',
    apple: '/logo1-removebg-preview.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen relative overflow-x-hidden bg-white">

        {/* 2. Inserted CustomCursor globally at the root of the body */}
        <CustomCursor />

        <LayoutWrapper>
          {children}
        </LayoutWrapper>

      </body>
    </html>
  );
}