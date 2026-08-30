import { useState } from 'react'
import { Link } from 'react-router-dom'
import RevealDiv from '../components/RevealDiv'
import { getProductsByCategory, getFilterTypes } from '../data/products'

const filters = getFilterTypes('Railings')

export default function Railings() {
  const [active, setActive] = useState('All')
  const railings = getProductsByCategory('Railings')
  const filtered = active === 'All' ? railings : railings.filter(r => r.type === active)

  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title animate-hero-up delay-0">Railings Collection</h1>
        <p className="page-header-desc animate-hero-up delay-1">
          From sleek glass panels to classic ironwork — railings that define safety and sophistication.
        </p>
        <div className="filter-tabs animate-hero-up delay-2">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-tab ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="showcase-grid">
          {filtered.map((r, i) => (
            <RevealDiv key={r.name} type={i % 2 === 0 ? 'left' : 'right'}>
              <Link to={`/product/${r.slug}`} style={{ textDecoration: 'none' }}>
                <div className="showcase-card" style={{ animationDelay: `${i * 0.05}s`, cursor: 'pointer' }}>
                  <img src={r.img} alt={r.name} className="showcase-card-img" loading="lazy" />
                  <div className="showcase-card-overlay">
                    <div className="showcase-card-name">{r.name}</div>
                    <div className="showcase-card-type">{r.type} — {r.desc}</div>
                  </div>
                </div>
              </Link>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv type="up">
          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
              Custom Railing Solutions
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, fontSize: 16 }}>
              Every project is unique. We fabricate railings tailored to your space, style, and safety requirements.
            </p>
            <Link to="/about#contact">
              <button className="cta-btn" style={{ background: 'var(--color-accent)', color: 'white' }}>
                Get a Free Estimate
              </button>
            </Link>
          </div>
        </RevealDiv>
      </section>
    </>
  )
}
