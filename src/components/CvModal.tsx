import {useEffect} from 'react';
import {Download, ExternalLink, X} from 'lucide-react';
import {PROFILE} from '../data/profile';

interface CvModalProps {
  open: boolean;
  onClose: () => void;
}

export function CvModal({open, onClose}: CvModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-neutral-800 bg-[#111111] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-neutral-800 px-6 py-4">
          <div className="min-w-0">
            <h2 id="cv-modal-title" className="truncate font-display text-lg font-semibold text-white">
              Curriculum Vitae — {PROFILE.name}
            </h2>
            <p className="text-xs text-neutral-400">
              Medical Biller &amp; Credentialing Specialist · PDF Document
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={PROFILE.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-[#1A1A1A] px-3 py-2 text-xs font-medium text-neutral-200 whitespace-nowrap hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Open Tab</span>
            </a>
            <a
              href={PROFILE.cvPdfUrl}
              download="Kamran_Nazir_CV.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#15803D] px-3.5 py-2 text-xs font-semibold text-white whitespace-nowrap hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV preview"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 bg-neutral-900">
          <iframe
            src={PROFILE.cvPdfUrl}
            title="Kamran Nazir Curriculum Vitae PDF"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
