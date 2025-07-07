/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loader from './index'
import '@testing-library/jest-dom'

describe('Loader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('renders the Backdrop component', () => {
    render(<Loader />)
    // Backdrop renders its children, so we check for "Loading" text
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders the CircularProgress component', () => {
    render(<Loader />)
    // CircularProgress renders a progressbar role
    expect(screen.getByTestId('CircularProgress')).toBeInTheDocument()
  })

  it('Backdrop is open', () => {
    render(<Loader />)
    // The Backdrop is open, so "Loading" should be visible
    expect(screen.getByText(/loading/i)).toBeVisible()
  })
})
