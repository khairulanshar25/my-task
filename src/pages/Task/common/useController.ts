import React, { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router'
import { useTheme, useMediaQuery } from '@mui/material'
import { useContext } from '../../../hooks/provider'
import useDispatcher from '../../../hooks/useDispatcher'
import { TaskStatus } from '../../../hooks/model/task'
import { getId } from '../../../utils/uuid'

const useController = () => {
  const [store] = useContext()
  const { dispatchTasks } = useDispatcher()
  const { pathname, ...rest } = useLocation()
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [autoKey, setAutoKey] = useState(getId())
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const statusList = [
    TaskStatus.NOT_STARTED,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETED,
    TaskStatus.CANCELLED,
  ]

  const tasksByStatus = React.useMemo(() => {
    const data = statusList.reduce(
      (grouped, status) => {
        grouped[status] =
          store.tasks?.filter(
            (task) => task.status === status && task.projectId === projectId,
          ) || []
        return grouped
      },
      {} as Record<string, typeof store.tasks>,
    )
    return data
  }, [store.tasks, projectId])

  // Update task status (move to another status)
  const updateTaskStatus = (taskId: string, status: string) => {
    const temp = JSON.parse(JSON.stringify(store.tasks))
    const index = temp?.findIndex((t) => t._id === taskId)
    if (index >= 0) {
      temp[index].status = status
      dispatchTasks(temp)
    }
    setAutoKey(getId())
  }
  const updateTaskPriority = (fromId: string, toId: string, status: string) => {
    const temp = JSON.parse(JSON.stringify(store.tasks))
    const fromIndex = temp?.findIndex((t) => t._id === fromId)
    const toIndex = temp?.findIndex((t) => t._id === toId)
    if (fromIndex >= 0 && toIndex >= 0) {
      const fromPriority = temp[fromIndex].priority
      const toPriority = temp[toIndex].priority
      temp[fromIndex].priority = toPriority
      temp[toIndex].priority = fromPriority
      temp[toIndex].status = status
      dispatchTasks(temp)
    }
    setAutoKey(getId())
  }
  const moveTask = React.useCallback(
    (fromTaskId: string, toTaskId: string, status: string) => {
      updateTaskPriority(fromTaskId, toTaskId, status)
    },
    [store.tasks, tasksByStatus, updateTaskPriority],
  )
  const onDropTask = React.useCallback(
    (taskId: string, toStatus: string) => {
      updateTaskStatus(taskId, toStatus)
    },
    [store.tasks, tasksByStatus, updateTaskStatus],
  )
  const onEditTask = React.useCallback(
    (taskId) => {
      navigate(`${pathname}/task/${taskId}/edit`)
    },
    [pathname],
  )
  const onDeleteTask = React.useCallback(
    (taskId: string) => {
      const temp = JSON.parse(JSON.stringify(store.tasks))
      const index = temp?.findIndex((t) => t._id === taskId)
      if (index >= 0) {
        temp.splice(index, 1)
        dispatchTasks(temp)
      }
    },
    [store.tasks, dispatchTasks],
  )
  return {
    projectId,
    store,
    updateTaskStatus,
    updateTaskPriority,
    theme,
    isMdUp,
    statusList,
    tasksByStatus,
    moveTask,
    onDropTask,
    autoKey,
    onEditTask,
    onDeleteTask,
  }
}

export default useController
