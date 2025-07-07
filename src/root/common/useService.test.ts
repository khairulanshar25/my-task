/**
 * @vitest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react'
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'
import '@testing-library/jest-dom'
import useService from './useService'

// Mock getService and AbortController
vi.mock('../../hooks/service', () => ({
  getService: vi.fn(),
}))

const { getService } = await import('../../hooks/service')

describe('useService', () => {
  let abortMock: ReturnType<typeof vi.fn>
  let abortControllerMock: any
  let originalConsoleError: any

  beforeEach(() => {
    abortMock = vi.fn()
    abortControllerMock = vi.fn(() => ({
      signal: {},
      abort: abortMock,
    }))
    // @ts-ignore
    global.AbortController = abortControllerMock

    // Silence console.error during tests
    originalConsoleError = console.error
    console.error = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
    console.error = originalConsoleError
  })

  it('should call getService with correct params', async () => {
    // @ts-ignore
    getService.mockResolvedValueOnce({})
    const { result } = renderHook(() => useService())
    await act(async () => {
      await result.current.ValidateService()
    })
    expect(abortControllerMock).toHaveBeenCalled()
    expect(getService).toHaveBeenCalledWith(
      { path: '/v1/validate', api: '/api/auth' },
      { signal: expect.any(Object) },
    )
  })

  it('should abort previous controller if exists', async () => {
    // @ts-ignore
    getService.mockResolvedValueOnce({})
    const { result } = renderHook(() => useService())
    await act(async () => {
      await result.current.ValidateService()
      await result.current.ValidateService()
    })
    expect(abortMock).toHaveBeenCalledTimes(1)
  })

  it('should handle errors and call console.error', async () => {
    // @ts-ignore
    getService.mockRejectedValueOnce(new Error('fail'))
    const { result } = renderHook(() => useService())
    await act(async () => {
      await result.current.ValidateService()
    })
    expect(console.error).toHaveBeenCalledWith(expect.any(Error))
  })
})
