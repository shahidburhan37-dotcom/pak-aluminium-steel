import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RevealDiv from '../components/RevealDiv'
import { getProductsByCategory, getFilterTypes } from '../data/products'
import WhatsAppButton from '../components/WhatsAppButton'

const allProducts = getProductsByCategory('windows')
const filterTypes = getFilterTypes('windows')

export default function Windows() {
  const [filter, setFilter] = useState('All')
  const products = filter === 'All' ? allProducts : allProducts.filter(p => p.tag === filter)

  useEffect(() => {
    document.title = 'Windows — Pak Aluminium & Steel'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', 'Premium aluminum and uPVC windows — casement, sliding, tilt and turn, arched, and picture windows. Custom sizes and finishes in Lahore.')
  }, [])

  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title animate-hero-up delay-0">Windows</h1>
        <p className="page-header-desc animate-hero-up delay-1">
          Premium windows for every space — casement, sliding, tilt and turn, arched, and picture windows.
        </p>
        <div className="filter-tabs animate-hero-up delay-2">
          {filterTypes.map(type => (
            <button key={type} className={`filter-tab ${filter === type ? 'active' : ''}`} onClick={() => setFilter(type)}>
              {type}
            </button>
          ))}
        </div>
      </div>
      <section className="section">
        <div className="masonry-grid">
          {products.map(item => (
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
