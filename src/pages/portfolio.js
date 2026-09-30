import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ConsultationModal from '@/components/ConsultationModal';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useInView';

const PROJECTS = [
  {
    id: 'kilimo-power',
    title: 'Kilimo Power',
    category: 'Farm Power & Machinery',
    tagline: 'Power Your Farm. Cut Costs. Harvest More.',
    description:
      "Kenya's most trusted farm power brand. Solar pumps, backup systems & farm machinery delivered to your farm — anywhere in Kenya. Farmers talk to the team on WhatsApp and get the right solution today.",
    challenge: 'Kenyan farmers struggled to access reliable, affordable farm power equipment and had no easy way to get expert guidance and delivery to remote areas.',
    outcome: 'Established as Kenya\'s go-to farm power brand with a WhatsApp-first ordering system that reaches farmers across all 47 counties.',
    stack: ['Next.js', 'WhatsApp Business API', 'PostgreSQL', 'Cloudinary'],
    accent: '#34d399',
    icon: '🌱',
    services: ['E-commerce Platform', 'WhatsApp Integration', 'Product Catalogue'],
    href: 'https://kilimopower.co.ke',
  },
];

const Reveal = ({ children, className = '', delay = 0 }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal ${inView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const WorkWithUs = ({ onOpen }) => {
  const { isDark } = useTheme();
  return (
    <section className="px-6 py-28 text-center relative overflow-hidden"
      style={{ background: isDark ? '#0a1628' : '#ede9fe' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }} />
      <div className="relative max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--label-purple)' }}>Partner With Us</p>
          <h2 className="text-4xl md:text-5xl font-black mb-5 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
            Have a project in mind?
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            We partner with founders, startups, and ambitious brands to build intelligent digital
            experiences. Let&apos;s make something great together.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={onOpen}
              className="px-8 py-3.5 rounded-full font-bold text-black text-base transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#22d3ee,#7c3aed)', boxShadow: '0 0 36px rgba(34,211,238,0.25)' }}>
              Book Consultation
            </button>
            <button onClick={onOpen}
              className="px-8 py-3.5 rounded-full font-semibold text-base transition-all"
              style={{ color: 'var(--text-primary)', border: '1px solid var(--border-card)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              Start a Project
            </button>
            <a href="mailto:intellixar.tech@gmail.com">
              <button className="px-8 py-3.5 rounded-full font-semibold text-base transition-all"
                style={{ color: 'var(--label-purple)', border: '1px solid rgba(167,139,250,0.25)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(167,139,250,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                Send Email
              </button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default function Portfolio() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <Layout>
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div>
        {/* Hero */}
        <section className="relative px-6 pt-16 pb-20 overflow-hidden"
          style={{ background: isDark ? 'linear-gradient(160deg, #040a14 0%, #060d1a 100%)' : 'linear-gradient(160deg, #eef2ff 0%, #ede9fe 100%)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`, backgroundSize: '70px 70px' }} />
          <div className="relative max-w-4xl mx-auto">
            <Reveal>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--label-purple)' }}>Portfolio</p>
              <h1 className="text-5xl md:text-7xl font-black mb-5 leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
                Selected{' '}
                <span style={{ background: 'linear-gradient(135deg,#7c3aed,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Work
                </span>
              </h1>
              <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Real products, real impact. A curated look at what we&apos;ve built for ambitious founders and brands across East Africa.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="section-divider" />

        {/* Projects */}
        <section className="px-6 py-20" style={{ background: 'var(--bg-mid)' }}>
          <div className="max-w-5xl mx-auto space-y-12">
            {PROJECTS.map((project) => (
              <Reveal key={project.id} delay={0}>
                <article
                  className="glass-card rounded-2xl overflow-hidden"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${project.accent}30`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-card)'; }}
                >
                  {/* Colored header band */}
                  <div className="px-8 pt-8 pb-6"
                    style={{ borderLeft: `4px solid ${project.accent}` }}>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                            style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}30` }}
                          >
                            {project.icon}
                          </span>
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>
                              {project.category}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black leading-tight"
                              style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
                              {project.title}
                            </h2>
                          </div>
                        </div>
                        <p className="text-sm font-medium" style={{ color: project.accent }}>{project.tagline}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((s) => (
                          <span key={s} className="text-xs px-3 py-1 rounded-full font-semibold"
                            style={{ background: `${project.accent}10`, color: project.accent, border: `1px solid ${project.accent}25` }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Description */}
                    <div className="md:col-span-2 space-y-5">
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}>
                          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Challenge</p>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.challenge}</p>
                        </div>
                        <div className="rounded-xl p-4" style={{ background: `${project.accent}06`, border: `1px solid ${project.accent}18` }}>
                          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: project.accent }}>Outcome</p>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.outcome}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tech stack + CTA */}
                    <div className="flex flex-col justify-between gap-5">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Tech Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span key={tech} className="text-xs px-2.5 py-1 rounded-full font-medium"
                              style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-card)' }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <a href={project.href} target="_blank" rel="noreferrer" className="block">
                          <button
                            className="w-full py-2.5 rounded-xl font-bold text-black text-sm transition-all hover:scale-[1.02]"
                            style={{ background: project.accent, boxShadow: `0 0 20px ${project.accent}35` }}
                          >
                            Visit Live Site ↗
                          </button>
                        </a>
                        <button
                        onClick={() => setModalOpen(true)}
                        className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                        style={{ background: `${project.accent}14`, color: project.accent, border: `1px solid ${project.accent}30` }}
                      >
                        Build Something Similar
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="section-divider" />
        <WorkWithUs onOpen={() => setModalOpen(true)} />
      </div>
    </Layout>
  );
}
