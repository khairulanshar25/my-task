/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AppBar from './index'
import useController1 from './common/useController'
import * as useControllerModule from './common/useController'

const Comp = () => {
  const { handleClose, handleMenu, handleLogout } = useController1()
  React.useEffect(() => {
    // This is to ensure that the component mounts correctly
    handleMenu({ currentTarget: {} })
    handleClose()
    handleLogout()
  }, [])
  return <div>Comp</div>
}

vi.mock('react-router', () => ({
  NavLink: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

describe('AppBar', () => {
  const mockUseController = useControllerModule.default as unknown as jest.Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders Comp', () => {
    render(<Comp />)
  })

  it('renders app bar with auth', () => {
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      auth: true,
      handleClose: vi.fn(),
      handleMenu: vi.fn(),
      handleLogout: vi.fn(),
      anchorEl: null,
      open: false,
    })
    render(<AppBar />)
    expect(screen.getByText('My Task')).toBeInTheDocument()
    expect(screen.getByTestId('undefined_theme_switch')).toBeInTheDocument()
    expect(screen.getByLabelText('account of current user')).toBeInTheDocument()
  })

  it('does not render menu or account icon if not authenticated', () => {
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      auth: false,
      handleClose: vi.fn(),
      handleMenu: vi.fn(),
      handleLogout: vi.fn(),
      anchorEl: null,
      open: false,
    })
    render(<AppBar />)
    expect(screen.queryByText('My Task')).not.toBeInTheDocument()
    expect(screen.getByTestId('undefined_theme_switch')).toBeInTheDocument()
    expect(
      screen.queryByLabelText('account of current user'),
    ).not.toBeInTheDocument()
  })

  it('opens menu when account icon is clicked', () => {
    const handleMenu = vi.fn()
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      auth: true,
      handleClose: vi.fn(),
      handleMenu,
      handleLogout: vi.fn(),
      anchorEl: {},
      open: true,
    })
    render(<AppBar />)
    const iconButton = screen.getByLabelText('account of current user')
    fireEvent.click(iconButton)
    expect(handleMenu).toHaveBeenCalled()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('calls handleClose when Profile is clicked', () => {
    const handleClose = vi.fn()
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      auth: true,
      handleClose,
      handleMenu: vi.fn(),
      handleLogout: vi.fn(),
      anchorEl: {},
      open: true,
    })
    render(<AppBar />)
    fireEvent.click(screen.getByText('Profile'))
    expect(handleClose).toHaveBeenCalled()
  })

  it('calls handleLogout when Logout is clicked', () => {
    const handleLogout = vi.fn()
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      auth: true,
      handleClose: vi.fn(),
      handleMenu: vi.fn(),
      handleLogout,
      anchorEl: {},
      open: true,
    })
    render(<AppBar />)
    fireEvent.click(screen.getByText('Logout'))
    expect(handleLogout).toHaveBeenCalled()
  })
})
