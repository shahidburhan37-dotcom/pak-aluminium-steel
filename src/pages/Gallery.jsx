import { useState, useRef, useEffect } from 'react'
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

function GalleryCarousel({ data }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const getCardWidth = () => {
    const track = trackRef.current
    if (!track) return 420
    const card = track.querySelector('.gallery-card')
    if (!card) return 420
    return card.offsetWidth + 20
  }

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const cw = getCardWidth()
    track.scrollBy({ left: dir === 'next' ? cw : -cw, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const cw = getCardWidth()
    setActive(Math.round(track.scrollLeft / cw))
  }

  useEffect(() => {
    handleScroll()
  }, [])

  const totalDots = data.items.length

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track" ref={trackRef} onScroll={handleScroll}>
        {data.items.map((item) => (
          <Link to={`/product/${item.slug}`} key={item.name} className="gallery-card" style={{ textDecoration: 'none' }}>
            <div className="gallery-card-img-wrapper">
              <img src={item.img} alt={item.name} className="gallery-card-img" loading="lazy" />
              <div className="gallery-card-overlay">
                <div className="gallery-card-name">{item.name}</div>
                <div className="gallery-card-desc">{item.desc}</div>
                <div className="gallery-card-btn">
                  View Collection
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="carousel-nav" style={{ justifyContent: 'center', marginTop: 24 }}>
        <button className="carousel-nav-btn" onClick={() => scroll('prev')} aria-label="Previous">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button className="carousel-nav-btn" onClick={() => scroll('next')} aria-label="Next">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: totalDots }, (_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === active ? 'active' : ''}`}
            onClick={() => trackRef.current?.scrollTo({ left: i * getCardWidth(), behavior: 'smooth' })}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
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
          <GalleryCarousel data={section} />
        </section>
      ))}
    </>
  )
}
