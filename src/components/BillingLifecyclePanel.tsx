import {useState} from 'react';
import {ArrowUpRight, CheckCircle2, FileCheck2, ShieldCheck} from 'lucide-react';

interface BillingStage {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
  standards: string[];
  checkpoints: string[];
  topic: string;
}

const BILLING_STAGES: BillingStage[] = [
  {
    id: 'verification',
    index: '01',
    label: 'Verification',
    title: 'Insurance Verification & Authorization',
    description:
      'Confirm active patient coverage, payer benefits, co-pays, and prior authorization before claims enter billing.',
    standards: ['Eligibility Check', 'Prior Auth', 'Payer Rules'],
    checkpoints: [
      'Verify active policy status and plan coverage limits',
      'Confirm referral or prior authorization numbers',
    ],
    topic: 'Full-Cycle Medical Billing & Coding',
  },
  {
    id: 'coding',
    index: '02',
    label: 'Coding',
    title: 'Medical Coding (ICD-10, CPT, HCPCS)',
    description:
      'Translate clinical encounters into compliant diagnosis, procedural, and supply codes for accurate payer adjudication.',
    standards: ['ICD-10', 'CPT', 'HCPCS'],
    checkpoints: [
      'Align diagnosis specificity with procedure medical necessity',
      'Validate modifiers and unit billing against payer edits',
    ],
    topic: 'Medical Billing (MB) & Claims Operations',
  },
  {
    id: 'submission',
    index: '03',
    label: 'Claim EDI',
    title: 'Clean Claim Scrubbing & EDI Submission',
    description:
      'Audit demographics, rendering provider NPIs, and payer identifiers inside EHR & practice management systems.',
    standards: ['EDI 837', 'EHR Systems', 'HIPAA Compliance'],
    checkpoints: [
      'Scrub claims for formatting and payer-specific edits',
      'Transmit electronic claims and track clearinghouse receipts',
    ],
    topic: 'Medical Billing (MB) & Claims Operations',
  },
  {
    id: 'denials',
    index: '04',
    label: 'Appeals',
    title: 'Denial Management & Appeals',
    description:
      'Triage EOB/ERA rejections, remediate coding or authorization gaps, and submit formal appeals for timely reimbursement.',
    standards: ['EOB / ERA', 'A/R Follow-Up', 'Reimbursement'],
    checkpoints: [
      'Analyze root-cause denial reason and remark codes',
      'Resubmit corrected claims and track payer turnaround',
    ],
    topic: 'Denial Management, Follow-Up & Appeals',
  },
  {
    id: 'credentialing',
    index: '05',
    label: 'Enrollment',
    title: 'Provider Credentialing & Panel Enrollment',
    description:
      'Enroll healthcare providers with commercial and government insurance panels and establish EDI linkage.',
    standards: ['Panel Enrollment', 'EDI Setup', 'Compliance'],
    checkpoints: [
      'Prepare complete provider credentialing documentation',
      'Coordinate payer approval and electronic remittance setup',
    ],
    topic: 'Provider Credentialing & Panel Enrollment',
  },
];

interface BillingLifecyclePanelProps {
  onInquire: (topic: string) => void;
}

export function BillingLifecyclePanel({onInquire}: BillingLifecyclePanelProps) {
  const [activeId, setActiveId] = useState<string>(BILLING_STAGES[0].id);
  const activeStage = BILLING_STAGES.find((stage) => stage.id === activeId) ?? BILLING_STAGES[0];

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-800 bg-[#111111] p-6">
      <div>
        <div className="flex items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <FileCheck2 className="h-4 w-4 text-green-400" aria-hidden="true" />
            <h2 className="font-display text-base font-semibold text-white">
              Medical Billing &amp; RCM Cycle
            </h2>
          </div>
          <span className="font-mono text-xs text-neutral-400">ICD-10 · CPT · HCPCS</span>
        </div>

        {/* Interactive Stage Selector */}
        <div
          role="tablist"
          aria-label="Medical Billing workflow stages"
          className="mt-4 grid grid-cols-5 gap-1 rounded-lg border border-neutral-800 bg-[#050505] p-1"
        >
          {BILLING_STAGES.map((stage) => {
            const active = stage.id === activeStage.id;
            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveId(stage.id)}
                className={`flex flex-col items-center rounded-md px-1.5 py-2 text-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 ${
                  active
                    ? 'bg-[#15803D] text-white'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                }`}
              >
                <span className="font-mono text-[11px] tabular-nums opacity-80">{stage.index}</span>
                <span className="mt-0.5 w-full truncate text-[11px] font-medium">
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail */}
        <div className="mt-5 rounded-xl border border-neutral-800 bg-[#050505] p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs tabular-nums text-green-400">
              Stage {activeStage.index} of 05
            </span>
            <ShieldCheck className="h-4 w-4 text-green-400" aria-hidden="true" />
          </div>

          <h3 className="mt-2 font-display text-lg font-semibold text-white">
            {activeStage.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            {activeStage.description}
          </p>

          <ul className="mt-4 space-y-2 border-t border-neutral-800 pt-4">
            {activeStage.checkpoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-xs leading-relaxed text-neutral-300">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800 pt-4">
        <div className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-neutral-400">
          {activeStage.standards.map((std, idx) => (
            <span key={std} className="inline-flex items-center gap-2">
              <span>{std}</span>
              {idx < activeStage.standards.length - 1 && (
                <span aria-hidden="true" className="text-neutral-600">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onInquire(activeStage.topic)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 whitespace-nowrap transition-colors hover:text-green-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
        >
          <span>Inquire About Stage</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
