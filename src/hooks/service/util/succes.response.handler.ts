import { AxiosResponse } from 'axios'
import { ActionType } from '../../reducer/util/ActionType'
import { getHooks } from '../..'

export const successHandler =
  (_service: unknown) =>
  (response: AxiosResponse): AxiosResponse => {
    const { baseDispatch } = getHooks()
    if (response.config.url?.includes('/api/auth/')) {
      if (response?.data?.user) {
        baseDispatch({
          type: ActionType.SET_USER,
          data: { user: response?.data?.user },
        })
      }
      if (response?.data?.expiredIn) {
        baseDispatch({
          type: ActionType.SET_EXPIRED_IN,
          data: { expiredIn: response?.data?.expiredIn },
        })
      }
      if (response?.data?.token) {
        baseDispatch({
          type: ActionType.SET_TOKEN,
          data: { token: response?.data?.token },
        })
      }
      if (response?.data?.refreshToken) {
        baseDispatch({
          type: ActionType.SET_REFRESH_TOKEN,
          data: { refreshToken: response?.data?.refreshToken },
        })
      }
    }
    baseDispatch({
      type: ActionType.SET_ERRORMSG,
      data: { errorMsg: undefined },
    })
    baseDispatch({
      type: ActionType.SET_IS_LOADING,
      data: { isLoading: false },
    })
    return response
  }
