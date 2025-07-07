import { remToPx, pxToRem, responsiveFontSizes } from './typography'
import typography from './typography'

describe('remToPx', () => {
  it('converts rem string to px (rounded)', () => {
    expect(remToPx('1')).toBe(16)
    expect(remToPx('1.5')).toBe(24)
    expect(remToPx('2')).toBe(32)
    expect(remToPx('0.25')).toBe(4)
    expect(remToPx('0')).toBe(0)
    expect(remToPx('2.7')).toBe(43)
  })

  it('handles string with rem suffix', () => {
    expect(remToPx('2rem')).toBe(32)
    expect(remToPx('1.25rem')).toBe(20)
  })

  it('handles invalid input gracefully', () => {
    expect(remToPx('abc')).toBeNaN()
    expect(remToPx('')).toBeNaN()
  })
})

describe('pxToRem', () => {
  it('converts px number to rem string', () => {
    expect(pxToRem(16)).toBe('1rem')
    expect(pxToRem(24)).toBe('1.5rem')
    expect(pxToRem(32)).toBe('2rem')
    expect(pxToRem(0)).toBe('0rem')
    expect(pxToRem(8)).toBe('0.5rem')
  })
})

describe('responsiveFontSizes', () => {
  it('returns correct media queries and font sizes', () => {
    const result = responsiveFontSizes({ sm: 20, md: 24, lg: 28 })
    expect(result).toEqual({
      '@media (min-width:600px)': { fontSize: '1.25rem' },
      '@media (min-width:900px)': { fontSize: '1.5rem' },
      '@media (min-width:1200px)': { fontSize: '1.75rem' },
    })
  })

  it('handles zero values', () => {
    const result = responsiveFontSizes({ sm: 0, md: 0, lg: 0 })
    expect(result).toEqual({
      '@media (min-width:600px)': { fontSize: '0rem' },
      '@media (min-width:900px)': { fontSize: '0rem' },
      '@media (min-width:1200px)': { fontSize: '0rem' },
    })
  })
})

describe('typography object', () => {
  it('has correct fontFamily', () => {
    expect(typography.fontFamily).toBe('"Helvetica Neue",Roboto')
  })

  it('h1 has correct fontWeight, lineHeight, fontSize, and responsive sizes', () => {
    expect(typography.h1.fontWeight).toBe(800)
    expect(typography.h1.lineHeight).toBeCloseTo(80 / 64)
    expect(typography.h1.fontSize).toBe('2.5rem')
    expect(typography.h1['@media (min-width:600px)'].fontSize).toBe('3.25rem')
    expect(typography.h1['@media (min-width:900px)'].fontSize).toBe('3.625rem')
    expect(typography.h1['@media (min-width:1200px)'].fontSize).toBe('4rem')
  })

  it('subtitle2 has correct lineHeight and fontSize', () => {
    expect(typography.subtitle2.lineHeight).toBeCloseTo(22 / 14)
    expect(typography.subtitle2.fontSize).toBe('0.875rem')
  })

  it('button has correct textTransform', () => {
    expect(typography.button.textTransform).toBe('capitalize')
  })

  it('overline has correct textTransform', () => {
    expect(typography.overline.textTransform).toBe('uppercase')
  })
})
