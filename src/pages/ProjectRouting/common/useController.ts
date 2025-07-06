import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useService from './useService'

const useController = () => {
  const { pathname, ...rest } = useLocation()
  const [isReady, setIsReady] = useState<boolean>(false)
  const navigate = useNavigate()
  const { ProjectService } = useService()
  const CallApi = React.useRef<any>(null)
  React.useEffect(() => {
    if (!isReady) {
      setIsReady(true)
      if (CallApi.current) {
        clearTimeout(CallApi.current)
      }
      CallApi.current = setTimeout(() => {
        ProjectService()
      }, 100)
    }
  }, [isReady])
  React.useEffect(() => {
    if (pathname === '/') {
      navigate('/project')
    }
  }, [pathname])
  return {
    pathname,
    navigate,
    rest,
    isReady,
  }
}

export default useController
