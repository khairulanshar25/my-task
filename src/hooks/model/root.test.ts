import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as rootModule from './root'
import { initialTheme, initialToken } from './root'

describe('RootModel and initial values', () => {
  const originalLocalStorage = global.localStorage

  beforeEach(() => {
    // Mock localStorage for each test
    let store: Record<string, string> = {}
    global.localStorage = {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key]
      }),
      clear: vi.fn(() => {
        store = {}
      }),
      key: vi.fn(),
      length: 0,
    } as any
  })

  afterEach(() => {
    global.localStorage = originalLocalStorage
    vi.restoreAllMocks()
  })

  it('should have correct default initialTheme when localStorage is empty', () => {
    ;(localStorage.getItem as any).mockReturnValueOnce(null)
    // Re-import to re-evaluate initialTheme
    expect(initialTheme).toBe('dark')
  })

  it('should have correct initialToken when localStorage is empty', () => {
    ;(localStorage.getItem as any).mockReturnValueOnce(null)
    // Re-import to re-evaluate initialToken
    expect(initialToken).toBeUndefined()
  })

  it('should have correct initialData structure', () => {
    // Use the actual module (not re-imported)
    expect(rootModule.initialData).toMatchObject({
      user: undefined,
      expiredIn: undefined,
      errorMsg: undefined,
      isLoading: true,
      theme: rootModule.initialTheme,
      themeConfig: undefined,
      token: rootModule.initialToken,
      projects: [],
      tasks: [],
    })
  })
})
