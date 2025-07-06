import React from 'react'
import { getService } from '../../../hooks/service'
import useDispatcher from '../../../hooks/useDispatcher'
import { Project } from '../../../hooks/model/project'

const controller: any = {
  task: undefined,
}
const useService = () => {
  const { dispatchTasks } = useDispatcher()
  const TaskService = React.useCallback(async (project: Project) => {
    try {
      if (controller?.task) {
        controller?.task?.abort()
      }
      controller.Login = new AbortController()
      const response = await getService(
        {
          path: `/v1/${project._id}/${project.numberofTasks}/${project.status}`,
          api: '/api/task',
        },
        { signal: controller?.task?.signal },
      )
      if (response?.data?.tasks?.length) {
        dispatchTasks(response.data.tasks)
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  return {
    TaskService,
  }
}

export default useService
