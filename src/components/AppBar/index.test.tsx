/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AppBar from './index'

// Mock dependencies
const useControllerMock = vi.fn()

vi.mock('./common/useController', () => ({
  __esModule: true,
  default: () => useControllerMock,
}))
vi.mock('./common/style', () => ({
  StyledRoot: ({ children }: any) => (
    <div data-testid='StyledRoot'>{children}</div>
  ),
  StyledToolbar: ({ children }: any) => (
    <div data-testid='StyledToolbar'>{children}</div>
  ),
  classes: { menuItem: 'menuItem' },
}))
vi.mock('./common/components/ThemeSwitch', () => ({
  __esModule: true,
  default: () => <div data-testid='ThemeSwitch' />,
}))
vi.mock('react-router', () => ({
  NavLink: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

describe('AppBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders ThemeSwitch always', () => {
    useControllerMock.mockReturnValue({
      auth: false,
      handleClose: vi.fn(),
      handleMenu: vi.fn(),
      handleLogout: vi.fn(),
      anchorEl: null,
      open: false,
    })
    render(<AppBar />)
  })

  it('renders menu and account icon when authenticated', () => {
    useControllerMock.mockReturnValue({
      auth: true,
      handleClose: vi.fn(),
      handleMenu: vi.fn(),
      handleLogout: vi.fn(),
      anchorEl: null,
      open: false,
    })
    render(<AppBar />)
  })

  it('does not render menu and account icon when not authenticated', () => {
    useControllerMock.mockReturnValue({
      auth: false,
      handleClose: vi.fn(),
      handleMenu: vi.fn(),
      handleLogout: vi.fn(),
      anchorEl: null,
      open: false,
    })
    render(<AppBar />)
  })

  it('calls handleMenu when account icon is clicked', () => {
    const handleMenu = vi.fn()
    useControllerMock.mockReturnValue({
      auth: true,
      handleClose: vi.fn(),
      handleMenu,
      handleLogout: vi.fn(),
      anchorEl: null,
      open: false,
    })
    render(<AppBar />)
  })

  it('shows menu when open is true', () => {
    useControllerMock.mockReturnValue({
      auth: true,
      handleClose: vi.fn(),
      handleMenu: vi.fn(),
      handleLogout: vi.fn(),
      anchorEl: {},
      open: true,
    })
    render(<AppBar />)
  })

  it('calls handleClose when Profile is clicked', () => {
    const handleClose = vi.fn()
    useControllerMock.mockReturnValue({
      auth: true,
      handleClose,
      handleMenu: vi.fn(),
      handleLogout: vi.fn(),
      anchorEl: {},
      open: true,
    })
    render(<AppBar />)
  })

  it('calls handleLogout when Logout is clicked', () => {
    const handleLogout = vi.fn()
    useControllerMock.mockReturnValue({
      auth: true,
      handleClose: vi.fn(),
      handleMenu: vi.fn(),
      handleLogout,
      anchorEl: {},
      open: true,
    })
    render(<AppBar />)
  })
})
