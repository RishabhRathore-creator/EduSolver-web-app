// app/solve/page.tsx
// All question history is stored in localStorage — never sent to any server.
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import ChatMessages from '../components/ChatMessages';
import EmptyChatState from '../components/EmptyChatState';
import ErrorBoundary from '../components/ErrorBoundary';

// ─── Types ────────────────────────────────────────────────────────────────────

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
  timestamp: string; // ISO string — safe for JSON serialisation
};

// One conversation session stored locally
type Session = {
  id: string;
  title: string;
  classLevel: string;
  subject: string;
  examMode: string;
  messages: Message[];
  createdAt: string;
};

// ─── localStorage helpers — all data stays on the user's device ───────────────

const STORAGE_KEY = 'edusolver_sessions_v1';

function loadSessions(): Session[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: Session[]) {
  try {
    // Keep only the last 50 sessions to avoid bloating storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.slice(0, 50)));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

function makeSessionTitle(question: string): string {
  return question.length > 50 ? question.slice(0, 50) + '…' : question;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SolvePage() {
  // Config state
  const [classLevel, setClassLevel] = useState('Class 10');
  const [subject, setSubject] = useState('Mathematics');
  const [examMode, setExamMode] = useState('Board Exam (CBSE)');

  // Session / history state — hydrated from localStorage on mount
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Load from localStorage once on mount (client-only)
  useEffect(() => {
    const stored = loadSessions();
    setSessions(stored);
    if (stored.length > 0) setActiveSessionId(stored[0].id);
    setHydrated(true);
  }, []);

  // Persist sessions whenever they change
  useEffect(() => {
    if (hydrated) saveSessions(sessions);
  }, [sessions, hydrated]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, activeSessionId]);

  // Derive active session's messages
  const activeSession = sessions.find((s) => s.id === activeSessionId) ?? null;
  const messages = activeSession?.messages ?? [];

  // ── Handlers ──────────────────────────────────────────────────────────────

  const createNewSession = useCallback(() => {
    const id = `session-${Date.now()}`;
    const session: Session = {
      id,
      title: 'New session',
      classLevel,
      subject,
      examMode,
      messages: [],
      createdAt: new Date().toISOString(),
    };
    setSessions((prev) => [session, ...prev]);
    setActiveSessionId(id);
    setSidebarOpen(false);
  }, [classLevel, subject, examMode]);

  const deleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== sessionId);
      if (activeSessionId === sessionId) {
        setActiveSessionId(next[0]?.id ?? null);
      }
      return next;
    });
  };

  const clearAllHistory = () => {
    if (!confirm('Clear all conversation history from this device?')) return;
    setSessions([]);
    setActiveSessionId(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSubmit = async (question: string) => {
    if (isLoading || !question.trim()) return;
    setError(null);

    let sessionId = activeSessionId;

    // Create a new session if none is active
    if (!sessionId) {
      const id = `session-${Date.now()}`;
      const session: Session = {
        id,
        title: makeSessionTitle(question),
        classLevel,
        subject,
        examMode,
        messages: [],
        createdAt: new Date().toISOString(),
      };
      setSessions((prev) => [session, ...prev]);
      setActiveSessionId(id);
      sessionId = id;
    }

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date().toISOString(),
    };

    // Add user message and update session title if first message
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
            ...s,
            title: s.messages.length === 0 ? makeSessionTitle(question) : s.title,
            messages: [...s.messages, userMsg],
          }
          : s
      )
    );

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, classLevel, subject, examMode }),
      });

      const data = await response.json();

      if (response.status === 503) {
        setError(data.error || 'Model is warming up. Try again in 30 seconds.');
        setIsLoading(false);
        return;
      }
      if (!response.ok) throw new Error(data.error || 'Something went wrong.');

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.result,
        timestamp: new Date().toISOString(),
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId ? { ...s, messages: [...s.messages, aiMsg] } : s
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalQuestions = sessions.reduce(
    (sum, s) => sum + s.messages.filter((m) => m.role === 'user').length,
    0
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #0d1117; }
        .sidebar-item:hover .del-btn { opacity: 1 !important; }
      `}</style>

      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0d1117' }}>

        {/* ── SIDEBAR ── */}
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 40,
            }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          style={{
            width: 260,
            background: '#161b22',
            borderRight: '1px solid #21262d',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            position: 'fixed' as const,
            top: 0,
            left: sidebarOpen ? 0 : -260,
            bottom: 0,
            zIndex: 50,
            transition: 'left 0.25s ease',
          }}
          className="sidebar"
        >
          {/* Sidebar header */}
          <div
            style={{
              padding: '16px',
              borderBottom: '1px solid #21262d',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 16 }}>🎓</span>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 15,
                    color: '#e6edf3',
                  }}
                >
                  History
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8b949e',
                  cursor: 'pointer',
                  fontSize: 16,
                  padding: '2px 6px',
                  borderRadius: 6,
                }}
                title="Close sidebar"
              >
                ✕
              </button>
            </div>

            <button
              onClick={createNewSession}
              style={{
                background: 'linear-gradient(135deg, #2dd4bf, #0891b2)',
                border: 'none',
                borderRadius: 10,
                padding: '9px 14px',
                color: '#0d1117',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>＋</span> New Session
            </button>

            {/* Privacy note */}
            <div
              style={{
                fontSize: 10,
                color: '#2dd4bf',
                fontFamily: "'DM Mono', monospace",
                letterSpacing: '0.04em',
                textAlign: 'center',
                background: 'rgba(45,212,191,0.08)',
                border: '1px solid rgba(45,212,191,0.12)',
                borderRadius: 8,
                padding: '5px 8px',
              }}
            >
              🔒 Stored on your device only
            </div>
          </div>

          {/* Session list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
            {sessions.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '32px 16px',
                  fontSize: 13,
                  color: '#8b949e',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                No history yet.
                <br />Ask your first question!
              </div>
            ) : (
              <>
                <p
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: '#8b949e',
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '4px 8px 10px',
                  }}
                >
                  Recent · {sessions.length} sessions
                </p>
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="sidebar-item"
                    onClick={() => {
                      setActiveSessionId(session.id);
                      setSidebarOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      padding: '10px 10px',
                      borderRadius: 10,
                      cursor: 'pointer',
                      marginBottom: 2,
                      background: session.id === activeSessionId ? 'rgba(45,212,191,0.1)' : 'transparent',
                      border: `1px solid ${session.id === activeSessionId ? 'rgba(45,212,191,0.2)' : 'transparent'}`,
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      if (session.id !== activeSessionId) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (session.id !== activeSessionId) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          marginBottom: 3,
                        }}
                      >
                        <span style={{ fontSize: 10 }}>
                          {session.subject === 'Mathematics' ? '📐'
                            : session.subject === 'Physics' ? '⚡'
                              : '🧪'}
                        </span>
                        <span
                          style={{
                            fontSize: 9,
                            fontFamily: "'DM Mono', monospace",
                            color: session.id === activeSessionId ? '#2dd4bf' : '#8b949e',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {session.subject}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          color: session.id === activeSessionId ? '#e6edf3' : '#8b949e',
                          fontFamily: "'DM Sans', sans-serif",
                          lineHeight: 1.4,
                          margin: 0,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const,
                        }}
                      >
                        {session.title}
                      </p>
                      <span
                        style={{
                          fontSize: 10,
                          color: '#8b949e',
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        {session.messages.filter((m) => m.role === 'user').length}Q
                      </span>
                    </div>
                    <button
                      className="del-btn"
                      onClick={(e) => deleteSession(session.id, e)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#8b949e',
                        cursor: 'pointer',
                        fontSize: 13,
                        padding: '0 2px',
                        marginLeft: 4,
                        opacity: 0,
                        transition: 'opacity 0.15s',
                        flexShrink: 0,
                      }}
                      title="Delete session"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Sidebar footer */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #21262d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: '#8b949e',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {totalQuestions} questions
            </span>
            {sessions.length > 0 && (
              <button
                onClick={clearAllHistory}
                style={{
                  background: 'none',
                  border: '1px solid #30363d',
                  borderRadius: 6,
                  color: '#f87171',
                  fontSize: 11,
                  fontFamily: "'DM Mono', monospace",
                  cursor: 'pointer',
                  padding: '4px 8px',
                  letterSpacing: '0.04em',
                }}
              >
                Clear all
              </button>
            )}
          </div>
        </aside>

        {/* ── MAIN AREA ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', marginLeft: 0 }}>

          {/* Header */}
          <ChatHeader
            classLevel={classLevel}
            subject={subject}
            examMode={examMode}
            onClassChange={setClassLevel}
            onSubjectChange={setSubject}
            onExamModeChange={setExamMode}
          />

          {/* Toolbar below header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 8,
              padding: '10px 24px',
              borderBottom: '1px solid #21262d',
              background: '#0d1117',
            }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: '#161b22',
                border: '1px solid #21262d',
                borderRadius: 8,
                color: '#8b949e',
                fontSize: 12,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                padding: '6px 12px',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#30363d';
                e.currentTarget.style.color = '#e6edf3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#21262d';
                e.currentTarget.style.color = '#8b949e';
              }}
            >
              ☰ History
              {sessions.length > 0 && (
                <span
                  style={{
                    background: '#21262d',
                    borderRadius: 999,
                    padding: '1px 7px',
                    fontSize: 10,
                    fontFamily: "'DM Mono', monospace",
                    color: '#2dd4bf',
                  }}
                >
                  {sessions.length}
                </span>
              )}
            </button>

            {activeSession && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  color: '#8b949e',
                  fontFamily: "'DM Sans', sans-serif",
                  overflow: 'hidden',
                }}
              >
                <span style={{ color: '#30363d' }}>·</span>
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: 300,
                  }}
                >
                  {activeSession.title}
                </span>
              </div>
            )}

            <div style={{ marginLeft: 'auto' }}>
              <button
                onClick={createNewSession}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'transparent',
                  border: '1px solid #21262d',
                  borderRadius: 8,
                  color: '#8b949e',
                  fontSize: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: 'pointer',
                  padding: '6px 12px',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2dd4bf40';
                  e.currentTarget.style.color = '#2dd4bf';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#21262d';
                  e.currentTarget.style.color = '#8b949e';
                }}
              >
                ＋ New session
              </button>
            </div>
          </div>

          {/* Messages */}
          <main
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 'clamp(16px, 4vw, 32px) clamp(12px, 4vw, 24px)',
              maxWidth: 860,
              width: '100%',
              margin: '0 auto',
              alignSelf: 'center',
            }}
          >
            <ErrorBoundary onRetry={() => setError(null)}>
              {messages.length === 0 ? (
                <EmptyChatState
                  onExampleClick={handleSubmit}
                  questionCount={totalQuestions}
                />
              ) : (
                <ChatMessages
                  messages={messages}
                  isLoading={isLoading}
                />
              )}
            </ErrorBoundary>

            {error && (
              <div
                style={{
                  marginTop: 16,
                  padding: '14px 18px',
                  background: 'rgba(248,113,113,0.08)',
                  border: '1px solid rgba(248,113,113,0.2)',
                  borderRadius: 12,
                  fontSize: 13,
                  color: '#f87171',
                  fontFamily: "'DM Sans', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>⚠️</span> {error}
              </div>
            )}

            <div ref={bottomRef} />
          </main>

          {/* Input */}
          <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}