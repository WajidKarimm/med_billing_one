import {FormEvent, useState} from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import {BillingLifecyclePanel} from './components/BillingLifecyclePanel';
import {CvModal} from './components/CvModal';
import {MotionBackdrop} from './components/MotionBackdrop';
import {Navbar} from './components/Navbar';
import {PracticeDrawer} from './components/PracticeDrawer';
import {
  PRACTICE_AREAS,
  PROFILE,
  PracticeArea,
  SKILLS,
  SkillItem,
  TEAM_SPECIALISTS,
} from './data/profile';

type PracticeFilter = 'all' | 'billing' | 'credentialing' | 'denials';
type SkillFilter = 'All' | SkillItem['group'];

export default function App() {
  const [failedSpecialistIds, setFailedSpecialistIds] = useState<Record<string, boolean>>({});
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
  const [practiceFilter, setPracticeFilter] = useState<PracticeFilter>('all');
  const [skillFilter, setSkillFilter] = useState<SkillFilter>('All');

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [senderName, setSenderName] = useState('');
  const [organization, setOrganization] = useState('');
  const [inquiryTopic, setInquiryTopic] = useState('Full-Cycle Medical Billing & Coding');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredPractice =
    practiceFilter === 'all'
      ? PRACTICE_AREAS
      : PRACTICE_AREAS.filter((area) => area.category === practiceFilter);

  const filteredSkills =
    skillFilter === 'All'
      ? SKILLS
      : SKILLS.filter((skill) => skill.group === skillFilter);

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => {
        setCopiedField((current) => (current === label ? null : current));
      }, 2200);
    } catch {
      setCopiedField(null);
    }
  };

  const handleSelectInquiryTopic = (topic: string) => {
    setInquiryTopic(topic);
    setFormSubmitted(false);
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({behavior: 'smooth'});
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) {
      setFormError('Please enter your name and a brief message regarding your billing or credentialing needs.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const composeMailtoHref = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${inquiryTopic} — ${senderName}`);
    const body = encodeURIComponent(
      `Name: ${senderName}\nOrganization / Practice: ${organization || 'Not specified'}\nTopic: ${inquiryTopic}\n\n${message}`
    );
    return `mailto:${PROFILE.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div id="top" className="relative min-h-screen bg-[#050505] text-neutral-100">
      <MotionBackdrop />

      <div className="relative z-10">
        <Navbar />

        <main>
          {/* HERO SPLIT */}
          <section className="mx-auto max-w-6xl px-6 pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Typographic Hierarchy */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <p className="text-xs font-medium tracking-wide text-green-400">
                  {PROFILE.kicker}
                </p>

                <h1
                  className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
                  style={{textWrap: 'balance'}}
                >
                  {PROFILE.headline}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300">
                  {PROFILE.summary}
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400">
                  {PROFILE.extendedSummary}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#15803D] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap transition-colors duration-150 hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                >
                  <span>Request Consultation</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => setCvModalOpen(true)}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-[#111111] px-5 py-2.5 text-sm font-medium text-neutral-200 whitespace-nowrap transition-colors duration-150 hover:border-neutral-700 hover:bg-[#1A1A1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                >
                  <FileText className="h-4 w-4 text-green-400" aria-hidden="true" />
                  <span>View Original CV</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Medical Billing & RCM Cycle */}
            <div className="lg:col-span-5">
              <BillingLifecyclePanel onInquire={handleSelectInquiryTopic} />
            </div>
          </div>

          {/* Full-Width 4-Column Highlights Strip Below Hero Split */}
          <div className="mt-12 grid grid-cols-1 divide-y divide-neutral-800 rounded-xl border border-neutral-800 bg-[#111111] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {PROFILE.highlights.map((item, idx) => (
              <div
                key={item.label}
                className={`p-5 ${idx >= 2 ? 'sm:border-t sm:border-neutral-800 lg:border-t-0' : ''} ${
                  idx % 2 === 1 ? 'sm:border-l sm:border-neutral-800 lg:border-l-0' : ''
                }`}
              >
                <p className="text-xs font-medium text-neutral-400">{item.label}</p>
                <p className="mt-1.5 font-display text-lg font-semibold tabular-nums text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 01. MEDICAL BILLING & CREDENTIALING SPECIALISTS */}
        <section id="specialists" className="border-t border-neutral-800/80 bg-[#0B0B0B]/90 py-16 backdrop-blur-[2px] lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium text-green-400">
                  01. Medical Billing &amp; Credentialing Specialists
                </p>
                <h2
                  className="mt-2 font-display text-3xl font-semibold tracking-tight text-white"
                  style={{textWrap: 'balance'}}
                >
                  Dedicated Revenue Cycle &amp; MB Team
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">
                  Coordinated coverage across provider credentialing, insurance panel enrollment, and daily Medical Billing (MB) claims operations.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-3">
              {TEAM_SPECIALISTS.map((member, index) => (
                <article
                  key={member.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-[#111111] transition-colors duration-150 hover:border-green-500/40"
                >
                  <div className="relative h-72 w-full overflow-hidden bg-[#0A0A0A]">
                    {!failedSpecialistIds[member.id] ? (
                      <img
                        src={member.imageUrl}
                        alt={member.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedSpecialistIds((prev) => ({...prev, [member.id]: true}))
                        }
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#15803D] to-[#050505] p-6 text-center text-white">
                        <User className="h-10 w-10 text-green-200/80" aria-hidden="true" />
                        <p className="mt-2 font-display text-base font-semibold">{member.name}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="font-mono text-xs tabular-nums text-green-400">
                        0{index + 1} · {member.track}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-white">
                        {member.name}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-neutral-300">
                        {member.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                        {member.summary}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-neutral-800 pt-3 font-mono text-xs text-neutral-400">
                        {member.focusAreas.map((area, i) => (
                          <span key={area} className="inline-flex items-center gap-2.5">
                            <span>{area}</span>
                            {i < member.focusAreas.length - 1 && (
                              <span aria-hidden="true" className="text-neutral-600">
                                ·
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-2">
                      <button
                        type="button"
                        onClick={() => handleSelectInquiryTopic(member.inquiryTopic)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 transition-colors hover:text-green-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                      >
                        <span>Inquire for {member.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 02. OPERATIONAL PRACTICE */}
        <section id="practice" className="border-t border-neutral-800/80 bg-[#050505]/85 py-16 backdrop-blur-[2px] lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium text-green-400">02. Operational Practice</p>
                <h2
                  className="mt-2 font-display text-3xl font-semibold tracking-tight text-white"
                  style={{textWrap: 'balance'}}
                >
                  Revenue Cycle &amp; Credentialing Scope
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-400">
                  Select a discipline to filter core operations, or open any workflow card to inspect step-by-step execution and compliance standards.
                </p>
              </div>

              {/* Interactive Segmented Filter Control */}
              <div
                role="tablist"
                aria-label="Filter practice specialties"
                className="flex flex-wrap items-center gap-1 rounded-lg border border-neutral-800 bg-[#050505] p-1 self-start md:self-auto"
              >
                {[
                  {id: 'all', label: 'All Specialties'},
                  {id: 'billing', label: 'Billing & Coding'},
                  {id: 'credentialing', label: 'Credentialing'},
                  {id: 'denials', label: 'Denials & Appeals'},
                ].map((tab) => {
                  const active = practiceFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setPracticeFilter(tab.id as PracticeFilter)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 ${
                        active
                          ? 'bg-[#15803D] text-white'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredPractice.map((area) => (
                <article
                  key={area.id}
                  className="group flex flex-col justify-between rounded-xl border border-neutral-800 bg-[#111111] p-6 transition-colors duration-150 hover:border-green-500/40 hover:bg-[#161616]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 text-xs text-neutral-400">
                      <span className="font-mono tabular-nums text-green-400">{area.index}</span>
                      <span>{area.categoryLabel}</span>
                    </div>

                    <h3 className="mt-3 font-display text-xl font-semibold text-white">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                      {area.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-neutral-400">
                      {area.standards.map((std, i) => (
                        <span key={std} className="inline-flex items-center gap-2.5">
                          <span>{std}</span>
                          {i < area.standards.length - 1 && (
                            <span aria-hidden="true" className="text-neutral-600">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-neutral-800 pt-4">
                    <span className="text-xs text-neutral-400">
                      {area.workflowSteps.length} workflow stages
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedArea(area)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 transition-colors hover:text-green-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                    >
                      <span>Inspect Workflow</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03. EXPERIENCE & EDUCATION */}
        <section id="experience" className="border-t border-neutral-800/80 bg-[#0B0B0B]/90 py-16 backdrop-blur-[2px] lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-medium text-green-400">03. Experience &amp; Education</p>
            <h2
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-white"
              style={{textWrap: 'balance'}}
            >
              Professional Track &amp; Academic Foundation
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Experience Column */}
              <div className="lg:col-span-7">
                <div className="rounded-xl border border-neutral-800 bg-[#111111] p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-neutral-800 pb-5">
                    <div>
                      <p className="text-xs font-medium text-neutral-400">Work Experience</p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-white">
                        {PROFILE.experience[0].title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-green-400">
                        {PROFILE.experience[0].organization} · {PROFILE.experience[0].location}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-medium tabular-nums text-neutral-300">
                      {PROFILE.experience[0].period}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3.5">
                    {PROFILE.experience[0].responsibilities.map((item, idx) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300">
                        <span className="mt-0.5 font-mono text-xs tabular-nums text-green-400">
                          0{idx + 1}.
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Education Column */}
              <div className="flex flex-col gap-6 lg:col-span-5">
                <div className="flex-1 rounded-xl border border-neutral-800 bg-[#111111] p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-neutral-800 pb-5">
                    <div>
                      <p className="text-xs font-medium text-neutral-400">Higher Education</p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-white">
                        {PROFILE.education[0].degree}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-green-400">
                        {PROFILE.education[0].institution} · {PROFILE.education[0].location}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-medium text-neutral-300">
                      {PROFILE.education[0].period}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-neutral-300">
                    {PROFILE.education[0].notes}
                  </p>
                </div>

                {/* Original CV Quick Access Card */}
                <div className="rounded-xl border border-neutral-800 bg-[#111111] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-base font-semibold text-white">
                        Verified Curriculum Vitae
                      </h3>
                      <p className="mt-1 text-xs text-neutral-400">
                        Inspect the original PDF document or save a copy for HR and credentialing teams.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCvModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-[#1A1A1A] px-4 py-2 text-xs font-medium text-neutral-200 whitespace-nowrap transition-colors hover:bg-neutral-800"
                    >
                      <FileText className="h-3.5 w-3.5 text-green-400" aria-hidden="true" />
                      <span>Preview PDF</span>
                    </button>
                    <a
                      href={PROFILE.cvPdfUrl}
                      download="Kamran_Nazir_CV.pdf"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#15803D] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#166534]"
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04. CAPABILITIES, LANGUAGES & INTERESTS */}
        <section id="capabilities" className="border-t border-neutral-800/80 bg-[#050505]/85 py-16 backdrop-blur-[2px] lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium text-green-400">04. Skills &amp; Core Competencies</p>
                <h2
                  className="mt-2 font-display text-3xl font-semibold tracking-tight text-white"
                  style={{textWrap: 'balance'}}
                >
                  Technical &amp; Regulatory Proficiency
                </h2>
              </div>

              <div
                role="tablist"
                aria-label="Filter skills by category"
                className="flex flex-wrap items-center gap-1 rounded-lg border border-neutral-800 bg-[#050505] p-1 self-start md:self-auto"
              >
                {(
                  ['All', 'Billing & Coding', 'Credentialing & Compliance', 'Systems & Analytics'] as SkillFilter[]
                ).map((group) => {
                  const active = skillFilter === group;
                  return (
                    <button
                      key={group}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSkillFilter(group)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 ${
                        active
                          ? 'bg-[#15803D] text-white'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {group}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Skills Matrix */}
              <div className="lg:col-span-8">
                <div className="divide-y divide-neutral-800 rounded-xl border border-neutral-800 bg-[#111111]">
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col justify-between gap-1.5 px-5 py-4 sm:flex-row sm:items-center sm:gap-6"
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-white">{skill.name}</h3>
                        <p className="mt-0.5 text-xs text-neutral-400">{skill.context}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-green-400/90">
                        {skill.group}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Interests Sidebar */}
              <div className="flex flex-col gap-6 lg:col-span-4">
                <div className="rounded-xl border border-neutral-800 bg-[#111111] p-6">
                  <h3 className="font-display text-base font-semibold text-white">
                    Languages
                  </h3>
                  <p className="mt-1 text-xs text-neutral-400">
                    Multilingual communication across patient and provider support.
                  </p>
                  <div className="mt-4 divide-y divide-neutral-800 border-t border-neutral-800">
                    {PROFILE.languages.map((lang, index) => (
                      <div key={lang} className="flex items-center justify-between py-2.5 text-sm">
                        <span className="font-medium text-neutral-200">{lang}</span>
                        <span className="font-mono text-xs tabular-nums text-neutral-500">
                          0{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-[#111111] p-6">
                  <h3 className="font-display text-base font-semibold text-white">
                    Personal Interests
                  </h3>
                  <p className="mt-1 text-xs text-neutral-400">
                    Teamwork and continuous learning beyond work.
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-neutral-800 pt-4 text-sm font-medium text-neutral-200">
                    {PROFILE.interests.map((interest, idx) => (
                      <span key={interest} className="inline-flex items-center gap-3">
                        <span>{interest}</span>
                        {idx < PROFILE.interests.length - 1 && (
                          <span aria-hidden="true" className="text-neutral-600">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05. CONTACT & INQUIRY */}
        <section id="contact" className="border-t border-neutral-800/80 bg-[#0B0B0B]/90 py-16 backdrop-blur-[2px] lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              {/* Direct Contact Info */}
              <div className="lg:col-span-5">
                <p className="text-xs font-medium text-green-400">05. Direct Contact</p>
                <h2
                  className="mt-2 font-display text-3xl font-semibold tracking-tight text-white"
                  style={{textWrap: 'balance'}}
                >
                  Available for Billing &amp; Credentialing Roles
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                  Connect directly for medical billing, provider credentialing, insurance panel enrollment, or full-cycle revenue cycle management opportunities.
                </p>

                <div className="mt-8 divide-y divide-neutral-800 rounded-xl border border-neutral-800 bg-[#111111]">
                  <div className="flex items-center justify-between gap-4 p-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail className="h-4 w-4 shrink-0 text-green-400" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-xs text-neutral-400">Email</p>
                        <a
                          href={`mailto:${PROFILE.contact.email}`}
                          className="block truncate text-sm font-medium text-white hover:text-green-400"
                        >
                          {PROFILE.contact.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('email', PROFILE.contact.email)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-neutral-700 bg-[#1A1A1A] px-2.5 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-400" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 p-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Phone className="h-4 w-4 shrink-0 text-green-400" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-xs text-neutral-400">Phone</p>
                        <a
                          href={PROFILE.contact.phoneHref}
                          className="block font-mono text-sm font-medium tabular-nums text-white hover:text-green-400"
                        >
                          {PROFILE.contact.phone}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('phone', PROFILE.contact.phone)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-neutral-700 bg-[#1A1A1A] px-2.5 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-400" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 p-4">
                    <MapPin className="h-4 w-4 shrink-0 text-green-400" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-neutral-400">Location</p>
                      <p className="text-sm font-medium text-white">
                        {PROFILE.contact.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Composer Form */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleFormSubmit}
                  className="rounded-xl border border-neutral-800 bg-[#111111] p-6 sm:p-8"
                  noValidate
                >
                  <h3 className="font-display text-lg font-semibold text-white">
                    Compose an Inquiry
                  </h3>
                  <p className="mt-1 text-xs text-neutral-400">
                    Prepare a structured message for {PROFILE.name} to open in your email client or copy directly.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="sender-name" className="block text-xs font-medium text-neutral-300">
                        Your Name
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        value={senderName}
                        onChange={(e) => {
                          setSenderName(e.target.value);
                          if (formError) setFormError('');
                          if (formSubmitted) setFormSubmitted(false);
                        }}
                        placeholder="Dr. Sarah Ahmed"
                        className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-[#050505] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-green-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="sender-org" className="block text-xs font-medium text-neutral-300">
                        Clinic / Organization (Optional)
                      </label>
                      <input
                        id="sender-org"
                        type="text"
                        value={organization}
                        onChange={(e) => {
                          setOrganization(e.target.value);
                          if (formSubmitted) setFormSubmitted(false);
                        }}
                        placeholder="Healthcare Practice or Billing Group"
                        className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-[#050505] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-green-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="inquiry-topic" className="block text-xs font-medium text-neutral-300">
                      Area of Interest
                    </label>
                    <select
                      id="inquiry-topic"
                      value={inquiryTopic}
                      onChange={(e) => {
                        setInquiryTopic(e.target.value);
                        if (formSubmitted) setFormSubmitted(false);
                      }}
                      className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-[#050505] px-3.5 py-2.5 text-sm text-white focus:border-green-500 focus:outline-none"
                    >
                      <option value="Full-Cycle Medical Billing & Coding">
                        Full-Cycle Medical Billing &amp; Coding
                      </option>
                      <option value="Medical Billing (MB) & Claims Operations">
                        Medical Billing (MB) &amp; Claims Operations
                      </option>
                      <option value="Insurance Verification & A/R Billing">
                        Insurance Verification &amp; A/R Billing
                      </option>
                      <option value="Provider Credentialing & Panel Enrollment">
                        Provider Credentialing &amp; Panel Enrollment
                      </option>
                      <option value="Denial Management, Follow-Up & Appeals">
                        Denial Management, Follow-Up &amp; Appeals
                      </option>
                      <option value="EHR Operations & HIPAA Compliance">
                        EHR Operations &amp; HIPAA Compliance
                      </option>
                      <option value="Full-Time / Contract Opportunity">
                        Full-Time / Contract Opportunity
                      </option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="inquiry-message" className="block text-xs font-medium text-neutral-300">
                      Message
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (formError) setFormError('');
                        if (formSubmitted) setFormSubmitted(false);
                      }}
                      placeholder="Share details about your practice, payer panels, EHR system, or role requirements..."
                      className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-[#050505] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="mt-3 text-xs font-medium text-rose-400">
                      {formError}
                    </p>
                  )}

                  {formSubmitted && (
                    <div className="mt-4 rounded-lg border border-neutral-700 bg-[#050505] p-4">
                      <p className="text-xs font-semibold text-white">
                        Inquiry ready to send to {PROFILE.contact.email}
                      </p>
                      <p className="mt-1 text-xs text-neutral-400">
                        Open your default mail app with the formatted draft, or copy the message directly.
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <a
                          href={composeMailtoHref()}
                          className="inline-flex items-center gap-1.5 rounded-md bg-[#15803D] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#166534]"
                        >
                          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Open Email Client</span>
                        </a>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              'draft',
                              `To: ${PROFILE.contact.email}\nSubject: ${inquiryTopic} — ${senderName}\nOrganization: ${
                                organization || 'N/A'
                              }\n\n${message}`
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-700 bg-[#1A1A1A] px-3.5 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-800"
                        >
                          {copiedField === 'draft' ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-green-400" aria-hidden="true" />
                              <span>Draft Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Copy Draft</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-end">
                    <button
                      type="submit"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#15803D] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                    >
                      Prepare Inquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="border-t border-neutral-800 bg-[#050505]/95 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 text-xs text-neutral-400 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {PROFILE.name} · Medical Biller &amp; Credentialing Specialist
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setCvModalOpen(true)}
              className="font-medium text-neutral-300 transition-colors hover:text-green-400"
            >
              View CV
            </button>
            <a
              href={PROFILE.cvPdfUrl}
              download="Kamran_Nazir_CV.pdf"
              className="font-medium text-neutral-300 transition-colors hover:text-green-400"
            >
              Download PDF
            </a>
            <a
              href="#top"
              className="font-medium text-neutral-300 transition-colors hover:text-green-400"
            >
              Back to Top
            </a>
          </div>
        </div>
      </footer>
      </div>

      <CvModal open={cvModalOpen} onClose={() => setCvModalOpen(false)} />
      <PracticeDrawer
        area={selectedArea}
        onClose={() => setSelectedArea(null)}
        onInquire={handleSelectInquiryTopic}
      />
    </div>
  );
}
