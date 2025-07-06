import { RootModel } from '../model/root'
import { IAction } from './util/ActionType'
import { initialData } from '../model/root'
import { ActionType } from './util/ActionType'

const reducers = (store: RootModel, action: IAction): RootModel => {
  switch (action.type) {
    case ActionType.SET_EXPIRED_IN:
      store.expiredIn = action.data.expiredIn
      break
    case ActionType.SET_USER:
      store.user = action.data.user
      break
    case ActionType.SET_ROOT:
      store.shadowContainer = action.data.shadowContainer
      store.shadowRootElement = action.data.shadowRootElement
      break
    case ActionType.SET_TOKEN:
      store.token = action.data.token
      store.refreshToken = undefined
      // Store the token in localStorage
      localStorage.setItem('token', store.token || '')
      break
    case ActionType.SET_REFRESH_TOKEN:
      store.refreshToken = action.data.refreshToken
      break
    case ActionType.CLEAR:
      store = initialData
      // Clear localStorage
      localStorage.removeItem('token')
      break
    default:
      break
  }
  return store
}

export default reducers
