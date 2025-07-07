/**
 * @vitest-environment jsdom
 */
import { describe, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserProfile from './index'
import * as useControllerModule from './common/useController'
import useController1 from './common/useController'

const Comp = () => {
  const { store } = useController1()
  return <div>{store?.theme}</div>
}

// Mock MUI components (optional, but can help with shallow rendering)
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual<any>('@mui/material')
  return {
    ...actual,
    Box: ({ children }: any) => <div data-testid='mui-box'>{children}</div>,
    Paper: ({ children }: any) => <div data-testid='mui-paper'>{children}</div>,
    Typography: ({ children, ...props }: any) => (
      <div data-testid='mui-typography' {...props}>
        {children}
      </div>
    ),
    Avatar: ({ children }: any) => (
      <div data-testid='mui-avatar'>{children}</div>
    ),
  }
})

// Helper to mock useController
const mockUseController = (user: any) => {
  vi.spyOn(useControllerModule, 'default').mockReturnValue({
    store: { user },
  })
}

describe('UserProfile', () => {
  beforeEach(() => {
    vi.resetModules()
  })
  it('renders Comp', async () => {
    await waitFor(() => {
      render(<Comp />)
    })
  })
  it('renders "No user data available." when user is undefined', async () => {
    mockUseController(undefined)
    const { unmount } = render(<UserProfile />)
    expect(screen.getByText(/No user data available/i)).toBeInTheDocument()
    unmount()
  })

  it('renders user name, email, and avatar initial', async () => {
    mockUseController({
      name: 'Alice',
      email: 'alice@example.com',
    })
    const { unmount } = render(<UserProfile />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
    expect(screen.getByTestId('mui-avatar')).toHaveTextContent('A')
    unmount()
  })

  it('shows "No Name" and "No Email" if missing', async () => {
    mockUseController({})
    const { unmount } = render(<UserProfile />)
    expect(screen.getByText('No Name')).toBeInTheDocument()
    expect(screen.getByText('No Email')).toBeInTheDocument()
    expect(screen.getByTestId('mui-avatar')).toHaveTextContent('?')
    unmount()
  })

  it('renders user role if present', async () => {
    mockUseController({
      name: 'Bob',
      email: 'bob@example.com',
      role: 'admin',
    })
    const { unmount } = render(<UserProfile />)
    expect(screen.getByText(/Role: admin/i)).toBeInTheDocument()
    unmount()
  })

  it('renders user status as Active', async () => {
    mockUseController({
      name: 'Carol',
      email: 'carol@example.com',
      isActive: true,
    })
    const { unmount } = render(<UserProfile />)
    expect(screen.getByText(/Status: Active/i)).toBeInTheDocument()
    unmount()
  })

  it('renders user status as Inactive', async () => {
    mockUseController({
      name: 'Dave',
      email: 'dave@example.com',
      isActive: false,
    })
    const { unmount } = render(<UserProfile />)
    expect(screen.getByText(/Status: Inactive/i)).toBeInTheDocument()
    unmount()
  })

  it('renders last login if present', async () => {
    const lastLogin = new Date('2023-01-01T12:00:00Z').toISOString()
    mockUseController({
      name: 'Eve',
      email: 'eve@example.com',
      lastLogin,
    })
    const { unmount } = render(<UserProfile />)
    expect(screen.getByText(/Last Login:/i)).toBeInTheDocument()
    unmount()
  })
})
