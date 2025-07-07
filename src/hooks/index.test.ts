import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'
import { hooks, getHooks } from './index'
import { initialData } from './model/root'
import { RootModel } from './model/root'
import { IAction } from './reducer/util/ActionType'

describe('hooks object', () => {
  it('should have initial store as initialData', () => {
    expect(hooks.store).toBe(initialData)
  })

  it('should update store when setStore is called', () => {
    const newStore = { ...initialData, test: 'value' } as RootModel
    hooks.setStore(newStore)
    expect(hooks.store).toBe(newStore)
  })

  it('should have baseDispatch as a function', () => {
    expect(typeof hooks.baseDispatch).toBe('function')
  })

  it('should update baseDispatch when setBaseDispatch is called', () => {
    const mockDispatch = vi.fn() as React.Dispatch<IAction>
    hooks.setBaseDispatch(mockDispatch)
    expect(hooks.baseDispatch).toBe(mockDispatch)
  })
})

describe('getHooks', () => {
  it('should return the hooks object', () => {
    expect(getHooks()).toBe(hooks)
  })
})
