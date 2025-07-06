import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  bgBlur,
  bgGradient,
  textGradient,
  filterStyles,
  buttonColor,
  buttonColorTheme,
} from './cssStyles'
import { alpha } from '@mui/material/styles'

vi.mock('@mui/material/styles', () => ({
  alpha: vi.fn((color: string, opacity: number) => `rgba(${color},${opacity})`),
}))

describe('bgBlur', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns correct styles with default values when no imgUrl', () => {
    const result = bgBlur({})
    expect(result).toEqual({
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px))',
      backgroundColor: 'rgba(#000000,0.8)',
    })
    expect(alpha).toHaveBeenCalledWith('#000000', 0.8)
  })

  it('returns correct styles with custom color, blur, opacity', () => {
    const result = bgBlur({ color: '#fff', blur: 10, opacity: 0.5 })
    expect(result).toEqual({
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px))',
      backgroundColor: 'rgba(#fff,0.5)',
    })
    expect(alpha).toHaveBeenCalledWith('#fff', 0.5)
  })

  it('returns correct styles with imgUrl', () => {
    const result = bgBlur({ imgUrl: 'test.jpg' })
    expect(result).toEqual({
      position: 'relative',
      backgroundImage: 'url(test.jpg)',
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px))',
        backgroundColor: 'rgba(#000000,0.8)',
      },
    })
    expect(alpha).toHaveBeenCalledWith('#000000', 0.8)
  })

  it('appends !important when important is true (no imgUrl)', () => {
    const result = bgBlur({ important: true })
    expect(result).toEqual({
      backdropFilter: 'blur(6px)!important',
      WebkitBackdropFilter: 'blur(6px))!important',
      backgroundColor: 'rgba(#000000,0.8)!important',
    })
    expect(alpha).toHaveBeenCalledWith('#000000', 0.8)
  })

  it('appends !important when important is true (with imgUrl)', () => {
    const result = bgBlur({
      imgUrl: 'img.png',
      important: true,
      color: '#123',
      opacity: 0.3,
      blur: 2,
    })
    expect(result).toEqual({
      position: 'relative',
      backgroundImage: 'url(img.png)',
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(2px)!important',
        WebkitBackdropFilter: 'blur(2px))!important',
        backgroundColor: 'rgba(#123,0.3)!important',
      },
    })
    expect(alpha).toHaveBeenCalledWith('#123', 0.3)
  })
})

describe('bgGradient', () => {
  it('returns correct gradient with direction, startColor, endColor', () => {
    const result = bgGradient({
      direction: 'to right',
      startColor: '#111',
      endColor: '#222',
    })
    expect(result).toEqual({
      background: 'linear-gradient(to right, #111, #222)',
    })
  })

  it('returns correct gradient with default direction', () => {
    const result = bgGradient({
      startColor: '#333',
      endColor: '#444',
    })

    expect(result).toEqual({
      background: 'linear-gradient(to bottom, #333, #444)',
    })
  })

  it('returns correct background with imgUrl and startColor/endColor', () => {
    const result = bgGradient({
      direction: 'to top',
      startColor: '#555',
      endColor: '#666',
      imgUrl: 'bg.jpg',
    })

    expect(result).toEqual({
      background: 'linear-gradient(to top, #555, #666), url(bg.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    })
  })
  it('uses color as fallback if startColor or endColor are missing (with imgUrl)', () => {
    const result = bgGradient({
      imgUrl: 'img.png',
      color: '#abc',
    })

    expect(result).toEqual({
      background: 'linear-gradient(to bottom, #abc, #abc), url(img.png)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    })
  })

  it('uses color as fallback for missing startColor (with imgUrl)', () => {
    const result = bgGradient({
      imgUrl: 'img.png',
      color: '#def',
      endColor: '#123',
    })
    expect(result).toEqual({
      background: 'linear-gradient(to bottom, #def, #123), url(img.png)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    })
  })

  it('uses color as fallback for missing endColor (with imgUrl)', () => {
    const result = bgGradient({
      imgUrl: 'img.png',
      color: '#456',
      startColor: '#789',
    })

    expect(result).toEqual({
      background: 'linear-gradient(to bottom, #789, #456), url(img.png)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    })
  })
})

describe('textGradient', () => {
  it('returns correct styles for a simple gradient value', () => {
    const result = textGradient('to right, #f00, #00f')
    expect(result).toEqual({
      background: '-webkit-linear-gradient(to right, #f00, #00f)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    })
  })

  it('returns correct styles for a custom gradient value', () => {
    const result = textGradient('to bottom, #123, #456')
    expect(result).toEqual({
      background: '-webkit-linear-gradient(to bottom, #123, #456)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    })
  })

  it('returns correct styles for a single color', () => {
    const result = textGradient('#abc')
    expect(result).toEqual({
      background: '-webkit-linear-gradient(#abc)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    })
  })
})

describe('filterStyles', () => {
  it('returns correct filter styles for a blur value', () => {
    const result = filterStyles('blur(5px)')
    expect(result).toEqual({
      filter: 'blur(5px)',
      WebkitFilter: 'blur(5px)',
      MozFilter: 'blur(5px)',
    })
  })

  it('returns correct filter styles for a grayscale value', () => {
    const result = filterStyles('grayscale(100%)')
    expect(result).toEqual({
      filter: 'grayscale(100%)',
      WebkitFilter: 'grayscale(100%)',
      MozFilter: 'grayscale(100%)',
    })
  })

  it('returns correct filter styles for an empty string', () => {
    const result = filterStyles('')
    expect(result).toEqual({
      filter: '',
      WebkitFilter: '',
      MozFilter: '',
    })
  })
})
describe('buttonColor', () => {
  it('returns correct styles for dark mode', () => {
    const result = buttonColor('dark')
    expect(result).toEqual({
      boxShadow:
        '0px 2px 1px -1px rgba(145, 158, 171, 0.2), 0px 1px 1px 0px rgba(145, 158, 171, 0.14), 0px 1px 3px 0px rgba(145, 158, 171, 0.12)',
      backgroundColor: '#003892',
    })
  })

  it('returns correct styles for non-dark mode', () => {
    const result = buttonColor('light')
    expect(result).toEqual({
      boxShadow:
        '0px 2px 1px -1px rgba(145, 158, 171, 0.2), 0px 1px 1px 0px rgba(145, 158, 171, 0.14), 0px 1px 3px 0px rgba(145, 158, 171, 0.12)',
      backgroundColor: '#001e3c',
    })
  })

  it('returns correct styles for an unknown mode', () => {
    const result = buttonColor('unknown')
    expect(result).toEqual({
      boxShadow:
        '0px 2px 1px -1px rgba(145, 158, 171, 0.2), 0px 1px 1px 0px rgba(145, 158, 171, 0.14), 0px 1px 3px 0px rgba(145, 158, 171, 0.12)',
      backgroundColor: '#001e3c',
    })
  })
})

describe('buttonColorTheme', () => {
  it('returns correct boxShadow style', () => {
    const result = buttonColorTheme()
    expect(result).toEqual({
      boxShadow:
        '0px 2px 1px -1px rgba(145, 158, 171, 0.2), 0px 1px 1px 0px rgba(145, 158, 171, 0.14), 0px 1px 3px 0px rgba(145, 158, 171, 0.12)',
    })
  })
})
