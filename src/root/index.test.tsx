/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { describe, it, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import RootComp from './index'
import * as useControllerModule from './common/useController'

// Mock dependencies
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    CssBaseline: () => <div data-testid='css-baseline' />,
  }
})
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
vi.mock('../components/Appbar', () => ({
  __esModule: true,
  default: () => <div data-testid='appbar' />,
}))

describe('RootComp', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders Loader when not ready', () => {
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      ready: false,
      store: {},
    })
    const dummyContainer = document.createElement('div')
    const dummyRootElement = document.createElement('div')
    render(
      <RootComp
        shadowContainer={dummyContainer}
        shadowRootElement={dummyRootElement}
      />,
    )
  })

  it('renders Home when ready and user email exists', async () => {
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      ready: true,
      store: { user: { email: 'test@example.com' } },
    })
    const dummyContainer = document.createElement('div')
    const dummyRootElement = document.createElement('div')
    render(
      <RootComp
        shadowContainer={dummyContainer}
        shadowRootElement={dummyRootElement}
      />,
    )
  })

  it('renders Login when ready and user email does not exist', async () => {
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      ready: true,
      store: { user: {} },
    })
    const dummyContainer = document.createElement('div')
    const dummyRootElement = document.createElement('div')
    render(
      <RootComp
        shadowContainer={dummyContainer}
        shadowRootElement={dummyRootElement}
      />,
    )
  })
})
