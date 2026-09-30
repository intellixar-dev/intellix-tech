import React, { useState } from 'react';
import { products as PRODUCTS } from '@/data/products';
import CategoryCards from '@/components/products/CategoryCards';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ConsultationModal from '@/components/ConsultationModal';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useInView';

// ── Data ──────────────────────────────────────────────────────────────────────



const BUILDING_ITEMS = [
  {
    icon: '📡',
    title: 'AI Radar Detection Engine',
    status: 'In Progress',
    desc: 'Building the core ML model for content authenticity scoring and trust signal detection.',
    color: '#22d3ee',
  },
  {
    icon: '🌱',
    title: 'Kilimo Power',
    status: 'In Development',
    desc: PRODUCTS.find((product) => product.id === 'kilimo-power').description,
    color: '#34d399',
  },
];

// ── Shared Primitives ─────────────────────────────────────────────────────────

const EyebrowLabel = ({ children }) => (
  <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--label-cyan)' }}>
    {children}
  </p>
);

const StatusBadge = ({ label, color }) => (
  <span
    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
    style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}
  >
    <span className="w-1 h-1 rounded-full inline-block" style={{ background: color }} />
    {label}
  </span>
);

// Radar visual
const RadarVisual = ({ size = 200 }) => (
  <div className="relative mx-auto float-up" style={{ width: size, height: size }}>
    <div
      className="scan-ring absolute rounded-full border border-cyan-400/40"
      style={{ width: size * 0.8, height: size * 0.8, top: '50%', left: '50%' }}
    />
    {[0.28, 0.48, 0.68, 0.88].map((r, i) => (
      <div
        key={i}
        className="absolute rounded-full border"
        style={{ width: size * r, height: size * r, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', borderColor: 'rgba(34,211,238,0.18)' }}
      />
    ))}
    <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: 'rgba(34,211,238,0.08)' }} />
    <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'rgba(34,211,238,0.08)' }} />
    <div
      className="absolute inset-0 rounded-full radar-sweep"
      style={{ background: 'conic-gradient(from 0deg, transparent 280deg, rgba(34,211,238,0.1) 330deg, rgba(34,211,238,0.45) 360deg)' }}
    />
    <div className="absolute glow-pulse rounded-full bg-cyan-400" style={{ width: 10, height: 10, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
    <div className="absolute rounded-full bg-cyan-400 glow-pulse" style={{ width: 7, height: 7, top: '28%', left: '66%' }} />
    <div className="absolute rounded-full bg-blue-400" style={{ width: 5, height: 5, top: '63%', left: '32%', opacity: 0.7 }} />
  </div>
);

// Scroll-reveal wrapper
const Reveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const [ref, inView] = useInView();
  const cls = direction === 'left' ? 'reveal-left' : 'reveal';
  return (
    <div
      ref={ref}
      className={`${cls} ${inView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ── Sections ──────────────────────────────────────────────────────────────────

const HeroSection = ({ onWorkWithUs }) => {
  const { isDark } = useTheme();
  const heroBg = isDark
    ? 'linear-gradient(160deg, #040a14 0%, #060d1a 60%, #08112a 100%)'
    : 'linear-gradient(160deg, #eef2ff 0%, #e0e7ff 60%, #ede9fe 100%)';

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden"
      style={{ background: heroBg }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none breathe"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translate(-50%,-50%)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none breathe"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translate(50%,50%)', animationDelay: '3s' }} />

      <div className="relative max-w-5xl mx-auto">
        <Reveal>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-10"
            style={{ borderColor: 'rgba(124,58,237,0.35)', background: 'rgba(124,58,237,0.08)', color: 'var(--label-purple)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 glow-pulse inline-block" />
            AI Startup Studio · Nairobi, Kenya
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-tight leading-[0.92] mb-7"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
          >
            Building Intelligent<br />
            <span className="text-gradient-cyan">Software Experiences</span><br />
            for the Future.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
            IntelliXar is a creative technology lab building AI-powered products,
            startup MVPs, and ideas the world hasn&apos;t seen yet.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#products">
              <button
                className="px-8 py-3.5 rounded-full font-bold text-black text-base transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg,#22d3ee,#7c3aed)', boxShadow: '0 0 36px rgba(34,211,238,0.28)' }}
              >
                Explore Products
              </button>
            </a>
            <button
              onClick={onWorkWithUs}
              className="px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:bg-white/5"
              style={{ color: 'var(--text-primary)', border: '1px solid var(--border-card)' }}
            >
              Work With Us
            </button>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-cyan-500/40" />
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="px-6 py-24" style={{ background: 'var(--bg-surface)' }}>
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <div className="mb-16 max-w-3xl">
          <EyebrowLabel>Philosophy</EyebrowLabel>
          <h2
            className="text-4xl md:text-5xl font-black mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
          >
            We Build Software<br />
            <span className="text-gradient-cyan">That Feels Alive.</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            IntelliXar is an extraordinary software company with a mission to build impossible ideas —
            in a world where AI serves as a companion, not a replacement. We believe in living
            limitlessly, without waiting for permission.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { icon: '🤖', title: 'AI + Creativity', desc: 'We fuse AI with creative thinking to build products that surprise people and change how they interact with technology.', accent: '#22d3ee', delay: 0 },
          { icon: '⚡', title: 'Experimental Energy', desc: 'We prototype fast, learn faster, and ship with intention. Every release is a step toward something more ambitious.', accent: '#a855f7', delay: 100 },
          { icon: '🌍', title: 'Human-Centered', desc: 'Every line of code serves a human purpose. We build products people actually love using, not just impressive demos.', accent: '#34d399', delay: 200 },
        ].map((item) => (
          <Reveal key={item.title} delay={item.delay}>
            <div
              className="glass-card rounded-2xl p-7 h-full"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${item.accent}35`; e.currentTarget.style.boxShadow = `0 0 28px ${item.accent}0a`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-card)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const ProductsSection = () => {
  const featured = PRODUCTS.find((p) => p.type === 'intellixar' && p.featured);
  const others = PRODUCTS.filter((p) => !p.featured);
  const clientProducts = others.filter((product) => product.type === 'client');

  return (
    <section id="products" className="px-6 py-24" style={{ background: 'var(--bg-mid)' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <EyebrowLabel>Products</EyebrowLabel>
            <h2
              className="text-4xl md:text-5xl font-black"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
            >
              Products built with intention.
            </h2>
          </div>
        </Reveal>

        <div className="mb-12"><CategoryCards /></div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Intellixar Products</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Products we build, own, and evolve at Intellixar.</p>
        </div>

        {/* Featured */}
        <Reveal>
          <div
            className="rounded-2xl p-px mb-6"
            style={{ background: `linear-gradient(135deg, ${featured.accent}50 0%, rgba(59,130,246,0.2) 100%)` }}
          >
            <div
              className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center"
              style={{ background: 'var(--modal-bg)', backdropFilter: 'blur(20px)' }}
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Intellixar Product</span>
                  <StatusBadge label={featured.status} color={featured.statusColor} />
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(34,211,238,0.1)', color: '#22d3ee' }}>Flagship</span>
                </div>
                <h3
                  className="text-4xl md:text-5xl font-black mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: featured.accent, textShadow: `0 0 40px ${featured.accent}50` }}
                >
                  {featured.title}
                </h3>
                <p className="text-lg mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>{featured.mission}</p>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{featured.description}</p>
                <ul className="flex flex-wrap gap-2 mb-8">
                  {featured.features.map((f) => (
                    <li key={f} className="text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{ background: `${featured.accent}12`, color: featured.accent, border: `1px solid ${featured.accent}35` }}>{f}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link href={featured.href}>
                    <button className="px-6 py-2.5 rounded-full font-bold text-black text-sm transition-all hover:scale-105"
                      style={{ background: featured.accent, boxShadow: `0 0 24px ${featured.accent}40` }}>
                      View Product
                    </button>
                  </Link>
                  <Link href="/ai-radar#waitlist">
                    <button className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all"
                      style={{ color: featured.accent, border: `1px solid ${featured.accent}40` }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = `${featured.accent}10`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                      Join Waitlist
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0"><RadarVisual size={220} /></div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {others.filter((product) => product.type === 'intellixar').map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
        <div className="mt-14 mb-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Client Products</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Digital products we build in partnership with ambitious businesses, founders, and organizations.</p>
        </div>
        <div className={`grid gap-6 ${clientProducts.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {clientProducts.map((product) => (
            <ProductCard key={product.id} product={product} compact wide={clientProducts.length === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AIRadarSpotlight = () => {
  const { isDark } = useTheme();
  const bg = isDark
    ? 'linear-gradient(160deg, #060d1a 0%, #041020 50%, #06111f 100%)'
    : 'linear-gradient(160deg, #eef2ff 0%, #e0f2fe 50%, #f0f9ff 100%)';

  return (
    <section className="px-6 py-24 overflow-hidden relative" style={{ background: bg }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="text-center mb-16">
            <EyebrowLabel>Flagship Product</EyebrowLabel>
            <h2 className="text-4xl md:text-5xl font-black mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
              AI{' '}
              <span style={{ color: '#22d3ee', textShadow: '0 0 40px rgba(34,211,238,0.5)' }}>Radar</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Helping people identify AI-generated and manipulated content so they can make more informed decisions online.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: '🔍', title: 'AI Content Detection', desc: 'Analyzes text patterns and linguistic markers to identify AI-generated content.' },
            { icon: '🖼️', title: 'Image Analysis', desc: 'Scans screenshots for manipulation artifacts and AI generation fingerprints.' },
            { icon: '📡', title: 'Credibility Signals', desc: 'Surfaces source reliability and propagation patterns instantly.' },
            { icon: '🎯', title: 'Radar Trust Score', desc: 'Results on an intuitive confidence dial — clear, visual, actionable.' },
          ].map((f, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="glass-card rounded-xl p-6 h-full"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.25)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-card)'; }}>
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="rounded-2xl p-px"
            style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.3) 0%, rgba(59,130,246,0.1) 100%)' }}>
            <div className="rounded-2xl px-8 md:px-14 py-12 text-center"
              style={{ background: 'var(--modal-bg)', backdropFilter: 'blur(20px)' }}>
              <EyebrowLabel>Mission</EyebrowLabel>
              <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto mb-8"
                style={{ color: 'var(--text-primary)' }}>
                &ldquo;AI Radar helps people quickly identify, analyze, and verify AI-generated
                or manipulated content so they can make{' '}
                <span style={{ color: '#22d3ee' }}>more informed decisions online.</span>&rdquo;
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                  <Link href="/ai-radar#waitlist">
                    <button className="px-8 py-3 rounded-full font-bold text-black text-sm transition-all hover:scale-105"
                    style={{ background: '#22d3ee', boxShadow: '0 0 28px rgba(34,211,238,0.4)' }}>
                    Join Waitlist
                  </button>
                </Link>
                <Link href="/ai-radar">
                  <button className="px-8 py-3 rounded-full font-semibold text-sm transition-all"
                    style={{ color: '#22d3ee', border: '1px solid rgba(34,211,238,0.35)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(34,211,238,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const CurrentlyBuildingSection = () => (
  <section id="building" className="px-6 py-24" style={{ background: 'var(--bg-surface)' }}>
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <div className="mb-14">
          <EyebrowLabel>Always Shipping</EyebrowLabel>
          <h2 className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
            What We&apos;re Building
          </h2>
          <p className="text-base max-w-lg" style={{ color: 'var(--text-muted)' }}>
            A live snapshot of our most active development efforts right now.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
        {BUILDING_ITEMS.map((item, i) => (
          <Reveal key={i} delay={i * 120}>
            <div
              className="glass-card rounded-2xl p-7"
              style={{ borderLeft: `3px solid ${item.color}` }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 28px ${item.color}10`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{item.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}35` }}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const PortfolioTeaser = () => {
  const clientProducts = PRODUCTS.filter((product) => product.type === 'client');

  return <section id="portfolio-teaser" className="px-6 py-24" style={{ background: 'var(--bg-mid)' }}>
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
        <Reveal>
          <div>
            <EyebrowLabel>Portfolio</EyebrowLabel>
            <h2 className="text-4xl md:text-5xl font-black"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
              Selected Work
            </h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <Link href="/portfolio">
            <button className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ color: '#a78bfa', border: '1px solid rgba(167,139,250,0.3)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(167,139,250,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              View All Projects →
            </button>
          </Link>
        </Reveal>
      </div>

      <div className={`grid gap-5 ${clientProducts.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
        {clientProducts.map((product, i) => (
          <Reveal key={product.id} delay={i * 100}>
            <ProductCard product={product} compact wide={clientProducts.length === 1} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
};

const WorkWithUsSection = ({ onOpenModal }) => {
  const { isDark } = useTheme();
  return (
    <section id="work-with-us" className="px-6 py-28 text-center relative overflow-hidden"
      style={{ background: isDark ? '#0a1628' : '#ede9fe' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }} />
      <div className="relative max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--label-purple)' }}>Let&apos;s Build</p>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
            Work With{' '}
            <span style={{ background: 'linear-gradient(135deg,#7c3aed,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              IntelliXar
            </span>
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            We partner with founders, startups, and ambitious brands to build intelligent digital
            experiences. Currently accepting limited client projects.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <button onClick={onOpenModal}
              className="px-8 py-3.5 rounded-full font-bold text-black text-base transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#22d3ee,#7c3aed)', boxShadow: '0 0 36px rgba(34,211,238,0.25)' }}>
              Book Consultation
            </button>
            <button onClick={onOpenModal}
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
        <Reveal delay={200}>
          <div className="flex flex-wrap justify-center gap-6">
            {['AI Products', 'Startup MVPs', 'Web Apps', 'Mobile Apps', 'Creative Technology'].map((s) => (
              <span key={s} className="text-sm flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <span className="w-1 h-1 rounded-full bg-purple-500 inline-block" />{s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Layout>
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div>
        <HeroSection onWorkWithUs={() => setModalOpen(true)} />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <ProductsSection />
        <div className="section-divider" />
        <AIRadarSpotlight />
        <div className="section-divider" />
        <CurrentlyBuildingSection />
        <div className="section-divider" />
        <PortfolioTeaser />
        <div className="section-divider" />
        <WorkWithUsSection onOpenModal={() => setModalOpen(true)} />
      </div>
    </Layout>
  );
};

export default HomePage;
