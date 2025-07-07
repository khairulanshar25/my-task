/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Error from './index'

// Mock FallbackError component
vi.mock('../FallbackError', () => ({
  __esModule: true,
  default: ({ error }: { error?: Error }) => (
    <div data-testid='fallback-error'>
      {error ? error.message : 'Error occurred'}
    </div>
  ),
}))

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('renders children when no error is thrown', () => {
    render(
      <Error>
        <div data-testid='child'>No Error</div>
      </Error>,
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders fallback UI when an error is thrown', () => {
    // Component that throws error
    const ProblemChild = () => {
      throw new window.Error('Test error')
    }

    render(
      <Error>
        <ProblemChild />
      </Error>,
    )

    expect(screen.getByTestId('fallback-error')).toHaveTextContent('Test error')
  })
})
