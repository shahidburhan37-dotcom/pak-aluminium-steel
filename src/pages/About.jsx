import { Link } from 'react-router-dom'
import { useContent } from '../store/ContentContext'
import RevealDiv from '../components/RevealDiv'

const stats = [
  { num: '500+', label: 'Projects Completed' },
  { num: '10+', label: 'Years Experience' },
  { num: '50+', label: 'Expert Craftsmen' },
  { num: '100%', label: 'Client Satisfaction' },
]

const values = [
  {
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    title: 'Precision',
    desc: 'Every cut, every joint, every finish is executed with exacting precision using CNC technology.',
  },
  {
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    title: 'Durability',
    desc: 'We use only premium-grade aluminium and steel that withstands Pakistan\'s climate for decades.',
  },
  {
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
    title: 'Design',
    desc: 'From minimalist modern to ornate classic — we bring your architectural vision to life.',
  },
  {
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Trust',
    desc: 'Transparent pricing, honest timelines, and a commitment to exceeding expectations.',
  },
]

const timeline = [
  { year: '2015', title: 'Founded', desc: 'Started with a small workshop in Johar Town, Lahore with a vision for premium fabrication.' },
  { year: '2017', title: 'First Major Project', desc: 'Completed our first commercial building facade — 200+ windows for a DHA office complex.' },
  { year: '2019', title: 'CNC Technology', desc: 'Invested in German CNC machinery, boosting precision and production capacity by 300%.' },
  { year: '2021', title: '500+ Projects', desc: 'Milestone of 500 completed projects across residential, commercial, and industrial sectors.' },
  { year: '2023', title: 'Expansion', desc: 'Expanded workshop to 10,000 sq ft with dedicated sections for windows, railings, and doors.' },
  { year: '2025', title: 'Innovation', desc: 'Launching smart glass solutions and automated sliding systems for modern homes.' },
]

const team = [
  { name: 'Ahmed Khan', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Sara Malik', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Usman Ali', role: 'Production Manager', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Fatima Noor', role: 'Client Relations', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
]

const awards = [
  { title: 'Best Fabricator 2023', org: 'Pakistan Construction Awards' },
  { title: 'Quality Excellence', org: 'Lahore Chamber of Commerce' },
  { title: 'Innovation in Design', org: 'Pakistan Architecture Forum' },
  { title: 'Customer Choice Award', org: 'HomeExpo Pakistan' },
]

export default function About() {
  const { content } = useContent()
  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title animate-hero-up delay-0">About Pak Aluminium & Steel</h1>
        <p className="page-header-desc animate-hero-up delay-1">
          A decade of precision fabrication — turning architectural visions into reality.
        </p>
      </div>

      {/* About Content */}
      <section className="section">
        <div className="about-grid">
          <RevealDiv type="left">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80"
              alt="Pak Aluminium Workshop"
              className="about-img"
            />
          </RevealDiv>
          <RevealDiv type="right">
            <div className="about-content">
              <h3>Crafting Excellence Since 2015</h3>
              <p>
                Pak Aluminium & Steel is a leading aluminium and steel fabrication company based in Lahore, Pakistan. We specialize in designing, fabricating, and installing premium windows, railings, doors, and custom metalwork for residential and commercial projects.
              </p>
              <p>
                Our state-of-the-art workshop combines traditional craftsmanship with modern CNC technology, ensuring every product meets the highest standards of precision and quality. From a single window to an entire building facade — we deliver.
              </p>
              <div className="about-features">
                {[
                  'Free site consultation & measurement',
                  'Custom 3D design visualization',
                  'Premium grade materials only',
                  'Professional installation team',
                  'Post-installation support',
                  'Competitive market pricing',
                ].map(f => (
                  <div key={f} className="about-feature">
                    <div className="about-feature-dot" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* Stats */}
      <section className="section-dark">
        <div className="section-inner">
          <div className="stats-row">
            {stats.map(s => (
              <RevealDiv key={s.label} type="scale">
                <div className="stat-item">
                  <div className="stat-number">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section">
        <RevealDiv type="up" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Values</div>
          <h2 className="section-title">What Drives Us</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Built on principles that define who we are and how we work.
          </p>
        </RevealDiv>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginTop: 48, maxWidth: 1000, margin: '48px auto 0' }}>
          {values.map((v, i) => (
            <RevealDiv key={v.title} type={i % 2 === 0 ? 'left' : 'right'}>
              <div style={{
                padding: 32, borderRadius: 20, background: 'white',
                border: '1px solid var(--color-border)', textAlign: 'center',
                transition: 'all 0.3s', cursor: 'default',
              }}>
                <div style={{ marginBottom: 16 }}>{v.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 600, marginBottom: 8, color: 'var(--color-text)' }}>{v.title}</div>
                <div style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: '#f7f8f5', maxWidth: '100%', padding: 'clamp(48px, 6vw, 72px) clamp(20px, 5vw, 52px)', borderRadius: 24, margin: '12px auto' }}>
        <RevealDiv type="up" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Journey</div>
          <h2 className="section-title">Milestones That Define Us</h2>
        </RevealDiv>
        <div style={{ maxWidth: 700, margin: '48px auto 0', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, background: 'var(--color-border)' }} />
          {timeline.map((t, i) => (
            <RevealDiv key={t.year} type="left">
              <div style={{ display: 'flex', gap: 24, marginBottom: 40, position: 'relative' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: 'var(--color-accent)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 13, flexShrink: 0, zIndex: 1,
                }}>{t.year.slice(2)}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: 'var(--color-text)', marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{t.desc}</div>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <RevealDiv type="up" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Team</div>
          <h2 className="section-title">Meet the People Behind the Craft</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Passionate professionals dedicated to delivering excellence in every project.
          </p>
        </RevealDiv>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginTop: 48, maxWidth: 1000, margin: '48px auto 0' }}>
          {team.map((member, i) => (
            <RevealDiv key={member.name} type="scale">
              <div style={{
                borderRadius: 20, overflow: 'hidden', background: 'white',
                border: '1px solid var(--color-border)', transition: 'all 0.3s',
              }}>
                <img src={member.img} alt={member.name} style={{ width: '100%', height: 240, objectFit: 'cover' }} loading="lazy" />
                <div style={{ padding: 20, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: 'var(--color-text)' }}>{member.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--color-accent)', marginTop: 4 }}>{member.role}</div>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="section-dark">
        <div className="section-inner">
          <RevealDiv type="up" style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ color: 'var(--color-gold)', justifyContent: 'center' }}>Recognition</div>
            <h2 className="section-title" style={{ color: 'white' }}>Awards & Achievements</h2>
          </RevealDiv>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 48 }}>
            {awards.map((a, i) => (
              <RevealDiv key={a.title} type="scale">
                <div style={{
                  padding: 28, borderRadius: 16,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textAlign: 'center',
                }}>
                  <div style={{ marginBottom: 12 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                      <path d="M4 22h16"/>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 4 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{a.org}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Redirect */}
      <section className="section" id="contact">
        <RevealDiv type="up">
          <div className="section-label" style={{ justifyContent: 'center' }}>Get In Touch</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Ready to Start Your Project?</h2>
          <p className="section-desc" style={{ textAlign: 'center', margin: '0 auto 40px', maxWidth: 500 }}>
            Contact us through WhatsApp for a quick response, or fill out our contact form on the main page.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/${content.footer.whatsapp}?text=Hi%20Pak%20Aluminium%20%26%20Steel!%20I'm%20interested%20in%20your%20fabrication%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px', borderRadius: 12,
                background: '#25D366', color: 'white', fontSize: 16, fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="/#contact-form"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px', borderRadius: 12,
                background: 'var(--color-accent)', color: 'white', fontSize: 16, fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(45,106,79,0.3)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Fill Contact Form
            </a>
          </div>
        </RevealDiv>
      </section>
    </>
  )
}
