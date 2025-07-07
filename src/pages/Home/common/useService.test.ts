/**
 * @vitest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react'
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'
import '@testing-library/jest-dom'
import useService from './useService'

// Mock getService and postService
vi.mock('../../../hooks/service', () => ({
  getService: vi.fn(),
  postService: vi.fn(),
}))
const { getService, postService } = await import('../../../hooks/service')

describe('useService', () => {
  let abortSpy: any

  beforeEach(() => {
    vi.clearAllMocks()
    abortSpy = vi.spyOn(AbortController.prototype, 'abort')
  })

  afterEach(() => {
    abortSpy.mockRestore()
  })

  it('calls getService with correct params in ExtendService', async () => {
    ;(getService as any).mockResolvedValueOnce({})
    const { result } = renderHook(() => useService())
    await act(() => result.current.ExtendService())
    expect(getService).toHaveBeenCalledWith(
      { path: '/v1/extend', api: '/api/auth' },
      expect.objectContaining({ signal: expect.any(Object) }),
    )
  })

  it('aborts previous extend controller if exists in ExtendService', async () => {
    ;(getService as any).mockResolvedValueOnce({})
    const { result } = renderHook(() => useService())
    // First call to set controller
    await act(() => result.current.ExtendService())
    // Second call should abort previous
    await act(() => result.current.ExtendService())
    expect(abortSpy).toHaveBeenCalled()
  })

  it('calls getService with correct params in RefreshTokenService', async () => {
    ;(getService as any).mockResolvedValueOnce({})
    const { result } = renderHook(() => useService())
    await act(() => result.current.RefreshTokenService())
    expect(getService).toHaveBeenCalledWith(
      { path: '/v1/refresh_token', api: '/api/auth' },
      expect.objectContaining({ signal: expect.any(Object) }),
    )
  })

  it('aborts previous refreshToken controller if exists in RefreshTokenService', async () => {
    ;(getService as any).mockResolvedValueOnce({})
    const { result } = renderHook(() => useService())
    await act(() => result.current.RefreshTokenService())
    await act(() => result.current.RefreshTokenService())
    expect(abortSpy).toHaveBeenCalled()
  })

  it('calls postService with correct params in ReLoginService', async () => {
    ;(postService as any).mockResolvedValueOnce({})
    const { result } = renderHook(() => useService())
    const refreshToken = 'test-token'
    await act(() => result.current.ReLoginService(refreshToken))
    expect(postService).toHaveBeenCalledWith(
      { path: '/v1/relogin', api: '/api/auth' },
      { refreshToken },
      expect.objectContaining({ signal: expect.any(Object) }),
    )
  })

  it('aborts previous reLogin controller if exists in ReLoginService', async () => {
    ;(postService as any).mockResolvedValueOnce({})
    const { result } = renderHook(() => useService())
    await act(() => result.current.ReLoginService('token1'))
    await act(() => result.current.ReLoginService('token2'))
    expect(abortSpy).toHaveBeenCalled()
  })

  it('catches and logs errors in ExtendService', async () => {
    const error = new Error('fail')
    ;(getService as any).mockRejectedValueOnce(error)
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { result } = renderHook(() => useService())
    await act(() => result.current.ExtendService())
    expect(consoleSpy).toHaveBeenCalledWith(error)
    consoleSpy.mockRestore()
  })

  it('catches and logs errors in RefreshTokenService', async () => {
    const error = new Error('fail')
    ;(getService as any).mockRejectedValueOnce(error)
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { result } = renderHook(() => useService())
    await act(() => result.current.RefreshTokenService())
    expect(consoleSpy).toHaveBeenCalledWith(error)
    consoleSpy.mockRestore()
  })

  it('catches and logs errors in ReLoginService', async () => {
    const error = new Error('fail')
    ;(postService as any).mockRejectedValueOnce(error)
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { result } = renderHook(() => useService())
    await act(() => result.current.ReLoginService('token'))
    expect(consoleSpy).toHaveBeenCalledWith(error)
    consoleSpy.mockRestore()
  })
})
