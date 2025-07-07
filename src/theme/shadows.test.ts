import shadows from './shadows'
import { vi, expect, describe, it } from 'vitest'

// Mock dependencies
vi.mock('@mui/material/styles', () => ({
  alpha: (color: string, opacity: number) => `${color}-a${opacity}`,
}))
vi.mock('./palette', async () => {
  const actual = await vi.importActual('./palette')

  return {
    ...actual,
    grey: {
      500: '#888888',
    },
  }
})

describe('shadows', () => {
  it('should return an array of 25 shadow definitions', () => {
    const result = shadows()
    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(25)
  })

  it('should have "none" as the first element', () => {
    const result = shadows()
    expect(result[0]).toBe('none')
  })

  it('should use the correct color and alpha values in the shadow strings', () => {
    const result = shadows()
    // The mock alpha returns "#888888-a0.2", "#888888-a0.14", "#888888-a0.12"
    expect(result[1]).toContain('#919EAB-a0.2')
    expect(result[1]).toContain('#919EAB-a0.14')
    expect(result[1]).toContain('#919EAB-a0.12')
  })

  it('should generate unique shadow strings for different elevations', () => {
    const result = shadows()
    // Check that at least two different elevations are not the same string
    expect(result[1]).not.toBe(result[2])
    expect(result[2]).not.toBe(result[3])
  })
})
