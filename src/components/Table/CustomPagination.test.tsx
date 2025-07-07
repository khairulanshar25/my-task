/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import CustomPagination from './CustomPagination'

// Mocks for @mui/x-data-grid-pro hooks and components
vi.mock('@mui/x-data-grid-pro', () => ({
  useGridApiContext: () => ({}),
  useGridSelector: () => 5,
  GridPagination: ({ ActionsComponent, ...props }: any) => (
    <ActionsComponent
      page={props.page ?? 0}
      onPageChange={props.onPageChange ?? (() => {})}
      className={props.className}
    />
  ),
  gridPageCountSelector: vi.fn(),
}))

// Mock for @mui/material/Pagination
vi.mock('@mui/material/Pagination', () => ({
  default: (props: any) => (
    <div data-testid='mui-pagination' {...props}>
      Pagination: page={props.page}, count={props.count}
      <button
        data-testid='next-page'
        onClick={() => props.onChange?.({}, props.page + 1)}
      >
        Next
      </button>
      <button
        data-testid='prev-page'
        onClick={() => props.onChange?.({}, props.page - 1)}
      >
        Prev
      </button>
    </div>
  ),
}))

describe('CustomPagination', () => {
  it('renders MuiPagination with correct props', () => {
    const { getByTestId } = render(
      <CustomPagination
        page={1}
        onPageChange={vi.fn()}
        className='test-class'
      />,
    )
    const pagination = getByTestId('mui-pagination')
    expect(pagination).toHaveTextContent('Pagination: page=2, count=5')
    expect(pagination.className).toContain('test-class')
  })

  it('calls onPageChange with correct arguments when next/prev is clicked', () => {
    const onPageChange = vi.fn()
    const { getByTestId } = render(
      <CustomPagination page={1} onPageChange={onPageChange} />,
    )
    fireEvent.click(getByTestId('next-page'))
    expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 2) // newPage

    fireEvent.click(getByTestId('prev-page'))
    expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 0) // newPage
  })
})
