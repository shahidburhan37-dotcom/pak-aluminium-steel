import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24 }}>Something went wrong</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: 400 }}>An unexpected error occurred. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()} style={{ padding: '12px 28px', borderRadius: 10, background: 'var(--color-accent)', color: 'white', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Refresh Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
