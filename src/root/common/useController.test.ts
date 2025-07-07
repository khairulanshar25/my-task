import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import useController from './useController'

// Move these above the vi.mock calls!
const mockUseContext = vi.fn()
const mockUseService = vi.fn()

vi.mock('../../hooks/provider', () => ({
  useContext: vi.fn().mockImplementation(() => mockUseContext()),
}))
vi.mock('./useService', () => ({
  default: vi.fn().mockImplementation(() => mockUseService()),
}))

describe('useController', () => {
  let validateServiceMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    validateServiceMock = vi.fn().mockResolvedValue(undefined)
    mockUseContext.mockReturnValue([{ foo: 'bar' }])
    mockUseService.mockReturnValue({ ValidateService: validateServiceMock })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return store and ready=false initially, then ready=true after validation', async () => {
    const { result } = renderHook(() => useController())

    // Initial state
    expect(result.current.store).toEqual({ foo: 'bar' })
    expect(result.current.ready).toBe(false)
    expect(validateServiceMock).toHaveBeenCalledTimes(1)

    // Wait for effect to complete
    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.ready).toBe(true)
  })

  it('should handle ValidateService rejection and still set ready=true', async () => {
    const error = new Error('fail')
    validateServiceMock.mockRejectedValueOnce(error)
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const { result } = renderHook(() => useController())

    await act(async () => {
      await Promise.resolve()
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith('Validation failed:', error)
    expect(result.current.ready).toBe(true)

    consoleErrorSpy.mockRestore()
  })
})
