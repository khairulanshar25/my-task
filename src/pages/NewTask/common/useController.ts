import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useParams, useNavigate } from 'react-router'
import { useContext } from '../../../hooks/provider'
import useDispatcher from '../../../hooks/useDispatcher'
import { TaskStatus, TaskStatusType } from '../../../hooks/model/task'

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
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = React.useState({
    ...initialTask,
    projectId: projectId || '',
  })
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({})

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
        startedAt: new Date(task.startedAt),
        targetEndAt: new Date(task.targetEndAt),
        createdAt: new Date(),
        updatedAt: new Date(),
        _id: Math.random().toString(36).slice(2), // simple id
      }
      onSubmit?.(newTask)
      // Reset form
      setTask({ ...initialTask, projectId: task.projectId })
    }
  }
  const onSubmit = (newTask: any) => {
    const temp = JSON.parse(JSON.stringify(store.tasks))
    newTask.priority = temp.length + 1
    temp.push(newTask)
    dispatchTasks(temp)
    navigate(`/project/${projectId}`)
  }

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
  }
}

export default useController
