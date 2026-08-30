import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { ContentProvider } from './store/ContentContext'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Windows from './pages/Windows'
import Railings from './pages/Railings'
import Doors from './pages/Doors'
import About from './pages/About'
import Gallery from './pages/Gallery'
import ProductDetail from './pages/ProductDetail'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

function ScrollToHash() {
  const { hash, pathname, state } = useLocation()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      sessionStorage.setItem(`scroll-${prevPathname.current}`, window.scrollY)
      prevPathname.current = pathname
    }

    const scroll = () => {
      const target = hash || state?.scrollTo
      if (target) {
        const el = document.querySelector(target)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else if (state?.scrollY !== undefined) {
        window.scrollTo(0, state.scrollY)
      } else {
        const saved = sessionStorage.getItem(`scroll-${pathname}`)
        if (saved) {
          window.scrollTo(0, parseInt(saved))
        } else {
          window.scrollTo(0, 0)
        }
      }
    }
    scroll()
  }, [hash, pathname, state])

  return null
}

function AdminGuard({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin-auth') === 'true')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  if (authed) return children

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pass === 'pakaluminium2025') {
      sessionStorage.setItem('admin-auth', 'true')
      setAuthed(true)
    } else {
      setError('Incorrect password')
      setPass('')
    }
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <form onSubmit={handleSubmit} style={{
        background: 'white', padding: 40, borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        border: '1px solid var(--color-border)', textAlign: 'center', width: '100%', maxWidth: 360,
      }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🔒</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, marginBottom: 4 }}>Admin Access</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 14, marginBottom: 24 }}>Enter password to continue</p>
        <input
          type="password" placeholder="Password" value={pass} onChange={e => { setPass(e.target.value); setError('') }}
          style={{
            width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--color-border)',
            fontSize: 14, marginBottom: 8, outline: 'none', boxSizing: 'border-box',
          }}
        />
        {error && <div style={{ color: '#ff6b6b', fontSize: 13, marginBottom: 8 }}>{error}</div>}
        <button type="submit" style={{
          width: '100%', padding: '12px 24px', borderRadius: 8, border: 'none',
          background: 'var(--color-accent)', color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>Login</button>
      </form>
    </div>
  )
}

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <ScrollToHash />
          <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/windows" element={<Windows />} />
            <Route path="/railings" element={<Railings />} />
            <Route path="/doors" element={<Doors />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminGuard><Admin /></AdminGuard>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Layout>
        </ErrorBoundary>
      </BrowserRouter>
    </ContentProvider>
  )
}
