import { initialData } from './model/root'
import { RootModel } from './model/root'
import { IAction } from './reducer/util/ActionType'

export interface Hooks {
  store: RootModel
  setStore: (store: RootModel) => void
  baseDispatch: React.Dispatch<IAction>
  setBaseDispatch: (dispacth: React.Dispatch<IAction>) => void
}

export const hooks: Hooks = {
  store: initialData,
  setStore: function (store: RootModel) {
    this.store = store
  },
  baseDispatch: () => {},
  setBaseDispatch: function (dispatch: React.Dispatch<IAction>) {
    this.baseDispatch = dispatch
  },
}
export const getHooks = () => hooks
