// app/components/EmptyChatState.tsx
'use client';

type EmptyChatStateProps = {
  onExampleClick: (question: string) => void;
};

// A list of example questions — defined outside the component because
// it never changes and doesn't need to be recreated on every render.
const EXAMPLE_QUESTIONS = [
  'Solve x² − 5x + 6 = 0 using the factoring method',
  'Find the HCF of 48 and 72 using prime factorisation',
  'What is the area of a circle with radius 7 cm?',
  'Simplify: (a + b)² − (a − b)²',
  'Explain Newton\'s second law with an example',
];

export default function EmptyChatState({ onExampleClick }: EmptyChatStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center px-4">

      {/* Icon and heading */}
      <div className="text-5xl mb-4">🎓</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Ask EduSolver anything
      </h2>
      <p className="text-gray-500 text-sm mb-8 max-w-md">
        Get step-by-step solutions with pedagogical notes, common mistake
        warnings, and exam tips — tailored to your class and exam style.
      </p>

      {/* Example question chips */}
      <div className="flex flex-col gap-2 w-full max-w-lg">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          Try an example
        </p>
        {EXAMPLE_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onExampleClick(q)}
            className="text-left text-sm text-gray-700 bg-white border border-gray-200 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 rounded-xl px-4 py-3 transition-all cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}