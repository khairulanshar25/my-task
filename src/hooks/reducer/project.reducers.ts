import { RootModel } from '../model/root'
import { IAction } from './util/ActionType'
import { ActionType } from './util/ActionType'

const reducers = (store: RootModel, action: IAction): RootModel => {
  switch (action.type) {
    case ActionType.SET_PROJECTS:
      store.projects = action.data.projects
      break
    case ActionType.SET_TASKS:
      store.tasks = action.data.tasks
      break
    default:
      break
  }
  return store
}

export default reducers
