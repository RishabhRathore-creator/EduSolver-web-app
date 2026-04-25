// app/components/SampleDemo.tsx
'use client';
import { useState } from 'react';

const SAMPLES = [
    {
        subject: 'Mathematics',
        label: 'Math',
        color: '#2dd4bf',
        question: 'Prove that √2 is irrational. (Class 10, CBSE)',
        steps: [
            {
                number: '01',
                title: 'Assume the opposite',
                explanation: 'Assume √2 is rational. So √2 = p/q where p, q are integers with HCF(p,q) = 1.',
                calc: null,
            },
            {
                number: '02',
                title: 'Square both sides',
                explanation: 'Squaring both sides gives us p² = 2q². This means p² is even, so p must be even.',
                calc: '2 = p²/q²  →  p² = 2q²',
            },
            {
                number: '03',
                title: 'Substitute p = 2k',
                explanation: 'Let p = 2k. Then 4k² = 2q², so q² = 2k². This means q² is even, so q is also even.',
                calc: 'p = 2k  →  4k² = 2q²  →  q² = 2k²',
            },
            {
                number: '04',
                title: 'Reach the contradiction',
                explanation: 'Both p and q are even — contradicting HCF(p,q) = 1. So our assumption was wrong. √2 is irrational. ∎',
                calc: null,
            },
        ],
        pedagogicalNote: 'This is a classic proof by contradiction. The key insight is that if a perfect square is even, its square root must also be even.',
        commonMistake: 'Students often forget to state HCF(p,q) = 1 at the start — without this, the contradiction doesn\'t hold.',
        examTip: 'In CBSE Board, write "Let √2 be rational" explicitly. The examiner awards 1 mark just for the correct assumption setup.',
    },
    {
        subject: 'Physics',
        label: 'Physics',
        color: '#818cf8',
        question: 'A ball is thrown vertically upward at 20 m/s. Find the max height. (Class 11)',
        steps: [
            {
                number: '01',
                title: 'Identify known values',
                explanation: 'Initial velocity u = 20 m/s (upward). At maximum height, final velocity v = 0. Acceleration a = −10 m/s² (gravity downward).',
                calc: 'u = 20 m/s,  v = 0,  a = −10 m/s²',
            },
            {
                number: '02',
                title: 'Choose the right equation',
                explanation: 'We know u, v, and a — and want to find displacement s. Use the third equation of motion.',
                calc: 'v² = u² + 2as',
            },
            {
                number: '03',
                title: 'Substitute and solve',
                explanation: 'Substituting values into the equation and solving for s gives the maximum height.',
                calc: '0 = (20)² + 2(−10)s  →  s = 400/20  →  s = 20 m',
            },
            {
                number: '04',
                title: 'State the answer',
                explanation: 'The maximum height reached by the ball is 20 metres above the point of projection.',
                calc: 'h_max = 20 m',
            },
        ],
        pedagogicalNote: 'At the highest point, the ball momentarily stops (v = 0) before reversing direction. This is the key insight for choosing the right equation.',
        commonMistake: 'Taking g = +10 instead of −10 m/s² when upward is positive. Always define your sign convention first.',
        examTip: 'JEE often asks for time to reach max height too — use v = u + at → t = u/g = 20/10 = 2 seconds.',
    },
    {
        subject: 'Chemistry',
        label: 'Chemistry',
        color: '#34d399',
        question: 'What happens when sodium reacts with water? Write the balanced equation.',
        steps: [
            {
                number: '01',
                title: 'Identify the reaction type',
                explanation: 'Sodium is an alkali metal. When it reacts with water, it forms a metal hydroxide and releases hydrogen gas. This is a displacement reaction.',
                calc: null,
            },
            {
                number: '02',
                title: 'Write the unbalanced equation',
                explanation: 'Sodium (Na) reacts with water (H₂O) to produce sodium hydroxide (NaOH) and hydrogen gas (H₂).',
                calc: 'Na + H₂O → NaOH + H₂',
            },
            {
                number: '03',
                title: 'Balance the equation',
                explanation: 'Check atoms on both sides. H: left has 2, right has 3. Balance by multiplying Na and NaOH by 2 and H₂O by 2.',
                calc: '2Na + 2H₂O → 2NaOH + H₂  ✓',
            },
            {
                number: '04',
                title: 'Add state symbols',
                explanation: 'Sodium is solid, water is liquid, sodium hydroxide dissolves in water (aqueous), and hydrogen is released as gas.',
                calc: '2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)',
            },
        ],
        pedagogicalNote: 'This reaction is highly exothermic — enough heat is released to ignite the hydrogen gas produced. This explains why sodium must be stored in kerosene oil.',
        commonMistake: 'Writing NaOH₂ instead of NaOH + H₂. Remember sodium hydroxide and hydrogen are two separate products.',
        examTip: 'CBSE always asks for state symbols in balanced equations. Missing them costs 1 mark. Learn (s), (l), (aq), (g) for all common reactions.',
    },
];

export default function SampleDemo() {
    const [activeTab, setActiveTab] = useState(0);
    const sample = SAMPLES[activeTab];

    return (
        <section style={{ padding: '100px 24px', borderTop: '1px solid #21262d' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>

                {/* Section header */}
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <p style={{
                        fontSize: 11,
                        fontWeight: 500,
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#2dd4bf',
                        marginBottom: 12,
                    }}>
                        Try it now — no sign up needed
                    </p>
                    <h2 style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 38,
                        fontWeight: 400,
                        letterSpacing: '-0.025em',
                        color: '#e6edf3',
                        lineHeight: 1.15,
                    }}>
                        See a real solution
                    </h2>
                    <p style={{ fontSize: 15, color: '#8b949e', marginTop: 12, lineHeight: 1.6 }}>
                        Pick a subject and see exactly how EduSolver breaks down a problem.
                    </p>
                </div>

                {/* Subject tabs */}
                <div style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 28,
                    background: '#161b22',
                    padding: 6,
                    borderRadius: 14,
                    border: '1px solid #21262d',
                    width: 'fit-content',
                    margin: '0 auto 28px',
                }}>
                    {SAMPLES.map((s, i) => (
                        <button
                            key={s.subject}
                            onClick={() => setActiveTab(i)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 10,
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 500,
                                fontFamily: "'DM Sans', sans-serif",
                                transition: 'all 0.2s ease',
                                background: activeTab === i ? s.color : 'transparent',
                                color: activeTab === i ? '#0d1117' : '#8b949e',
                                boxShadow: activeTab === i ? `0 4px 16px ${s.color}40` : 'none',
                            }}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Question bubble */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: 20,
                }}>
                    <div style={{
                        background: `linear-gradient(135deg, ${sample.color}, ${sample.color}cc)`,
                        borderRadius: '20px 20px 4px 20px',
                        padding: '12px 20px',
                        maxWidth: '75%',
                        fontSize: 14,
                        color: '#0d1117',
                        fontWeight: 500,
                        fontFamily: "'DM Sans', sans-serif",
                        lineHeight: 1.5,
                        boxShadow: `0 4px 20px ${sample.color}30`,
                    }}>
                        {sample.question}
                    </div>
                </div>

                {/* Solution card */}
                <div style={{
                    background: '#161b22',
                    border: '1px solid #21262d',
                    borderRadius: 16,
                    overflow: 'hidden',
                }}>
                    {/* Card header */}
                    <div style={{
                        padding: '12px 20px',
                        borderBottom: '1px solid #21262d',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                    }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: sample.color }} />
                        <span style={{
                            fontSize: 11,
                            fontFamily: "'DM Mono', monospace",
                            color: sample.color,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                        }}>
                            EduSolver · {sample.subject} · Board Exam Mode
                        </span>
                    </div>

                    <div style={{ padding: '24px 20px' }}>
                        {/* Steps */}
                        <p style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: '#8b949e',
                            fontFamily: "'DM Mono', monospace",
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: 16,
                        }}>
                            Step-by-Step Solution
                        </p>

                        {sample.steps.map((step, i) => (
                            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
                                <div style={{
                                    flexShrink: 0,
                                    width: 34,
                                    height: 34,
                                    borderRadius: 9,
                                    background: `${sample.color}20`,
                                    border: `1px solid ${sample.color}40`,
                                    color: sample.color,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: "'DM Mono', monospace",
                                }}>
                                    {step.number}
                                </div>
                                <div style={{
                                    flex: 1,
                                    background: '#0d1117',
                                    borderRadius: 12,
                                    border: '1px solid #21262d',
                                    padding: '14px 16px',
                                }}>
                                    <h4 style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3', margin: '0 0 6px', fontFamily: "'DM Sans', sans-serif" }}>
                                        {step.title}
                                    </h4>
                                    <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.6, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                                        {step.explanation}
                                    </p>
                                    {step.calc && (
                                        <div style={{
                                            marginTop: 10,
                                            background: '#161b22',
                                            border: '1px solid #30363d',
                                            borderRadius: 8,
                                            padding: '10px 14px',
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 12,
                                            color: sample.color,
                                            letterSpacing: '0.02em',
                                        }}>
                                            {step.calc}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Insight cards */}
                        <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
                            {[
                                { label: '📖 Pedagogical Note', text: sample.pedagogicalNote, color: sample.color },
                                { label: '⚠️ Common Mistake', text: sample.commonMistake, color: '#f87171' },
                                { label: '🎯 Exam Tip', text: sample.examTip, color: '#fbbf24' },
                            ].map((card) => (
                                <div key={card.label} style={{
                                    border: `1px solid ${card.color}25`,
                                    borderLeft: `3px solid ${card.color}80`,
                                    borderRadius: '0 10px 10px 0',
                                    padding: '12px 16px',
                                }}>
                                    <p style={{
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: card.color,
                                        fontFamily: "'DM Mono', monospace",
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        marginBottom: 6,
                                    }}>
                                        {card.label}
                                    </p>
                                    <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.6, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                                        {card.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA below demo */}
                <div style={{ textAlign: 'center', marginTop: 36 }}>
                    <p style={{ fontSize: 14, color: '#8b949e', marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
                        Ask your own question — get solutions tailored to your class and exam.
                    </p>
                    <a
                        href="#"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            background: '#2dd4bf',
                            color: '#0d1117',
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: 15,
                            padding: '13px 28px',
                            borderRadius: 12,
                            textDecoration: 'none',
                            transition: 'background 0.2s, transform 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.background = '#5eead4';
                            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.background = '#2dd4bf';
                            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                        }}
                    >
                        Start Solving Free →
                    </a>
                </div>
            </div>
        </section>
    );
}