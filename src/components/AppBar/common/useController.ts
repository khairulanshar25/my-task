import React from 'react'
import { useContext } from '../../../hooks/provider'
import useDispatcher from '../../../hooks/useDispatcher'

const useController = () => {
  const [store] = useContext()
  const { dispatchClear } = useDispatcher()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = React.useMemo(() => Boolean(anchorEl), [anchorEl])
  const auth = React.useMemo(() => !!store?.user?.email, [store?.user])
  const handleMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    },
    [],
  )
  const handleClose = React.useCallback(() => {
    setAnchorEl(null)
  }, [])
  const handleLogout = React.useCallback(() => {
    handleClose()
    dispatchClear()
  }, [handleClose])
  React.useEffect(() => {
    if (!auth) {
      handleLogout()
    }
  }, [auth])
  return {
    handleClose,
    handleMenu,
    store,
    open,
    auth,
    anchorEl,
    handleLogout,
  }
}

export default useController
