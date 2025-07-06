import React from 'react'
import { getService } from '../../../hooks/service'
import useDispatcher from '../../../hooks/useDispatcher'
const controller: any = {
  project: undefined,
}
const useService = () => {
  const { dispatchProjects } = useDispatcher()
  const ProjectService = React.useCallback(async () => {
    try {
      if (controller?.project) {
        controller?.project?.abort()
      }
      controller.Login = new AbortController()
      const response = await getService(
        { path: '/v1/lists', api: '/api/project' },
        { signal: controller?.project?.signal },
      )
      if (response?.data?.projects?.length) {
        dispatchProjects(response.data.projects)
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  return {
    ProjectService,
  }
}

export default useService
