import reducers from './root.reducers'
import { ActionType, IAction } from './util/ActionType'
import { initialData, RootModel } from '../model/root'

describe('reducers', () => {
  let store: RootModel

  beforeEach(() => {
    store = {
      expiredIn: 0,
      user: null,
      shadowContainer: null,
      shadowRootElement: null,
      token: undefined,
      refreshToken: undefined,
    }
    // Mock localStorage
    Object.defineProperty(global, 'localStorage', {
      value: {
        setItem: vi.fn(),
        removeItem: vi.fn(),
        getItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    })
  })

  it('should set expiredIn on SET_EXPIRED_IN', () => {
    const action: IAction = {
      type: ActionType.SET_EXPIRED_IN,
      data: { expiredIn: 123 },
    }
    const result = reducers({ ...store }, action)
    expect(result.expiredIn).toBe(123)
  })

  it('should set user on SET_USER', () => {
    const user = { id: 1, name: 'Test' }
    const action: IAction = {
      type: ActionType.SET_USER,
      data: { user },
    }
    const result = reducers({ ...store }, action)
    expect(result.user).toEqual(user)
  })

  it('should set shadowContainer and shadowRootElement on SET_ROOT', () => {
    const action: IAction = {
      type: ActionType.SET_ROOT,
      data: { shadowContainer: 'container', shadowRootElement: 'rootElem' },
    }
    const result = reducers({ ...store }, action)
    expect(result.shadowContainer).toBe('container')
    expect(result.shadowRootElement).toBe('rootElem')
  })

  it('should set token, clear refreshToken, and store token in localStorage on SET_TOKEN', () => {
    const action: IAction = {
      type: ActionType.SET_TOKEN,
      data: { token: 'abc123' },
    }
    const result = reducers({ ...store, refreshToken: 'old' }, action)
    expect(result.token).toBe('abc123')
    expect(result.refreshToken).toBeUndefined()
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'abc123')
  })

  it('should set refreshToken on SET_REFRESH_TOKEN', () => {
    const action: IAction = {
      type: ActionType.SET_REFRESH_TOKEN,
      data: { refreshToken: 'refresh123' },
    }
    const result = reducers({ ...store }, action)
    expect(result.refreshToken).toBe('refresh123')
  })

  it('should reset store and remove token from localStorage on CLEAR', () => {
    const action: IAction = { type: ActionType.CLEAR, data: {} }
    const result = reducers({ ...store, token: 'abc', user: { id: 1 } }, action)
    expect(result).toBe(initialData)
    expect(localStorage.removeItem).toHaveBeenCalledWith('token')
  })

  it('should return store unchanged for unknown action', () => {
    const action: IAction = { type: 'UNKNOWN' as any, data: {} }
    const result = reducers({ ...store }, action)
    expect(result).toEqual(store)
  })
})
