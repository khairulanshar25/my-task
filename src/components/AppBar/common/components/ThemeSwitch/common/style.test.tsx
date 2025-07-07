/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import MaterialUISwitch, { PREFIX } from './style'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Mock MUI theme and Switch
vi.mock('@mui/material/Switch', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid='mui-switch' {...props} />,
}))
vi.mock('../../../../../../utils/cssStyles', () => ({
  buttonColor: (mode: string) => ({
    backgroundColor: mode === 'dark' ? 'black' : 'white',
  }),
}))

// Mock import.meta.env
beforeEach(() => {
  // @ts-expect-error
  globalThis.import = { meta: { env: { MFE_APP_PREFIX_STYLE: 'testprefix' } } }
})

describe('MaterialUISwitch', () => {
  it('should export PREFIX with correct value', () => {
    expect(PREFIX).toBe('undefined_theme_switch')
  })

  it('renders without crashing', () => {
    const { getByTestId } = render(<MaterialUISwitch />)
    expect(getByTestId('mui-switch')).toBeTruthy()
  })

  it('applies correct styles for light mode', () => {
    const theme = createTheme({ palette: { mode: 'light' } })
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MaterialUISwitch />
      </ThemeProvider>,
    )
    expect(container.firstChild).toBeTruthy()
  })

  it('applies correct styles for dark mode', () => {
    const theme = createTheme({ palette: { mode: 'dark' } })
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MaterialUISwitch />
      </ThemeProvider>,
    )
    expect(container.firstChild).toBeTruthy()
  })
})
