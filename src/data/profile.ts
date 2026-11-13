export interface PracticeArea {
  id: string;
  index: string;
  category: 'billing' | 'credentialing' | 'denials';
  categoryLabel: string;
  title: string;
  summary: string;
  standards: string[];
  workflowSteps: {
    step: string;
    detail: string;
  }[];
  deliverables: string[];
}

export interface SkillItem {
  name: string;
  group: 'Billing & Coding' | 'Credentialing & Compliance' | 'Systems & Analytics';
  context: string;
}

export interface SpecialistMember {
  id: string;
  name: string;
  role: string;
  track: string;
  imageUrl: string;
  imageAlt: string;
  summary: string;
  focusAreas: string[];
  inquiryTopic: string;
}

export const TEAM_SPECIALISTS: SpecialistMember[] = [
  {
    id: 'kamran-nazir',
    name: 'Kamran Nazir',
    role: 'Credentialing Specialist & Medical Biller',
    track: 'Provider Enrollment · RCM · Denial Management',
    imageUrl: '/assets/aistudio/Formal_Portrait_on_Blue_Background_02bdf8f7.png',
    imageAlt: 'Portrait of Kamran Nazir, Credentialing Specialist and Medical Biller',
    summary:
      'Over 3 years of experience managing the full revenue cycle, provider insurance panel enrollment, EDI setup, and HIPAA-compliant denial appeals.',
    focusAreas: ['Provider Credentialing', 'Denial Management', 'ICD-10 · CPT · HCPCS', 'HIPAA & EHR'],
    inquiryTopic: 'Provider Credentialing & Panel Enrollment',
  },
  {
    id: 'medical-billing-specialist',
    name: 'Medical Billing Associate',
    role: 'Medical Billing (MB) & Claims Specialist',
    track: 'Charge Entry · Claim Scrubbing · EDI',
    imageUrl: '/assets/aistudio/wa.png_a97b2514.png',
    imageAlt: 'Portrait of Medical Billing (MB) and Claims Specialist',
    summary:
      'Focused on Medical Billing (MB) execution—handling daily charge capture, clean claim scrubbing, EDI submission, and payment posting.',
    focusAreas: ['Medical Billing (MB)', 'Charge Capture', 'EDI Submission', 'ERA Posting'],
    inquiryTopic: 'Medical Billing (MB) & Claims Operations',
  },
  {
    id: 'ahtiya-billing',
    name: 'Ahtiya',
    role: 'Insurance Verification & A/R Billing Specialist',
    track: 'Eligibility · Prior Auth · A/R Recovery',
    imageUrl: '/assets/aistudio/ahtiya_fa540579.jpeg',
    imageAlt: 'Portrait of Ahtiya, Insurance Verification and A/R Billing Specialist',
    summary:
      'Specializes in pre-service insurance verification, prior authorizations, accounts receivable (A/R) follow-up, and payer denial resolution to prevent billing delays.',
    focusAreas: ['Insurance Verification', 'Prior Authorization', 'A/R Follow-Up', 'Denial Resolution'],
    inquiryTopic: 'Insurance Verification & A/R Billing',
  },
];

export const PROFILE = {
  name: 'Kamran Nazir',
  role: 'Medical Biller & Credentialing Specialist',
  kicker: 'Medical Billing · Provider Credentialing · Revenue Cycle Management',
  headline: 'Precision in Healthcare Revenue Cycle & Provider Credentialing.',
  summary:
    'Dedicated Medical Biller & Credentialing Specialist with over 3 years of experience in revenue cycle management, claims processing, and provider enrollment. Skilled in medical coding (ICD-10, CPT, HCPCS), insurance verification, and denial management to ensure timely reimbursements.',
  extendedSummary:
    'Proficient in EHR and practice management systems with strong knowledge of HIPAA compliance. Recognized for accuracy, problem-solving, and organizational skills, supporting healthcare providers through efficient billing and credentialing operations.',
  portraitUrl: '/assets/aistudio/Formal_Portrait_on_Blue_Background_02bdf8f7.png',
  cvPdfUrl: '/assets/aistudio/kamran_billing_Cv_8d105d78.pdf',
  contact: {
    location: 'Gilgit, Pakistan',
    phone: '03109070246',
    phoneHref: 'tel:+923109070246',
    email: 'kamran.ali096980@gmail.com',
  },
  highlights: [
    {
      label: 'Experience',
      value: '2021 – Present',
      detail: 'Over 3 years in full-cycle RCM & credentialing',
    },
    {
      label: 'Current Role',
      value: 'Scribe Cody',
      detail: 'Credentialing Specialist & Medical Biller, Rawalpindi',
    },
    {
      label: 'Coding & EDI',
      value: 'ICD-10 · CPT · HCPCS',
      detail: 'Claims accuracy, payer enrollment & HIPAA compliance',
    },
    {
      label: 'Education',
      value: 'B.S. Artificial Intelligence',
      detail: 'SZABIST Islamabad (In Progress)',
    },
  ],
  experience: [
    {
      title: 'Credentialing Specialist | Medical Biller',
      organization: 'Scribe Cody',
      location: 'Rawalpindi, Pakistan',
      period: '2021 – Present',
      responsibilities: [
        'Manage the full revenue cycle, including medical billing, claims follow-up, and provider credentialing.',
        'Ensure accurate claim submission and maintain compliance with payer requirements.',
        'Complete credentialing processes to enroll healthcare providers with insurance panels.',
        'Utilize expertise in medical coding (ICD-10, CPT, HCPCS) and insurance verification.',
        'Handle denial management and appeals to maximize timely reimbursements.',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science, Artificial Intelligence',
      institution: 'SZABIST Islamabad',
      location: 'Islamabad, Pakistan',
      period: 'Present',
      notes:
        'Applying analytical reasoning, structured data modeling, and algorithmic problem-solving alongside full-time healthcare revenue cycle operations.',
    },
  ],
  languages: ['English', 'Urdu', 'Hindi', 'Brushaski'],
  interests: ['Cricket', 'Books Reading'],
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'medical-billing-coding',
    index: '01',
    category: 'billing',
    categoryLabel: 'Medical Billing & Coding',
    title: 'Full-Cycle Medical Billing & Coding',
    summary:
      'End-to-end charge capture, clean claim preparation, and accurate ICD-10, CPT, and HCPCS coding aligned with payer rules.',
    standards: ['ICD-10', 'CPT', 'HCPCS', 'Clean Claim Submission'],
    workflowSteps: [
      {
        step: '01. Insurance Verification & Authorization',
        detail:
          'Verify patient coverage, eligibility, benefits, and prior authorization requirements prior to encounter billing.',
      },
      {
        step: '02. Medical Coding Accuracy',
        detail:
          'Apply ICD-10, CPT, and HCPCS coding standards so clinical documentation translates cleanly into billable line items.',
      },
      {
        step: '03. Payer-Compliant Submission',
        detail:
          'Scrub and submit electronic claims through EHR and practice management platforms while adhering to payer-specific guidelines.',
      },
    ],
    deliverables: [
      'Clean claim submission aligned with payer policies',
      'Pre-service insurance verification and authorization logs',
      'HIPAA-compliant billing documentation and audit readiness',
    ],
  },
  {
    id: 'provider-credentialing',
    index: '02',
    category: 'credentialing',
    categoryLabel: 'Provider Credentialing',
    title: 'Provider Credentialing & Panel Enrollment',
    summary:
      'Structured onboarding and EDI enrollment connecting healthcare providers with commercial and government insurance panels.',
    standards: ['Provider Enrollment', 'Insurance Panels', 'EDI Setup', 'Payer Compliance'],
    workflowSteps: [
      {
        step: '01. Application & Documentation Assembly',
        detail:
          'Compile provider demographics, licenses, practice locations, and compliance records required for payer enrollment.',
      },
      {
        step: '02. Insurance Panel Submission & Follow-Up',
        detail:
          'Manage credentialing applications across target insurance networks and track committee review milestones through approval.',
      },
      {
        step: '03. EDI & Electronic Remittance Readiness',
        detail:
          'Coordinate EDI enrollment and clearinghouse linkage so newly credentialed providers submit claims without routing delays.',
      },
    ],
    deliverables: [
      'Completed insurance panel enrollment packages',
      'Active EDI and electronic submission setup',
      'Ongoing payer requirement and roster compliance',
    ],
  },
  {
    id: 'denial-management',
    index: '03',
    category: 'denials',
    categoryLabel: 'Denial Management',
    title: 'Denial Management, Follow-Up & Appeals',
    summary:
      'Systematic root-cause analysis of unpaid or denied claims, targeted corrections, and timely payer appeals to recover revenue.',
    standards: ['Claims Follow-Up', 'Root-Cause Analysis', 'Appeals', 'Reimbursement Recovery'],
    workflowSteps: [
      {
        step: '01. Aging & Denial Triage',
        detail:
          'Review explanation of benefits (EOB/ERA) rejection codes and prioritize aging claims by payer deadlines and value.',
      },
      {
        step: '02. Coding & Documentation Remediation',
        detail:
          'Identify missing authorizations, coding mismatches, or payer edits and prepare corrected claims or supporting clinical records.',
      },
      {
        step: '03. Formal Appeals & Payer Follow-Up',
        detail:
          'Submit structured appeals and conduct persistent payer follow-up until final reimbursement resolution.',
      },
    ],
    deliverables: [
      'Structured appeals documentation and corrected claim resubmissions',
      'Accounts receivable and claims follow-up tracking',
      'Preventive feedback on recurring payer denial patterns',
    ],
  },
  {
    id: 'rcm-systems-compliance',
    index: '04',
    category: 'billing',
    categoryLabel: 'Medical Billing & Coding',
    title: 'EHR Operations & HIPAA Compliance',
    summary:
      'Disciplined practice management administration ensuring patient privacy, accurate documentation, and reliable revenue workflows.',
    standards: ['HIPAA Compliance', 'EHR Systems', 'Practice Management', 'Analytical Auditing'],
    workflowSteps: [
      {
        step: '01. Practice Management Workflow Administration',
        detail:
          'Operate across EHR and practice management systems to keep patient demographics, encounter charges, and payer tables synchronized.',
      },
      {
        step: '02. HIPAA Privacy & Documentation Controls',
        detail:
          'Enforce strict handling of protected health information (PHI) across verification, claim follow-up, and payer correspondence.',
      },
      {
        step: '03. Analytical Process Problem-Solving',
        detail:
          'Apply structured analytical review to detect bottlenecks across eligibility, coding, and credentialing handoffs.',
      },
    ],
    deliverables: [
      'HIPAA-compliant record handling and communication standards',
      'Synchronized EHR and practice management billing workflows',
      'Clear operational reporting for healthcare providers',
    ],
  },
];

export const SKILLS: SkillItem[] = [
  {
    name: 'Medical Billing',
    group: 'Billing & Coding',
    context: 'Full revenue cycle execution and accurate charge submission',
  },
  {
    name: 'Medical Coding (ICD-10, CPT, HCPCS)',
    group: 'Billing & Coding',
    context: 'Diagnosis, procedural, and supply code alignment with payer rules',
  },
  {
    name: 'Revenue Cycle Management',
    group: 'Billing & Coding',
    context: 'End-to-end coordination from verification through reimbursement',
  },
  {
    name: 'Denial Management & Appeals',
    group: 'Billing & Coding',
    context: 'Rejection triage, corrected claims, and formal appeal follow-up',
  },
  {
    name: 'Insurance Verification & Authorization',
    group: 'Billing & Coding',
    context: 'Coverage validation and pre-service authorization checks',
  },
  {
    name: 'Credentialing & Provider Enrollment',
    group: 'Credentialing & Compliance',
    context: 'Complete onboarding of healthcare providers onto insurance panels',
  },
  {
    name: 'EDI & Enrollment Specialist',
    group: 'Credentialing & Compliance',
    context: 'Electronic data interchange setup and clearinghouse readiness',
  },
  {
    name: 'HIPAA Compliance & Documentation',
    group: 'Credentialing & Compliance',
    context: 'Strict safeguarding of PHI and compliant payer documentation',
  },
  {
    name: 'EHR & Practice Management Systems',
    group: 'Systems & Analytics',
    context: 'Daily clinical-financial administration across modern billing software',
  },
  {
    name: 'Analytical & Problem-Solving Skills',
    group: 'Systems & Analytics',
    context: 'Root-cause diagnostics strengthened by B.S. AI coursework',
  },
];
