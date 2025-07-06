import { RootModel } from '../model/root'
import { IAction } from './util/ActionType'
import rootReducer from './root.reducers'
import mainReducer from './main.reducers'
import projectReducer from './project.reducers'
import { getHooks } from '..'

export const reducers = (state: RootModel, action: IAction): RootModel => {
  Object.freeze(state)
  let store: RootModel = { ...state }
  store = mainReducer(store, action)
  store = rootReducer(store, action)
  store = projectReducer(store, action)
  const hooks = getHooks()
  hooks.setStore({ ...hooks.store, ...store })
  return store
}
