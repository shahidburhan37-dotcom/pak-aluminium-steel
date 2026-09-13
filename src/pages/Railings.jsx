import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RevealDiv from '../components/RevealDiv'
import { getProductsByCategory } from '../data/products'
import WhatsAppButton from '../components/WhatsAppButton'

const products = getProductsByCategory('railings')

export default function Railings() {
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    document.title = 'Railings & Balustrades — Pak Aluminium & Steel'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', 'Premium glass, steel, and aluminium railings for balconies, stairs, and terraces. Frameless, frosted, and custom designs available in Lahore.')
  }, [])
  const types = ['All', ...new Set(products.map(p => p.tag))]
  const filtered = filter === 'All' ? products : products.filter(p => p.tag === filter)

  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title animate-hero-up delay-0">Railings & Balustrades</h1>
        <p className="page-header-desc animate-hero-up delay-1">
          Premium railings for balconies, stairs, and terraces — glass, steel, aluminum, and custom ironwork.
        </p>
        <div className="filter-tabs animate-hero-up delay-2">
          {types.map(t => (
            <button key={t} className={`filter-tab ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
          ))}
        </div>
      </div>
      <section className="section">
        <div className="masonry-grid">
          {filtered.map(item => (
            <Link to={`/product/${item.slug}`} key={item.slug} className="masonry-item" style={{ textDecoration: 'none' }}>
              <img src={item.img} alt={item.name} className="masonry-img" loading="lazy" />
              <div className="masonry-overlay">
                <div className="masonry-name">{item.name}</div>
                <div className="masonry-desc">{item.desc}</div>
                <div className="masonry-btn">View Details <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <RevealDiv type="up">
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>Can't find what you're looking for?</p>
            <WhatsAppButton />
          </RevealDiv>
        </div>
      </section>
    </>
  )
}
