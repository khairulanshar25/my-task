import { http, HttpResponse } from 'msw'
import { dummyProjects } from './dummy'
import { verifyJWT } from './token'
import { Project } from '../hooks/model/project'

interface ProjectResponse {
  projects?: Project[]
  error?: string
}

export const projectHandlers = [
  http.get<never, ProjectResponse>(
    '/api/project/v1/lists',
    async ({ request }) => {
      const token =
        request.headers.get('Authorization')?.replace('Bearer', '').trim() || ''
      const user = verifyJWT(token)
      if (user?._id) {
        // get the projects for the user from dummyProjects
        const projects = dummyProjects.filter(
          (p: Project) => p.ownerId === user._id,
        )
        return HttpResponse.json<ProjectResponse>({ projects }, { status: 200 })
      } else {
        return HttpResponse.json({ error: 'Invalid user' }, { status: 401 })
      }
    },
  ),
]
