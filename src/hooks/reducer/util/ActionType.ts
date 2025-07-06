import { RootModel } from '../../model/root'

export type ActionType =
  | 'SET_EXPIRED_IN'
  | 'SET_ERRORMSG'
  | 'CLEAR'
  | 'SET_USER'
  | 'SET_IS_LOADING'
  | 'SET_SHOW_ALERT'
  | 'SET_THEME'
  | 'SET_THEME_CONFIG'
  | 'SET_TOKEN'
  | 'SET_REFRESH_TOKEN'
  | 'SET_PROJECTS'
  | 'SET_TASKS'
  | 'SET_ROOT'

export interface IAction {
  type: ActionType
  data: RootModel
}

export const ActionType = {
  SET_EXPIRED_IN: 'SET_EXPIRED_IN',
  SET_ERRORMSG: 'SET_ERRORMSG',
  CLEAR: 'CLEAR',
  SET_USER: 'SET_USER',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_SHOW_ALERT: 'SET_SHOW_ALERT',
  SET_THEME: 'SET_THEME',
  SET_THEME_CONFIG: 'SET_THEME_CONFIG',
  SET_ROOT: 'SET_ROOT',
  SET_TOKEN: 'SET_TOKEN',
  SET_REFRESH_TOKEN: 'SET_REFRESH_TOKEN',
  SET_PROJECTS: 'SET_PROJECTS',
  SET_TASKS: 'SET_TASKS',
} as const
