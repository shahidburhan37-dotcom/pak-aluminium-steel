import { useState } from 'react'
import { Link } from 'react-router-dom'
import RevealDiv from '../components/RevealDiv'
import { getProductsByCategory, getFilterTypes } from '../data/products'

const filters = getFilterTypes('Windows')

export default function Windows() {
  const [active, setActive] = useState('All')
  const windows = getProductsByCategory('Windows')
  const filtered = active === 'All' ? windows : windows.filter(w => w.type === active)

  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title animate-hero-up delay-0">Windows Collection</h1>
        <p className="page-header-desc animate-hero-up delay-1">
          Explore our range of premium aluminium windows — engineered for style, security, and performance.
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
          {filtered.map((w, i) => (
            <RevealDiv key={w.name} type={i % 2 === 0 ? 'left' : 'right'}>
              <Link to={`/product/${w.slug}`} style={{ textDecoration: 'none' }}>
                <div className="showcase-card" style={{ animationDelay: `${i * 0.05}s`, cursor: 'pointer' }}>
                  <img src={w.img} alt={w.name} className="showcase-card-img" loading="lazy" />
                  <div className="showcase-card-overlay">
                    <div className="showcase-card-name">{w.name}</div>
                    <div className="showcase-card-type">{w.type} — {w.desc}</div>
                  </div>
                </div>
              </Link>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv type="up">
          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
              Need a Custom Window?
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, fontSize: 16 }}>
              We design and fabricate windows to your exact dimensions and style preferences.
            </p>
            <Link to="/about#contact">
              <button className="cta-btn" style={{ background: 'var(--color-accent)', color: 'white' }}>
                Request a Quote
              </button>
            </Link>
          </div>
        </RevealDiv>
      </section>
    </>
  )
}
