/**
 * @vitest-environment jsdom
 */
import { vi, expect, describe, it } from 'vitest'
vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import App from './App'

// Mock dependencies
vi.mock('./hooks/provider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='provider'>{children}</div>
  ),
}))
vi.mock('./theme', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='theme'>{children}</div>
  ),
}))
vi.mock('./root', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid='root' {...props} />,
}))

describe('App', () => {
  it('renders Provider, ThemeProvider, and Root components', () => {
    const props = {
      someProp: 'value',
      shadowContainer: document.createElement('div'),
      shadowRootElement: document.createElement('div'),
    }
    const { getByTestId } = render(<App {...props} />)

    expect(getByTestId('provider')).toBeTruthy()
    expect(getByTestId('theme')).toBeTruthy()
    expect(getByTestId('root')).toBeTruthy()
  })

  it('passes props to ThemeProvider and Root', () => {
    const props = {
      custom: 'test',
      shadowContainer: document.createElement('div'),
      shadowRootElement: document.createElement('div'),
    }
    const { getByTestId } = render(<App {...props} />)
    expect(getByTestId('root').getAttribute('custom')).toBe('test')
  })
})
