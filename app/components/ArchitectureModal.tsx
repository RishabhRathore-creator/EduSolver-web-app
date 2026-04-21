"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function ArchitectureModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Application Architecture</DialogTitle>
        </DialogHeader>

        <div className="text-sm space-y-3">
          <p>
            This page outlines the architecture of the EduSolver application.
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li><b>Framework:</b> Next.js (App Router)</li>
            <li><b>Language:</b> TypeScript</li>
            <li><b>Styling:</b> Tailwind CSS</li>
            <li><b>UI Components:</b> shadcn/ui</li>
            <li><b>Generative AI:</b> Google Gemini (planned)</li>
          </ul>

          <p>
            The system is designed to support autonomous, multi-agent reasoning
            with scalable UI and backend layers.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
