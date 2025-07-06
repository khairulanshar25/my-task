import React, { useState } from 'react'
import { useContext } from '../../../hooks/provider'
import useService from './useService'
import { FilterStatusType } from './interface'
import { Project } from '../../../hooks/model/project'
import useDispatcher from '../../../hooks/useDispatcher'

const useController = () => {
  const [store] = useContext()
  const { dispatchIsProjectLoading } = useDispatcher()
  const [status, setStatus] = useState<FilterStatusType>('all')
  const [isReady, setIsReady] = useState<boolean>(false)
  const { ProjectService } = useService()
  const CallApi = React.useRef<any>(null)
  const handleStatusChange = React.useCallback(
    (_event: React.MouseEvent<HTMLElement>, newStatus: FilterStatusType) => {
      if (newStatus !== null) {
        setStatus(newStatus)
      }
    },
    [],
  )
  React.useEffect(() => {
    if (!isReady && !store?.isProjectsLoading) {
      dispatchIsProjectLoading(true)
      setIsReady(true)
      if (CallApi.current) {
        clearTimeout(CallApi.current)
      }
      CallApi.current = setTimeout(() => {
        ProjectService()
      }, 100)
    }
  }, [isReady, store?.isProjectsLoading])
  const filteredProjects = React.useMemo(() => {
    let temp = JSON.parse(JSON.stringify(store?.projects || []))
    if (status !== 'all') {
      temp = temp.filter((project: any) => project.status === status)
    }
    return temp
  }, [store?.projects, status, name])
  const getRowId = React.useCallback((row: Project) => row._id, [])
  return {
    store,
    filteredProjects,
    getRowId,
    handleStatusChange,
    status,
  }
}

export default useController
