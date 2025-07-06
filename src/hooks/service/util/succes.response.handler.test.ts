import { successHandler } from './succes.response.handler'
import { ActionType } from '../../reducer/util/ActionType'
import { getHooks } from '../..'

vi.mock('../..', () => ({
  getHooks: vi.fn(),
}))

describe('successHandler', () => {
  let baseDispatch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    baseDispatch = vi.fn()
    ;(getHooks as unknown as vi.Mock).mockReturnValue({ baseDispatch })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should dispatch SET_USER, SET_EXPIRED_IN, SET_TOKEN, SET_REFRESH_TOKEN, SET_ERRORMSG, and SET_IS_LOADING for /api/auth/ url with all fields', () => {
    const response = {
      config: { url: '/api/auth/login' },
      data: {
        user: { id: 1, name: 'test' },
        expiredIn: 1234,
        token: 'abc',
        refreshToken: 'def',
      },
    } as any

    const handler = successHandler({})
    const result = handler(response)

    expect(baseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_USER,
      data: { user: response.data.user },
    })
    expect(baseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_EXPIRED_IN,
      data: { expiredIn: response.data.expiredIn },
    })
    expect(baseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_TOKEN,
      data: { token: response.data.token },
    })
    expect(baseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_REFRESH_TOKEN,
      data: { refreshToken: response.data.refreshToken },
    })
    expect(baseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_ERRORMSG,
      data: { errorMsg: undefined },
    })
    expect(baseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_IS_LOADING,
      data: { isLoading: false },
    })
    expect(result).toBe(response)
  })

  it('should only dispatch SET_ERRORMSG and SET_IS_LOADING for non-auth url', () => {
    const response = {
      config: { url: '/api/other' },
      data: {},
    } as any

    const handler = successHandler({})
    const result = handler(response)

    expect(baseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_ERRORMSG,
      data: { errorMsg: undefined },
    })
    expect(baseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_IS_LOADING,
      data: { isLoading: false },
    })
    expect(baseDispatch).toHaveBeenCalledTimes(2)
    expect(result).toBe(response)
  })

  it('should not dispatch SET_USER if user is missing in data', () => {
    const response = {
      config: { url: '/api/auth/login' },
      data: {},
    } as any

    const handler = successHandler({})
    handler(response)

    expect(baseDispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: ActionType.SET_USER }),
    )
    expect(baseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_ERRORMSG,
      data: { errorMsg: undefined },
    })
    expect(baseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_IS_LOADING,
      data: { isLoading: false },
    })
  })
})
