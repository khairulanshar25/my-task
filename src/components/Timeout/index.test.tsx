/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ConfirmDialog from './index'

describe('ConfirmDialog', () => {
  const defaultProps = {
    open: true,
    title: 'Session Timeout',
    content: 'Your session is about to expire.',
    continueSession: vi.fn(),
    logout: vi.fn(),
  }

  it('renders dialog with title and content', () => {
    render(<ConfirmDialog {...defaultProps} />)
    expect(screen.getByText('Session Timeout')).toBeInTheDocument()
    expect(
      screen.getByText('Your session is about to expire.'),
    ).toBeInTheDocument()
  })

  it('renders Continue and Logout buttons', () => {
    render(<ConfirmDialog {...defaultProps} />)
    expect(screen.getByText('Continue')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('calls continueSession when Continue is clicked', () => {
    render(<ConfirmDialog {...defaultProps} />)
    fireEvent.click(screen.getByText('Continue'))
    expect(defaultProps.continueSession).toHaveBeenCalled()
  })

  it('calls logout when Logout is clicked', () => {
    render(<ConfirmDialog {...defaultProps} />)
    fireEvent.click(screen.getByText('Logout'))
    expect(defaultProps.logout).toHaveBeenCalled()
  })

  it('does not render dialog when open is false', () => {
    render(<ConfirmDialog {...defaultProps} open={false} />)
    // The dialog should not be in the document
    expect(screen.queryByText('Session Timeout')).not.toBeInTheDocument()
  })
})
