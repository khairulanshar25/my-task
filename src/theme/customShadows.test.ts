import customShadows from './customShadows'
import { alpha } from '@mui/material/styles'
import palette from './palette'

vi.mock('./palette', () => ({
  default: {
    grey: { 500: '#888888' },
    primary: { main: '#1976d2' },
    info: { main: '#0288d1' },
    secondary: { main: '#9c27b0' },
    success: { main: '#2e7d32' },
    warning: { main: '#ed6c02' },
    error: { main: '#d32f2f' },
  },
}))

vi.mock('@mui/material/styles', () => ({
  alpha: (color: string, opacity: number) => `rgba(${color},${opacity})`,
}))

describe('customShadows', () => {
  it('returns an object with all expected shadow keys', () => {
    const shadows = customShadows()
    expect(shadows).toHaveProperty('z1')
    expect(shadows).toHaveProperty('z4')
    expect(shadows).toHaveProperty('z8')
    expect(shadows).toHaveProperty('z12')
    expect(shadows).toHaveProperty('z16')
    expect(shadows).toHaveProperty('z20')
    expect(shadows).toHaveProperty('z24')
    expect(shadows).toHaveProperty('primary')
    expect(shadows).toHaveProperty('info')
    expect(shadows).toHaveProperty('secondary')
    expect(shadows).toHaveProperty('success')
    expect(shadows).toHaveProperty('warning')
    expect(shadows).toHaveProperty('error')
    expect(shadows).toHaveProperty('card')
    expect(shadows).toHaveProperty('dialog')
    expect(shadows).toHaveProperty('dropdown')
  })

  it('generates correct shadow values using alpha and palette', () => {
    const color = '#888888'
    const shadows = customShadows()
    expect(shadows.z1).toBe(`0 1px 2px 0 rgba(${color},0.16)`)
    expect(shadows.z4).toBe(`0 4px 8px 0 rgba(${color},0.16)`)
    expect(shadows.primary).toBe(`0 8px 16px 0 rgba(#1976d2,0.24)`)
    expect(shadows.info).toBe(`0 8px 16px 0 rgba(#0288d1,0.24)`)
    expect(shadows.secondary).toBe(`0 8px 16px 0 rgba(#9c27b0,0.24)`)
    expect(shadows.success).toBe(`0 8px 16px 0 rgba(#2e7d32,0.24)`)
    expect(shadows.warning).toBe(`0 8px 16px 0 rgba(#ed6c02,0.24)`)
    expect(shadows.error).toBe(`0 8px 16px 0 rgba(#d32f2f,0.24)`)
    expect(shadows.card).toBe(
      `0 0 2px 0 rgba(${color},0.2), 0 12px 24px -4px rgba(${color},0.12)`,
    )
    expect(shadows.dialog).toBe(`-40px 40px 80px -8px rgba(${color},0.24)`)
    expect(shadows.dropdown).toBe(
      `0 0 2px 0 rgba(${color},0.24), -20px 20px 40px -4px rgba(${color},0.24)`,
    )
  })
})
