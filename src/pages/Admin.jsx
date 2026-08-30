import { useState } from 'react'
import { useContent } from '../store/ContentContext'

const s = {
  page: { padding: '40px 24px', maxWidth: 900, margin: '0 auto', fontFamily: 'var(--font-body)' },
  header: { marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'var(--color-text-muted)' },
  section: { background: 'white', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, marginBottom: 20 },
  sectionHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: 'var(--color-text)' },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6 },
  input: { width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', transition: 'border 0.15s', background: 'white', color: 'var(--color-text)' },
  textarea: { width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical', minHeight: 80, background: 'white', color: 'var(--color-text)' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 },
  btn: { padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)' },
  btnPrimary: { background: 'var(--color-accent)', color: 'white' },
  btnDanger: { background: '#ef4444', color: 'white' },
  btnOutline: { background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' },
  btnAdd: { background: 'rgba(45,106,79,0.08)', color: 'var(--color-accent)', border: '1px dashed var(--color-accent)' },
  card: { background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' },
  cardRow: { display: 'flex', gap: 12, alignItems: 'start' },
  deleteBtn: { position: 'absolute', top: 8, right: 8, background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: 6, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 700 },
  nav: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, position: 'sticky', top: 0, background: 'var(--color-bg)', padding: '12px 0', zIndex: 10, borderBottom: '1px solid var(--color-border)' },
  navBtn: { padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: '1px solid var(--color-border)', background: 'white', color: 'var(--color-text-muted)', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)' },
  navBtnActive: { background: 'var(--color-accent)', color: 'white', borderColor: 'var(--color-accent)' },
  preview: { marginTop: 8, width: 80, height: 50, borderRadius: 6, objectFit: 'cover', border: '1px solid var(--color-border)' },
}

export default function Admin() {
  const { content, updateContent, addItem, removeItem, resetContent } = useContent()
  const [active, setActive] = useState('topbar')
  const [confirmReset, setConfirmReset] = useState(false)

  const sections = [
    { id: 'topbar', label: 'Top Bar' },
    { id: 'hero', label: 'Hero' },
    { id: 'categories', label: 'Categories' },
    { id: 'features', label: 'Features' },
    { id: 'process', label: 'Process' },
    { id: 'stats', label: 'Stats' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'cta', label: 'CTA' },
    { id: 'footer', label: 'Footer' },
    { id: 'about', label: 'About' },
  ]

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>Content Manager</h1>
        <p style={s.subtitle}>Edit, add, or delete any content on your website. Changes save automatically.</p>
      </div>

      <div style={s.nav}>
        {sections.map(sec => (
          <button
            key={sec.id}
            style={{ ...s.navBtn, ...(active === sec.id ? s.navBtnActive : {}) }}
            onClick={() => setActive(sec.id)}
          >
            {sec.label}
          </button>
        ))}
        <button
          style={{ ...s.navBtn, color: '#ef4444', borderColor: '#fecaca' }}
          onClick={() => {
            if (confirmReset) {
              resetContent()
              setConfirmReset(false)
            } else {
              setConfirmReset(true)
              setTimeout(() => setConfirmReset(false), 3000)
            }
          }}
        >
          {confirmReset ? 'Click again to reset' : 'Reset All'}
        </button>
      </div>

      {active === 'topbar' && (
        <div style={s.section}>
          <div style={s.sectionHead}><h3 style={s.sectionTitle}>Top Bar Message</h3></div>
          <input
            style={s.input}
            value={content.topbar}
            onChange={e => updateContent('topbar', e.target.value)}
          />
        </div>
      )}

      {active === 'hero' && (
        <div style={s.section}>
          <div style={s.sectionHead}><h3 style={s.sectionTitle}>Hero Section</h3></div>
          <div style={{ marginBottom: 16 }}>
            <label style={s.label}>Title</label>
            <textarea style={s.textarea} rows={2} value={content.hero.title} onChange={e => updateContent('hero.title', e.target.value)} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={s.label}>Subtitle</label>
            <textarea style={s.textarea} rows={2} value={content.hero.subtitle} onChange={e => updateContent('hero.subtitle', e.target.value)} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={s.label}>Background Image URL</label>
            <input style={s.input} value={content.hero.bgImage} onChange={e => updateContent('hero.bgImage', e.target.value)} />
            {content.hero.bgImage && <img src={content.hero.bgImage} alt="preview" style={s.preview} />}
          </div>
          <div style={s.row}>
            <div>
              <label style={s.label}>CTA Button 1</label>
              <input style={s.input} value={content.hero.cta1} onChange={e => updateContent('hero.cta1', e.target.value)} />
            </div>
            <div>
              <label style={s.label}>CTA Button 2</label>
              <input style={s.input} value={content.hero.cta2} onChange={e => updateContent('hero.cta2', e.target.value)} />
            </div>
          </div>
          <div style={s.row}>
            <div>
              <label style={s.label}>Trust Badge 1</label>
              <input style={s.input} value={content.hero.trust1} onChange={e => updateContent('hero.trust1', e.target.value)} />
            </div>
            <div>
              <label style={s.label}>Trust Badge 2</label>
              <input style={s.input} value={content.hero.trust2} onChange={e => updateContent('hero.trust2', e.target.value)} />
            </div>
          </div>
          <div>
            <label style={s.label}>Trust Badge 3</label>
            <input style={s.input} value={content.hero.trust3} onChange={e => updateContent('hero.trust3', e.target.value)} />
          </div>
        </div>
      )}

      {active === 'categories' && (
        <div style={s.section}>
          <div style={s.sectionHead}>
            <h3 style={s.sectionTitle}>Categories</h3>
            <button style={{ ...s.btn, ...s.btnAdd }} onClick={() => addItem('categories', { title: 'New Category', desc: 'Description here', img: '', to: '/windows' })}>+ Add Category</button>
          </div>
          {content.categories.map((cat, i) => (
            <div key={cat.id} style={s.card}>
              <button style={s.deleteBtn} onClick={() => removeItem('categories', cat.id)}>×</button>
              <div style={{ marginBottom: 12 }}>
                <label style={s.label}>Title</label>
                <input style={s.input} value={cat.title} onChange={e => { const arr = [...content.categories]; arr[i] = { ...arr[i], title: e.target.value }; updateContent('categories', arr) }} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={s.label}>Description</label>
                <textarea style={s.textarea} rows={2} value={cat.desc} onChange={e => { const arr = [...content.categories]; arr[i] = { ...arr[i], desc: e.target.value }; updateContent('categories', arr) }} />
              </div>
              <div>
                <label style={s.label}>Image URL</label>
                <input style={s.input} value={cat.img} onChange={e => { const arr = [...content.categories]; arr[i] = { ...arr[i], img: e.target.value }; updateContent('categories', arr) }} />
                {cat.img && <img src={cat.img} alt="preview" style={s.preview} />}
              </div>
            </div>
          ))}
        </div>
      )}

      {active === 'features' && (
        <div style={s.section}>
          <div style={s.sectionHead}>
            <h3 style={s.sectionTitle}>Features</h3>
            <button style={{ ...s.btn, ...s.btnAdd }} onClick={() => addItem('features', { title: 'New Feature', desc: 'Description here', icon: 'check' })}>+ Add Feature</button>
          </div>
          {content.features.map((f, i) => (
            <div key={f.id} style={s.card}>
              <button style={s.deleteBtn} onClick={() => removeItem('features', f.id)}>×</button>
              <div style={{ marginBottom: 12 }}>
                <label style={s.label}>Title</label>
                <input style={s.input} value={f.title} onChange={e => { const arr = [...content.features]; arr[i] = { ...arr[i], title: e.target.value }; updateContent('features', arr) }} />
              </div>
              <div>
                <label style={s.label}>Description</label>
                <textarea style={s.textarea} rows={2} value={f.desc} onChange={e => { const arr = [...content.features]; arr[i] = { ...arr[i], desc: e.target.value }; updateContent('features', arr) }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {active === 'process' && (
        <div style={s.section}>
          <div style={s.sectionHead}>
            <h3 style={s.sectionTitle}>Process Steps</h3>
            <button style={{ ...s.btn, ...s.btnAdd }} onClick={() => addItem('process', { num: String(content.process.length + 1).padStart(2, '0'), title: 'New Step', desc: 'Description here' })}>+ Add Step</button>
          </div>
          {content.process.map((p, i) => (
            <div key={p.id} style={s.card}>
              <button style={s.deleteBtn} onClick={() => removeItem('process', p.id)}>×</button>
              <div style={s.row}>
                <div>
                  <label style={s.label}>Number</label>
                  <input style={s.input} value={p.num} onChange={e => { const arr = [...content.process]; arr[i] = { ...arr[i], num: e.target.value }; updateContent('process', arr) }} />
                </div>
                <div>
                  <label style={s.label}>Title</label>
                  <input style={s.input} value={p.title} onChange={e => { const arr = [...content.process]; arr[i] = { ...arr[i], title: e.target.value }; updateContent('process', arr) }} />
                </div>
              </div>
              <div>
                <label style={s.label}>Description</label>
                <textarea style={s.textarea} rows={2} value={p.desc} onChange={e => { const arr = [...content.process]; arr[i] = { ...arr[i], desc: e.target.value }; updateContent('process', arr) }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {active === 'stats' && (
        <div style={s.section}>
          <div style={s.sectionHead}>
            <h3 style={s.sectionTitle}>Statistics</h3>
            <button style={{ ...s.btn, ...s.btnAdd }} onClick={() => addItem('stats', { num: '0', label: 'New Stat' })}>+ Add Stat</button>
          </div>
          {content.stats.map((st, i) => (
            <div key={st.id} style={{ ...s.card, display: 'flex', gap: 12, alignItems: 'end' }}>
              <button style={s.deleteBtn} onClick={() => removeItem('stats', st.id)}>×</button>
              <div style={{ flex: 1 }}>
                <label style={s.label}>Number</label>
                <input style={s.input} value={st.num} onChange={e => { const arr = [...content.stats]; arr[i] = { ...arr[i], num: e.target.value }; updateContent('stats', arr) }} />
              </div>
              <div style={{ flex: 2 }}>
                <label style={s.label}>Label</label>
                <input style={s.input} value={st.label} onChange={e => { const arr = [...content.stats]; arr[i] = { ...arr[i], label: e.target.value }; updateContent('stats', arr) }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {active === 'testimonials' && (
        <div style={s.section}>
          <div style={s.sectionHead}>
            <h3 style={s.sectionTitle}>Testimonials</h3>
            <button style={{ ...s.btn, ...s.btnAdd }} onClick={() => addItem('testimonials', { name: 'New Person', role: 'Role, City', text: 'Their review here...', stars: 5 })}>+ Add Review</button>
          </div>
          {content.testimonials.map((t, i) => (
            <div key={t.id} style={s.card}>
              <button style={s.deleteBtn} onClick={() => removeItem('testimonials', t.id)}>×</button>
              <div style={s.row}>
                <div>
                  <label style={s.label}>Name</label>
                  <input style={s.input} value={t.name} onChange={e => { const arr = [...content.testimonials]; arr[i] = { ...arr[i], name: e.target.value }; updateContent('testimonials', arr) }} />
                </div>
                <div>
                  <label style={s.label}>Role</label>
                  <input style={s.input} value={t.role} onChange={e => { const arr = [...content.testimonials]; arr[i] = { ...arr[i], role: e.target.value }; updateContent('testimonials', arr) }} />
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={s.label}>Review Text</label>
                <textarea style={s.textarea} rows={2} value={t.text} onChange={e => { const arr = [...content.testimonials]; arr[i] = { ...arr[i], text: e.target.value }; updateContent('testimonials', arr) }} />
              </div>
              <div>
                <label style={s.label}>Stars (1-5)</label>
                <input style={{ ...s.input, width: 80 }} type="number" min={1} max={5} value={t.stars} onChange={e => { const arr = [...content.testimonials]; arr[i] = { ...arr[i], stars: Number(e.target.value) }; updateContent('testimonials', arr) }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {active === 'faqs' && (
        <div style={s.section}>
          <div style={s.sectionHead}>
            <h3 style={s.sectionTitle}>FAQs</h3>
            <button style={{ ...s.btn, ...s.btnAdd }} onClick={() => addItem('faqs', { q: 'New Question?', a: 'Answer here...' })}>+ Add FAQ</button>
          </div>
          {content.faqs.map((f, i) => (
            <div key={f.id} style={s.card}>
              <button style={s.deleteBtn} onClick={() => removeItem('faqs', f.id)}>×</button>
              <div style={{ marginBottom: 12 }}>
                <label style={s.label}>Question</label>
                <input style={s.input} value={f.q} onChange={e => { const arr = [...content.faqs]; arr[i] = { ...arr[i], q: e.target.value }; updateContent('faqs', arr) }} />
              </div>
              <div>
                <label style={s.label}>Answer</label>
                <textarea style={s.textarea} rows={3} value={f.a} onChange={e => { const arr = [...content.faqs]; arr[i] = { ...arr[i], a: e.target.value }; updateContent('faqs', arr) }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {active === 'cta' && (
        <div style={s.section}>
          <div style={s.sectionHead}><h3 style={s.sectionTitle}>Call to Action</h3></div>
          <div style={{ marginBottom: 16 }}>
            <label style={s.label}>Title</label>
            <input style={s.input} value={content.cta.title} onChange={e => updateContent('cta.title', e.target.value)} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={s.label}>Description</label>
            <textarea style={s.textarea} rows={2} value={content.cta.desc} onChange={e => updateContent('cta.desc', e.target.value)} />
          </div>
          <div style={s.row}>
            <div>
              <label style={s.label}>Button 1</label>
              <input style={s.input} value={content.cta.btn1} onChange={e => updateContent('cta.btn1', e.target.value)} />
            </div>
            <div>
              <label style={s.label}>Button 2</label>
              <input style={s.input} value={content.cta.btn2} onChange={e => updateContent('cta.btn2', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {active === 'footer' && (
        <div style={s.section}>
          <div style={s.sectionHead}><h3 style={s.sectionTitle}>Footer</h3></div>
          <div style={s.row}>
            <div>
              <label style={s.label}>Brand Name</label>
              <input style={s.input} value={content.footer.brand} onChange={e => updateContent('footer.brand', e.target.value)} />
            </div>
            <div>
              <label style={s.label}>Phone</label>
              <input style={s.input} value={content.footer.phone} onChange={e => updateContent('footer.phone', e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={s.label}>Description</label>
            <textarea style={s.textarea} rows={2} value={content.footer.desc} onChange={e => updateContent('footer.desc', e.target.value)} />
          </div>
          <div style={s.row}>
            <div>
              <label style={s.label}>Email</label>
              <input style={s.input} value={content.footer.email} onChange={e => updateContent('footer.email', e.target.value)} />
            </div>
            <div>
              <label style={s.label}>Address</label>
              <input style={s.input} value={content.footer.address} onChange={e => updateContent('footer.address', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {active === 'about' && (
        <div style={s.section}>
          <div style={s.sectionHead}><h3 style={s.sectionTitle}>About Page</h3></div>
          <div style={{ marginBottom: 16 }}>
            <label style={s.label}>Page Title</label>
            <input style={s.input} value={content.about.title} onChange={e => updateContent('about.title', e.target.value)} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={s.label}>Page Description</label>
            <input style={s.input} value={content.about.desc} onChange={e => updateContent('about.desc', e.target.value)} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={s.label}>Story Paragraph 1</label>
            <textarea style={s.textarea} rows={3} value={content.about.story1} onChange={e => updateContent('about.story1', e.target.value)} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={s.label}>Story Paragraph 2</label>
            <textarea style={s.textarea} rows={3} value={content.about.story2} onChange={e => updateContent('about.story2', e.target.value)} />
          </div>
          <div>
            <label style={s.label}>Features (one per line)</label>
            <textarea
              style={s.textarea}
              rows={6}
              value={content.about.features.join('\n')}
              onChange={e => updateContent('about.features', e.target.value.split('\n').filter(Boolean))}
            />
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)', fontSize: 13 }}>
        All changes are saved to your browser's local storage automatically.
      </div>
    </div>
  )
}
