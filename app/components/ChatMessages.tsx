// app/components/ChatMessages.tsx
'use client';

// We re-use the same types we defined in Solve/page.tsx.
// In a real project you'd put these in a separate types.ts file
// and import from there — but for now let's define them here too.
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
  timestamp: Date;
};

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
};

// ── Sub-component: UserBubble ─────────────────────────────────────────────
// We define small helper components right in the same file when they're
// only used here and are simple enough. This keeps related code together.
// It takes a single string and renders it as a chat bubble on the right.

function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end mb-6">
      <div className="bg-teal-500 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-xl text-sm leading-relaxed shadow-sm">
        {content}
      </div>
    </div>
  );
}

// ── Sub-component: StepCard ───────────────────────────────────────────────
// Renders one step from the model's response. The stepNumber is displayed
// as a colored circle, and the calculation (if it exists) gets a special
// monospace code-style box — important for maths readability.

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex gap-4 mb-4">
      {/* Step number circle */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center">
        {step.stepNumber}
      </div>

      <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <h4 className="font-semibold text-gray-800 text-sm mb-1">{step.title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{step.explanation}</p>

        {/* Only render the calculation box if the model provided one.
            The && operator short-circuits: if step.calculation is falsy
            (undefined, empty string), nothing renders. This is the React
            way of saying "render this only if the condition is true." */}
        {step.calculation && (
          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 font-mono text-sm text-slate-700">
            {step.calculation}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-component: AssistantCard ──────────────────────────────────────────
// Renders the full AI response: all steps + the three pedagogical sections.
// This component receives a SolverResult object (not a raw string).

function AssistantCard({ result }: { result: SolverResult }) {
  return (
    <div className="mb-8">

      {/* Steps section */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-4">
          Step-by-Step Solution
        </h3>

        {/* .map() is how you turn an array into JSX in React.
            It loops over result.steps and calls our StepCard function
            for each one, returning JSX. The 'key' prop is required by
            React whenever you create elements from an array — React uses
            it internally to track which element is which when the list
            updates. Always use a stable unique value (not the array index
            if the list can change order). */}
        {result.steps.map((step) => (
          <StepCard key={step.stepNumber} step={step} />
        ))}
      </div>

      {/* Pedagogical sections — three colored info boxes */}
      <div className="grid grid-cols-1 gap-3">

        {/* Pedagogical Note — teal left border */}
        {result.pedagogicalNote && (
          <div className="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl px-4 py-3">
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-1">
              📖 Pedagogical Note
            </p>
            <p className="text-sm text-teal-800 leading-relaxed">
              {result.pedagogicalNote}
            </p>
          </div>
        )}

        {/* Common Mistake — red left border */}
        {result.commonMistake && (
          <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl px-4 py-3">
            <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1">
              ⚠️ Common Mistake
            </p>
            <p className="text-sm text-red-800 leading-relaxed">
              {result.commonMistake}
            </p>
          </div>
        )}

        {/* Exam Tip — amber left border */}
        {result.examTip && (
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-4 py-3">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">
              🎯 Exam Tip
            </p>
            <p className="text-sm text-amber-800 leading-relaxed">
              {result.examTip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-component: LoadingDots ────────────────────────────────────────────
// A simple animated "thinking" indicator shown while the AI is responding.
// The three dots use CSS animation-delay to stagger their bounce,
// creating the classic typing indicator effect.

function LoadingDots() {
  return (
    <div className="flex items-center gap-1 mb-6 px-2">
      <span className="text-xs text-gray-400 mr-2">EduSolver is thinking</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
          // animationDelay staggers each dot by 0.15s so they bounce in sequence
        />
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <div className="space-y-2">
      {/* space-y-2 adds vertical gap between each child element */}

      {messages.map((message) => {
        // For each message, we check the role and render the appropriate component.
        if (message.role === 'user') {
          // User messages are always strings — the student typed them.
          // We cast content as string since we know this is true for 'user' role.
          return <UserBubble key={message.id} content={message.content as string} />;
        }

        // Assistant messages contain a SolverResult object.
        // typeof check: if the model somehow returned a plain string
        // (maybe it didn't format JSON correctly), we show it as-is
        // rather than crashing.
        if (typeof message.content === 'string') {
          return (
            <div key={message.id} className="bg-white rounded-xl p-4 border border-gray-100 text-sm text-gray-700 mb-6">
              {message.content}
            </div>
          );
        }

        return (
          <AssistantCard
            key={message.id}
            result={message.content as SolverResult}
          />
        );
      })}

      {/* Show the loading animation at the bottom when waiting for AI */}
      {isLoading && <LoadingDots />}
    </div>
  );
}