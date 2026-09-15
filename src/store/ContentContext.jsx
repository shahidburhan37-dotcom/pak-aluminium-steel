import { createContext, useContext, useState, useEffect } from 'react'

const CONTENT_VERSION = 5

const defaultContent = {
  topbar: 'Premium Aluminium & Steel Fabrication — Free Consultation Available',

  hero: {
    title: 'Precision Aluminium &\nSteel Fabrication',
    subtitle: 'Premium windows, railings, and doors crafted with expertise. From design to installation — we bring your vision to life.',
    bgImage: 'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=1920&auto=format&fit=crop&q=90',
    cta1: 'Explore Products',
    cta2: 'Get Free Quote',
    trust1: '10+ Years Experience',
    trust2: '500+ Projects Done',
    trust3: '100% Satisfaction',
  },

  categories: [
    {
      id: 1,
      title: 'Railings',
      desc: 'Glass, steel, and aluminum railings for balconies, stairs, and terraces.',
      img: '/images/products/railings/frameless-glass-balcony-railing.webp',
      to: '/railings',
    },
    {
      id: 2,
      title: 'Doors',
      desc: 'Pivot, sliding, French, and security doors crafted from aluminum and steel.',
      img: '/images/products/doors/slim-profile-pivot-door.webp',
      to: '/doors',
    },
    {
      id: 3,
      title: 'Shower Cabins',
      desc: 'Frameless and sliding glass shower enclosures for modern bathrooms.',
      img: '/images/products/shower-cabins/frameless-tempered-glass-shower.webp',
      to: '/shower-cabins',
    },
    {
      id: 4,
      title: 'Terraces & Pergolas',
      desc: 'Motorized pergolas, glass enclosures, and outdoor living solutions.',
      img: '/images/products/terraces/motorized-aluminum-pergola.webp',
      to: '/terraces',
    },
    {
      id: 5,
      title: 'Windows',
      desc: 'Casement, sliding, tilt and turn, arched, and picture windows.',
      img: '/images/products/windows/black-frame-sliding-window.webp',
      to: '/windows',
    },
    {
      id: 6,
      title: 'Architectural Glass',
      desc: 'Curtain walls, smart glass, soundproof windows, and specialized glazing.',
      img: '/images/products/glass/curtain-walling-facade.webp',
      to: '/glass',
    },
    {
      id: 7,
      title: 'Composite Panels',
      desc: 'ACP cladding, decorative louvers, and architectural wall panels.',
      img: '/images/products/panels/aluminum-composite-panel-cladding.webp',
      to: '/panels',
    },
  ],

  features: [
    {
      id: 1,
      title: 'Premium Materials',
      desc: 'We use only top-grade aluminium alloys and stainless steel sourced from certified suppliers.',
      icon: 'shield',
    },
    {
      id: 2,
      title: 'Expert Craftsmanship',
      desc: 'Our skilled fabricators bring decades of experience to every cut, weld, and finish.',
      icon: 'tool',
    },
    {
      id: 3,
      title: 'Timely Delivery',
      desc: 'We respect your deadlines. Projects are completed on schedule with zero compromise on quality.',
      icon: 'clock',
    },
    {
      id: 4,
      title: 'Custom Designs',
      desc: 'From concept to fabrication — we bring your unique vision to life with bespoke solutions.',
      icon: 'check',
    },
  ],

  process: [
    { id: 1, num: '01', title: 'Consultation', desc: 'Share your vision and requirements. We visit your site and take precise measurements.' },
    { id: 2, num: '02', title: 'Design', desc: 'Our team creates detailed designs and 3D renders for your approval before fabrication.' },
    { id: 3, num: '03', title: 'Fabrication', desc: 'Precision engineering in our workshop using premium materials and modern equipment.' },
    { id: 4, num: '04', title: 'Installation', desc: 'Professional installation by our trained team with cleanup and final quality check.' },
  ],

  testimonials: [
    { id: 1, name: 'Ahmad R.', role: 'Homeowner, Lahore', text: 'Pak Aluminium & Steel transformed our home. The windows are stunning and the installation was seamless. Highly recommended!', stars: 5 },
    { id: 2, name: 'Fatima K.', role: 'Architect', text: 'As an architect, I demand precision. Pak Aluminium & Steel delivers every time. Their railing work is exceptional.', stars: 5 },
    { id: 3, name: 'Hassan M.', role: 'Builder', text: 'Reliable, professional, and quality work. We use Pak Aluminium & Steel for all our residential projects now.', stars: 5 },
    { id: 4, name: 'Sara A.', role: 'Interior Designer', text: 'The custom door designs they fabricated were exactly what my client wanted. Beautiful craftsmanship.', stars: 5 },
    { id: 5, name: 'Usman T.', role: 'Property Developer', text: 'From windows to railings, Pak Aluminium & Steel handles everything. Their quality is unmatched in the market.', stars: 5 },
    { id: 6, name: 'Ayesha N.', role: 'Homeowner, Islamabad', text: 'We got sliding windows and balcony railings done. The finish quality is top-notch and pricing was fair.', stars: 5 },
  ],

  faqs: [
    { id: 1, q: 'What materials do you use for windows?', a: 'We use premium 6063-T5 aluminium alloys with thermal break technology. Our glass options include toughened, laminated, and double-glazed units from certified suppliers.' },
    { id: 2, q: 'How long does fabrication take?', a: 'Standard projects take 7-14 working days from design approval. Complex custom projects may take 3-4 weeks. We always provide a timeline before starting.' },
    { id: 3, q: 'Do you offer installation services?', a: 'Yes! Our trained installation team handles everything from delivery to final fitting. We also provide a 5-year warranty on all installations.' },
    { id: 4, q: 'Can I get a custom design?', a: 'Absolutely. We specialize in bespoke fabrication. Share your vision, dimensions, and style preferences — we\'ll bring it to life with precision engineering.' },
    { id: 5, q: 'What areas do you serve?', a: 'We serve all of Pakistan, with primary operations in Lahore, Islamabad, Karachi, and Faisalabad. Contact us for delivery availability in your area.' },
  ],

  stats: [
    { id: 1, num: '500+', label: 'Projects Completed' },
    { id: 2, num: '10+', label: 'Years Experience' },
    { id: 3, num: '50+', label: 'Expert Craftsmen' },
    { id: 4, num: '100%', label: 'Client Satisfaction' },
  ],

  cta: {
    title: 'Ready to Transform Your Space?',
    desc: 'Get a free consultation and quote for your next project. No obligations, just expert advice.',
    btn1: 'Get Started Today',
    btn2: 'Browse Designs',
  },

  footer: {
    brand: 'Pak Aluminium & Steel',
    desc: 'Premium aluminium and steel fabrication — windows, railings, doors, and custom solutions crafted with precision across Pakistan.',
    phone: '+92 314 8711616',
    whatsapp: '923148711616',
    email: 'pakaluminumandglass@gmail.com',
    address: 'C, 11-5, 2 College Rd, Township, Lahore, Pakistan',
  },

  about: {
    title: 'About Pak Aluminium & Steel',
    desc: 'A decade of precision fabrication — turning architectural visions into reality.',
    story1: 'Pak Aluminium & Steel is a leading aluminium and steel fabrication company based in Lahore, Pakistan. We specialize in designing, fabricating, and installing premium windows, railings, doors, and custom metalwork for residential and commercial projects.',
    story2: 'Our state-of-the-art workshop combines traditional craftsmanship with modern technology, ensuring every product meets the highest standards of precision and quality. From a single window to an entire building facade — we deliver.',
    features: [
      'Free site consultation & measurement',
      'Custom 3D design visualization',
      'Premium grade materials only',
      'Professional installation team',
      'Post-installation support',
      'Competitive market pricing',
    ],
  },
}

const ContentContext = createContext()

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('pakaluminium-content')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed._version !== CONTENT_VERSION) {
          localStorage.removeItem('pakaluminium-content')
          return defaultContent
        }
        return { ...defaultContent, ...parsed }
      }
      return defaultContent
    } catch {
      return defaultContent
    }
  })

  useEffect(() => {
    localStorage.setItem('pakaluminium-content', JSON.stringify({ ...content, _version: CONTENT_VERSION }))
  }, [content])

  const updateContent = (path, value) => {
    setContent(prev => {
      const next = { ...prev }
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) {
        if (Array.isArray(obj[keys[i]])) {
          obj[keys[i]] = [...obj[keys[i]]]
          obj = obj[keys[i]]
        } else {
          obj[keys[i]] = { ...obj[keys[i]] }
          obj = obj[keys[i]]
        }
      }
      obj[keys[keys.length - 1]] = value
      return next
    })
  }

  const addItem = (path, item) => {
    setContent(prev => {
      const next = { ...prev }
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length; i++) {
        if (Array.isArray(obj[keys[i]])) {
          obj[keys[i]] = [...obj[keys[i]]]
        } else {
          obj[keys[i]] = { ...obj[keys[i]] }
        }
        obj = obj[keys[i]]
      }
      obj.push({ ...item, id: Date.now() })
      return next
    })
  }

  const removeItem = (path, id) => {
    setContent(prev => {
      const next = { ...prev }
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length; i++) {
        if (Array.isArray(obj[keys[i]])) {
          obj[keys[i]] = [...obj[keys[i]]]
        } else {
          obj[keys[i]] = { ...obj[keys[i]] }
        }
        obj = obj[keys[i]]
      }
      const idx = obj.findIndex(item => item.id === id)
      if (idx !== -1) obj.splice(idx, 1)
      return next
    })
  }

  const resetContent = () => {
    setContent(defaultContent)
    localStorage.removeItem('pakaluminium-content')
  }

  return (
    <ContentContext.Provider value={{ content, updateContent, addItem, removeItem, resetContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
