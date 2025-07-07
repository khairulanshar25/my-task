import React from 'react'
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'
import { render } from '@testing-library/react'
import ThemeProvider from './index'
import * as ProviderHook from '../hooks/provider'
import * as DispatcherHook from '../hooks/useDispatcher'
import * as ConfigModule from './config'

// Mock dependencies
vi.mock('@mui/material', () => ({
  CssBaseline: () => <div data-testid='css-baseline' />,
}))
vi.mock('@mui/material/styles', async () => {
  const actual = await vi.importActual('@mui/material/styles')
  return {
    ...actual,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid='mui-theme-provider'>{children}</div>
    ),
    alpha: actual.alpha,
  }
})
vi.mock('@emotion/react', async () => {
  const actual = await vi.importActual('@emotion/react')
  return {
    ...actual,
    CacheProvider: ({ value, children }: any) => (
      <div data-testid='cache-provider'>{children}</div>
    ),
  }
})
vi.mock('./globalStyles', () => ({
  __esModule: true,
  default: () => <div data-testid='global-styles' />,
}))

describe('ThemeProvider', () => {
  const mockTheme = { palette: { mode: 'light' } }
  const mockCache = {}
  const mockConfig = vi.fn(() => [mockTheme, mockCache])
  const mockDispatchThemeConfig = vi.fn()
  const mockDispatchRoot = vi.fn()

  beforeEach(() => {
    vi.spyOn(ConfigModule, 'default').mockImplementation(mockConfig as any)
    vi.spyOn(ProviderHook, 'useContext').mockImplementation(() => [
      { theme: 'light' },
      vi.fn(),
    ])
    vi.spyOn(DispatcherHook, 'default').mockImplementation(
      () =>
        ({
          dispatchThemeConfig: mockDispatchThemeConfig as any,
          dispatchRoot: mockDispatchRoot,
        }) as any,
    )
    mockConfig.mockClear()
    mockDispatchThemeConfig.mockClear()
    mockDispatchRoot.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders children and applies providers', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider shadowRootElement={null} shadowContainer={null}>
        <span>Child</span>
      </ThemeProvider>,
    )
    expect(getByTestId('cache-provider')).toBeTruthy()
    expect(getByTestId('mui-theme-provider')).toBeTruthy()
    expect(getByTestId('css-baseline')).toBeTruthy()
    expect(getByTestId('global-styles')).toBeTruthy()
    expect(getByText('Child')).toBeTruthy()
  })

  it('calls Config with correct arguments', () => {
    const shadowRootElement = document.createElement('div')
    const shadowContainer = document.createElement('div')
    render(
      <ThemeProvider
        shadowRootElement={shadowRootElement}
        shadowContainer={shadowContainer}
      >
        <span>Test</span>
      </ThemeProvider>,
    )
    expect(mockConfig).toHaveBeenCalledWith(
      shadowRootElement,
      shadowContainer,
      'light',
    )
  })

  it('dispatches theme config and root', () => {
    const shadowRootElement = document.createElement('div')
    const shadowContainer = document.createElement('div')
    render(
      <ThemeProvider
        shadowRootElement={shadowRootElement}
        shadowContainer={shadowContainer}
      >
        <span>Test</span>
      </ThemeProvider>,
    )
    expect(mockDispatchThemeConfig).toHaveBeenCalledWith(mockTheme)
    expect(mockDispatchRoot).toHaveBeenCalledWith(
      shadowRootElement,
      shadowContainer,
    )
  })
})
