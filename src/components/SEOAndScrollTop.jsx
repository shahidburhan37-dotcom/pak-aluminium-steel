import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const titles = {
  '/': 'Pak Aluminium & Steel — Premium Fabrication',
  '/windows': 'Windows — Pak Aluminium & Steel',
  '/railings': 'Railings — Pak Aluminium & Steel',
  '/doors': 'Doors — Pak Aluminium & Steel',
  '/about': 'About Us — Pak Aluminium & Steel',
  '/gallery': 'Gallery — Pak Aluminium & Steel',
  '/admin': 'Admin — Pak Aluminium & Steel',
}

export default function SEOAndScrollTop() {
  const { pathname } = useLocation()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const productMatch = pathname.match(/^\/product\/(.+)/)
    if (productMatch) {
      const name = productMatch[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      document.title = `${name} — Pak Aluminium & Steel`
    } else {
      document.title = titles[pathname] || 'Pak Aluminium & Steel'
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
