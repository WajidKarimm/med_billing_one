import {useEffect} from 'react';
import {Check, X} from 'lucide-react';
import {PracticeArea} from '../data/profile';

interface PracticeDrawerProps {
  area: PracticeArea | null;
  onClose: () => void;
  onInquire: (topic: string) => void;
}

export function PracticeDrawer({area, onClose, onInquire}: PracticeDrawerProps) {
  useEffect(() => {
    if (!area) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [area, onClose]);

  if (!area) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="practice-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-neutral-800 bg-[#111111] p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <p className="text-xs font-medium text-green-400">
              {area.index}. {area.categoryLabel}
            </p>
            <h2 id="practice-modal-title" className="mt-1 font-display text-2xl font-semibold text-white">
              {area.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close specialty details"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-700 text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-neutral-300">{area.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-neutral-800 py-3 font-mono text-xs text-neutral-400">
          {area.standards.map((std, idx) => (
            <span key={std} className="inline-flex items-center gap-3">
              <span>{std}</span>
              {idx < area.standards.length - 1 && (
                <span aria-hidden="true" className="text-neutral-600">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-semibold text-white">Operational Workflow</h3>
          <div className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 bg-[#050505]">
            {area.workflowSteps.map((item) => (
              <div key={item.step} className="p-4">
                <h4 className="text-sm font-semibold text-neutral-100">{item.step}</h4>
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-white">Key Outcomes</h3>
          <ul className="mt-3 space-y-2.5">
            {area.deliverables.map((deliverable) => (
              <li key={deliverable} className="flex items-start gap-2.5 text-sm text-neutral-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" aria-hidden="true" />
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-neutral-800 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-neutral-700 bg-[#1A1A1A] px-4 py-2 text-xs font-medium text-neutral-200 transition-colors hover:bg-neutral-800"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onInquire(area.title);
            }}
            className="rounded-lg bg-[#15803D] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#166534]"
          >
            Inquire About This Service
          </button>
        </div>
      </div>
    </div>
  );
}
