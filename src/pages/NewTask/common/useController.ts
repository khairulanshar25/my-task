import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useParams, useNavigate } from 'react-router'
import { useContext } from '../../../hooks/provider'
import useDispatcher from '../../../hooks/useDispatcher'
import { TaskStatus, TaskStatusType } from '../../../hooks/model/task'
import { getId } from '../../../utils/uuid'

const initialTask = {
  name: '',
  description: '',
  status: TaskStatus.NOT_STARTED as TaskStatusType,
  startedAt: null as Dayjs | string,
  targetEndAt: null as Dayjs | string,
  priority: 1,
  projectId: '',
}

const useController = () => {
  const [store] = useContext()
  const { dispatchTasks } = useDispatcher()
  const { projectId, taskId } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = React.useState({
    ...initialTask,
    projectId: projectId || '',
  })
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({})
  React.useEffect(() => {
    if (taskId) {
      const existingTask = store.tasks.find((t: any) => t._id === taskId)
      if (existingTask) {
        setTask({
          ...existingTask,
          startedAt: dayjs(existingTask.startedAt),
          targetEndAt: dayjs(existingTask.targetEndAt),
        })
      }
    }
  }, [store.tasks, projectId, taskId, navigate])

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setTask((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    [task],
  )
  const handleStartedAt = React.useCallback(
    (newValue) => {
      setTask((prev) => ({
        ...prev,
        startedAt: newValue,
      }))
    },
    [task],
  )
  const handleTargetEndAt = React.useCallback(
    (newValue) => {
      setTask((prev) => ({
        ...prev,
        targetEndAt: newValue,
      }))
    },
    [task],
  )

  const validate = () => {
    const errs: { [key: string]: string } = {}
    if (!task.name) errs.name = 'Name is required'
    if (!task.description) errs.description = 'Description is required'
    if (!task.startedAt) errs.startedAt = 'Started At is required'
    if (!task.targetEndAt) errs.targetEndAt = 'Target End At is required'
    if (!task.projectId) errs.projectId = 'Project ID is required'
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      // Convert date strings to Date objects
      const newTask = {
        ...task,
        startedAt: new Date(task.startedAt).toISOString(),
        targetEndAt: new Date(task.targetEndAt).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _id: getId(),
      }
      if (taskId) {
        onEditTask(taskId, newTask)
      } else {
        onSubmit(newTask)
      }
    }
  }
  const onSubmit = React.useCallback(
    (newTask: any) => {
      const temp = JSON.parse(JSON.stringify(store.tasks))
      newTask.priority = temp.length + 1
      temp.push(newTask)
      dispatchTasks(temp)
      navigate(`/project/${projectId}`)
    },
    [store.tasks, dispatchTasks],
  )

  const onEditTask = React.useCallback(
    (taskId: string, updatedTask: any) => {
      const temp = JSON.parse(JSON.stringify(store.tasks))
      const index = temp?.findIndex((t) => t._id === taskId)
      if (index >= 0) {
        temp[index] = {
          ...temp[index],
          ...updatedTask,
          updatedAt: new Date().toISOString(),
        }
        dispatchTasks(temp)
        navigate(`/project/${projectId}`)
      }
    },
    [store.tasks, dispatchTasks],
  )

  return {
    store,
    onSubmit,
    handleSubmit,
    validate,
    handleChange,
    errors,
    task,
    projectId,
    handleStartedAt,
    handleTargetEndAt,
    taskId,
  }
}

export default useController
