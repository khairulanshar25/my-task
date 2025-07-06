import React from 'react'
import { useContext } from '../provider'
import { ActionType } from '../reducer/util/ActionType'
import { User } from '../model/root'

const useDispatcher = () => {
  const [, dispacth] = useContext()
  const dispatchRoot = React.useCallback(
    (
      shadowRootElement: HTMLElement,
      shadowContainer: ShadowRoot | HTMLElement,
    ) =>
      dispacth({
        type: ActionType.SET_ROOT,
        data: { shadowRootElement, shadowContainer },
      }),
    [],
  )
  const dispatchIsLoading = React.useCallback(
    (isLoading: boolean) =>
      dispacth({ type: ActionType.SET_IS_LOADING, data: { isLoading } }),
    [],
  )
  const dispatchShowAlert = React.useCallback(
    (showAlert: boolean) =>
      dispacth({ type: ActionType.SET_SHOW_ALERT, data: { showAlert } }),
    [],
  )
  const dispatchTheme = React.useCallback(
    (theme: 'dark' | 'light') =>
      dispacth({ type: ActionType.SET_THEME, data: { theme } }),
    [],
  )
  const dispatchThemeConfig = React.useCallback(
    (themeConfig: Object) =>
      dispacth({ type: ActionType.SET_THEME_CONFIG, data: { themeConfig } }),
    [],
  )

  const dispatchUser = React.useCallback(
    (user?: User) => dispacth({ type: ActionType.SET_USER, data: { user } }),
    [],
  )

  const dispatchClear = React.useCallback(
    () => dispacth({ type: ActionType.CLEAR, data: { user: undefined } }),
    [],
  )
  const dispatchProjects = React.useCallback(
    (projects: any[]) =>
      dispacth({ type: ActionType.SET_PROJECTS, data: { projects } }),
    [],
  )
  const dispatchTasks = React.useCallback(
    (tasks: any[]) => dispacth({ type: ActionType.SET_TASKS, data: { tasks } }),
    [],
  )

  return {
    dispatchTheme,
    dispatchIsLoading,
    dispatchClear,
    dispatchUser,
    dispatchThemeConfig,
    dispatchShowAlert,
    dispatchRoot,
    dispatchProjects,
    dispatchTasks,
  }
}

export default useDispatcher
