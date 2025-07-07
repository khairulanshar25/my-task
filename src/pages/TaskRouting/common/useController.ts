import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router'
import { useContext } from '../../../hooks/provider'
import useService from './useService'
import { useNavigate } from 'react-router'

const useController = () => {
  const [store] = useContext()
  const { pathname, ...rest } = useLocation()
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { TaskService } = useService()
  const [isReady, setIsReady] = useState<boolean>(false)
  const CallApi = React.useRef<any>(null)
  React.useEffect(() => {
    if (projectId && !isReady) {
      const project = store.projects.find((p: any) => p._id === projectId)
      if (!project) {
        navigate(`/project`)
        return
      }
      if (CallApi.current) {
        clearTimeout(CallApi.current)
      }
      CallApi.current = setTimeout(() => {
        TaskService(project).finally(() => {
          setIsReady(true)
        })
      }, 100)
    }
  }, [projectId, store.projects, isReady])
  const pathnames = React.useMemo(
    () => pathname.split('/').filter((x) => x),
    [pathname],
  )
  const hideNewTask = React.useMemo(
    () =>
      pathnames[pathnames.length - 1] === 'new' ||
      pathnames[pathnames.length - 1] === 'edit',
    [pathname],
  )
  return {
    store,
    pathname,
    rest,
    pathnames,
    projectId,
    isReady,
    hideNewTask,
  }
}

export default useController
