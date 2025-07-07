/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Fallback from './index'
import useController1 from './common/useController'
import * as useControllerModule from './common/useController'

describe('Fallback', () => {
  const mockUseController = useControllerModule.default as unknown as jest.Mock
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('renders error details when error is provided', () => {
    const error = {
      name: 'TypeError',
      message: 'Something went wrong',
      stack: 'stack trace here',
    }
    render(<Fallback error={error} />)
    expect(screen.getByTestId('undefined_Fallback')).toBeInTheDocument()
    expect(screen.getByText(/Error Name: TypeError/)).toBeInTheDocument()
    expect(
      screen.getByText(/Message: Something went wrong/),
    ).toBeInTheDocument()
    expect(screen.getByText(/Stack: stack trace here/)).toBeInTheDocument()
  })

  it('renders empty fields when error is undefined', () => {
    render(<Fallback error={undefined} />)
    expect(screen.getByText(/Error Name:/)).toBeInTheDocument()
    expect(screen.getByText(/Message:/)).toBeInTheDocument()
    expect(screen.getByText(/Stack:/)).toBeInTheDocument()
  })
})
