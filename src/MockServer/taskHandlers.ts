import { http, HttpResponse } from 'msw'
import { generateDummyTasks } from './dummy'
import { verifyJWT } from './token'
import { Task } from '../hooks/model/task'

interface TaskResponse {
  tasks?: Task[]
  error?: string
}

export const taskHandlers = [
  http.get<never, TaskResponse>(
    '/api/task/v1/:projectId/:numberofTasks/:status',
    async ({ request, params, ...rest }) => {
      const token =
        request.headers.get('Authorization')?.replace('Bearer', '').trim() || ''
      const user = verifyJWT(token)
      if (user?._id) {
        const dummyTasks = generateDummyTasks(
          params.projectId,
          params.numberofTasks,
          params.status,
        )
        return HttpResponse.json({ tasks: dummyTasks }, { status: 200 })
      }
      return HttpResponse.json({ error: 'Invalid project id' }, { status: 400 })
    },
  ),
]
