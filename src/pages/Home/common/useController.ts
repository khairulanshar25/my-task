import React from 'react'
import { useContext } from '../../../hooks/provider'
import useService from './useService'
import { getHooks } from '../../../hooks'
import useDispatcher from '../../../hooks/useDispatcher'
import { get_refresh_token } from '../../../MockServer/constant'

const useController = () => {
  const [store] = useContext()
  const { ExtendService, RefreshTokenService, ReLoginService } = useService()
  const { dispatchClear } = useDispatcher()
  const [showtimeout, setShowtimeout] = React.useState(false)
  const expiredInRef = React.useRef<any>(null)
  const mouseRef = React.useRef<any>(null)
  const mouseMove = React.useCallback(() => {
    if (mouseRef.current) {
      clearTimeout(mouseRef.current)
    }
    //@ts-ignore
    mouseRef.current = setTimeout(() => {
      const { store: store_ } = getHooks()
      if (
        store_.expiredIn &&
        store_.expiredIn - new Date().getTime() > get_refresh_token &&
        !store_.refreshToken
      ) {
        ExtendService()
      }
    }, 5000)
  }, [])
  const logout = React.useCallback(() => {
    dispatchClear()
    setShowtimeout(false)
    clearTimeout(expiredInRef.current)
    clearTimeout(mouseRef.current)
    removeEventListener('mousemove', mouseMove)
  }, [])
  const continueSession = React.useCallback(async () => {
    await ReLoginService(store.refreshToken || '')
    setShowtimeout(false)
  }, [store.refreshToken])
  React.useEffect(() => {
    addEventListener('mousemove', mouseMove)
    return () => {
      clearTimeout(expiredInRef.current)
      clearTimeout(mouseRef.current)
      removeEventListener('mousemove', mouseMove)
    }
  }, [mouseMove])
  React.useEffect(() => {
    if (store.expiredIn && store.expiredIn > new Date().getTime()) {
      if (expiredInRef.current) {
        clearTimeout(expiredInRef.current)
      }
      if (store.refreshToken) {
        expiredInRef.current = setTimeout(() => {
          logout()
        }, store.expiredIn - new Date().getTime())
      } else {
        expiredInRef.current = setTimeout(
          async () => {
            await RefreshTokenService()
            setShowtimeout(true)
          },
          store.expiredIn - new Date().getTime() - get_refresh_token,
        )
      }
    }
  }, [store.expiredIn, store.refreshToken])
  return {
    store,
    continueSession,
    showtimeout,
    logout,
  }
}

export default useController
