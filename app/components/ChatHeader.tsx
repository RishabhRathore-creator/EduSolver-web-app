// app/components/ChatHeader.tsx
'use client';

import Link from 'next/link';

type ChatHeaderProps = {
  classLevel: string;
  subject: string;
  examMode: string;
  onClassChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onExamModeChange: (value: string) => void;
};

const selectStyle: React.CSSProperties = {
  background: '#161b22',
  border: '1px solid #21262d',
  borderRadius: 10,
  padding: '7px 28px 7px 10px',
  fontSize: 12,
  color: '#e6edf3',
  fontFamily: "'DM Sans', sans-serif",
  cursor: 'pointer',
  outline: 'none',
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b949e' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
  transition: 'border-color 0.2s',
  maxWidth: '130px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flexShrink: 0,
};

export default function ChatHeader({
  classLevel,
  subject,
  examMode,
  onClassChange,
  onSubjectChange,
  onExamModeChange,
}: ChatHeaderProps) {
  return (
    <header
      style={{
        background: 'rgba(13,17,23,0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #21262d',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          minHeight: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'nowrap',
        }}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          {/* SVG logo mark */}
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-label="EduSolver logo">
            <rect width="32" height="32" rx="8" fill="rgba(45,212,191,0.12)" />
            <path d="M8 22 L16 10 L24 22" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M10.5 18h11" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="10" r="2" fill="#2dd4bf" />
          </svg>

          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 16,
              color: '#e6edf3',
              letterSpacing: '-0.02em',
            }}
          >
            EduSolver
          </span>
          <span
            style={{
              fontSize: 9,
              fontFamily: "'DM Mono', monospace",
              color: '#2dd4bf',
              background: 'rgba(45,212,191,0.1)',
              border: '1px solid rgba(45,212,191,0.2)',
              padding: '2px 6px',
              borderRadius: 999,
              letterSpacing: '0.06em',
              flexShrink: 0,
            }}
          >
            SOLVE
          </span>
        </Link>

        {/* ── Controls — horizontally scrollable on mobile ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            flexShrink: 1,
            paddingBottom: 2,
          }}
        >
          {/* Class */}
          <label className="sr-only" htmlFor="classLevel-select">Class Level</label>
          <select
            id="classLevel-select"
            value={classLevel}
            onChange={(e) => onClassChange(e.target.value)}
            style={selectStyle}
            onFocus={(e) => (e.target.style.borderColor = '#2dd4bf40')}
            onBlur={(e) => (e.target.style.borderColor = '#21262d')}
          >
            <option>Class 8</option>
            <option>Class 9</option>
            <option>Class 10</option>
            <option>Class 11</option>
            <option>Class 12</option>
          </select>

          {/* Subject */}
          <label className="sr-only" htmlFor="subject-select">Subject</label>
          <select
            id="subject-select"
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            style={selectStyle}
            onFocus={(e) => (e.target.style.borderColor = '#2dd4bf40')}
            onBlur={(e) => (e.target.style.borderColor = '#21262d')}
          >
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
          </select>

          {/* Exam Mode */}
          <label className="sr-only" htmlFor="examMode-select">Exam Mode</label>
          <select
            id="examMode-select"
            value={examMode}
            onChange={(e) => onExamModeChange(e.target.value)}
            style={selectStyle}
            onFocus={(e) => (e.target.style.borderColor = '#2dd4bf40')}
            onBlur={(e) => (e.target.style.borderColor = '#21262d')}
          >
            <option>Board Exam (CBSE)</option>
            <option>Competitive (JEE)</option>
            <option>Competitive (NEET)</option>
            <option>Concept Mode</option>
          </select>

          {/* Privacy badge — hidden on very small screens */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 10,
              color: '#2dd4bf',
              fontFamily: "'DM Mono', monospace",
              background: 'rgba(45,212,191,0.08)',
              border: '1px solid rgba(45,212,191,0.15)',
              padding: '4px 8px',
              borderRadius: 8,
              letterSpacing: '0.04em',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            🔒 Local-only
          </div>
        </div>
      </div>

      <style>{`
        select option { background: #161b22; color: #e6edf3; }
        select:hover { border-color: #30363d !important; }
        /* Hide scrollbar on controls row */
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </header>
  );
}