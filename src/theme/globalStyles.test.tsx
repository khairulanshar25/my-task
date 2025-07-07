import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import GlobalStyles from './globalStyles'

describe('GlobalStyles', () => {
  it('renders without crashing', () => {
    const theme = createTheme()
    const { container } = render(
      <ThemeProvider theme={theme}>
        <GlobalStyles />
      </ThemeProvider>,
    )
    expect(container).toBeTruthy()
  })

  it('sets document.body background color to theme.palette.background.default', () => {
    const theme = createTheme({
      palette: {
        background: {
          default: '#123456',
        },
      },
    })
    render(
      <ThemeProvider theme={theme}>
        <GlobalStyles />
      </ThemeProvider>,
    )
    expect(document.body.style.backgroundColor).toBe('rgb(18, 52, 86)')
  })

  it('updates document.body background color when theme changes', () => {
    const initialTheme = createTheme({
      palette: {
        background: {
          default: '#abcdef',
        },
      },
    })
    const { rerender } = render(
      <ThemeProvider theme={initialTheme}>
        <GlobalStyles />
      </ThemeProvider>,
    )
    expect(document.body.style.backgroundColor).toBe('rgb(171, 205, 239)')

    const newTheme = createTheme({
      palette: {
        background: {
          default: '#654321',
        },
      },
    })
    rerender(
      <ThemeProvider theme={newTheme}>
        <GlobalStyles />
      </ThemeProvider>,
    )
    expect(document.body.style.backgroundColor).toBe('rgb(101, 67, 33)')
  })
})
