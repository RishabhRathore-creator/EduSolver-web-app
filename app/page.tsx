// app/page.tsx
// Server Component — no 'use client' needed.
// All hover effects are pure CSS (no event handlers) so this stays server-renderable.
import {
  Puzzle,
  Ruler,
  Target,
  AlertTriangle,
  BookOpen,
  Bot
} from 'lucide-react';
import Link from 'next/link';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import AnimatedSection from './components/AnimatedSection';
import SolutionPreview from './components/SolutionPreview';
import SampleDemo from './components/SampleDemo';

const STATS = [
  { value: '3000+', label: 'Curated Questions' },
  { value: '40+', label: 'NCERT Chapters' },
  { value: 'Class 8–12', label: 'Coverage' },
  { value: '4 Methods', label: 'Solution Types' },
];

const FEATURES = [
  {
    icon: <Puzzle size={24} />,
    title: 'Step-by-Step Reasoning',
    description:
      'Every solution is broken into numbered steps with explanations of what we do and why — not just the answer.',
  },
  {
    icon: <Ruler size={24} />,
    title: 'Multi-Method Solutions',
    description:
      'Algebraic, graphical, numerical, and conceptual approaches — see the same problem from four angles.',
  },
  {
    icon: <Target size={24} />,
    title: 'Exam-Aligned Output',
    description:
      'Responses are tailored to Board (CBSE), JEE, or NEET — formatted exactly as examiners expect.',
  },
  {
    icon: <AlertTriangle size={24} />,
    title: 'Common Mistakes Highlighted',
    description:
      'Each solution flags the exact error students most often make, so you learn what not to do.',
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Pedagogical Notes',
    description:
      'The deeper concept behind each problem — building intuition, not just pattern-matching.',
  },
  {
    icon: <Bot size={24} />,
    title: 'Fine-Tuned on NCERT Data',
    description:
      'Powered by a custom LoRA adapter trained on our curated dataset of 300+ structured problems.',
  },
];

const PIPELINE_STEPS = [
  {
    number: '01',
    title: 'Problem Interpretation',
    description: 'The model identifies the problem type, relevant concepts, and student context.',
  },
  {
    number: '02',
    title: 'Step-Wise Solution',
    description: 'A structured solution is generated with clear intermediate steps and calculations.',
  },
  {
    number: '03',
    title: 'Pedagogical Enrichment',
    description: 'Conceptual notes, common mistakes, and exam-specific tips are layered in.',
  },
  {
    number: '04',
    title: 'Logical Verification',
    description: 'The solution is cross-checked for mathematical consistency before delivery.',
  },
];

export default function HomePage() {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: '#0d1117',
        color: '#e6edf3',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* Navbar links hover — pure CSS, no JS */
        .nav-link {
          font-size: 14px;
          color: #8b949e;
          text-decoration: none;
          transition: color 0.15s ease;
          font-family: 'DM Sans', sans-serif;
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav-link:hover { color: #e6edf3; }

        /* Primary CTA button */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #2dd4bf;
          color: #0d1117;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 15px;
          padding: 14px 28px;
          border-radius: 12px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover {
          background: #5eead4;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(45,212,191,0.3);
        }

        /* Secondary outline button */
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #e6edf3;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 15px;
          padding: 13px 24px;
          border-radius: 12px;
          text-decoration: none;
          border: 1px solid #21262d;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-secondary:hover {
          border-color: #8b949e;
          background: rgba(255,255,255,0.04);
        }

        /* Feature cards */
        .feature-card {
          border: 1px solid #21262d;
          background: #161b22;
          border-radius: 16px;
          padding: 28px;
          transition: border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .feature-card:hover {
          border-color: rgba(45,212,191,0.4);
          background: rgba(45,212,191,0.04);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }

        /* Grid texture for hero background */
        .grid-bg {
          background-image:
            linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }

        /* Atmospheric glow blob in hero */
        .hero-glow {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(45,212,191,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Scroll-triggered fade-up animation */
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up:nth-child(1) { transition-delay: 0s; }
        .fade-up:nth-child(2) { transition-delay: 0.08s; }
        .fade-up:nth-child(3) { transition-delay: 0.16s; }
        .fade-up:nth-child(4) { transition-delay: 0.24s; }
        .fade-up:nth-child(5) { transition-delay: 0.32s; }
        .fade-up:nth-child(6) { transition-delay: 0.40s; }

        /* Small reusable pieces */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.04em;
          color: #2dd4bf;
          background: rgba(45,212,191,0.12);
          border: 1px solid rgba(45,212,191,0.2);
          padding: 6px 12px;
          border-radius: 999px;
        }
        .section-label {
          font-size: 11px;
          font-weight: 500;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2dd4bf;
        }
        .step-number {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          color: #2dd4bf;
          background: rgba(45,212,191,0.12);
          border: 1px solid rgba(45,212,191,0.2);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stat-card {
          text-align: center;
          padding: 24px 20px;
          border-right: 1px solid #21262d;
          flex: 1;
        }
        .stat-card:last-child { border-right: none; }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .stats-strip { flex-wrap: wrap !important; }
          .stat-card { border-right: none !important; border-bottom: 1px solid #21262d; min-width: 50%; }
          .hero-title { font-size: 36px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .pipeline-grid { grid-template-columns: 1fr 1fr !important; }
          .cta-row { flex-direction: column !important; align-items: center; }
          .nav-links { display: none !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(13,17,23,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #21262d',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="EduSolver logo">
              <rect x="3" y="8" width="22" height="16" rx="3" stroke="#2dd4bf" strokeWidth="1.8" />
              <path d="M9 8V6a5 5 0 0 1 10 0v2" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="14" cy="16" r="2.5" fill="#2dd4bf" />
              <path d="M14 18.5v3" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 20,
                color: '#e6edf3',
                letterSpacing: '-0.02em',
              }}
            >
              EduSolver
            </span>
          </div>

          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#pipeline" className="nav-link">How it works</a>

            {/* Clerk Auth Integration */}
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="nav-link">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
                  Start Solving →
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <Link href="/solve" className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
                Go to Solver →
              </Link>
              <UserButton />
            </Show>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          padding: '120px 24px 80px',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
        <div className="hero-glow" />

        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <span className="badge">⚡ Fine-tuned on NCERT · JEE · NEET Datasets</span>
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 58,
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 24,
              color: '#e6edf3',
            }}
          >
            Master STEM with{' '}
            <span style={{ color: '#2dd4bf' }}>Multi-Agent AI</span>
            <br />that actually teaches
          </h1>

          <p
            style={{
              fontSize: 18,
              color: '#8b949e',
              lineHeight: 1.7,
              maxWidth: 540,
              margin: '0 auto 40px',
            }}
          >
            Step-by-step solutions with pedagogical notes, common mistake warnings,
            and exam tips — tailored to your class, subject, and exam pattern.
          </p>

          <div
            className="cta-row"
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <button className="btn-primary">
                  Start Solving Free <span>→</span>
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link href="/solve" className="btn-primary">
                Start Solving <span>→</span>
              </Link>
            </Show>
            <a href="#features" className="btn-secondary">
              See how it works
            </a>
          </div>

          <p style={{ marginTop: 20, fontSize: 12, color: '#8b949e', fontFamily: "'DM Mono', monospace", letterSpacing: '0.04em' }}>
            NCERT-aligned · Classes 8–12 · Math, Physics, Chemistry
          </p>


          <SolutionPreview />

        </div>  {/* closes maxWidth div */}
      </section>  {/* closes hero section */}

      {/* ── STATS STRIP ── */}
      <div style={{ borderTop: '1px solid #21262d', borderBottom: '1px solid #21262d', background: '#161b22' }}>
        <div className="stats-strip" style={{ maxWidth: 1080, margin: '0 auto', display: 'flex' }}>
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: '#2dd4bf', letterSpacing: '-0.02em', marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: '#8b949e', fontFamily: "'DM Mono', monospace", letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>Why EduSolver</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, fontWeight: 400, letterSpacing: '-0.025em', color: '#e6edf3' }}>
              Not just answers. Understanding.
            </h2>
          </div>
          <AnimatedSection>
            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 20 }}>
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.title}
                  className="feature-card fade-up"
                  style={index === 0 ? { gridColumn: 'span 2' } : {}}  // ← add this
                >
                  <div style={{ marginBottom: 16 }}>{feature.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#e6edf3', marginBottom: 10, letterSpacing: '-0.01em' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#8b949e', lineHeight: 1.65 }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ← ADD HERE */}
      <SampleDemo />

      {/* ── PIPELINE ── */}
      <section id="pipeline" style={{ padding: '100px 24px', borderTop: '1px solid #21262d', background: '#161b22' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>The Pipeline</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, fontWeight: 400, letterSpacing: '-0.025em', color: '#e6edf3' }}>
              Four stages, one perfect answer
            </h2>
            <p style={{ fontSize: 15, color: '#8b949e', marginTop: 12, maxWidth: 480, margin: '12px auto 0', lineHeight: 1.6 }}>
              Every question runs through a 4-stage reasoning pipeline before a single word reaches you.
            </p>
          </div>
          <AnimatedSection>
            <div className="pipeline-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {PIPELINE_STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className="fade-up"
                  style={{ padding: '28px 24px', border: '1px solid #21262d', borderRadius: 16, background: '#0d1117', position: 'relative' }}
                >
                  {index < PIPELINE_STEPS.length - 1 && (
                    <div style={{ position: 'absolute', top: 48, right: -11, width: 22, height: 1, background: 'linear-gradient(90deg, #21262d, transparent)', zIndex: 1 }} />
                  )}
                  <div className="step-number" style={{ marginBottom: 16 }}>{step.number}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#e6edf3', marginBottom: 8, letterSpacing: '-0.01em' }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.6 }}>{step.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '120px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ width: 48, height: 3, background: '#fbbf24', borderRadius: 2, margin: '0 auto 32px' }} />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, fontWeight: 400, letterSpacing: '-0.03em', color: '#e6edf3', lineHeight: 1.15, marginBottom: 20 }}>
            Ready to actually{' '}
            <span style={{ fontStyle: 'italic', color: '#fbbf24' }}>understand</span>{' '}
            STEM?
          </h2>
          <p style={{ fontSize: 16, color: '#8b949e', lineHeight: 1.7, marginBottom: 40 }}>
            No more memorising steps you don't understand. Ask your first question and get a solution that actually teaches you why.
          </p>
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
                Open EduSolver <span>→</span>
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/solve" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
              Open EduSolver <span>→</span>
            </Link>
          </Show>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #21262d', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="EduSolver logo">
              <rect x="3" y="8" width="22" height="16" rx="3" stroke="#2dd4bf" strokeWidth="1.8" />
              <path d="M9 8V6a5 5 0 0 1 10 0v2" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="14" cy="16" r="2.5" fill="#2dd4bf" />
              <path d="M14 18.5v3" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: '#8b949e' }}>EduSolver</span>
          </div>
          <p style={{ fontSize: 12, color: '#8b949e', fontFamily: "'DM Mono', monospace", letterSpacing: '0.04em' }}>
            Built by Rishabh Rathore & Tanuj Kumar · Dept. of Computer Science
          </p>
          <p style={{ fontSize: 12, color: '#8b949e', fontFamily: "'DM Mono', monospace" }}>
            Supervised by Prof. Vinita Jindal
          </p>
        </div>
      </footer>
    </div>
  );
}