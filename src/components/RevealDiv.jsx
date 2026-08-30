import { useScrollReveal } from '../hooks/useAnimations'

export default function RevealDiv({ children, className = '', type = 'up', ...props }) {
  const [ref, visible] = useScrollReveal()
  const typeClass = type === 'left' ? 'reveal-left' : type === 'right' ? 'reveal-right' : type === 'scale' ? 'reveal-scale' : 'reveal'
  return <div ref={ref} className={`${typeClass} ${visible ? 'visible' : ''} ${className}`} {...props}>{children}</div>
}
