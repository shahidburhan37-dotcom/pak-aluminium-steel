import { useState } from 'react'
import { useContent } from '../store/ContentContext'
import RevealDiv from './RevealDiv'

export default function ContactForm() {
  const { content } = useContent()
  const [form, setForm] = useState({ name: '', phone: '', email: '', product: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.product) e.product = 'Select a product'
    if (!form.message.trim()) e.message = 'Tell us about your project'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSending(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE',
          name: form.name,
          phone: form.phone,
          email: form.email,
          product: form.product,
          message: form.message,
          subject: `New Inquiry from ${form.name} - ${form.product}`,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        setForm({ name: '', phone: '', email: '', product: '', message: '' })
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch {
      alert('Network error. Please try again.')
    }
    setSending(false)
  }

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  if (submitted) {
    return (
      <section id="contact-form" className="contact-section">
        <div className="contact-inner">
          <div style={{ gridColumn: '1 / -1', padding: '64px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: 'white', marginBottom: 8 }}>Thank You!</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>We've received your inquiry and will get back to you within 24 hours.</p>
            <button onClick={() => setSubmitted(false)} style={{
              padding: '12px 28px', borderRadius: 10, background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', fontSize: 14
            }}>Send Another Inquiry</button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact-form" className="contact-section">
      <div className="contact-inner">
        <RevealDiv type="left">
          <div className="contact-left">
            <div className="contact-left-label">Get In Touch</div>
            <h2 className="contact-left-title">Let's Build Something Beautiful Together</h2>
            <p className="contact-left-desc">
              Ready to transform your space? Contact us for a free consultation and quote.
            </p>
            <div className="contact-info-list">
              <div className="contact-info-row">
                <div className="contact-info-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <div className="contact-info-text-label">Phone</div>
                  <div className="contact-info-text-value">{content.footer.phone}</div>
                </div>
              </div>
              <div className="contact-info-row">
                <div className="contact-info-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <div className="contact-info-text-label">Email</div>
                  <div className="contact-info-text-value">{content.footer.email}</div>
                </div>
              </div>
              <div className="contact-info-row">
                <div className="contact-info-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div className="contact-info-text-label">Workshop</div>
                  <div className="contact-info-text-value">{content.footer.address}</div>
                </div>
              </div>
            </div>
          </div>
        </RevealDiv>

        <RevealDiv type="right">
          <div className="contact-right">
            <form className="contact-form-dark" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group-dark">
                  <label>Full Name {errors.name && <span style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.name}</span>}</label>
                  <input type="text" placeholder="Your name" value={form.name} onChange={handleChange('name')} />
                </div>
                <div className="form-group-dark">
                  <label>Phone Number {errors.phone && <span style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.phone}</span>}</label>
                  <input type="tel" placeholder="+92 3XX XXXXXXX" value={form.phone} onChange={handleChange('phone')} />
                </div>
              </div>
              <div className="form-group-dark">
                <label>Email Address {errors.email && <span style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.email}</span>}</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={handleChange('email')} />
              </div>
              <div className="form-group-dark">
                <label>Product Interest {errors.product && <span style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.product}</span>}</label>
                <select value={form.product} onChange={handleChange('product')}>
                  <option value="">Select a product</option>
                  <option>Windows</option>
                  <option>Railings</option>
                  <option>Doors</option>
                  <option>Custom Fabrication</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group-dark">
                <label>Project Details {errors.message && <span style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.message}</span>}</label>
                <textarea placeholder="Tell us about your project — dimensions, style preferences, timeline..." value={form.message} onChange={handleChange('message')} />
              </div>
              <button type="submit" className="contact-submit-dark" disabled={sending}>
                {sending ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </div>
        </RevealDiv>
      </div>
    </section>
  )
}
