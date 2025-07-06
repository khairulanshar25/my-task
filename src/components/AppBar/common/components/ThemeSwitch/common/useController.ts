import React from 'react'
import { useContext } from '../../../../../../hooks/provider'
import useDispatcher from '../../../../../../hooks/useDispatcher'

const useController = () => {
  const [store] = useContext()
  const { dispatchTheme } = useDispatcher()
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    store.theme as 'light' | 'dark',
  )
  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }, [])
  React.useEffect(() => {
    if (mode) {
      dispatchTheme(mode)
    }
  }, [mode])

  return {
    toggleColorMode,
    mode,
  }
}

export default useController
