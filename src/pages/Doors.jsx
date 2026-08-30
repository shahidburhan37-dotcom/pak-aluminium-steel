import { useState } from 'react'
import { Link } from 'react-router-dom'
import RevealDiv from '../components/RevealDiv'
import { getProductsByCategory, getFilterTypes } from '../data/products'

const filters = getFilterTypes('Doors')

export default function Doors() {
  const [active, setActive] = useState('All')
  const doors = getProductsByCategory('Doors')
  const filtered = active === 'All' ? doors : doors.filter(d => d.type === active)

  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title animate-hero-up delay-0">Doors Collection</h1>
        <p className="page-header-desc animate-hero-up delay-1">
          Make a statement with every entrance. Premium doors designed for beauty, security, and lasting performance.
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
          {filtered.map((d, i) => (
            <RevealDiv key={d.name} type={i % 2 === 0 ? 'left' : 'right'}>
              <Link to={`/product/${d.slug}`} style={{ textDecoration: 'none' }}>
                <div className="showcase-card" style={{ animationDelay: `${i * 0.05}s`, cursor: 'pointer' }}>
                  <img src={d.img} alt={d.name} className="showcase-card-img" loading="lazy" />
                  <div className="showcase-card-overlay">
                    <div className="showcase-card-name">{d.name}</div>
                    <div className="showcase-card-type">{d.type} — {d.desc}</div>
                  </div>
                </div>
              </Link>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv type="up">
          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
              Your Door, Your Design
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, fontSize: 16 }}>
              Can't find what you're looking for? We design and build custom doors from scratch.
            </p>
            <Link to="/about#contact">
              <button className="cta-btn" style={{ background: 'var(--color-accent)', color: 'white' }}>
                Discuss Your Project
              </button>
            </Link>
          </div>
        </RevealDiv>
      </section>
    </>
  )
}
