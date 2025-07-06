import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Provider, { AppContext, useContext } from './index'
import { vi } from 'vitest'
import { hooks } from '..'

// Mock hooks.setBaseDispatch and hooks.setStore
vi.mock('..', () => ({
  hooks: {
    setBaseDispatch: vi.fn(),
    setStore: vi.fn(),
  },
}))

describe('Provider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Provider>
        <div>Test Child</div>
      </Provider>,
    )
    expect(getByText('Test Child')).toBeInTheDocument()
  })

  it('provides context value', () => {
    let contextValue: unknown
    const TestComponent = () => {
      contextValue = useContext()
      return null
    }
    render(
      <Provider>
        <TestComponent />
      </Provider>,
    )
    expect(Array.isArray(contextValue)).toBe(true)
    expect((contextValue as unknown[]).length).toBe(2)
  })

  it('calls hooks.setBaseDispatch and hooks.setStore on mount', () => {
    render(
      <Provider>
        <div />
      </Provider>,
    )
    expect(hooks.setBaseDispatch).toHaveBeenCalledTimes(3)
    expect(hooks.setStore).toHaveBeenCalledTimes(3)
  })
})
