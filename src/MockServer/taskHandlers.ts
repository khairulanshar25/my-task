import { http, HttpResponse } from 'msw'
import { generateDummyTasks } from './dummy'
import { verifyJWT } from './token'
import { Task } from '../hooks/model/task'

interface TaskResponse {
  tasks?: Task[]
  error?: string
}

export const taskHandlers = [
  http.get<
    { projectId: string; numberofTasks: string; status: string },
    TaskResponse
  >(
    '/api/task/v1/:projectId/:numberofTasks/:status',
    async ({ request, params }) => {
      const token =
        request.headers.get('Authorization')?.replace('Bearer', '').trim() || ''
      const user = verifyJWT(token)
      if (user?._id) {
        const dummyTasks = generateDummyTasks(
          params.projectId,
          params.numberofTasks as unknown as number,
          params.status,
        )
        return HttpResponse.json({ tasks: dummyTasks }, { status: 200 })
      }
      return HttpResponse.json({ error: 'Invalid project id' }, { status: 400 })
    },
  ),
]
