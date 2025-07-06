import { RootModel } from '../model/root'
import { IAction } from './util/ActionType'
import { ActionType } from './util/ActionType'

const reducers = (store: RootModel, action: IAction): RootModel => {
  switch (action.type) {
    case ActionType.SET_ERRORMSG:
      store.errorMsg = action.data.errorMsg
      break
    case ActionType.SET_IS_LOADING:
      store.isLoading = action.data.isLoading
      break
    case ActionType.SET_SHOW_ALERT:
      store.showAlert = action.data.showAlert
      break
    case ActionType.SET_THEME:
      store.theme = action.data.theme
      //put the stored theme in localStorage
      localStorage.setItem('theme', store.theme || 'dark')
      break
    case ActionType.SET_THEME_CONFIG:
      store.themeConfig = action.data.themeConfig
      break
    default:
      break
  }
  return store
}

export default reducers
