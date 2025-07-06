import { requestHandler } from './success.request.handler'
import { getHooks } from '../..'
import { ActionType } from '../../reducer/util/ActionType'

vi.mock('../..', () => ({
  getHooks: vi.fn(),
}))

describe('requestHandler', () => {
  let baseDispatch: ReturnType<typeof vi.fn>
  let store: { token?: string }

  beforeEach(() => {
    baseDispatch = vi.fn()
    store = { token: 'test-token' }
    ;(getHooks as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      store,
      baseDispatch,
    })
  })

  it('should set isLoading to true via baseDispatch', () => {
    const request = { headers: {} }
    requestHandler(request)
    expect(baseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_IS_LOADING,
      data: { isLoading: true },
    })
  })

  it('should set Authorization header with token', () => {
    const request = { headers: {} }
    const result = requestHandler(request)
    expect(result.headers['Authorization']).toBe('Bearer test-token')
  })

  it('should set Authorization header to empty string if token is missing', () => {
    store.token = undefined
    const request = { headers: {} }
    const result = requestHandler(request)
    expect(result.headers['Authorization']).toBe('Bearer ')
  })

  it('should return the modified request object', () => {
    const request = { headers: { foo: 'bar' } }
    const result = requestHandler(request)
    expect(result).toBe(request)
    expect(result.headers['Authorization']).toBe('Bearer test-token')
    expect(result.headers['foo']).toBe('bar')
  })
})
