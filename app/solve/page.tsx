// app/Solve/page.tsx
// ─────────────────────────────────────────────────────────────────────────
// This is the main solver page — the screen students actually use.
// It lives at the URL /solve (because it's in app/Solve/page.tsx).
//
// This file is the "conductor" — it doesn't do rendering itself, it
// manages STATE (data) and passes it down to your components as props.
// Think of it like a manager who coordinates workers (components).
// ─────────────────────────────────────────────────────────────────────────

'use client';
// ↑ This line is CRITICAL. By default, all files in Next.js App Router
// are "Server Components" — they run on the server and can't use React
// hooks like useState or browser events like onClick.
// 'use client' tells Next.js: "this component runs in the browser."
// Rule of thumb: any file that uses useState, useEffect, or event
// handlers needs 'use client' at the very top.

import { useState, useEffect, useRef } from 'react';
// useRef is a third hook — it lets you directly reference a DOM element
// (like a div) without causing a re-render. We'll use it to auto-scroll.

import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import ChatMessages from '../components/ChatMessages';
import EmptyChatState from '../components/EmptyChatState';

// ─── TypeScript Types ─────────────────────────────────────────────────────
// TypeScript lets you define the "shape" of your data so you catch
// mistakes before they happen. This is what one solution step looks like.
// The ? after a key means it's optional — the model might not always
// include a calculation, for example.

type Step = {
  stepNumber: number;
  title: string;
  explanation: string;
  calculation?: string;
};

// This is the full shape of one complete AI response from our route.js.
// Every field maps to what we told the model to return in our system prompt.
type SolverResult = {
  steps: Step[];
  pedagogicalNote: string;
  commonMistake: string;
  examTip: string;
};

// This represents one full message in the conversation — either from
// the student (role: 'user') or from the AI (role: 'assistant').
type Message = {
  id: string;           // unique ID so React can track each message
  role: 'user' | 'assistant';
  content: string | SolverResult; // user sends a string, AI returns a SolverResult
  timestamp: string;
};

// ─── Main Component ───────────────────────────────────────────────────────

export default function SolvePage() {
  // 'export default' means this is the main thing this file exports.
  // Next.js automatically uses the default export of page.tsx as the page.

  // ── State: configuration (from ChatHeader dropdowns) ──────────────────
  // These three values come from the dropdowns at the top of the page.
  // We store them here (the parent) so we can pass them to route.js
  // when the student submits a question.
  const [classLevel, setClassLevel] = useState('Class 10');
  const [subject, setSubject] = useState('Mathematics');
  const [examMode, setExamMode] = useState('Board Exam (CBSE)');

  // ── State: conversation history ────────────────────────────────────────
  // This array holds every message in the conversation — both the student's
  // questions and the AI's answers, in order. It starts empty.
  // When a student asks something, we push their message in.
  // When AI responds, we push the response in. ChatMessages.tsx reads this
  // array and renders each message as a card.
  const [messages, setMessages] = useState<Message[]>([]);

  // ── State: loading ─────────────────────────────────────────────────────
  // A simple true/false flag. When we're waiting for the AI to respond,
  // isLoading is true — we use this to show a spinner and disable the
  // input so the student can't spam-submit multiple questions.
  const [isLoading, setIsLoading] = useState(false);

  // ── State: error ───────────────────────────────────────────────────────
  // If the API call fails (bad network, model loading, etc.), we store the
  // error message here so we can display it to the student.
  const [error, setError] = useState<string | null>(null);

  // ── Ref: scroll anchor ─────────────────────────────────────────────────
  // useRef gives us a direct reference to a DOM element — in this case,
  // an invisible div at the bottom of the message list. When a new message
  // arrives, we scroll to this div so the student always sees the latest reply.
  // This does NOT cause a re-render when it changes (unlike useState).
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── Effect: auto-scroll ────────────────────────────────────────────────
  // This runs every time the messages array changes (new message added).
  // scrollIntoView() is a browser built-in that scrolls the page until
  // the referenced element is visible. 'smooth' makes it animate nicely.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    // The ?. is "optional chaining" — if bottomRef.current is null
    // (the component hasn't mounted yet), it doesn't crash, it just skips.
  }, [messages]);

  // ── Handler: handleSubmit ──────────────────────────────────────────────
  // This function runs when the student clicks "Solve" in ChatInput.
  // It's the entire flow: validate → add user message → call API →
  // receive response → add AI message → handle errors.
  //
  // It's async because it contains await calls (the fetch to our API).
  const handleSubmit = async (question: string) => {
    // Guard: don't do anything if loading or question is empty
    if (isLoading || !question.trim()) return;

    // Clear any previous error when a new question is submitted
    setError(null);

    // Build the user's message object — note the unique ID using Date.now()
    // which gives us the current timestamp as a number (always unique enough)
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date().toISOString(),
    };

    // Add the user's message to the conversation.
    // IMPORTANT: we use the "functional update" form of setState here.
    // Instead of setMessages([...messages, userMessage]), we pass a function.
    // This is safer because if React batches multiple updates, we always
    // work from the latest version of messages, not a stale snapshot.
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // This is the actual call to our route.js.
      // fetch() is a built-in browser function for making HTTP requests.
      // We await it because the network call takes time.
      const response = await fetch('/api/chat', {
        method: 'POST',    // must match 'export async function POST' in route.js
        headers: {
          'Content-Type': 'application/json',  // tells the server our body is JSON
        },
        // JSON.stringify converts our JS object into a JSON string
        // because HTTP request bodies can only contain text, not objects.
        body: JSON.stringify({
          question,
          classLevel,
          subject,
          examMode,
        }),
      });

      // Parse the response body from route.js.
      // Our route.js returns { result: parsedResult } on success
      // or { error: '...' } on failure.
      const data = await response.json();

      // Handle model-loading state (503 from Hugging Face warmup)
      if (response.status === 503) {
        setError(data.error || 'Model is warming up. Please try again in 30 seconds.');
        setIsLoading(false);
        return;
      }

      // Handle any other non-success response
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      // Build the AI's message object from the parsed result
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.result,   // this is a SolverResult object
        timestamp: new Date().toISOString(),
      };

      // Add the AI's response to the conversation history
      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      // Something failed — show the error to the student
      const message = err instanceof Error ? err.message : 'Unexpected error occurred.';
      setError(message);
    } finally {
      // 'finally' runs whether the try succeeded OR the catch ran.
      // We ALWAYS want to turn off loading when we're done — whether
      // we succeeded or failed. Without finally, a failed request would
      // leave the button disabled forever.
      setIsLoading(false);
    }
  };

  // ── Handler: handleExampleClick ────────────────────────────────────────
  // When the student clicks one of the example chips in EmptyChatState,
  // we treat it exactly like a form submission — just with a pre-filled question.
  const handleExampleClick = (exampleQuestion: string) => {
    handleSubmit(exampleQuestion);
  };

  // ── Render ─────────────────────────────────────────────────────────────
  // This is what actually appears on screen. JSX looks like HTML but it's
  // JavaScript under the hood. Every className uses Tailwind CSS utility classes.
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/*
        flex flex-col  → stack children vertically
        h-screen       → take up the full browser window height
        bg-gray-50     → very light grey background
      */}

      {/* ── Header (dropdowns for class, subject, exam mode) ── */}
      <ChatHeader
        classLevel={classLevel}
        subject={subject}
        examMode={examMode}
        // When the student changes a dropdown, ChatHeader calls these
        // callbacks and we update our state here in the parent.
        onClassChange={setClassLevel}
        onSubjectChange={setSubject}
        onExamModeChange={setExamMode}
      />

      {/* ── Message area (scrollable middle section) ── */}
      <main className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full">
        {/*
          flex-1         → take up all remaining vertical space
          overflow-y-auto → scroll vertically when content overflows
          max-w-4xl      → don't let content get too wide on big screens
          mx-auto        → center horizontally
        */}

        {/* Show empty state when no messages yet, otherwise show messages */}
        {messages.length === 0 ? (
          <EmptyChatState onExampleClick={handleExampleClick} questionCount={messages.filter(m => m.role === 'user').length} />
        ) : (
          <ChatMessages messages={messages} isLoading={isLoading} />
        )}

        {/* Error banner — only shown when error is not null */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Invisible scroll anchor — useEffect scrolls here on new messages */}
        <div ref={bottomRef} />
      </main>

      {/* ── Input bar (pinned to the bottom) ── */}
      <ChatInput
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}