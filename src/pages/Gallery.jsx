import { useState } from 'react'
import { Link } from 'react-router-dom'
import RevealDiv from '../components/RevealDiv'
import { allProducts, categories } from '../data/products'
import WhatsAppButton from '../components/WhatsAppButton'

const categoryTabs = [
  { id: 'all', label: 'All' },
  ...categories.map(c => ({ id: c.slug, label: c.title.split(' ')[0] }))
]

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all'
    ? allProducts
    : allProducts.filter(p => p.categorySlug === activeTab)

  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title animate-hero-up delay-0">Our Gallery</h1>
        <p className="page-header-desc animate-hero-up delay-1">
          Explore our complete range of {allProducts.length} premium fabrication products across {categories.length} categories.
        </p>
        <div className="filter-tabs animate-hero-up delay-2">
          {categoryTabs.map(tab => (
            <button
              key={tab.id}
              className={`filter-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>
                ({tab.id === 'all' ? allProducts.length : allProducts.filter(p => p.categorySlug === tab.id).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="masonry-grid">
          {filtered.map((item) => (
            <Link to={`/product/${item.slug}`} key={item.slug} className="masonry-item" style={{ textDecoration: 'none' }}>
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
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <WhatsAppButton />
        </div>
      </section>
    </>
  )
}
