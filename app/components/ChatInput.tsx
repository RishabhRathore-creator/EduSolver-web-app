// app/components/ChatInput.tsx
'use client';

import { useState, KeyboardEvent } from 'react';

type ChatInputProps = {
  onSubmit: (question: string) => void;
  // ↑ When the student hits Send, this component calls onSubmit with
  // the question string. The parent (Solve/page.tsx) handles the API call.
  isLoading: boolean;
  // ↑ When true, we disable the button and input to prevent double-submissions.
};

export default function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  // This state lives INSIDE ChatInput — the parent doesn't need to know
  // what the user is currently typing, only what they finally submit.
  // This is an important judgment call: when should state live in the
  // parent vs the child? Ask yourself: "does anyone else need this value?"
  // If no, keep it local.
  const [inputValue, setInputValue] = useState('');

  // This function runs when the student clicks Send or presses Enter.
  // It validates, calls onSubmit to notify the parent, then clears itself.
  const handleSend = () => {
    // trim() removes leading/trailing whitespace — so a string of just
    // spaces doesn't count as a real question.
    if (!inputValue.trim() || isLoading) return;

    onSubmit(inputValue.trim());
    setInputValue(''); // Clear the input after submitting — clean UX
  };

  // This runs on every keypress inside the textarea.
  // We want Enter to submit, but Shift+Enter to add a new line
  // (standard behaviour for chat apps).
  // e.key tells us which key was pressed. e.shiftKey is true if
  // the Shift key was held at the same time.
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Stops the default browser behavior (adding a newline)
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-4">
      <div className="max-w-4xl mx-auto">

        {/* Hint text */}
        <p className="text-xs text-gray-400 mb-2">
          Press Enter to send · Shift+Enter for new line
        </p>

        <div className="flex gap-3 items-end">
          {/*
            items-end → aligns the button to the bottom of the textarea
            as the textarea grows taller when the student types more.
          */}

          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            // ↑ Every keystroke updates our local state.
            // This makes it a "controlled input" — React always knows
            // exactly what's in the box.
            onKeyDown={handleKeyDown}
            placeholder="Ask any STEM question... e.g. Solve x² − 5x + 6 = 0"
            rows={3}
            disabled={isLoading}
            // disabled prevents typing while the AI is responding
            className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:bg-gray-50 disabled:text-gray-400 transition-all"
          />

          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            // ↑ Also disabled when the input is empty — no point sending nothing.
            className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm flex items-center gap-2 whitespace-nowrap"
          >
            {/* Conditionally show spinner or send icon based on loading state */}
            {isLoading ? (
              <>
                {/* This CSS spinner uses a border trick — a circle with one
                    colored side that rotates. The 'animate-spin' class is
                    built into Tailwind and applies a 1-second spin animation. */}
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Solving...
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
    </div>
  );
}