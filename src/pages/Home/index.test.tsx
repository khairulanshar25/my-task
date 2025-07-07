/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './index'
import useController1 from './common/useController'

const Comp = () => {
  const { continueSession, logout } = useController1()
  React.useEffect(() => {
    // This is to ensure that the component mounts correctly
    continueSession()
    logout()
  }, [])
  return <div>hello</div>
}

// Mock dependencies
vi.mock('../../components/ErrorBoundry', () => ({
  __esModule: true,
  default: ({ children }: any) => <>{children}</>,
}))
vi.mock('../../components/AppBar', () => ({
  __esModule: true,
  default: () => <div data-testid='appbar' />,
}))
vi.mock('../../components/Timeout', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid='timeout' data-open={props.open}>
      {props.title}
    </div>
  ),
}))
vi.mock('../../components/Loader', () => ({
  __esModule: true,
  default: () => <div data-testid='loader' />,
}))
vi.mock('./common/useController', () => ({
  __esModule: true,
  default: () => ({
    showtimeout: false,
    continueSession: vi.fn(),
    logout: vi.fn(),
  }),
}))
vi.mock('../ProjectRouting', () => ({
  __esModule: true,
  default: () => <div data-testid='project-routing' />,
}))
vi.mock('../UserProfile', () => ({
  __esModule: true,
  default: () => <div data-testid='user-profile' />,
}))

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('renders Comp', async () => {
    await waitFor(() => {
      render(<Comp />)
    })
  })
  it('renders root and appbar', () => {
    render(<Home />)
    expect(screen.getByTestId('undefined_home')).toBeInTheDocument()
    expect(screen.getByTestId('appbar')).toBeInTheDocument()
  })

  it('renders Timeout with correct props', () => {
    render(<Home />)
    const timeout = screen.getByTestId('timeout')
    expect(timeout).toBeInTheDocument()
    expect(timeout).toHaveAttribute('data-open', 'false')
    expect(timeout).toHaveTextContent('Idle Timeout')
  })

  it('renders Loader as fallback while lazy components load', async () => {
    render(<Home />)
    await waitFor(() => {
      expect(screen.getByTestId('project-routing')).toBeInTheDocument()
    })
  })

  it('renders ProjectRouting and UserProfile routes', async () => {
    window.history.pushState({}, '', '/project/abc')
    render(<Home />)
    await waitFor(() => {
      expect(screen.getByTestId('project-routing')).toBeInTheDocument()
    })

    window.history.pushState({}, '', '/pofile')
    render(<Home />)
    await waitFor(() => {
      expect(screen.getByTestId('user-profile')).toBeInTheDocument()
    })
  })
})
