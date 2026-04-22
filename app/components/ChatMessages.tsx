// app/components/ChatMessages.tsx
'use client';

type Step = {
  stepNumber: number;
  title: string;
  explanation: string;
  calculation?: string;
};

type SolverResult = {
  steps: Step[];
  pedagogicalNote: string;
  commonMistake: string;
  examTip: string;
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string | SolverResult;
  timestamp: string;
};

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
};

function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end mb-6 group">
      <div className="relative max-w-xl">
        <div
          style={{
            background: 'linear-gradient(135deg, #2dd4bf 0%, #0891b2 100%)',
            borderRadius: '20px 20px 4px 20px',
            padding: '14px 20px',
            fontSize: 14,
            lineHeight: 1.65,
            color: '#fff',
            boxShadow: '0 4px 20px rgba(45,212,191,0.25)',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        marginBottom: 16,
        opacity: 1,
        animation: `fadeSlideIn 0.4s ease ${index * 0.08}s both`,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #2dd4bf, #0891b2)',
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'DM Mono', monospace",
          boxShadow: '0 4px 12px rgba(45,212,191,0.3)',
        }}
      >
        {step.stepNumber}
      </div>

      <div
        style={{
          flex: 1,
          background: '#161b22',
          borderRadius: 14,
          border: '1px solid #21262d',
          padding: '16px 20px',
          transition: 'border-color 0.2s',
        }}
      >
        <h4
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#e6edf3',
            marginBottom: 6,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '-0.01em',
          }}
        >
          {step.title}
        </h4>
        <p
          style={{
            fontSize: 13,
            color: '#8b949e',
            lineHeight: 1.65,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {step.explanation}
        </p>

        {step.calculation && (
          <div
            style={{
              marginTop: 12,
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 10,
              padding: '12px 16px',
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: '#2dd4bf',
              letterSpacing: '0.02em',
              overflowX: 'auto',
            }}
          >
            {step.calculation}
          </div>
        )}
      </div>
    </div>
  );
}

function AssistantCard({ result }: { result: SolverResult }) {
  return (
    <div style={{ marginBottom: 32 }}>
      {/* AI badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #161b22, #21262d)',
            border: '1px solid #30363d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
          }}
        >
          🎓
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#2dd4bf',
            fontFamily: "'DM Mono', monospace",
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          EduSolver · Solution
        </span>
        <div
          style={{
            height: 1,
            flex: 1,
            background: 'linear-gradient(90deg, #21262d, transparent)',
          }}
        />
      </div>

      {/* Steps */}
      <div style={{ marginBottom: 20 }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#8b949e',
            fontFamily: "'DM Mono', monospace",
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          Step-by-Step Solution
        </p>
        {result.steps.map((step, i) => (
          <StepCard key={step.stepNumber} step={step} index={i} />
        ))}
      </div>

      {/* Insight cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
        {result.pedagogicalNote && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(45,212,191,0.06), rgba(45,212,191,0.02))',
              border: '1px solid rgba(45,212,191,0.2)',
              borderLeft: '3px solid #2dd4bf',
              borderRadius: '0 12px 12px 0',
              padding: '14px 18px',
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#2dd4bf',
                fontFamily: "'DM Mono', monospace",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              📖 Pedagogical Note
            </p>
            <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>
              {result.pedagogicalNote}
            </p>
          </div>
        )}

        {result.commonMistake && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(248,113,113,0.06), rgba(248,113,113,0.02))',
              border: '1px solid rgba(248,113,113,0.2)',
              borderLeft: '3px solid #f87171',
              borderRadius: '0 12px 12px 0',
              padding: '14px 18px',
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#f87171',
                fontFamily: "'DM Mono', monospace",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              ⚠️ Common Mistake
            </p>
            <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>
              {result.commonMistake}
            </p>
          </div>
        )}

        {result.examTip && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(251,191,36,0.06), rgba(251,191,36,0.02))',
              border: '1px solid rgba(251,191,36,0.2)',
              borderLeft: '3px solid #fbbf24',
              borderRadius: '0 12px 12px 0',
              padding: '14px 18px',
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#fbbf24',
                fontFamily: "'DM Mono', monospace",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              🎯 Exam Tip
            </p>
            <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>
              {result.examTip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '0 4px' }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: '#161b22',
          border: '1px solid #30363d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
        }}
      >
        🎓
      </div>
      <span style={{ fontSize: 12, color: '#8b949e', fontFamily: "'DM Mono', monospace", letterSpacing: '0.04em' }}>
        Solving
      </span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#2dd4bf',
            display: 'inline-block',
            animation: 'bounce 1.2s ease infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {messages.map((message) => {
          if (message.role === 'user') {
            return <UserBubble key={message.id} content={message.content as string} />;
          }
          if (typeof message.content === 'string') {
            return (
              <div
                key={message.id}
                style={{
                  background: '#161b22',
                  border: '1px solid #21262d',
                  borderRadius: 14,
                  padding: '16px 20px',
                  fontSize: 13,
                  color: '#8b949e',
                  marginBottom: 24,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {message.content}
              </div>
            );
          }
          return <AssistantCard key={message.id} result={message.content as SolverResult} />;
        })}
        {isLoading && <LoadingDots />}
      </div>
    </>
  );
}
