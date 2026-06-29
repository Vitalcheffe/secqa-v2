'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider, Card3D } from '@/components/ui/motion';
import {
  Mail,
  Calendar,
  MessageCircle,
  Clock,
  MapPin,
  Send,
  GitBranch,
  AtSign,
  Briefcase,
  ChevronDown,
  Phone,
  Globe,
  CheckCircle2,
  ArrowRight,
  Zap,
} from 'lucide-react';

const CONTACT_METHODS = [
  { icon: Mail, t: 'Email', d: 'For anything: questions, feedback, support, security disclosures.', v: 'founder@secqa.example', s: 'Response SLA: 24 hours' },
  { icon: Calendar, t: 'Book a demo', d: '15 minutes. We process your last questionnaire live on the call.', v: 'Open calendar', s: 'Mon–Fri, 8am–6pm ET' },
  { icon: MessageCircle, t: 'Slack community', d: 'Join 80+ SaaS founders discussing compliance and security reviews.', v: 'Request invite', s: 'Free, no purchase required' },
  { icon: Phone, t: 'Enterprise sales', d: 'For 50+ seats or custom DPA requirements. Direct line to founder.', v: '+1 (415) 555-0142', s: 'Scale tier customers only' },
];

const SLA = [
  { channel: 'Email (general)', starter: '24 hours', pro: '4 hours', scale: '1 hour' },
  { channel: 'Email (security)', starter: '48 hours', pro: '24 hours', scale: '4 hours' },
  { channel: 'Slack channel', starter: '—', pro: '4 hours', scale: '1 hour' },
  { channel: 'Phone support', starter: '—', pro: '—', scale: 'Business hours' },
  { channel: 'Bug reports', starter: 'Best effort', pro: '48 hours', scale: '24 hours' },
  { channel: 'Feature requests', starter: 'Quarterly review', pro: 'Monthly review', scale: '2-week SLA' },
];

const OFFICE_HOURS = [
  { day: 'Monday', hours: '8:00 AM – 6:00 PM ET', status: 'Open' },
  { day: 'Tuesday', hours: '8:00 AM – 6:00 PM ET', status: 'Open' },
  { day: 'Wednesday', hours: '8:00 AM – 6:00 PM ET', status: 'Open' },
  { day: 'Thursday', hours: '8:00 AM – 6:00 PM ET', status: 'Open' },
  { day: 'Friday', hours: '8:00 AM – 6:00 PM ET', status: 'Open' },
  { day: 'Saturday', hours: 'Closed', status: 'Closed' },
  { day: 'Sunday', hours: 'Closed', status: 'Closed' },
];

const SOCIAL = [
  { icon: GitBranch, label: 'GitHub', handle: '@secqa', href: '#' },
  { icon: AtSign, label: 'Twitter / X', handle: '@secqa', href: '#' },
  { icon: Briefcase, label: 'LinkedIn', handle: 'SecQA Inc.', href: '#' },
  { icon: MessageCircle, label: 'Slack', handle: 'Community', href: '#' },
];

const FAQ = [
  { q: 'Do you have sales reps?', a: 'No. You talk directly to the founder. No BDR qualifying calls, no SDR follow-up sequences, no "let me check with my team." If you email us, the founder reads it and responds.' },
  { q: 'Can I get a custom DPA or security review?', a: 'Yes — Scale tier customers get a custom DPA, security review call, and direct access to the founder via Slack. For pre-sale, request via the contact form and we will set up a 30-minute call.' },
  { q: 'What is the response time on the contact form?', a: 'We respond to all contact form submissions within 24 hours on business days, typically within 4 hours during office hours. Security disclosures are triaged within 4 hours regardless of day.' },
  { q: 'Do you offer referral partnerships?', a: 'Yes. We pay 20% recurring commission for the first 12 months on any customer you refer. Apply via the contact form with "Referral" in the subject line.' },
  { q: 'How do I report a security vulnerability?', a: 'Email security@secqa.example with details. We respond within 4 hours, acknowledge within 24 hours, and provide a fix timeline within 72 hours. See our responsible disclosure policy for bounty details.' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    arr: 'Under $1M ARR',
    topic: 'General question',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className='bg-[#0D0D0D] text-white'>
      {/* ═══ HERO ═══ */}
      <section className='relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full blur-[120px] pointer-events-none bg-[#8B9DAF]/[0.04]' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-6'>Contact</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Talk to the founder<br />directly<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4'>
              No sales reps. No ticketing system. No BDR qualifying calls. You email us, the founder reads it and responds — usually within 4 business hours.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CONTACT METHODS ═══ */}
      <section className='py-20 md:py-28 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Get In Touch</p>
            <h2 className='text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-3'>
              Four ways to reach us<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <p className='text-sm text-[#999999] mb-10'>Pick the channel that fits — we monitor all of them.</p>
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
            {CONTACT_METHODS.map((c) => (
              <StaggerItem key={c.t}>
                <Card3D className='h-full group'>
                  <div className='w-11 h-11 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center mb-5 transition-colors group-hover:bg-[#8B9DAF]/20'>
                    <c.icon size={20} className='text-[#8B9DAF]' />
                  </div>
                  <h3 className='text-base font-semibold text-white mb-2'>{c.t}</h3>
                  <p className='text-xs text-[#999999] leading-[1.7] mb-4'>{c.d}</p>
                  <div className='text-sm text-[#8B9DAF] font-medium mb-1'>{c.v}</div>
                  <div className='text-xs text-[#666666]'>{c.s}</div>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CONTACT FORM ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12'>
            <FadeIn>
              <p className='section-label mb-4'>Send A Message</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
                We read every message<span className='text-[#8B9DAF]'>.</span>
              </h2>
              <div className='accent-line mb-8' />
              <p className='text-sm text-[#999999] leading-[1.8] mb-8'>
                Fill out the form and the founder will respond personally. For urgent security disclosures, email
                <span className='text-[#8B9DAF]'> security@secqa.example</span> directly — we triage those within 4 hours, day or night.
              </p>
              <div className='space-y-3'>
                <div className='flex items-center gap-3 text-sm text-[#999999]'>
                  <Clock size={16} className='text-[#8B9DAF]' />
                  <span>Average response: <span className='text-white'>3h 42m</span> on business days</span>
                </div>
                <div className='flex items-center gap-3 text-sm text-[#999999]'>
                  <Globe size={16} className='text-[#8B9DAF]' />
                  <span>Languages: <span className='text-white'>English, French</span></span>
                </div>
                <div className='flex items-center gap-3 text-sm text-[#999999]'>
                  <Zap size={16} className='text-[#8B9DAF]' />
                  <span>No bots, no auto-responders, no sequences</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className='card'>
                {submitted ? (
                  <div className='flex flex-col items-center justify-center text-center py-12'>
                    <div className='w-16 h-16 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center mb-5'>
                      <CheckCircle2 size={32} className='text-[#8B9DAF]' />
                    </div>
                    <h3 className='text-xl font-semibold text-white mb-2'>Message sent</h3>
                    <p className='text-sm text-[#999999] max-w-sm leading-relaxed mb-6'>
                      Thanks, {formData.name || 'there'}. The founder will respond within 24 hours, usually much faster.
                    </p>
                    <button
                      type='button'
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', company: '', arr: 'Under $1M ARR', topic: 'General question', message: '' });
                      }}
                      className='text-sm text-[#8B9DAF] hover:underline'
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label htmlFor='name' className='block text-xs text-[#999999] mb-1.5 font-medium'>
                          Name <span className='text-[#8B9DAF]'>*</span>
                        </label>
                        <input
                          id='name'
                          type='text'
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder='Jane Founder'
                          className='w-full px-4 py-2.5 rounded-md bg-white/[0.04] border border-white/8 text-white text-sm placeholder:text-[#666666] focus:border-[#8B9DAF] focus:outline-none transition-colors'
                        />
                      </div>
                      <div>
                        <label htmlFor='email' className='block text-xs text-[#999999] mb-1.5 font-medium'>
                          Email <span className='text-[#8B9DAF]'>*</span>
                        </label>
                        <input
                          id='email'
                          type='email'
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder='jane@company.com'
                          className='w-full px-4 py-2.5 rounded-md bg-white/[0.04] border border-white/8 text-white text-sm placeholder:text-[#666666] focus:border-[#8B9DAF] focus:outline-none transition-colors'
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor='company' className='block text-xs text-[#999999] mb-1.5 font-medium'>Company</label>
                      <input
                        id='company'
                        type='text'
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder='Acme SaaS Inc.'
                        className='w-full px-4 py-2.5 rounded-md bg-white/[0.04] border border-white/8 text-white text-sm placeholder:text-[#666666] focus:border-[#8B9DAF] focus:outline-none transition-colors'
                      />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label htmlFor='arr' className='block text-xs text-[#999999] mb-1.5 font-medium'>Annual recurring revenue</label>
                        <select
                          id='arr'
                          value={formData.arr}
                          onChange={(e) => setFormData({ ...formData, arr: e.target.value })}
                          className='w-full px-4 py-2.5 rounded-md bg-white/[0.04] border border-white/8 text-white text-sm focus:border-[#8B9DAF] focus:outline-none transition-colors'
                        >
                          <option>Under $1M ARR</option>
                          <option>$1M–$5M ARR</option>
                          <option>$5M–$20M ARR</option>
                          <option>$20M+ ARR</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor='topic' className='block text-xs text-[#999999] mb-1.5 font-medium'>Topic</label>
                        <select
                          id='topic'
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className='w-full px-4 py-2.5 rounded-md bg-white/[0.04] border border-white/8 text-white text-sm focus:border-[#8B9DAF] focus:outline-none transition-colors'
                        >
                          <option>General question</option>
                          <option>Sales / demo request</option>
                          <option>Security disclosure</option>
                          <option>Partnership / referral</option>
                          <option>Support (existing customer)</option>
                          <option>Press / media</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor='message' className='block text-xs text-[#999999] mb-1.5 font-medium'>
                        Message <span className='text-[#8B9DAF]'>*</span>
                      </label>
                      <textarea
                        id='message'
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder='What would you like to discuss?'
                        className='w-full px-4 py-2.5 rounded-md bg-white/[0.04] border border-white/8 text-white text-sm placeholder:text-[#666666] focus:border-[#8B9DAF] focus:outline-none transition-colors resize-y'
                      />
                    </div>
                    <button
                      type='submit'
                      className='w-full inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors'
                    >
                      <Send size={16} />
                      Send message
                    </button>
                    <p className='text-xs text-[#666666] text-center'>
                      By submitting you agree to our <Link href='/legal/privacy' className='text-[#8B9DAF] hover:underline'>privacy policy</Link>.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ RESPONSE SLA TABLE ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Response SLA</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              How fast we respond, by tier<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card overflow-x-auto no-scrollbar p-0'>
              <table className='data-table'>
                <thead>
                  <tr>
                    <th>Channel</th>
                    <th>Starter ($49)</th>
                    <th>Pro ($99)</th>
                    <th>Scale ($299)</th>
                  </tr>
                </thead>
                <tbody>
                  {SLA.map((row) => (
                    <tr key={row.channel}>
                      <td>{row.channel}</td>
                      <td className='text-[#999999]'>{row.starter}</td>
                      <td className='text-white'>{row.pro}</td>
                      <td className='text-[#8B9DAF] font-medium'>{row.scale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-xs text-[#666666] mt-4'>
              SLAs measured in business hours (8am–6pm ET, Mon–Fri). Scale tier SLAs apply 24/7 for critical incidents.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ OFFICE HOURS + MAP ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
            <FadeIn>
              <p className='section-label mb-4'>Office Hours</p>
              <h2 className='text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-6'>
                When we&apos;re around<span className='text-[#8B9DAF]'>.</span>
              </h2>
              <div className='accent-line mb-8' />
              <div className='card p-0 overflow-hidden'>
                {OFFICE_HOURS.map((d, i) => (
                  <div
                    key={d.day}
                    className={`flex items-center justify-between px-5 py-4 ${
                      i !== OFFICE_HOURS.length - 1 ? 'border-b border-white/4' : ''
                    }`}
                  >
                    <span className='text-sm font-medium text-white'>{d.day}</span>
                    <div className='flex items-center gap-3'>
                      <span className='text-xs text-[#999999] font-mono'>{d.hours}</span>
                      <span
                        className={`status-badge ${d.status === 'Open' ? 'status-badge-active' : 'status-badge-design'}`}
                      >
                        {d.status === 'Open' && (
                          <span className='w-1.5 h-1.5 rounded-full bg-[#8B9DAF] animate-pulse' />
                        )}
                        {d.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className='section-label mb-4'>Location</p>
              <h2 className='text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-6'>
                Where we work<span className='text-[#8B9DAF]'>.</span>
              </h2>
              <div className='accent-line mb-8' />
              <div className='card'>
                <div className='relative aspect-[4/3] rounded-lg overflow-hidden bg-[#0A0A0A] mb-5 dot-pattern'>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='relative'>
                      <div className='absolute inset-0 rounded-full bg-[#8B9DAF]/30 blur-xl animate-pulse' />
                      <div className='relative w-4 h-4 rounded-full bg-[#8B9DAF]'>
                        <div className='absolute inset-0 rounded-full bg-[#8B9DAF] animate-ping' />
                      </div>
                    </div>
                  </div>
                  <div className='absolute bottom-4 left-4 right-4 p-4 rounded-md bg-black/60 backdrop-blur-sm border border-white/8'>
                    <div className='flex items-center gap-2 mb-1'>
                      <MapPin size={14} className='text-[#8B9DAF]' />
                      <span className='text-sm font-semibold text-white'>Remote-first</span>
                    </div>
                    <p className='text-xs text-[#999999]'>
                      Headquarters: San Francisco, CA · Team distributed across SF, NYC, Paris, and Tunis.
                    </p>
                  </div>
                </div>
                <div className='space-y-2 text-sm text-[#999999]'>
                  <p><span className='text-white font-medium'>Time zone:</span> Primary operations in ET (UTC-5)</p>
                  <p><span className='text-white font-medium'>Mailing address:</span> 548 Market St, PMB 61094, San Francisco, CA 94104</p>
                  <p><span className='text-white font-medium'>Registered:</span> Delaware C-Corp, founded June 2026</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ FAQ ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>FAQ</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Before you ask<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='space-y-3' staggerDelay={0.08}>
            {FAQ.map((f, i) => (
              <StaggerItem key={f.q}>
                <div className='card overflow-hidden p-0'>
                  <button
                    type='button'
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className='w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors'
                    aria-expanded={openFaq === i}
                  >
                    <span className='text-sm md:text-base font-semibold text-white'>{f.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#8B9DAF] flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className='px-5 md:px-6 pb-5 md:pb-6 -mt-1'>
                      <p className='text-sm text-[#999999] leading-[1.8]'>{f.a}</p>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ SOCIAL ═══ */}
      <section className='py-20 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Connect</p>
            <h2 className='text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-10'>
              Find us elsewhere<span className='text-[#8B9DAF]'>.</span>
            </h2>
          </FadeIn>
          <StaggerContainer className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
            {SOCIAL.map((s) => (
              <StaggerItem key={s.label}>
                <a
                  href={s.href}
                  className='card block h-full group hover:border-[#8B9DAF]/30 transition-colors'
                >
                  <div className='flex items-center gap-4'>
                    <div className='w-11 h-11 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center transition-colors group-hover:bg-[#8B9DAF]/20'>
                      <s.icon size={20} className='text-[#8B9DAF]' />
                    </div>
                    <div>
                      <div className='text-sm font-semibold text-white'>{s.label}</div>
                      <div className='text-xs text-[#999999]'>{s.handle}</div>
                    </div>
                    <ArrowRight size={16} className='text-[#666666] ml-auto group-hover:text-[#8B9DAF] group-hover:translate-x-1 transition-all' />
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
