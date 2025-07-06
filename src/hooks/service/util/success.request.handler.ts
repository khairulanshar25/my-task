import { getHooks } from '../..'
import { ActionType } from '../../reducer/util/ActionType'

export const requestHandler = (request: any) => {
  const { store, baseDispatch } = getHooks()
  baseDispatch({ type: ActionType.SET_IS_LOADING, data: { isLoading: true } })
  request.headers['Authorization'] = `Bearer ${store.token || ''}`
  return request
}
