import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useTheme } from '@/context/ThemeContext';

const PROJECT_TYPES = ['AI Product', 'Startup MVP', 'Web Application', 'Mobile App', 'Creative Technology', 'Other'];
const BUDGETS = ['Under $5K', '$5K – $15K', '$15K – $50K', '$50K+', "Let's talk"];
const TIMELINES = ['ASAP', '1 – 3 months', '3 – 6 months', '6+ months', 'Flexible'];

const EMPTY = { name: '', email: '', company: '', projectType: '', budget: '', timeline: '', description: '' };

export default function ConsultationModal({ isOpen, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [state, handleSubmit, reset] = useForm('mppwnoaq');
  const { isDark } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setForm(EMPTY);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const closeModal = () => {
    reset();
    setForm(EMPTY);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: isDark ? 'linear-gradient(160deg, #060d1a 0%, #0a1628 100%)' : 'linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)',
          border: `1px solid ${isDark ? 'rgba(34,211,238,0.18)' : 'rgba(124,58,237,0.2)'}`,
          boxShadow: isDark ? '0 0 60px rgba(34,211,238,0.08), 0 25px 50px rgba(0,0,0,0.6)' : '0 25px 50px rgba(0,0,0,0.2)',
        }}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all z-10"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-8 md:p-10">
          {state.succeeded ? (
            <div role="status" className="text-center py-12">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 glow-pulse"
                style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.3)' }}
              >
                <span className="text-2xl">✓</span>
              </div>
              <h3
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                We&apos;ll be in touch.
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
                Your inquiry has been received. Expect a response within 24–48 hours.
              </p>
              <button
                onClick={closeModal}
                className="mt-8 px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #22d3ee, #7c3aed)',
                  color: '#000',
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ background: 'rgba(34,211,238,0.08)', color: '#67e8f9', border: '1px solid rgba(34,211,238,0.2)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block glow-pulse" />
                  Currently accepting limited projects
                </div>
                <h2
                  className="text-2xl md:text-3xl font-black text-white mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Start a Project
                </h2>
                <p className="text-gray-400 text-sm">
                  Tell us about what you&apos;re building. We&apos;ll reach out to schedule a call.
                </p>
              </div>

              <form action="https://formspree.io/f/mppwnoaq" method="POST" onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="source" value="Consultation Modal" />
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="ix-label">Name *</label>
                    <input
                      required
                      name="name"
                      className="ix-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={set('name')}
                    />
                  </div>
                  <div>
                    <label className="ix-label">Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      className="ix-input"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={set('email')}
                    />
                    <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-400 text-xs mt-2" />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="ix-label">Company / Startup</label>
                  <input
                    name="company"
                    className="ix-input"
                    placeholder="Optional"
                    value={form.company}
                    onChange={set('company')}
                  />
                </div>

                {/* Project Type + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="ix-label">Project Type *</label>
                    <select required name="projectType" className="ix-input" value={form.projectType} onChange={set('projectType')}>
                      <option value="" disabled>Select type</option>
                      {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ValidationError field="projectType" prefix="Project type" errors={state.errors} className="text-red-400 text-xs mt-2" />
                  </div>
                  <div>
                    <label className="ix-label">Budget Range</label>
                    <select name="budget" className="ix-input" value={form.budget} onChange={set('budget')}>
                      <option value="" disabled>Select range</option>
                      {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="ix-label">Timeline</label>
                  <select name="timeline" className="ix-input" value={form.timeline} onChange={set('timeline')}>
                    <option value="" disabled>When do you need this?</option>
                    {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="ix-label">Project Description *</label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    className="ix-input resize-none"
                    placeholder="Describe your project, goals, and any specific requirements..."
                    value={form.description}
                    onChange={set('description')}
                  />
                  <ValidationError field="message" prefix="Project description" errors={state.errors} className="text-red-400 text-xs mt-2" />
                </div>

                <ValidationError errors={state.errors} role="alert" className="text-red-400 text-sm" />
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full py-3.5 rounded-xl font-bold text-black text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait"
                  style={{
                    background: 'linear-gradient(135deg, #22d3ee, #7c3aed)',
                    boxShadow: '0 0 32px rgba(34,211,238,0.25)',
                  }}
                >
                  {state.submitting ? 'Sending...' : 'Send Inquiry'}
                </button>

                <p className="text-center text-gray-600 text-xs">
                  Or email us directly at{' '}
                  <a href="mailto:intellixar.tech@gmail.com" className="text-cyan-500 hover:text-cyan-400">
                    intellixar.tech@gmail.com
                  </a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
