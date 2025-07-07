/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CustomNoRowsOverlay from './CustomNoRowsOverlay'

describe('CustomNoRowsOverlay', () => {
  it('renders the StyledGridOverlay', () => {
    render(<CustomNoRowsOverlay />)
    expect(screen.getByTestId('styled-grid-overlay')).toBeInTheDocument()
  })

  it('renders the SVG with correct attributes', () => {
    render(<CustomNoRowsOverlay />)
    const svg = screen.getByTestId('styled-grid-overlay').querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
    expect(svg).toHaveAttribute('width', '96')
    expect(svg).toHaveAttribute('viewBox', '0 0 452 257')
    expect(svg).toHaveAttribute('aria-hidden')
    expect(svg).toHaveAttribute('focusable', 'false')
  })

  it('renders the "No rows" text', () => {
    render(<CustomNoRowsOverlay />)
    expect(screen.getByText('No rows')).toBeInTheDocument()
  })

  it('renders all expected SVG paths', () => {
    render(<CustomNoRowsOverlay />)
    const svg = screen.getByTestId('styled-grid-overlay').querySelector('svg')
    expect(svg?.querySelectorAll('path.no-rows-primary')).toHaveLength(3)
    expect(svg?.querySelectorAll('path.no-rows-secondary')).toHaveLength(1)
  })
})
