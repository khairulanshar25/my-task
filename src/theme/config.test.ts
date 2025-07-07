import Config from './config'
import { Theme } from '@mui/material/styles'

// Mock dependencies
vi.mock('./customShadows', () => ({ default: vi.fn(() => ({})) }))
vi.mock('./palette', () => ({
  default: { primary: { main: '#000' } },
  darkBackground: { background: { default: '#111' } },
  darkText: { text: { primary: '#fff' } },
  lightBackground: { background: { default: '#fff' } },
  lightText: { text: { primary: '#111' } },
}))
vi.mock('./shadows', () => ({ default: vi.fn(() => []) }))
vi.mock('./typography', () => ({ default: {} }))
vi.mock('./overrides', () => ({ default: vi.fn(() => ({})) }))
vi.mock('@emotion/cache', () => ({
  default: vi.fn((opts) => ({ ...opts, __isCache: true })),
}))
vi.mock('@mui/material/styles', async () => {
  const actual = await vi.importActual<any>('@mui/material/styles')
  return {
    ...actual,
    createTheme: vi.fn((opts) => ({
      ...opts,
      components: {},
      __isTheme: true,
    })),
    responsiveFontSizes: vi.fn((theme) => theme),
  }
})

describe('Config', () => {
  let shadowRootElement: HTMLElement
  let shadowContainer: HTMLElement

  beforeEach(() => {
    shadowRootElement = document.createElement('div')
    shadowContainer = document.createElement('div')
    // Reset body styles
    document.body.style.padding = ''
    document.body.style.margin = ''
    document.body.style.border = ''
  })

  it('should return a theme and cache tuple for light mode', () => {
    const [theme, cache] = Config(shadowRootElement, shadowContainer, 'light')
    expect(theme).toBeDefined()
    expect(cache).toBeDefined()
    expect((theme as any).__isTheme).toBe(true)
    expect((cache as any).__isCache).toBe(true)
    expect((cache as any).container).toBe(shadowContainer)
    expect((theme as any).palette.mode).toBe('light')
  })

  it('should return a theme and cache tuple for dark mode', () => {
    const [theme, cache] = Config(shadowRootElement, shadowContainer, 'dark')
    expect(theme).toBeDefined()
    expect(cache).toBeDefined()
    expect((theme as any).palette.mode).toBe('dark')
    expect((theme as any).palette.background.default).toBe('#111')
    expect((theme as any).palette.text.primary).toBe('#fff')
  })

  it('should set defaultProps.container for all components', () => {
    const [theme] = Config(shadowRootElement, shadowContainer, 'light')
    // Check a few keys from the rest array
    const keys = [
      'MuiToolbar',
      'MuiBox',
      'MuiStack',
      'MuiAppBar',
      'MuiButton',
      'MuiDialog',
    ]
    keys.forEach((key) => {
      expect((theme as any).components[key]).toBeDefined()
      expect((theme as any).components[key].defaultProps.container).toBe(
        shadowRootElement,
      )
    })
  })

  it('should reset document.body styles', () => {
    Config(shadowRootElement, shadowContainer, 'light')
    expect(document.body.style.padding).toBe('0px')
    expect(document.body.style.margin).toBe('0px')
    expect(document.body.style.border).toBe('0px')
  })
})
