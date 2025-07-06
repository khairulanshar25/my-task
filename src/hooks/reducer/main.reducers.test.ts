import reducers from './main.reducers'
import { ActionType } from './util/ActionType'
import { RootModel } from '../model/root'

describe('reducers', () => {
  let initialState: RootModel

  beforeEach(() => {
    initialState = {
      errorMsg: '',
      isLoading: false,
      showAlert: false,
      theme: 'light',
      themeConfig: {},
    }
  })

  it('should handle SET_ERRORMSG', () => {
    const action = {
      type: ActionType.SET_ERRORMSG,
      data: { errorMsg: 'An error occurred' },
    }
    const result = reducers({ ...initialState }, action)
    expect(result.errorMsg).toBe('An error occurred')
  })

  it('should handle SET_IS_LOADING', () => {
    const action = {
      type: ActionType.SET_IS_LOADING,
      data: { isLoading: true },
    }
    const result = reducers({ ...initialState }, action)
    expect(result.isLoading).toBe(true)
  })

  it('should handle SET_SHOW_ALERT', () => {
    const action = {
      type: ActionType.SET_SHOW_ALERT,
      data: { showAlert: true },
    }
    const result = reducers({ ...initialState }, action)
    expect(result.showAlert).toBe(true)
  })

  describe('SET_THEME', () => {
    const originalSetItem = global.localStorage?.setItem

    beforeEach(() => {
      // Mock localStorage
      ;(global as any).localStorage = {
        setItem: vi.fn(),
      }
    })

    afterEach(() => {
      // Restore localStorage
      ;(global as any).localStorage.setItem = originalSetItem
    })

    it('should handle SET_THEME and set localStorage', () => {
      const action = {
        type: ActionType.SET_THEME,
        data: { theme: 'dark' },
      }
      const result = reducers({ ...initialState }, action)
      expect(result.theme).toBe('dark')
      expect(global.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
    })

    it('should set default theme to dark if theme is undefined', () => {
      const action = {
        type: ActionType.SET_THEME,
        data: { theme: undefined },
      }
      const result = reducers({ ...initialState }, action)
      expect(result.theme).toBe(undefined)
      expect(global.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
    })
  })

  it('should handle SET_THEME_CONFIG', () => {
    const themeConfig = { color: 'blue' }
    const action = {
      type: ActionType.SET_THEME_CONFIG,
      data: { themeConfig },
    }
    const result = reducers({ ...initialState }, action)
    expect(result.themeConfig).toEqual(themeConfig)
  })

  it('should return state unchanged for unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      data: {},
    } as any
    const result = reducers({ ...initialState }, action)
    expect(result).toEqual(initialState)
  })
})
