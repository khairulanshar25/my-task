import React from 'react'
import { ReactElement } from 'react'
import { RootModel, ComponentPropsDefault } from '../model/root'
import { IAction } from '../reducer/util/ActionType'
import { initialData } from '../model/root'
import { reducers } from '../reducer'
import { hooks } from '..'

export const AppContext = React.createContext<
  [RootModel, React.Dispatch<IAction>]
>([initialData, () => {}])
export const useContext = (): [RootModel, React.Dispatch<IAction>] =>
  React.useContext(AppContext)

const Provider: React.FC<ComponentPropsDefault> = (
  props: ComponentPropsDefault,
): ReactElement => {
  const [store, dispatch] = React.useReducer(reducers, initialData)
  React.useEffect(() => {
    hooks.setBaseDispatch(dispatch)
    hooks.setStore(store)
  }, [])
  return (
    <AppContext.Provider value={[store, dispatch]}>
      {props.children}
    </AppContext.Provider>
  )
}

export default Provider
