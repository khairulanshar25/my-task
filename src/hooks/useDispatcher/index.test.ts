/**
 * @vitest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { useContext } from '../provider'
import { ActionType } from '../reducer/util/ActionType'
import useDispatcher from './index'

// Mock dependencies
vi.mock('../provider', () => ({
  useContext: vi.fn(),
}))

describe('useDispatcher', () => {
  let dispatchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    dispatchMock = vi.fn()
    // @ts-ignore
    useContext.mockReturnValue([{}, dispatchMock])
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('dispatchTheme dispatches correct action', () => {
    const { result } = renderHook(() => useDispatcher())
    act(() => {
      result.current.dispatchTheme('dark')
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ActionType.SET_THEME,
      data: { theme: 'dark' },
    })
  })

  it('dispatchIsLoading dispatches correct action', () => {
    const { result } = renderHook(() => useDispatcher())
    act(() => {
      result.current.dispatchIsLoading(true)
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ActionType.SET_IS_LOADING,
      data: { isLoading: true },
    })
  })

  it('dispatchClear dispatches correct action', () => {
    const { result } = renderHook(() => useDispatcher())
    act(() => {
      result.current.dispatchClear()
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ActionType.CLEAR,
      data: { user: undefined },
    })
  })

  it('dispatchUser dispatches correct action', () => {
    const { result } = renderHook(() => useDispatcher())
    const user = { id: 1, name: 'Test' }
    act(() => {
      result.current.dispatchUser(user)
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ActionType.SET_USER,
      data: { user },
    })
  })

  it('dispatchThemeConfig dispatches correct action', () => {
    const { result } = renderHook(() => useDispatcher())
    const themeConfig = { color: 'blue' }
    act(() => {
      result.current.dispatchThemeConfig(themeConfig)
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ActionType.SET_THEME_CONFIG,
      data: { themeConfig },
    })
  })

  it('dispatchShowAlert dispatches correct action', () => {
    const { result } = renderHook(() => useDispatcher())
    act(() => {
      result.current.dispatchShowAlert(true)
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ActionType.SET_SHOW_ALERT,
      data: { showAlert: true },
    })
  })

  it('dispatchRoot dispatches correct action', () => {
    const { result } = renderHook(() => useDispatcher())
    const shadowRootElement = document.createElement('div')
    const shadowContainer = document.createElement('div')
    act(() => {
      result.current.dispatchRoot(shadowRootElement, shadowContainer)
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ActionType.SET_ROOT,
      data: { shadowRootElement, shadowContainer },
    })
  })

  it('dispatchProjects dispatches correct action', () => {
    const { result } = renderHook(() => useDispatcher())
    const projects = [{ id: 1 }, { id: 2 }]
    act(() => {
      result.current.dispatchProjects(projects)
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ActionType.SET_PROJECTS,
      data: { projects },
    })
  })

  it('dispatchTasks dispatches correct action', () => {
    const { result } = renderHook(() => useDispatcher())
    const tasks = [{ id: 1 }, { id: 2 }]
    act(() => {
      result.current.dispatchTasks(tasks)
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ActionType.SET_TASKS,
      data: { tasks },
    })
  })
})
