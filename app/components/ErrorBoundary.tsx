// app/components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

type Props = {
    children: ReactNode;
    onRetry?: () => void;
};

type State = {
    hasError: boolean;
    errorMessage: string;
};

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            errorMessage: error?.message || 'Something went wrong.',
        };
    }

    handleRetry = () => {
        this.setState({ hasError: false, errorMessage: '' });
        this.props.onRetry?.();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '64px 24px',
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                >
                    {/* Icon */}
                    <div
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 16,
                            background: 'rgba(248,113,113,0.08)',
                            border: '1px solid rgba(248,113,113,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>

                    {/* Heading */}
                    <h3
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: '#e6edf3',
                            marginBottom: 8,
                            letterSpacing: '-0.01em',
                        }}
                    >
                        Something went wrong
                    </h3>

                    {/* Message */}
                    <p
                        style={{
                            fontSize: 13,
                            color: '#8b949e',
                            lineHeight: 1.6,
                            maxWidth: 360,
                            marginBottom: 8,
                        }}
                    >
                        The solver ran into an unexpected error. This is usually a
                        temporary issue — try asking your question again.
                    </p>

                    {/* Error detail (collapsed, for debugging) */}
                    {this.state.errorMessage && (
                        <details
                            style={{
                                marginBottom: 24,
                                maxWidth: 400,
                                width: '100%',
                            }}
                        >
                            <summary
                                style={{
                                    fontSize: 11,
                                    color: '#8b949e',
                                    fontFamily: "'DM Mono', monospace",
                                    letterSpacing: '0.04em',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                }}
                            >
                                Show error details
                            </summary>
                            <div
                                style={{
                                    marginTop: 8,
                                    background: '#0d1117',
                                    border: '1px solid #30363d',
                                    borderRadius: 8,
                                    padding: '10px 14px',
                                    fontSize: 11,
                                    fontFamily: "'DM Mono', monospace",
                                    color: '#f87171',
                                    textAlign: 'left',
                                    wordBreak: 'break-word',
                                    lineHeight: 1.6,
                                }}
                            >
                                {this.state.errorMessage}
                            </div>
                        </details>
                    )}

                    {/* Retry button */}
                    <button
                        onClick={this.handleRetry}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            background: '#161b22',
                            border: '1px solid #30363d',
                            borderRadius: 10,
                            color: '#e6edf3',
                            fontSize: 13,
                            fontWeight: 500,
                            fontFamily: "'DM Sans', sans-serif",
                            padding: '10px 22px',
                            cursor: 'pointer',
                            transition: 'border-color 0.2s, background 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#2dd4bf40';
                            e.currentTarget.style.background = 'rgba(45,212,191,0.06)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#30363d';
                            e.currentTarget.style.background = '#161b22';
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}