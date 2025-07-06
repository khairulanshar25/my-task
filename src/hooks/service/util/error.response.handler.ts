import { AxiosError } from 'axios'
import { ActionType } from '../../reducer/util/ActionType'
import { getHooks } from '../..'

export const errorHandler = (error: AxiosError): unknown => {
  const { baseDispatch } = getHooks()
  let msg: string = error.message
  if (error.response && error.response.data) {
    const data: any = error.response.data
    msg = data.message
  }
  baseDispatch({ type: ActionType.SET_ERRORMSG, data: { errorMsg: msg } })
  baseDispatch({ type: ActionType.SET_IS_LOADING, data: { isLoading: false } })
  return Promise.reject({ ...error })
}
