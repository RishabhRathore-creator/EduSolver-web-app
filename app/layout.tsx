// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Root layout — wraps every page. Defines <html> and <body>.
// Kept minimal because:
//   - Landing page (/) has its own custom dark navbar internally
//   - Solver page (/solve) uses ChatHeader instead of a standard navbar
// ─────────────────────────────────────────────────────────────────────────────

// FIX: Removed the Navbar and Footer imports that were causing errors.
// Those component files don't exist yet, and we don't need them here
// because each page manages its own navigation independently.

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | EduSolver',
    default: 'EduSolver — Pedagogy-First STEM Tutor',
  },
  description:
    'Step-by-step STEM solutions with pedagogical notes, common mistake warnings, and exam tips. Fine-tuned on NCERT, JEE, and NEET datasets for Classes 8–12.',
  keywords: [
    'STEM tutor',
    'NCERT solutions',
    'JEE preparation',
    'NEET preparation',
    'AI tutor India',
    'step by step maths',
    'Class 10 maths',
  ],
  openGraph: {
    title: 'EduSolver — Pedagogy-First STEM Tutor',
    description: 'AI-powered STEM solutions that actually teach you why.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/*
          App shell:
          ┌──────────────────────────────────┐
          │  {children}                      │
          │  Landing page → app/page.tsx     │
          │  Solver page  → app/Solve/page   │
          └──────────────────────────────────┘

          Each page manages its own header:
          - page.tsx     → has its own <nav> inside the page
          - Solve/page   → uses <ChatHeader> component

          If you add more pages later that need a shared navbar,
          create a route group:  app/(main)/layout.tsx
        */}
        {children}
      </body>
    </html>
  );
}
