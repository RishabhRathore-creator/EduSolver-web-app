// app/layout.tsx
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | EduSolver',
    default: 'EduSolver — Pedagogy-First STEM Tutor',
  },
  description:
    'Step-by-step STEM solutions with pedagogical notes, common mistake warnings, and exam tips.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* The ClerkProvider wraps the app but does NOT render any visible UI on its own */}
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}