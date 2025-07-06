import reducers from './project.reducers'
import { ActionType } from './util/ActionType'
import { RootModel } from '../model/root'
import { IAction } from './util/ActionType'

describe('project.reducers', () => {
  let initialState: RootModel

  beforeEach(() => {
    initialState = {
      projects: [],
      tasks: [],
      // add other RootModel properties if needed
    }
  })

  it('should set projects when ActionType.SET_PROJECTS is dispatched', () => {
    const projects = [{ id: 1, name: 'Project 1' }]
    const action: IAction = {
      type: ActionType.SET_PROJECTS,
      data: { projects },
    }
    const result = reducers({ ...initialState }, action)
    expect(result.projects).toEqual(projects)
  })

  it('should set tasks when ActionType.SET_TASKS is dispatched', () => {
    const tasks = [{ id: 1, title: 'Task 1' }]
    const action: IAction = {
      type: ActionType.SET_TASKS,
      data: { tasks },
    }
    const result = reducers({ ...initialState }, action)
    expect(result.tasks).toEqual(tasks)
  })

  it('should return the same state for unknown action types', () => {
    const action: IAction = {
      type: 'UNKNOWN_ACTION' as any,
      data: {},
    }
    const result = reducers({ ...initialState }, action)
    expect(result).toEqual(initialState)
  })
})
