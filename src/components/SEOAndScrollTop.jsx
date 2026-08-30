import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const seoData = {
  '/': { title: 'Pak Aluminium & Steel — Premium Fabrication', desc: 'Premium aluminium and steel fabrication in Pakistan. Windows, railings, doors, and custom solutions crafted with precision.' },
  '/windows': { title: 'Windows — Pak Aluminium & Steel', desc: 'Premium aluminium sliding, casement, fixed, and custom windows. Energy efficient, secure, and beautifully designed.' },
  '/railings': { title: 'Railings — Pak Aluminium & Steel', desc: 'Glass, steel, and aluminium railings for balconies, staircases, and pools. Safety meets style.' },
  '/doors': { title: 'Doors — Pak Aluminium & Steel', desc: 'Sliding, folding, French, and entrance doors. Premium quality for residential and commercial spaces.' },
  '/about': { title: 'About Us — Pak Aluminium & Steel', desc: 'Learn about our team, craftsmanship, and commitment to quality fabrication across Pakistan.' },
  '/gallery': { title: 'Gallery — Pak Aluminium & Steel', desc: 'Explore our complete range of premium fabrication work — windows, railings, and doors.' },
  '/admin': { title: 'Admin — Pak Aluminium & Steel', desc: '' },
}

export default function SEOAndScrollTop() {
  const { pathname } = useLocation()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const productMatch = pathname.match(/^\/product\/(.+)/)
    if (productMatch) {
      const name = productMatch[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      document.title = `${name} — Pak Aluminium & Steel`
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', `${name} — Premium quality from Pak Aluminium & Steel. View details, features, and get a quote.`)
    } else if (seoData[pathname]) {
      document.title = seoData[pathname].title
      const meta = document.querySelector('meta[name="description"]')
      if (meta && seoData[pathname].desc) meta.setAttribute('content', seoData[pathname].desc)
    } else {
      document.title = 'Pak Aluminium & Steel — Premium Fabrication'
    }
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!showTop) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: 88, right: 24, zIndex: 999,
        width: 44, height: 44, borderRadius: 12,
        background: 'var(--color-accent)', color: 'white',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(45,106,79,0.3)',
        transition: 'opacity 0.3s',
      }}
    >
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
    </button>
  )
}