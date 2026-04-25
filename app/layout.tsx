// app/layout.tsx
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

import { DM_Sans, DM_Serif_Display, DM_Mono } from 'next/font/google';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | EduSolver',
    default: 'EduSolver — AI-Powered STEM Tutor for CBSE, JEE & NEET',
  },
  description:
    'Step-by-step NCERT solutions with pedagogical notes, common mistake warnings, and exam tips. Tailored for Class 8–12 students preparing for CBSE Board, JEE, and NEET.',
  keywords: [
    'NCERT solutions',
    'CBSE step by step',
    'JEE maths solutions',
    'NEET physics solutions',
    'AI tutor India',
    'Class 10 maths proof',
    'EduSolver',
  ],
  authors: [{ name: 'Rishabh Rathore' }, { name: 'Tanuj Kumar' }],
  openGraph: {
    title: 'EduSolver — AI STEM Tutor for CBSE, JEE & NEET',
    description:
      'Get step-by-step solutions with pedagogy notes and exam tips for Class 8–12 Math, Physics & Chemistry.',
    url: 'https://edusolver.vercel.app',
    siteName: 'EduSolver',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduSolver — AI STEM Tutor for CBSE, JEE & NEET',
    description:
      'Step-by-step NCERT solutions with pedagogical notes and exam tips. Free for Indian students.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://edusolver.vercel.app'),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d1117',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSerif.variable} ${dmMono.variable} antialiased`}>
        {/* The ClerkProvider wraps the app but does NOT render any visible UI on its own */}
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}