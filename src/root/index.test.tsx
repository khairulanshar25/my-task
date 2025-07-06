import React from 'react'
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'
import { render } from '@testing-library/react'
import ThemeProvider from './index'
import * as ProviderHook from '../hooks/provider'
import * as DispatcherHook from '../hooks/useDispatcher'
import * as ConfigModule from './config'
import { RootProps } from '../RootProps'
import { render, screen, waitFor } from '@testing-library/react'
import RootComp from '../root'
import * as useControllerModule from '../root/common/useController'

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
  const mockUseController = useControllerModule.default as unknown as jest.Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders Loader when not ready', () => {
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      ready: false,
      store: {},
    })
    render(<RootComp />)
  })

  it('renders Home when ready and user email exists', async () => {
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      ready: true,
      store: { user: { email: 'test@example.com' } },
    })
    render(<RootComp />)
  })

  it('renders Login when ready and user email does not exist', async () => {
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      ready: true,
      store: { user: {} },
    })
    render(<RootComp />)
  })
})
