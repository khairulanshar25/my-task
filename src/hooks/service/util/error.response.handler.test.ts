import { errorHandler } from './error.response.handler'
import { ActionType } from '../../reducer/util/ActionType'
import { getHooks } from '../..' // <-- Add this import

const mockBaseDispatch = vi.fn()

vi.mock('../..', () => ({
  getHooks: vi.fn(() => ({
    store: {},
    setStore: vi.fn(),
    baseDispatch: vi.fn(),
    setBaseDispatch: vi.fn(),
  })),
}))

describe('errorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getHooks.mockReturnValue({ baseDispatch: mockBaseDispatch })
  })

  it('dispatches error message from error.message and sets loading to false', async () => {
    const error = {
      message: 'Network Error',
      response: undefined,
    } as any

    await expect(errorHandler(error)).rejects.toEqual({ ...error })

    expect(mockBaseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_ERRORMSG,
      data: { errorMsg: 'Network Error' },
    })
    expect(mockBaseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_IS_LOADING,
      data: { isLoading: false },
    })
  })

  it('dispatches error message from error.response.data.message and sets loading to false', async () => {
    const error = {
      message: 'Some error',
      response: {
        data: {
          message: 'Detailed error message',
        },
      },
    } as any

    await expect(errorHandler(error)).rejects.toEqual({ ...error })

    expect(mockBaseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_ERRORMSG,
      data: { errorMsg: 'Detailed error message' },
    })
    expect(mockBaseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_IS_LOADING,
      data: { isLoading: false },
    })
  })

  it('handles error.response.data without message property', async () => {
    const error = {
      message: 'Fallback error',
      response: {
        data: {},
      },
    } as any

    await expect(errorHandler(error)).rejects.toEqual({ ...error })

    expect(mockBaseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_ERRORMSG,
      data: { errorMsg: undefined },
    })
    expect(mockBaseDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_IS_LOADING,
      data: { isLoading: false },
    })
  })
})
