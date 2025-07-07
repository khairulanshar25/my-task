/**
 * @vitest-environment jsdom
 */
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'
import '@testing-library/jest-dom'
import App from './App'

vi.mock('react-dom/client', () => ({
  default: {
    createRoot: vi.fn(() => ({
      render: vi.fn(),
    })),
  },
}))
vi.mock('./MockServer/browser', () => ({
  worker: { start: vi.fn() },
}))

describe('main.tsx', () => {
  let originalGetElementById: typeof document.getElementById
  let container: HTMLElement

  beforeEach(() => {
    // Mock document.getElementById
    container = document.createElement('div')
    container.id = 'khairul-root-main'
    document.body.appendChild(container)
    originalGetElementById = document.getElementById
    document.getElementById = vi.fn(() => container)

    // Reset dummy console methods
    globalThis.console.log = vi.fn()
    globalThis.console.error = vi.fn()
    globalThis.console.warn = vi.fn()
    globalThis.console.info = vi.fn()
    globalThis.console.debug = vi.fn()
    globalThis.console.trace = vi.fn()
  })

  afterEach(() => {
    document.body.removeChild(container)
    document.getElementById = originalGetElementById
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should override console methods with dummy', async () => {
    await import('./main')
    expect(console.log).not.toBe(console.__proto__.log)
    expect(console.error).not.toBe(console.__proto__.error)
    expect(console.warn).not.toBe(console.__proto__.warn)
    expect(console.info).not.toBe(console.__proto__.info)
    expect(console.debug).not.toBe(console.__proto__.debug)
    expect(console.trace).not.toBe(console.__proto__.trace)
  })
})
