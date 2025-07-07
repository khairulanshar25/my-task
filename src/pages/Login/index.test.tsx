/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { vi, expect, describe, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from './index'

// Mock dependencies

vi.mock('../../components/ErrorBoundry', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const mockHandleSubmit = vi.fn((e?: React.FormEvent) => e && e.preventDefault())
const mockHandleEmailChange = vi.fn()
const mockHandlePasswordChange = vi.fn()
const mockHandleClickShowPassword = vi.fn()
let mockEmail = ''
let mockPassword = ''
let mockShowPassword = false

vi.mock('./common/useController', () => ({
  __esModule: true,
  default: () => ({
    handleSubmit: mockHandleSubmit,
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      mockHandleEmailChange(e)
      mockEmail = e.target.value
    },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      mockHandlePasswordChange(e)
      mockPassword = e.target.value
    },
    email: mockEmail,
    password: mockPassword,
    showPassword: mockShowPassword,
    handleClickShowPassword: () => {
      mockHandleClickShowPassword()
      mockShowPassword = !mockShowPassword
    },
  }),
}))

describe('Login', () => {
  beforeEach(() => {
    mockEmail = ''
    mockPassword = ''
    mockShowPassword = false
    vi.clearAllMocks()
  })

  it('renders login form with all fields', () => {
    render(<Login />)
    expect(screen.getByTestId('undefined_login')).toBeInTheDocument()
    expect(screen.getByTestId('undefined_appbar')).toBeInTheDocument()
    expect(screen.getByTestId('undefined_login-login')).toBeInTheDocument()
    expect(screen.getByTestId('undefined_login-email')).toBeInTheDocument()
    expect(screen.getByTestId('undefined_login-password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show' })).toBeInTheDocument()
  })

  it('calls handleEmailChange when email input changes', () => {
    render(<Login />)
    const emailInput = screen.getByTestId('undefined_login-email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect(mockHandleEmailChange).toHaveBeenCalled()
  })

  it('calls handlePasswordChange when password input changes', () => {
    render(<Login />)
    const passwordInput = screen.getByTestId('undefined_login-password')
    fireEvent.change(passwordInput, { target: { value: 'secret' } })
    expect(mockHandlePasswordChange).toHaveBeenCalled()
  })

  it('calls handleSubmit when form is submitted', () => {
    render(<Login />)
    const form = screen.getByTestId('undefined_login-form')
    fireEvent.submit(form)
    expect(mockHandleSubmit).toHaveBeenCalled()
  })

  it('toggles password visibility when show/hide button is clicked', () => {
    render(<Login />)
    const toggleButton = screen.getByRole('button', { name: 'Show' })
    fireEvent.click(toggleButton)
    expect(mockHandleClickShowPassword).toHaveBeenCalled()
  })
})
