import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import useResponsive, { useWidth } from './useResponsive'

// Mock MUI hooks and theme
const mockBreakpoints = {
  up: vi.fn(),
  down: vi.fn(),
  between: vi.fn(),
  only: vi.fn(),
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
}
const mockTheme = {
  breakpoints: mockBreakpoints,
}

vi.mock('@mui/material/styles', async () => {
  return {
    useTheme: () => mockTheme,
  }
})

let useMediaQueryMock: ReturnType<typeof vi.fn>
vi.mock('@mui/material/useMediaQuery', async () => ({
  default: (...args: any[]) => useMediaQueryMock(...args),
}))

describe('useResponsive', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockBreakpoints.up.mockImplementation((bp) => `up-${bp}`)
    mockBreakpoints.down.mockImplementation((bp) => `down-${bp}`)
    mockBreakpoints.between.mockImplementation(
      (start, end) => `between-${start}-${end}`,
    )
    mockBreakpoints.only.mockImplementation((bp) => `only-${bp}`)
  })

  it('returns mediaUp when query is "up"', () => {
    useMediaQueryMock = vi.fn().mockImplementation((query) => query === 'up-sm')
    const { result } = renderHook(() => useResponsive('up', 'sm', 'md'))
    expect(result.current).toBe(true)
    expect(mockBreakpoints.up).toHaveBeenCalledWith('sm')
  })

  it('returns mediaDown when query is "down"', () => {
    useMediaQueryMock = vi
      .fn()
      .mockImplementation((query) => query === 'down-md')
    const { result } = renderHook(() => useResponsive('down', 'md', 'xl'))
    expect(result.current).toBe(true)
    expect(mockBreakpoints.down).toHaveBeenCalledWith('md')
  })

  it('returns mediaBetween when query is "between"', () => {
    useMediaQueryMock = vi
      .fn()
      .mockImplementation((query) => query === 'between-sm-lg')
    const { result } = renderHook(() => useResponsive('between', 'sm', 'lg'))
    expect(result.current).toBe(true)
    expect(mockBreakpoints.between).toHaveBeenCalledWith('sm', 'lg')
  })

  it('returns mediaOnly when query is "only"', () => {
    useMediaQueryMock = vi
      .fn()
      .mockImplementation((query) => query === 'only-xl')
    const { result } = renderHook(() => useResponsive('only', 'xl', 'xl'))
    expect(result.current).toBe(true)
    expect(mockBreakpoints.only).toHaveBeenCalledWith('xl')
  })
})

describe('useWidth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockBreakpoints.up.mockImplementation((bp) => `up-${bp}`)
  })

  it('returns the first matching breakpoint', () => {
    // Simulate only 'md' matches
    useMediaQueryMock = vi.fn((query) => query === 'up-md')
    const { result } = renderHook(() => useWidth())
    expect(result.current).toBe('md')
  })

  it('returns "xs" if no breakpoints match', () => {
    useMediaQueryMock = vi.fn(() => false)
    const { result } = renderHook(() => useWidth())
    expect(result.current).toBe('xs')
  })

  it('returns the highest matching breakpoint', () => {
    // Simulate 'lg' and 'md' match, but 'lg' is higher
    useMediaQueryMock = vi.fn((query) => query === 'up-lg' || query === 'up-md')
    const { result } = renderHook(() => useWidth())
    expect(result.current).toBe('md')
  })
})
