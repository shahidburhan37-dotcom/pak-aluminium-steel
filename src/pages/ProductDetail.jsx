import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useContent } from '../store/ContentContext'
import RevealDiv from '../components/RevealDiv'
import { getProductBySlug } from '../data/products'

export default function ProductDetail() {
  const { slug } = useParams()
  const { content } = useContent()
  const product = getProductBySlug(slug)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  if (!product) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Product Not Found</h2>
        <Link to="/gallery" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Browse All Products</Link>
      </div>
    )
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.message.trim()) e.message = 'Tell us about your project'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      setForm({ name: '', phone: '', email: '', message: '' })
    }, 1500)
  }

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const categoryPath = product.category.toLowerCase()

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '60vh', minHeight: 400, overflow: 'hidden' }}>
        <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, padding: '0 clamp(20px, 5vw, 52px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <Link to={`/${categoryPath}`} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, textDecoration: 'none' }}>{product.category}</Link>
              <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
              <span style={{ color: 'var(--color-gold)', fontSize: 14, fontWeight: 600 }}>{product.tag}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, color: 'white', margin: 0 }}>{product.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, marginTop: 12, maxWidth: 600 }}>{product.shortDesc}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '48px clamp(20px, 5vw, 52px)' }}>
        <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48, alignItems: 'start' }}>
          {/* Left - Details */}
          <div>
            <RevealDiv type="left">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, marginBottom: 16 }}>About This Product</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{product.description}</p>
            </RevealDiv>

            <RevealDiv type="left">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, marginBottom: 16 }}>Key Features</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
                {product.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--color-surface)', borderRadius: 10, border: '1px solid var(--color-border)' }}>
                    <svg width="18" height="18" fill="none" stroke="var(--color-accent)" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </RevealDiv>

            <RevealDiv type="left">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, marginBottom: 16 }}>Specifications</h3>
              <div style={{ background: 'var(--color-surface)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                {product.specs.map((s, i) => (
                  <div key={i} style={{ padding: '14px 20px', borderBottom: i < product.specs.length - 1 ? '1px solid var(--color-border)' : 'none', fontSize: 14 }}>
                    {s}
                  </div>
                ))}
              </div>
            </RevealDiv>
          </div>

          {/* Right - Contact Form */}
          <RevealDiv type="right">
            <div style={{ background: 'var(--color-dark)', borderRadius: 16, padding: 32, position: 'sticky', top: 100 }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'white', marginBottom: 8 }}>Thank You!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 24, fontSize: 14 }}>We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} style={{ padding: '12px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', fontSize: 14 }}>Send Another</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'white', marginBottom: 8 }}>Get a Quote for {product.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 24 }}>Fill in the details and we'll get back to you with a custom quote.</p>
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                      <input type="text" placeholder="Your Name" value={form.name} onChange={handleChange('name')} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: errors.name ? '1px solid #ff6b6b' : '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                      {errors.name && <span style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.name}</span>}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <input type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange('phone')} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: errors.phone ? '1px solid #ff6b6b' : '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                      {errors.phone && <span style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.phone}</span>}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <input type="email" placeholder="Email Address" value={form.email} onChange={handleChange('email')} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: errors.email ? '1px solid #ff6b6b' : '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                      {errors.email && <span style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.email}</span>}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <textarea placeholder="Project Details (dimensions, quantity, preferences...)" value={form.message} onChange={handleChange('message')} rows={4} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: errors.message ? '1px solid #ff6b6b' : '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                      {errors.message && <span style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.message}</span>}
                    </div>
                    <button type="submit" disabled={sending} style={{ width: '100%', padding: '16px', borderRadius: 12, background: 'var(--color-accent)', color: 'white', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', opacity: sending ? 0.7 : 1 }}>
                      {sending ? 'Sending...' : 'Send Inquiry'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section id="whatsapp" style={{ background: '#f7f8f5', padding: 'clamp(48px, 6vw, 72px) clamp(20px, 5vw, 52px)', maxWidth: '100%', borderRadius: 24, margin: '0 auto 12px', width: 'calc(100% - 24px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <RevealDiv type="scale">
            <div style={{ width: 80, height: 80, borderRadius: 20, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 32px rgba(37,211,102,0.3)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div style={{ color: '#25D366', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Chat With Us</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: 16 }}>Need Quick Answers About {product.name}?</h2>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 auto 32px', maxWidth: 500, lineHeight: 1.7 }}>
              Chat with us directly on WhatsApp for instant responses and quick quotes for {product.name.toLowerCase()}.
            </p>
            <a
              href={`https://wa.me/${content.footer.whatsapp}?text=Hi! I'm interested in ${product.name}. Please share details and pricing.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '18px 40px', borderRadius: 14,
                background: '#25D366', color: 'white', fontSize: 17, fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.3s',
                boxShadow: '0 8px 32px rgba(37,211,102,0.3)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </RevealDiv>
        </div>
      </section>
    </>
  )
}
