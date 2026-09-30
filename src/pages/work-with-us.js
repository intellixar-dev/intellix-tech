import React, { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Layout from '@/components/Layout';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useInView';

// ── Data ──────────────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    step: '01',
    icon: '🔍',
    title: 'Discovery',
    subtitle: 'We listen first.',
    description:
      'We kick off with a focused 30-minute call to understand your vision, goals, and constraints. No sales pitch — just honest conversation about what you want to build and whether we\'re the right fit.',
    duration: '30 min call',
    accent: '#22d3ee',
  },
  {
    step: '02',
    icon: '📋',
    title: 'Proposal & Scoping',
    subtitle: 'Transparent from day one.',
    description:
      'We map out the full project — technical architecture, design approach, milestones, timeline, and a clear budget. Everything in writing, no surprises. You approve before we write a single line of code.',
    duration: '2–5 days',
    accent: '#7c3aed',
  },
  {
    step: '03',
    icon: '⚡',
    title: 'Design & Build',
    subtitle: 'Sprints, not silence.',
    description:
      'We build in focused sprints with regular demos and check-ins. You see real progress every week. Feedback loops are tight — we iterate fast and ship clean, tested code with documentation.',
    duration: 'Ongoing sprints',
    accent: '#f59e0b',
  },
  {
    step: '04',
    icon: '🚀',
    title: 'Launch & Support',
    subtitle: 'We don\'t disappear at go-live.',
    description:
      'We handle the launch end-to-end — deployment, monitoring, and performance checks. Post-launch, we provide a support window for bugs and critical fixes. Your success after launch is part of our commitment.',
    duration: '2–4 week support',
    accent: '#34d399',
  },
];

const SERVICES = [
  { icon: '🤖', title: 'AI Products', desc: 'LLM integrations, AI-native features, intelligent automation, and smart data pipelines built for real-world use.', accent: '#22d3ee' },
  { icon: '🏗️', title: 'Startup MVPs', desc: 'From validated idea to launched product in weeks, not months. Built lean, tested with users, ready to grow.', accent: '#7c3aed' },
  { icon: '🌐', title: 'Web Applications', desc: 'Full-stack web apps with clean architecture, fast performance, and scalable infrastructure.', accent: '#3b82f6' },
  { icon: '📱', title: 'Mobile Apps', desc: 'iOS and Android apps with smooth UX, native performance, and offline-first design patterns.', accent: '#f59e0b' },
  { icon: '🎨', title: 'Creative Technology', desc: 'Experimental builds, immersive experiences, generative design, and unconventional digital products.', accent: '#f472b6' },
  { icon: '🔌', title: 'API & Integrations', desc: 'Custom APIs, third-party service integrations, webhooks, and system architecture for complex data flows.', accent: '#34d399' },
];

const PROJECT_TYPES = ['AI Product', 'Startup MVP', 'Web Application', 'Mobile App', 'Creative Technology', 'API / Integration', 'Other'];
const BUDGETS = ['Under $5K', '$5K – $15K', '$15K – $50K', '$50K+', "Let's talk"];
const TIMELINES = ['ASAP', '1 – 3 months', '3 – 6 months', '6+ months', 'Flexible'];
const EMPTY_FORM = { name: '', email: '', company: '', projectType: '', budget: '', timeline: '', description: '' };

// ── Reveal wrapper ────────────────────────────────────────────────────────────

const Reveal = ({ children, className = '', delay = 0 }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal ${inView ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// ── Sections ──────────────────────────────────────────────────────────────────

const HeroSection = () => {
  const { isDark } = useTheme();
  return (
    <section
      className="relative px-6 pt-16 pb-24 overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(160deg, #040a14 0%, #060d1a 100%)'
          : 'linear-gradient(160deg, #ede9fe 0%, #e0e7ff 60%, #f0f9ff 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: '70px 70px',
        }}
      />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none breathe"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', filter: 'blur(70px)', transform: 'translate(50%,-50%)' }} />

      <div className="relative max-w-4xl mx-auto">
        <Reveal>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-8"
            style={{ borderColor: 'rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.07)', color: 'var(--label-purple)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 glow-pulse inline-block" />
            Currently accepting limited projects
          </div>
          <h1
            className="text-5xl md:text-7xl font-black mb-6 leading-[0.92]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
          >
            Let&apos;s Build Something{' '}
            <span style={{ background: 'linear-gradient(135deg,#7c3aed,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Great Together.
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            We partner with founders, startups, and ambitious brands to design and build intelligent
            digital products. Here&apos;s exactly how we work — and how to get started.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { label: 'Avg. response time', value: '< 24 hrs' },
              { label: 'Projects delivered', value: '20+' },
              { label: 'Based in', value: 'Nairobi, Kenya' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black" style={{ color: '#7c3aed' }}>{stat.value}</p>
                <p className="text-xs uppercase tracking-widest mt-0.5" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const ProcessSection = () => (
  <section className="px-6 py-24" style={{ background: 'var(--bg-mid)' }}>
    <div className="max-w-5xl mx-auto">
      <Reveal>
        <div className="mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--label-purple)' }}>How We Work</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
          >
            The Process
          </h2>
        </div>
      </Reveal>

      <div className="relative">
        {/* Vertical connector line */}
        <div
          className="absolute left-6 top-10 bottom-10 w-px hidden md:block"
          style={{ background: 'linear-gradient(to bottom, var(--divider-col), transparent)' }}
        />

        <div className="space-y-8">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.step} delay={i * 80}>
              <div
                className="glass-card rounded-2xl p-7 md:pl-20 relative group"
                style={{ borderLeft: `3px solid ${step.accent}` }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 32px ${step.accent}0c`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Step number bubble */}
                <div
                  className="absolute left-5 top-7 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black hidden md:flex"
                  style={{ background: `${step.accent}15`, border: `2px solid ${step.accent}40`, color: step.accent }}
                >
                  {step.step}
                </div>

                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{step.icon}</span>
                      <div>
                        <h3
                          className="text-xl font-black leading-tight"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: step.accent }}>{step.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>
                      {step.description}
                    </p>
                  </div>
                  <div
                    className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold self-start"
                    style={{ background: `${step.accent}10`, color: step.accent, border: `1px solid ${step.accent}25` }}
                  >
                    {step.duration}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="px-6 py-24" style={{ background: 'var(--bg-surface)' }}>
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <div className="mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--label-cyan)' }}>What We Build</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
          >
            Services
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 70}>
            <div
              className="glass-card rounded-2xl p-6 h-full"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${s.accent}30`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-card)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: `${s.accent}12`, border: `1px solid ${s.accent}25` }}
              >
                {s.icon}
              </div>
              <h3
                className="font-bold text-base mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const ContactFormSection = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [state, handleSubmit, reset] = useForm('mppwnoaq');
  const { isDark } = useTheme();

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  useEffect(() => {
    if (state.succeeded) {
      window.scrollTo({ top: document.getElementById('contact-form').offsetTop - 80, behavior: 'smooth' });
    }
  }, [state.succeeded]);

  return (
    <section
      id="contact-form"
      className="px-6 py-24 relative overflow-hidden"
      style={{ background: isDark ? '#0a1628' : '#f1f5f9' }}
    >
      {/* Glow backdrop */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--label-purple)' }}>Get In Touch</p>
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
            >
              Start the Conversation
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Fill in the form below. We&apos;ll review your project and get back to you within 24 hours
              to schedule a discovery call.
            </p>
          </div>
        </Reveal>

        {state.succeeded ? (
          <Reveal>
            <div
              role="status"
              className="rounded-2xl p-12 text-center"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 glow-pulse"
                style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.3)' }}
              >
                <span className="text-2xl text-cyan-400">✓</span>
              </div>
              <h3
                className="text-2xl font-black mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
              >
                Message received.
              </h3>
              <p className="text-sm leading-relaxed max-w-sm mx-auto mb-2" style={{ color: 'var(--text-secondary)' }}>
                We&apos;ll review your project and reach out within 24–48 hours to book a discovery call.
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Expect an email from{' '}
                <a href="mailto:intellixar.tech@gmail.com" className="underline" style={{ color: '#22d3ee' }}>
                  intellixar.tech@gmail.com
                </a>
              </p>
              <button
                className="mt-8 px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg,#22d3ee,#7c3aed)', color: '#000' }}
                onClick={() => { reset(); setForm(EMPTY_FORM); }}
              >
                Submit Another Inquiry
              </button>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                backdropFilter: 'blur(12px)',
                boxShadow: isDark ? '0 0 60px rgba(124,58,237,0.06)' : '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              {/* Availability notice */}
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-8 text-sm"
                style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.18)' }}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 glow-pulse flex-shrink-0" />
                <span style={{ color: 'var(--label-cyan)' }}>
                  Currently accepting limited client projects — we respond within 24 hours.
                </span>
              </div>

              <form action="https://formspree.io/f/mppwnoaq" method="POST" onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="source" value="Work With Us" />
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="ix-label">Name *</label>
                    <input required name="name" className="ix-input" placeholder="Your name" value={form.name} onChange={set('name')} />
                  </div>
                  <div>
                    <label className="ix-label">Email *</label>
                    <input required type="email" name="email" className="ix-input" placeholder="you@company.com" value={form.email} onChange={set('email')} />
                    <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-400 text-xs mt-2" />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="ix-label">Company / Startup</label>
                  <input name="company" className="ix-input" placeholder="Optional" value={form.company} onChange={set('company')} />
                </div>

                {/* Project Type + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="ix-label">Project Type *</label>
                    <select required name="projectType" className="ix-input" value={form.projectType} onChange={set('projectType')}>
                      <option value="" disabled>Select type</option>
                      {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <ValidationError field="projectType" prefix="Project type" errors={state.errors} className="text-red-400 text-xs mt-2" />
                  </div>
                  <div>
                    <label className="ix-label">Budget Range</label>
                    <select name="budget" className="ix-input" value={form.budget} onChange={set('budget')}>
                      <option value="" disabled>Select range</option>
                      {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="ix-label">Timeline</label>
                  <select name="timeline" className="ix-input" value={form.timeline} onChange={set('timeline')}>
                    <option value="" disabled>When do you need this?</option>
                    {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="ix-label">Project Description *</label>
                  <textarea
                    required rows={5} name="message" className="ix-input resize-none"
                    placeholder="Describe your project, goals, and any specific requirements or constraints..."
                    value={form.description} onChange={set('description')}
                  />
                  <ValidationError field="message" prefix="Project description" errors={state.errors} className="text-red-400 text-xs mt-2" />
                </div>

                <ValidationError errors={state.errors} role="alert" className="text-red-400 text-sm" />
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full py-4 rounded-xl font-black text-black text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait"
                  style={{ background: 'linear-gradient(135deg,#22d3ee,#7c3aed)', boxShadow: '0 0 40px rgba(34,211,238,0.2)' }}
                >
                  {state.submitting ? 'Sending...' : 'Send Inquiry'}
                </button>

                <p className="text-center text-xs pt-1" style={{ color: 'var(--text-muted)' }}>
                  Or reach us directly at{' '}
                  <a href="mailto:intellixar.tech@gmail.com" style={{ color: '#22d3ee' }}>
                    intellixar.tech@gmail.com
                  </a>
                </p>
              </form>
            </div>
          </Reveal>
        )}

        {/* FAQ / trust block */}
        <Reveal delay={100}>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: '⚡', label: '< 24 hr', sub: 'Response time' },
              { icon: '🔒', label: 'NDA on request', sub: 'Confidentiality' },
              { icon: '🌍', label: 'Remote-first', sub: 'Work anywhere' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl py-4 px-3"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}
              >
                <span className="text-2xl block mb-1">{item.icon}</span>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WorkWithUs() {
  return (
    <Layout>
      <div>
        <HeroSection />
        <div className="section-divider" />
        <ProcessSection />
        <div className="section-divider" />
        <ServicesSection />
        <div className="section-divider" />
        <ContactFormSection />
      </div>
    </Layout>
  );
}
