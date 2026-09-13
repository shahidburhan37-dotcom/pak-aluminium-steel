import { useState } from 'react'
import { Link } from 'react-router-dom'
import RevealDiv from '../components/RevealDiv'
import { allProducts } from '../data/products'

const galleryData = [
  {
    id: 'windows',
    title: 'Windows Collection',
    subtitle: 'Premium aluminium windows engineered for style, security, and performance.',
    link: '/windows',
    items: allProducts.filter(p => p.category === 'Windows').slice(0, 8),
  },
  {
    id: 'railings',
    title: 'Railings Collection',
    subtitle: 'From sleek glass panels to classic ironwork — railings that define safety and sophistication.',
    link: '/railings',
    items: allProducts.filter(p => p.category === 'Railings').slice(0, 8),
  },
  {
    id: 'doors',
    title: 'Doors Collection',
    subtitle: 'Make a statement with every entrance. Premium doors designed for beauty, security, and lasting performance.',
    link: '/doors',
    items: allProducts.filter(p => p.category === 'Doors').slice(0, 8),
  },
]

const sectionTabs = [
  { id: 'windows', label: 'Windows' },
  { id: 'railings', label: 'Railings' },
  { id: 'doors', label: 'Doors' },
]

function MasonryGrid({ items }) {
  return (
    <div className="masonry-grid">
      {items.map((item, i) => (
        <Link to={`/product/${item.slug}`} key={item.name} className="masonry-item" style={{ textDecoration: 'none' }}>
          <img src={item.img} alt={item.name} className="masonry-img" loading="lazy" />
          <div className="masonry-overlay">
            <div className="masonry-name">{item.name}</div>
            <div className="masonry-desc">{item.desc}</div>
            <div className="masonry-btn">
              View Details
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function Gallery() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title animate-hero-up delay-0">Our Gallery</h1>
        <p className="page-header-desc animate-hero-up delay-1">
          Explore our complete range of premium fabrication work — windows, railings, and doors.
        </p>
        <div className="filter-tabs animate-hero-up delay-2">
          {sectionTabs.map(tab => (
            <button
              key={tab.id}
              className="filter-tab"
              onClick={() => scrollToSection(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {galleryData.map((section) => (
        <section key={section.id} id={section.id} className="section">
          <RevealDiv type="up" style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>{section.title}</div>
            <h2 className="section-title">{section.subtitle}</h2>
            <Link to={section.link} style={{ display: 'inline-flex', marginTop: 16, fontSize: 14, fontWeight: 600, color: 'var(--color-accent)', gap: 6, alignItems: 'center' }}>
              View All {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </RevealDiv>
          <MasonryGrid items={section.items} />
        </section>
      ))}
    </>
  )
}
