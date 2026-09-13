import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContent } from '../store/ContentContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const lastScroll = useRef(0)
  const location = useLocation()
  const navigate = useNavigate()
  const { content } = useContent()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      if (y < 10) {
        setVisible(true)
      } else if (y > lastScroll.current && y > 100) {
        setVisible(false)
      } else if (y < lastScroll.current) {
        setVisible(true)
      }
      lastScroll.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const scrollTo = (id) => {
    if (location.pathname === '/') {
      setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      navigate('/', { state: { scrollTo: id, scrollY: window.scrollY } })
    }
  }

  const links = [
    { to: '/', label: 'Home' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About' },
  ]

  return (
    <>
      <div className={`topbar ${scrolled ? 'hidden' : ''}`}>
        <span className="animate-topbar-glow">
          Premium Aluminium & Steel Fabrication — Free Consultation & Quotes
        </span>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${visible ? 'visible' : 'hidden-nav'}`}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">
            <img src="/images/logo-new.webp" alt="Pak Aluminium & Steel" style={{ height: 40, width: 40, borderRadius: 8, objectFit: 'cover' }} />
            <div className="nav-logo-text-wrap">
              <span className="nav-logo-text">Pak Aluminium</span>
              <span className="nav-logo-sub">& Steel</span>
            </div>
          </Link>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredLink(l.to)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {l.label}
                  {location.pathname === l.to && <span className="nav-link-indicator" />}
                </Link>
              </li>
            ))}
            <li className="nav-dropdown">
              <span
                className="nav-link"
                onMouseEnter={() => setHoveredLink('cat')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Categories
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 4, transition: 'transform 0.2s', transform: hoveredLink === 'cat' ? 'rotate(180deg)' : 'rotate(0)' }}><path d="M6 9l6 6 6-6"/></svg>
              </span>
              <div className="nav-dropdown-menu">
                <Link to="/railings">
                  <img src="/images/products/railings/frameless-glass-balcony-railing.webp" alt="Railings" />
                  <span>Railings</span>
                </Link>
                <Link to="/doors">
                  <img src="/images/products/doors/slim-profile-pivot-door.webp" alt="Doors" />
                  <span>Doors</span>
                </Link>
                <Link to="/shower-cabins">
                  <img src="/images/products/shower-cabins/frameless-tempered-glass-shower.webp" alt="Shower Cabins" />
                  <span>Shower Cabins</span>
                </Link>
                <Link to="/terraces">
                  <img src="/images/products/terraces/motorized-aluminum-pergola.webp" alt="Terraces" />
                  <span>Terraces</span>
                </Link>
                <Link to="/windows">
                  <img src="/images/products/glass/curtain-walling-facade.webp" alt="Glass" />
                  <span>Architectural Glass</span>
                </Link>
                <Link to="/panels">
                  <img src="/images/products/panels/aluminum-composite-panel-cladding.webp" alt="Panels" />
                  <span>Composite Panels</span>
                </Link>
              </div>
            </li>
          </ul>

          <div className="nav-right">
            <button className="nav-link contact-link" onClick={() => scrollTo('#whatsapp')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              Contact Us
            </button>
            <button className="nav-cta" onClick={() => scrollTo('#contact-form')}>
              Get a Quote
            </button>
          </div>

          <button
            className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        <div className="nav-gradient-line" />
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div className="mobile-menu-brand">Pak Aluminium & Steel</div>
        {links.map((l, i) => (
          <Link key={l.to} to={l.to} className={location.pathname === l.to ? 'active' : ''} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
            {l.label}
          </Link>
        ))}
        <div className="mobile-menu-divider" />
        <Link to="/railings" onClick={() => setMobileOpen(false)} style={{ animationDelay: '0.3s' }}>Railings</Link>
        <Link to="/doors" onClick={() => setMobileOpen(false)} style={{ animationDelay: '0.35s' }}>Doors</Link>
        <Link to="/shower-cabins" onClick={() => setMobileOpen(false)} style={{ animationDelay: '0.4s' }}>Shower Cabins</Link>
        <Link to="/terraces" onClick={() => setMobileOpen(false)} style={{ animationDelay: '0.45s' }}>Terraces</Link>
        <Link to="/windows" onClick={() => setMobileOpen(false)} style={{ animationDelay: '0.5s' }}>Architectural Glass</Link>
        <Link to="/panels" onClick={() => setMobileOpen(false)} style={{ animationDelay: '0.55s' }}>Composite Panels</Link>
        <div className="mobile-menu-divider" />
        <button onClick={() => { setMobileOpen(false); scrollTo('#whatsapp') }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, fontWeight: 600, color: 'var(--color-text)', animationDelay: '0.5s', padding: 0 }}>
          Contact Us
        </button>
        <button onClick={() => { setMobileOpen(false); scrollTo('#contact-form') }} className="nav-cta" style={{ marginTop: 12, animationDelay: '0.55s' }}>
          Get a Quote
        </button>
      </div>
    </>
  )
}
