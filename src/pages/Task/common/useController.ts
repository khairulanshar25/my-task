import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useTheme, useMediaQuery } from '@mui/material'
import { useContext } from '../../../hooks/provider'
import useDispatcher from '../../../hooks/useDispatcher'
import { TaskStatus } from '../../../hooks/model/task'

const useController = () => {
  const [store] = useContext()
  const { dispatchTasks } = useDispatcher()
  const { projectId } = useParams()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const statusList = [
    TaskStatus.NOT_STARTED,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETED,
    TaskStatus.CANCELLED,
  ]

  const tasksByStatus = React.useMemo(() => {
    return statusList.reduce(
      (grouped, status) => {
        grouped[status] =
          store.tasks?.filter(
            (task) => task.status === status && task.projectId === projectId,
          ) || []
        return grouped
      },
      {} as Record<string, typeof store.tasks>,
    )
  }, [store.tasks, projectId])

  // Update task status (move to another status)
  const updateTaskStatus = (taskId: string, status: string) => {
    const temp = JSON.parse(JSON.stringify(store.tasks))
    const index = temp?.findIndex((t) => t._id === taskId)
    if (index >= 0) {
      temp[index].status = status
      dispatchTasks(temp)
    }
  }
  const updateTaskPriority = (
    taskId: string,
    status: string,
    fromIndex: number,
    toIndex: number,
  ) => {
    const temp = JSON.parse(JSON.stringify(store.tasks))
    const index = temp?.findIndex((t) => t._id === taskId)
    if (index >= 0) {
      // const fromPriority = temp[fromIndex].priority
      // const toPriority = temp[toIndex].priority
      // temp[fromIndex].priority = toPriority
      // temp[toIndex].priority = fromPriority
      dispatchTasks(temp)
    }
  }
  // Move task within the same status (priority)
  const moveTask = React.useCallback(
    (fromIndex: number, toIndex: number, status: string) => {
      if (fromIndex === toIndex) return
      updateTaskPriority(
        tasksByStatus[status][fromIndex]._id,
        status,
        fromIndex,
        toIndex,
      )
    },
    [store.tasks, tasksByStatus, updateTaskPriority],
  )
  // Move task to another status
  const onDropTask = React.useCallback(
    (taskId: string, toStatus: string) => {
      updateTaskStatus(taskId, toStatus)
    },
    [store.tasks, tasksByStatus, updateTaskStatus],
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
  }
}

export default useController
