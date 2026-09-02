import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../store/ContentContext'
import RevealDiv from '../components/RevealDiv'
import { allProducts } from '../data/products'

export default function Home() {
  const { content } = useContent()
  const [openFaq, setOpenFaq] = useState(null)
  const pickTrackRef = useRef(null)
  const [activePick, setActivePick] = useState(0)

  const mostPickItems = allProducts.filter(p => [4.9, 4.8].includes(p.rating)).slice(0, 12)

  const getVisiblePickCount = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth <= 480) return 1
    if (window.innerWidth <= 768) return 1
    return 3
  }

  const getPickCardWidth = () => {
    const track = pickTrackRef.current
    if (!track) return 320
    const card = track.querySelector('.most-pick-card')
    if (!card) return 320
    return card.offsetWidth + 20
  }

  const totalPickDots = Math.min(6, Math.max(1, mostPickItems.length - getVisiblePickCount() + 1))

  const scrollPick = (dir) => {
    const track = pickTrackRef.current
    if (!track) return
    const cw = getPickCardWidth()
    track.scrollBy({ left: dir === 'next' ? cw : -cw, behavior: 'smooth' })
  }

  const handlePickScroll = () => {
    const track = pickTrackRef.current
    if (!track) return
    const cw = getPickCardWidth()
    const vis = getVisiblePickCount()
    const maxDots = Math.max(1, mostPickItems.length - vis + 1)
    const raw = Math.round(track.scrollLeft / cw)
    setActivePick(Math.min(raw, maxDots - 1))
  }

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=80)` }} />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-icon animate-hero-up delay-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="hero-title animate-hero-up delay-1">
            {content.hero.title.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h1>
          <p className="hero-subtitle animate-hero-up delay-2">
            {content.hero.subtitle}
          </p>
          <div className="hero-btns animate-hero-up delay-3">
            <Link to="/gallery">
              <button className="cta-btn">
                {content.hero.cta1}
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </Link>
            <Link to="/about">
              <button className="cta-btn-outline">
                {content.hero.cta2}
              </button>
            </Link>
          </div>
          <div className="hero-trust animate-hero-up delay-4">
            <div className="hero-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>{content.hero.trust1}</span>
            </div>
            <div className="hero-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>{content.hero.trust2}</span>
            </div>
            <div className="hero-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>{content.hero.trust3}</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll animate-hero-up delay-5">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <RevealDiv type="up">
          <div className="section-label">Our Products</div>
          <h2 className="section-title">What We Fabricate</h2>
          <p className="section-desc">
            From modern windows to elegant railings — we deliver precision-crafted solutions for every space.
          </p>
        </RevealDiv>

        <div className="cat-grid">
          {content.categories.map((cat, i) => (
            <RevealDiv key={cat.id} type={i % 2 === 0 ? 'left' : 'right'}>
              <Link to={cat.to} style={{ textDecoration: 'none' }}>
                <div className="cat-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  {cat.img && <img src={cat.img} alt={cat.title} className="cat-card-img" loading="lazy" />}
                  <div className="cat-card-body">
                    <div className="cat-card-title">{cat.title}</div>
                    <div className="cat-card-desc">{cat.desc}</div>
                    <div className="cat-card-link">
                      View Collection
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* Most Pick - moved here */}
      <section className="section">
        <RevealDiv type="up">
          <div className="carousel-header">
            <div>
              <div className="section-label">Most Popular</div>
              <h2 className="carousel-title">Our Most Picked Products</h2>
            </div>
            <div className="carousel-nav">
              <button className="carousel-nav-btn" onClick={() => scrollPick('prev')} aria-label="Previous">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button className="carousel-nav-btn" onClick={() => scrollPick('next')} aria-label="Next">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </RevealDiv>

        <div className="carousel-wrapper">
          <div className="carousel-track" ref={pickTrackRef} onScroll={handlePickScroll}>
            {mostPickItems.map((item) => (
              <Link to={`/product/${item.slug}`} key={item.name} style={{ textDecoration: 'none' }}>
                <div className="most-pick-card" style={{ cursor: 'pointer' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <img src={item.img} alt={item.name} className="most-pick-img" loading="lazy" />
                  </div>
                  <div className="most-pick-body">
                    <div className="most-pick-tag">{item.tag}</div>
                    <div className="most-pick-name">{item.name}</div>
                    <div className="most-pick-rating">
                      {'★'.repeat(Math.floor(item.rating))}
                      <span>{item.rating} ({item.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="carousel-dots most-pick-dots">
            {Array.from({ length: totalPickDots }, (_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === activePick ? 'active' : ''}`}
                onClick={() => pickTrackRef.current?.scrollTo({ left: i * getPickCardWidth(), behavior: 'smooth' })}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-dark">
        <div className="section-inner">
          <div className="stats-row">
            {content.stats.map((st, i) => (
              <RevealDiv key={st.id} type="scale">
                <div className="stat-item" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="stat-number">{st.num}</div>
                  <div className="stat-label">{st.label}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-dark">
        <div className="section-inner">
          <RevealDiv type="up">
            <div className="section-label" style={{ color: 'var(--color-gold)' }}>Why Choose Us</div>
            <h2 className="section-title">Built on Trust & Precision</h2>
            <p className="section-desc">
              We combine traditional craftsmanship with modern technology to deliver excellence.
            </p>
          </RevealDiv>

          <div className="feat-grid">
            {content.features.map((f, i) => (
              <RevealDiv key={f.id} type={i % 2 === 0 ? 'left' : 'right'}>
                <div className="feat-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="feat-card-glow feat-card-glow-a" />
                  <div className="feat-card-glow feat-card-glow-b" />
                  <div className="feat-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      {f.icon === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                      {f.icon === 'tool' && <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>}
                      {f.icon === 'clock' && <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>}
                      {f.icon === 'check' && <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>}
                      {!['shield', 'tool', 'clock', 'check'].includes(f.icon) && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                    </svg>
                  </div>
                  <div className="feat-title">{f.title}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <RevealDiv type="up" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Process</div>
          <h2 className="section-title">How We Work</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            A seamless journey from your first call to the final installation.
          </p>
        </RevealDiv>

        <div className="process-grid">
          {content.process.map((p, i) => (
            <RevealDiv key={p.id} type={i % 2 === 0 ? 'left' : 'right'}>
              <div className="process-step">
                <div className="process-num">{p.num}</div>
                <div className="process-title">{p.title}</div>
                <div className="process-desc">{p.desc}</div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ overflow: 'hidden' }}>
        <RevealDiv type="up" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Testimonials</div>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Trusted by homeowners, architects, and builders across Pakistan.
          </p>
        </RevealDiv>

        <div className="carousel-wrapper">
          <div className="carousel-track auto-slide">
            {[...content.testimonials, ...content.testimonials, ...content.testimonials].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
                <div className="testimonial-text">{t.text}</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <RevealDiv type="up" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </RevealDiv>

        <div style={{ maxWidth: 800, margin: '40px auto 0', padding: '0 16px' }}>
          {content.faqs.map((faq, i) => (
            <RevealDiv key={faq.id} type="up">
              <div
                className="faq-item"
                style={{
                  border: '1px solid var(--color-border)', borderRadius: 14, marginBottom: 12,
                  overflow: 'hidden', transition: 'all 0.3s',
                  borderColor: openFaq === i ? 'var(--color-accent)' : 'var(--color-border)',
                  background: openFaq === i ? 'rgba(45,106,79,0.02)' : 'white',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="faq-question"
                  style={{
                    width: '100%', padding: '20px 24px', background: 'transparent', border: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', fontSize: 16, fontWeight: 600, color: 'var(--color-text)',
                    textAlign: 'left', gap: 12,
                  }}
                >
                  <span>{faq.q}</span>
                  <svg
                    width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                    style={{ transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0, color: 'var(--color-accent)' }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="faq-answer" style={{
                  maxHeight: openFaq === i ? 300 : 0, overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  <p style={{ padding: '0 24px 20px', fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* WhatsApp Section */}
      <section id="whatsapp" className="section" style={{ background: '#f7f8f5', maxWidth: '100%', padding: 'clamp(48px, 6vw, 72px) clamp(20px, 5vw, 52px)', borderRadius: 24, margin: '12px auto' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <RevealDiv type="scale">
            <div style={{ width: 80, height: 80, borderRadius: 20, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 32px rgba(37,211,102,0.3)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="section-label" style={{ justifyContent: 'center', color: '#25D366' }}>Chat With Us</div>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Need Quick Answers?</h2>
            <p className="section-desc" style={{ margin: '0 auto 32px', maxWidth: 500 }}>
              Chat with us directly on WhatsApp for instant responses, quick quotes, and project discussions. We're just a message away!
            </p>
            <a
              href={`https://wa.me/${content.footer.whatsapp}?text=Hi%20Pak%20Aluminium%20%26%20Steel!%20I'm%20interested%20in%20your%20fabrication%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '18px 40px', borderRadius: 14,
                background: '#25D366', color: 'white', fontSize: 17, fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.3s',
                boxShadow: '0 8px 32px rgba(37,211,102,0.3)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contact on WhatsApp
            </a>
          </RevealDiv>
        </div>
      </section>
    </>
  )
}
