import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '80px 24px',
    }}>
      <div>
        <div style={{ fontSize: 72, fontWeight: 800, color: 'var(--color-accent)', lineHeight: 1, marginBottom: 8 }}>404</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Page Not Found</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '14px 32px', borderRadius: 10,
          background: 'var(--color-accent)', color: 'white', fontSize: 15, fontWeight: 600,
          textDecoration: 'none', transition: 'all 0.3s',
        }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
