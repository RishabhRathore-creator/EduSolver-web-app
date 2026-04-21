"use client";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function ArchitectureModal({ open, onOpenChange }: Props) {
  // If the modal is not open, do not render anything
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-lg border bg-white p-6 shadow-lg dark:bg-zinc-950 dark:border-zinc-800">

        {/* Header / Title Area */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            Application Architecture
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="text-sm space-y-3 dark:text-zinc-300">
          <p>
            This page outlines the architecture of the EduSolver application.
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li><b>Framework:</b> Next.js (App Router)</li>
            <li><b>Language:</b> TypeScript</li>
            <li><b>Styling:</b> Tailwind CSS</li>
            <li><b>UI Components:</b> Custom Tailwind</li>
            <li><b>Generative AI:</b> Google Gemini (planned)</li>
          </ul>

          <p>
            The system is designed to support autonomous, multi-agent reasoning
            with scalable UI and backend layers.
          </p>
        </div>
      </div>
    </div>
  );
}