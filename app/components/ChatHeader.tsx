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
  padding: '8px 32px 8px 12px',
  fontSize: 13,
  color: '#e6edf3',
  fontFamily: "'DM Sans', sans-serif",
  cursor: 'pointer',
  outline: 'none',
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b949e' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  transition: 'border-color 0.2s',
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
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 18 }}>🎓</span>
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 17,
              color: '#e6edf3',
              letterSpacing: '-0.02em',
            }}
          >
            EduSolver
          </span>
          <span
            style={{
              fontSize: 10,
              fontFamily: "'DM Mono', monospace",
              color: '#2dd4bf',
              background: 'rgba(45,212,191,0.1)',
              border: '1px solid rgba(45,212,191,0.2)',
              padding: '2px 8px',
              borderRadius: 999,
              letterSpacing: '0.06em',
            }}
          >
            SOLVE
          </span>
        </Link>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Class */}
          <div style={{ position: 'relative' }}>
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
          </div>

          {/* Subject */}
          <div style={{ position: 'relative' }}>
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
          </div>

          {/* Exam Mode */}
          <div style={{ position: 'relative' }}>
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
          </div>

          {/* Privacy badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              color: '#2dd4bf',
              fontFamily: "'DM Mono', monospace",
              background: 'rgba(45,212,191,0.08)',
              border: '1px solid rgba(45,212,191,0.15)',
              padding: '5px 10px',
              borderRadius: 8,
              letterSpacing: '0.04em',
              flexShrink: 0,
            }}
          >
            🔒 Local-only
          </div>
        </div>
      </div>

      <style>{`
        select option { background: #161b22; color: #e6edf3; }
        select:hover { border-color: #30363d !important; }
      `}</style>
    </header>
  );
}
