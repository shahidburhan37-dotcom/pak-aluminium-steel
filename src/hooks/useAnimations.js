import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, isVisible]
}

export function useScrollProgress(options = {}) {
  const { endLineRatio = 0.22, easing = 0.5 } = options
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  const rafId = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setProgress(1)
      return
    }

    const isMobile = window.innerWidth <= 1024
    const unit = isMobile ? '%' : 'vw'

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const endLine = windowHeight * endLineRatio
        const raw = 1 - (rect.top - endLine) / (windowHeight - endLine)
        const clamped = Math.min(Math.max(raw, 0), 1)
        const eased = Math.pow(clamped, easing)
        setProgress(eased)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [endLineRatio, easing])

  return [ref, progress, '%']
}
