// app/components/SolutionPreview.tsx
// A static mock preview of a solution card shown on the landing page hero.

export default function SolutionPreview() {
    return (
        <div
            style={{
                maxWidth: 680,
                margin: '56px auto 0',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid #21262d',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                fontFamily: "'DM Sans', sans-serif",
            }}
        >
            {/* Window chrome bar */}
            <div
                style={{
                    background: '#161b22',
                    borderBottom: '1px solid #21262d',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                {/* Traffic light dots */}
                <div style={{ display: 'flex', gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                </div>
                <div
                    style={{
                        flex: 1,
                        background: '#0d1117',
                        border: '1px solid #21262d',
                        borderRadius: 6,
                        padding: '4px 12px',
                        fontSize: 11,
                        color: '#8b949e',
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.02em',
                    }}
                >
                    edusolver.app/solve
                </div>
            </div>

            {/* Mock chat content */}
            <div style={{ background: '#0d1117', padding: '24px 20px', maxHeight: 340, overflow: 'hidden' }}>

                {/* User question bubble */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                    <div
                        style={{
                            background: '#21262d',
                            border: '1px solid #30363d',
                            borderRadius: '14px 14px 4px 14px',
                            padding: '10px 16px',
                            maxWidth: '75%',
                            fontSize: 13,
                            color: '#e6edf3',
                            lineHeight: 1.5,
                        }}
                    >
                        Prove that √2 is irrational. (Class 10, CBSE)
                    </div>
                </div>

                {/* AI response card */}
                <div
                    style={{
                        background: '#161b22',
                        border: '1px solid #21262d',
                        borderRadius: '4px 14px 14px 14px',
                        overflow: 'hidden',
                    }}
                >
                    {/* Response header */}
                    <div
                        style={{
                            padding: '10px 16px',
                            borderBottom: '1px solid #21262d',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: '#2dd4bf',
                            }}
                        />
                        <span
                            style={{
                                fontSize: 11,
                                fontFamily: "'DM Mono', monospace",
                                color: '#2dd4bf',
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                            }}
                        >
                            EduSolver · Board Exam Mode
                        </span>
                    </div>

                    <div style={{ padding: '16px' }}>
                        {/* Step 1 */}
                        <div style={{ marginBottom: 14 }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <div
                                    style={{
                                        background: 'rgba(45,212,191,0.12)',
                                        border: '1px solid rgba(45,212,191,0.2)',
                                        borderRadius: 6,
                                        padding: '2px 8px',
                                        fontSize: 10,
                                        fontFamily: "'DM Mono', monospace",
                                        color: '#2dd4bf',
                                        flexShrink: 0,
                                        marginTop: 2,
                                    }}
                                >
                                    Step 1
                                </div>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 600, color: '#e6edf3', margin: '0 0 4px' }}>
                                        Assume the opposite (Proof by Contradiction)
                                    </p>
                                    <p style={{ fontSize: 12, color: '#8b949e', margin: 0, lineHeight: 1.6 }}>
                                        Assume √2 is rational. Then √2 = p/q where p, q are integers with no common factors (HCF = 1).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div style={{ marginBottom: 14 }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <div
                                    style={{
                                        background: 'rgba(45,212,191,0.12)',
                                        border: '1px solid rgba(45,212,191,0.2)',
                                        borderRadius: 6,
                                        padding: '2px 8px',
                                        fontSize: 10,
                                        fontFamily: "'DM Mono', monospace",
                                        color: '#2dd4bf',
                                        flexShrink: 0,
                                        marginTop: 2,
                                    }}
                                >
                                    Step 2
                                </div>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 600, color: '#e6edf3', margin: '0 0 4px' }}>
                                        Square both sides
                                    </p>
                                    <p style={{ fontSize: 12, color: '#8b949e', margin: 0, lineHeight: 1.6 }}>
                                        2 = p²/q² → p² = 2q². So p² is even, which means p must also be even.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Blurred step 3 — teaser effect */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ filter: 'blur(3px)', opacity: 0.4 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                    <div
                                        style={{
                                            background: 'rgba(45,212,191,0.12)',
                                            border: '1px solid rgba(45,212,191,0.2)',
                                            borderRadius: 6,
                                            padding: '2px 8px',
                                            fontSize: 10,
                                            fontFamily: "'DM Mono', monospace",
                                            color: '#2dd4bf',
                                            flexShrink: 0,
                                        }}
                                    >
                                        Step 3
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 12, fontWeight: 600, color: '#e6edf3', margin: '0 0 4px' }}>
                                            Derive the contradiction
                                        </p>
                                        <p style={{ fontSize: 12, color: '#8b949e', margin: 0 }}>
                                            Let p = 2k. Then 4k² = 2q² → q² = 2k²...
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Sign-up CTA overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(to bottom, transparent, rgba(13,17,23,0.95))',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 11,
                                        fontFamily: "'DM Mono', monospace",
                                        color: '#2dd4bf',
                                        letterSpacing: '0.06em',
                                        background: 'rgba(45,212,191,0.12)',
                                        border: '1px solid rgba(45,212,191,0.25)',
                                        borderRadius: 999,
                                        padding: '5px 14px',
                                    }}
                                >
                                    Sign up to see full solution →
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}