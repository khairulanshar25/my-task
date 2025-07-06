import React, { useState } from 'react'
import { useContext } from '../../../hooks/provider'
import useService from './useService'
import { FilterStatusType } from './interface'
import { Project } from '../../../hooks/model/project'

const useController = () => {
  const [store] = useContext()
  const [status, setStatus] = useState<FilterStatusType>('all')
  const handleStatusChange = React.useCallback(
    (_event: React.MouseEvent<HTMLElement>, newStatus: FilterStatusType) => {
      if (newStatus !== null) {
        setStatus(newStatus)
      }
    },
    [],
  )
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
