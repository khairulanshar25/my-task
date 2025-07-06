import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'
import { reducers } from './index'
import * as mainReducers from './main.reducers'
import * as rootReducers from './root.reducers'
import * as projectReducers from './project.reducers'
import * as hooksModule from '..'
import { RootModel } from '../model/root'
import { IAction } from './util/ActionType'

describe('reducers', () => {
  let initialState: RootModel
  let action: IAction

  beforeEach(() => {
    initialState = { foo: 'bar' } as unknown as RootModel
    action = { type: 'TEST_ACTION' } as IAction

    vi.spyOn(Object, 'freeze')
    vi.spyOn(mainReducers, 'default').mockImplementation((state, action) => ({
      ...state,
      main: true,
    }))
    vi.spyOn(rootReducers, 'default').mockImplementation((state, action) => ({
      ...state,
      root: true,
    }))
    vi.spyOn(projectReducers, 'default').mockImplementation(
      (state, action) => ({ ...state, project: true }),
    )
    vi.spyOn(hooksModule, 'getHooks').mockReturnValue({
      store: { existing: 'value' },
      setStore: vi.fn(),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should freeze the state', () => {
    reducers(initialState, action)
    expect(Object.freeze).toHaveBeenCalledWith(initialState)
  })

  it('should call all reducers in order', () => {
    reducers(initialState, action)
    expect(mainReducers.default).toHaveBeenCalled()
    expect(rootReducers.default).toHaveBeenCalled()
    expect(projectReducers.default).toHaveBeenCalled()
  })

  it('should call getHooks and setStore with merged store', () => {
    const hooks = hooksModule.getHooks()
    reducers(initialState, action)
    expect(hooks.setStore).toHaveBeenCalledWith(
      expect.objectContaining({
        existing: 'value',
        foo: 'bar',
        main: true,
        root: true,
        project: true,
      }),
    )
  })

  it('should return the final store', () => {
    const result = reducers(initialState, action)
    expect(result).toEqual(
      expect.objectContaining({
        foo: 'bar',
        main: true,
        root: true,
        project: true,
      }),
    )
  })
})
