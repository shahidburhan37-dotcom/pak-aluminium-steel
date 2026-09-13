import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { ContentProvider } from './store/ContentContext'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'

const Windows = lazy(() => import('./pages/Windows'))
const Railings = lazy(() => import('./pages/Railings'))
const Doors = lazy(() => import('./pages/Doors'))
const ShowerCabins = lazy(() => import('./pages/ShowerCabins'))
const Terraces = lazy(() => import('./pages/Terraces'))
const Panels = lazy(() => import('./pages/Panels'))
const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Admin = lazy(() => import('./pages/Admin'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 32, height: 32, border: '3px solid var(--color-border)', borderTopColor: 'var(--color-accent)', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
    </div>
  )
}

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
          <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/windows" element={<Windows />} />
            <Route path="/railings" element={<Railings />} />
            <Route path="/doors" element={<Doors />} />
            <Route path="/shower-cabins" element={<ShowerCabins />} />
            <Route path="/terraces" element={<Terraces />} />
            <Route path="/panels" element={<Panels />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminGuard><Admin /></AdminGuard>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          </Layout>
        </ErrorBoundary>
      </BrowserRouter>
    </ContentProvider>
  )
}
