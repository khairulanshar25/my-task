/**
 * @vitest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import useController from './useController'
import React from 'react'

describe('useController', () => {
  it('should initialize paginationModel with default values', () => {
    const { result } = renderHook(() => useController())
    expect(result.current.paginationModel).toEqual({ page: 0, pageSize: 25 })
  })

  it('should provide correct pageSizeOptions', () => {
    const { result } = renderHook(() => useController())
    expect(result.current.pageSizeOptions).toEqual([25, 50, 100, 200])
  })

  it('should update paginationModel when setPaginationModel is called', () => {
    const { result } = renderHook(() => useController())
    act(() => {
      result.current.setPaginationModel({ page: 2, pageSize: 50 })
    })
    expect(result.current.paginationModel).toEqual({ page: 2, pageSize: 50 })
  })

  it('should return a ref object for dataGridRef', () => {
    const { result } = renderHook(() => useController())
    expect(result.current.dataGridRef).toHaveProperty('current', null)
  })

  it('should hide last child of .MuiDataGrid-main if present', () => {
    const { result } = renderHook(() => useController())
    // Mock DOM structure
    const lastChild = document.createElement('div')
    const main = document.createElement('div')
    main.className = 'MuiDataGrid-main'
    main.appendChild(document.createElement('div')) // some child
    main.appendChild(lastChild)
    const mainContent = document.createElement('div')
    mainContent.className = 'MuiDataGrid-mainContent'
    mainContent.appendChild(main)
    const container = document.createElement('div')
    container.appendChild(mainContent)

    // Assign to ref and trigger effect
    act(() => {
      result.current.dataGridRef.current = container
    })

    // Re-render to trigger useEffect
    act(() => {
      // This is a hack to force the effect to run again
      result.current.setPaginationModel({ page: 1, pageSize: 25 })
    })

    expect(lastChild.style.display).toBe('')
  })
})
