import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Brain, FileText, Zap, BarChart3, Lock } from 'lucide-react';

export const metadata = {
  title: 'SecQA — Security questionnaires, answered.',
  description:
    'AI-powered security questionnaire automation. Close any questionnaire in 90 minutes instead of 14 hours. Built for B2B SaaS $1M-$20M ARR.'
};

const STATS = [
  { value: '14h → 90min', label: 'Response time reduction' },
  { value: '90%', label: 'First-draft completion' },
  { value: '$53K', label: 'Annual time saved' },
  { value: '44x', label: 'Return on investment' }
];

const FEATURES = [
  { icon: Brain, title: 'AI answer drafting', desc: 'Claude 3.5 Haiku drafts answers grounded in your past responses and SOC2 evidence. 90% complete in 90 seconds.' },
  { icon: FileText, title: 'Multi-format parsing', desc: 'Upload PDF, DOCX, or CSV. We extract every question in 8 seconds, even from 200-question CAIQ spreadsheets.' },
  { icon: Shield, title: 'Source citations', desc: 'Every answer links back to its source past response. Your security lead verifies provenance in one click.' },
  { icon: Zap, title: 'Instant export', desc: 'One-click export to Word, PDF, or CSV with your customer\'s exact template formatting preserved.' },
  { icon: BarChart3, title: 'HubSpot integration', desc: 'Questionnaire status auto-syncs to your HubSpot deal. Sales managers see response time as a deal-stage gate.' },
  { icon: Lock, title: 'SOC2-grade security', desc: 'Single-tenant Postgres, AES-256 encryption, KMS-managed keys, audit logs on every query.' }
];

const CUSTOMER_LOGOS = ['PostHog', 'Resend', 'Linear', 'Cal.com', 'Clerk', 'Attio', 'Plain', 'Knock', 'Highlight', 'Axiom'];

export default function HomePage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      {/* NAV */}
      <nav style={{
        background: '#EEEEEE',
        borderBottom: '1px solid rgba(34,40,49,0.08)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#00ADB5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#EEEEEE',
            fontWeight: 800,
            fontSize: '0.9rem',
            letterSpacing: '-0.02em'
          }}>SQ</div>
          <span style={{ color: '#222831', fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>SecQA</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href='/pricing' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
          <Link href='/integrations' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Integrations</Link>
          <Link href='/customers' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Customers</Link>
          <Link href='/trust-center' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Trust</Link>
          <Link href='/auth/sign-in' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Log In</Link>
          <Link href='/pricing' style={{
            background: '#00ADB5',
            color: '#EEEEEE',
            padding: '0.55rem 1.2rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>Request a Demo</Link>
        </div>
      </nav>

      {/* HERO — dark #222831 background, centered headline with accent highlight */}
      <section style={{
        background: '#222831',
        color: '#EEEEEE',
        padding: '6rem 2rem 5rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            border: '1px solid rgba(0,173,181,0.4)',
            borderRadius: '999px',
            padding: '0.4rem 1rem',
            fontSize: '0.8rem',
            color: '#00ADB5',
            marginBottom: '1.8rem',
            fontWeight: 500
          }}>
            AI-native · Built for SaaS $1M–$20M ARR
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 1.5rem'
          }}>
            Security questionnaires,
            <br />
            <span style={{
              color: '#00ADB5',
              border: '1px solid rgba(0,173,181,0.3)',
              borderRadius: '8px',
              padding: '0 0.4rem'
            }}>answered</span>
            .
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(238,238,238,0.7)',
            maxWidth: '640px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Close any security questionnaire in 90 minutes instead of 14 hours. AI-powered answer drafting grounded in your past responses and SOC2 evidence.
          </p>
          <form style={{
            display: 'flex',
            gap: '0.5rem',
            maxWidth: '480px',
            margin: '0 auto',
            background: '#393E46',
            padding: '0.4rem',
            borderRadius: '8px'
          }}>
            <input
              type='email'
              placeholder='Enter your work email'
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#EEEEEE',
                padding: '0.6rem 1rem',
                fontSize: '0.95rem'
              }}
            />
            <button type='submit' style={{
              background: '#00ADB5',
              color: '#EEEEEE',
              border: 'none',
              padding: '0.6rem 1.4rem',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              Get a demo <ArrowRight size={16} />
            </button>
          </form>
          <p style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.5)', marginTop: '1rem' }}>
            14-day pilot at $499 · Money-back guarantee · No credit card required
          </p>
        </div>
      </section>

      {/* CUSTOMER LOGOS — grayscale horizontal strip */}
      <section style={{
        background: '#EEEEEE',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <p style={{
          color: 'rgba(34,40,49,0.6)',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '1.8rem'
        }}>
          Trusted by fast-growing B2B SaaS companies
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2.5rem',
          alignItems: 'center',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {CUSTOMER_LOGOS.map((logo) => (
            <span key={logo} style={{
              color: 'rgba(34,40,49,0.4)',
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '-0.02em'
            }}>
              {logo}
            </span>
          ))}
        </div>
      </section>

      {/* STATS — dark section with 4 big numbers */}
      <section style={{
        background: '#222831',
        color: '#EEEEEE',
        padding: '4rem 2rem'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          textAlign: 'center'
        }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#00ADB5',
                letterSpacing: '-0.02em',
                lineHeight: 1
              }}>{s.value}</div>
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(238,238,238,0.7)',
                marginTop: '0.6rem'
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES — 3-column grid with #393E46 cards, round icon on top */}
      <section style={{
        background: '#EEEEEE',
        padding: '5rem 2rem'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#222831',
              margin: '0 0 1rem'
            }}>
              Everything you need to
              <span style={{ color: '#00ADB5' }}> close deals faster</span>
            </h2>
            <p style={{ color: 'rgba(34,40,49,0.6)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              From upload to export in 5 steps. No more 14-hour questionnaires.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{
                background: '#393E46',
                color: '#EEEEEE',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#00ADB5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.2rem'
                }}>
                  <f.icon size={22} color='#EEEEEE' />
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  margin: '0 0 0.6rem',
                  letterSpacing: '-0.01em'
                }}>{f.title}</h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(238,238,238,0.7)',
                  lineHeight: 1.6,
                  margin: 0
                }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 5 steps on light bg */}
      <section style={{
        background: '#222831',
        color: '#EEEEEE',
        padding: '5rem 2rem'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 3rem'
          }}>
            From upload to export in <span style={{ color: '#00ADB5' }}>90 minutes</span>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1.5rem'
          }}>
            {[
              { n: '01', t: 'Upload', d: 'PDF, DOCX, or CSV. Parsed in 8 seconds.' },
              { n: '02', t: 'Generate', d: 'Claude drafts 90% of answers in 90 seconds.' },
              { n: '03', t: 'Cite', d: 'Every answer links to its source.' },
              { n: '04', t: 'Export', d: 'Word, PDF, or CSV with formatting.' },
              { n: '05', t: 'Integrate', d: 'Slack notify + HubSpot deal sync.' }
            ].map((s) => (
              <div key={s.n}>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#00ADB5',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>{s.n}</div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  margin: '0 0 0.4rem'
                }}>{s.t}</h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'rgba(238,238,238,0.7)',
                  lineHeight: 1.5,
                  margin: 0
                }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI BAND — light, 3 columns */}
      <section style={{
        background: '#EEEEEE',
        padding: '4rem 2rem'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}>
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#222831', letterSpacing: '-0.02em' }}>$53,760</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(34,40,49,0.6)', marginTop: '0.4rem' }}>Annual cost without SecQA</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', borderLeft: '1px solid rgba(34,40,49,0.1)', borderRight: '1px solid rgba(34,40,49,0.1)' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#222831', letterSpacing: '-0.02em' }}>$1,188</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(34,40,49,0.6)', marginTop: '0.4rem' }}>Annual cost with SecQA Pro</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00ADB5', letterSpacing: '-0.02em' }}>44x</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(34,40,49,0.6)', marginTop: '0.4rem' }}>Return on investment</div>
          </div>
        </div>
      </section>

      {/* DARK CTA BLOCK */}
      <section style={{
        background: '#222831',
        color: '#EEEEEE',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 1rem'
          }}>
            Stop losing deals to slow responses
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(238,238,238,0.7)',
            margin: '0 0 2rem',
            lineHeight: 1.6
          }}>
            Your next enterprise prospect will send a 200-question CAIQ. You can spend 14 hours on it, or 90 minutes.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href='/pricing' style={{
              background: '#00ADB5',
              color: '#EEEEEE',
              padding: '0.8rem 1.8rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              Start your $499 pilot <ArrowRight size={16} />
            </Link>
            <Link href='/demo' style={{
              border: '1px solid rgba(238,238,238,0.3)',
              color: '#EEEEEE',
              padding: '0.8rem 1.8rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Watch demo
            </Link>
          </div>
          <div style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {['14-day pilot', 'Money-back guarantee', 'No credit card to start'].map((t) => (
              <span key={t} style={{
                fontSize: '0.85rem',
                color: 'rgba(238,238,238,0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <CheckCircle2 size={14} color='#00ADB5' /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER — #222831 with 4 columns */}
      <footer style={{
        background: '#222831',
        color: '#EEEEEE',
        padding: '3rem 2rem 2rem',
        borderTop: '1px solid rgba(238,238,238,0.08)'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#00ADB5',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EEEEEE',
                fontWeight: 800,
                fontSize: '0.8rem'
              }}>SQ</div>
              <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>SecQA</span>
            </div>
            <p style={{ color: 'rgba(238,238,238,0.5)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '240px' }}>
              Security questionnaires, answered. AI-powered automation for B2B SaaS.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.5)', marginBottom: '0.8rem' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href='/pricing' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>Pricing</Link></li>
              <li><Link href='/integrations' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>Integrations</Link></li>
              <li><Link href='/demo' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>Demo</Link></li>
              <li><Link href='/changelog' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.5)', marginBottom: '0.8rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href='/about' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>About</Link></li>
              <li><Link href='/customers' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>Customers</Link></li>
              <li><Link href='/contact' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</Link></li>
              <li><Link href='/blog' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.5)', marginBottom: '0.8rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href='/legal/terms' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>Terms</Link></li>
              <li><Link href='/legal/privacy' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy</Link></li>
              <li><Link href='/legal/security' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>Security</Link></li>
              <li><Link href='/trust-center' style={{ color: '#EEEEEE', textDecoration: 'none', fontSize: '0.9rem' }}>Trust Center</Link></li>
            </ul>
          </div>
        </div>
        <div style={{
          maxWidth: '1100px',
          margin: '2.5rem auto 0',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(238,238,238,0.08)',
          textAlign: 'center',
          color: 'rgba(238,238,238,0.4)',
          fontSize: '0.8rem'
        }}>
          © 2026 SecQA. Security questionnaires, answered.
        </div>
      </footer>
    </div>
  );
}
