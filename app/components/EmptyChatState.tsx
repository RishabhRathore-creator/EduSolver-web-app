// app/components/EmptyChatState.tsx
'use client';

type EmptyChatStateProps = {
  onExampleClick: (question: string) => void;
  questionCount: number;
};

const EXAMPLE_QUESTIONS = [
  { icon: '📐', label: 'Algebra', q: 'Solve x² − 5x + 6 = 0 using the factoring method' },
  { icon: '🔢', label: 'Arithmetic', q: 'Find the HCF of 48 and 72 using prime factorisation' },
  { icon: '🔵', label: 'Geometry', q: 'What is the area of a circle with radius 7 cm?' },
  { icon: '⚡', label: 'Physics', q: "Explain Newton's second law with a real-world example" },
  { icon: '🧪', label: 'Chemistry', q: 'What happens when sodium reacts with water?' },
  { icon: '📊', label: 'Statistics', q: 'Find the mean, median and mode of: 3, 5, 7, 5, 9, 5' },
];

export default function EmptyChatState({ onExampleClick, questionCount }: EmptyChatStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '40px 20px',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Hero area */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #161b22, #21262d)',
            border: '1px solid #30363d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            margin: '0 auto 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          🎓
        </div>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 28,
            fontWeight: 400,
            color: '#e6edf3',
            letterSpacing: '-0.025em',
            marginBottom: 10,
          }}
        >
          What would you like to solve?
        </h2>
        <p
          style={{
            fontSize: 14,
            color: '#8b949e',
            lineHeight: 1.65,
            maxWidth: 420,
          }}
        >
          Step-by-step solutions with exam tips, common mistake warnings,
          and conceptual insights — all processed in your browser.
        </p>

        {/* Privacy note */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 16,
            padding: '6px 14px',
            background: 'rgba(45,212,191,0.08)',
            border: '1px solid rgba(45,212,191,0.15)',
            borderRadius: 999,
            fontSize: 11,
            color: '#2dd4bf',
            fontFamily: "'DM Mono', monospace",
            letterSpacing: '0.04em',
          }}
        >
          🔒 Your questions never leave your device
          {questionCount > 0 && ` · ${questionCount} saved locally`}
        </div>
      </div>

      {/* Example grid */}
      <div style={{ width: '100%', maxWidth: 640 }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#8b949e',
            fontFamily: "'DM Mono', monospace",
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 14,
            textAlign: 'center',
          }}
        >
          Try an example
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 10,
          }}
        >
          {EXAMPLE_QUESTIONS.map(({ icon, label, q }) => (
            <button
              key={q}
              onClick={() => onExampleClick(q)}
              style={{
                textAlign: 'left',
                background: '#161b22',
                border: '1px solid #21262d',
                borderRadius: 12,
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(45,212,191,0.35)';
                el.style.background = 'rgba(45,212,191,0.04)';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = '#21262d';
                el.style.background = '#161b22';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15 }}>{icon}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: '#2dd4bf',
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.5, margin: 0 }}>{q}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
