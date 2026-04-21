// app/components/ChatHeader.tsx
'use client';
// Needs 'use client' because it handles onChange events (browser interactions)

// We define the shape of props this component accepts using a TypeScript type.
// Every prop that Solve/page.tsx passes must match this definition exactly.
// If you forget to pass onClassChange, TypeScript will underline it in red
// immediately — before you even run the app. This is TypeScript's superpower.
type ChatHeaderProps = {
  classLevel: string;
  subject: string;
  examMode: string;
  onClassChange: (value: string) => void;
  // ↑ This says: onClassChange is a function that receives a string and
  // returns nothing (void). The parent will pass setClassLevel here.
  onSubjectChange: (value: string) => void;
  onExamModeChange: (value: string) => void;
};

export default function ChatHeader({
  classLevel,
  subject,
  examMode,
  onClassChange,
  onSubjectChange,
  onExamModeChange,
}: ChatHeaderProps) {
  // Notice we destructure props directly in the function signature.
  // This is equivalent to writing:
  //   function ChatHeader(props) { const { classLevel, ... } = props; }
  // but cleaner. The : ChatHeaderProps part tells TypeScript what shape
  // to expect so it can catch mistakes.

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
      {/*
        sticky top-0  → stays at the top of the screen when you scroll
        z-10          → sits above the message content visually
      */}
      <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-3">

        {/* Logo / title */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <span className="font-semibold text-gray-800 text-lg">EduSolver</span>
        </div>

        {/* Dropdowns row */}
        <div className="flex items-center gap-3 flex-wrap">

          {/* 
            Each <select> is a "controlled input" — its value is always
            driven by the prop from the parent (e.g. classLevel).
            onChange fires every time the user picks a new option.
            e is the browser's event object, e.target.value is the
            string value of the option they selected.
            We pass that string straight up to the parent via onClassChange.
          */}
          <label className="sr-only" htmlFor="classLevel-select">Class Level</label>
          <select
            id="classLevel-select"
            aria-label="Class Level"
            value={classLevel}
            onChange={(e) => onClassChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
          >
            <option>Class 8</option>
            <option>Class 9</option>
            <option>Class 10</option>
            <option>Class 11</option>
            <option>Class 12</option>
          </select>

          <label className="sr-only" htmlFor="subject-select">Subject</label>
          <select
            id="subject-select"
            aria-label="Subject"
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
          >
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
          </select>

          <label className="sr-only" htmlFor="examMode-select">Exam Mode</label>
          <select
            id="examMode-select"
            aria-label="Exam Mode"
            value={examMode}
            onChange={(e) => onExamModeChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
          >
            <option>Board Exam (CBSE)</option>
            <option>Competitive (JEE)</option>
            <option>Competitive (NEET)</option>
            <option>Concept Mode</option>
          </select>
        </div>
      </div>
    </header>
  );
}