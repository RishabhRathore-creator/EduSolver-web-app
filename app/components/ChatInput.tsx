// app/components/ChatInput.tsx
'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';

type ChatInputProps = {
  onSubmit: (question: string) => void;
  isLoading: boolean;
};

export default function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }, [inputValue]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    onSubmit(inputValue.trim());
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const charCount = inputValue.length;
  const isOverLimit = charCount > 800;

  return (
    <div
      style={{
        background: 'rgba(13,17,23,0.95)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid #21262d',
        padding: '16px 24px 20px',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Input container */}
        <div
          style={{
            background: '#161b22',
            border: `1px solid ${isOverLimit ? '#f87171' : inputValue ? '#2dd4bf40' : '#21262d'}`,
            borderRadius: 16,
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: inputValue && !isOverLimit ? '0 0 0 3px rgba(45,212,191,0.06)' : 'none',
            overflow: 'hidden',
          }}
        >
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything — algebra, calculus, Newton's laws, periodic table..."
            disabled={isLoading}
            rows={1}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              padding: '16px 20px 4px',
              fontSize: 14,
              color: '#e6edf3',
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.6,
              minHeight: 52,
              caretColor: '#2dd4bf',
            }}
          />

          {/* Bottom bar of input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 16px 12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  fontSize: 11,
                  color: '#8b949e',
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: '0.04em',
                }}
              >
                ↵ send · ⇧↵ newline
              </span>
              {charCount > 0 && (
                <span
                  style={{
                    fontSize: 11,
                    color: isOverLimit ? '#f87171' : '#8b949e',
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {charCount}/800
                </span>
              )}
            </div>

            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim() || isOverLimit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background:
                  isLoading || !inputValue.trim() || isOverLimit
                    ? '#21262d'
                    : 'linear-gradient(135deg, #2dd4bf, #0891b2)',
                color: isLoading || !inputValue.trim() || isOverLimit ? '#8b949e' : '#0d1117',
                border: 'none',
                borderRadius: 10,
                padding: '9px 18px',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                cursor:
                  isLoading || !inputValue.trim() || isOverLimit ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow:
                  !isLoading && inputValue.trim() && !isOverLimit
                    ? '0 4px 16px rgba(45,212,191,0.3)'
                    : 'none',
              }}
            >
              {isLoading ? (
                <>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      border: '2px solid #8b949e',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 0.8s linear infinite',
                    }}
                  />
                  Solving…
                </>
              ) : (
                <>
                  <span>⚡</span>
                  Solve
                </>
              )}
            </button>
          </div>
        </div>

        <p
          style={{
            textAlign: 'center',
            fontSize: 11,
            color: '#8b949e',
            fontFamily: "'DM Mono', monospace",
            letterSpacing: '0.04em',
            marginTop: 10,
          }}
        >
          Your questions are stored locally on your device only
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        textarea::placeholder { color: #8b949e; }
      `}</style>
    </div>
  );
}
