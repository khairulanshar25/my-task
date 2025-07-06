import { http, HttpResponse } from 'msw'
import { dummyUsers } from './dummy'
import { User } from '../hooks/model/root'
import { createJWT, extendActionToken, verifyJWT } from './token'

interface LoginPayload {
  email: string
  password: string
}

interface ReLoginPayload {
  refreshToken: string
}

interface LoginResponse {
  token?: string
  refreshToken?: string
  user?: User
  error?: string
  expiredIn?: number
}

export const authHandlers = [
  http.post<never, LoginPayload, LoginResponse>(
    '/api/auth/v1/login',
    async ({ request }) => {
      const { email, password } = await request.json()
      const user = dummyUsers.find(
        (u) => u.email === email && u.password === password,
      )
      if (user) {
        const token = createJWT(user)
        const userPayload = verifyJWT(token)
        return HttpResponse.json<LoginResponse>(
          { user: userPayload, token, expiredIn: userPayload.exp },
          { status: 200 },
        )
      } else {
        return HttpResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 },
        )
      }
    },
  ),
  http.get<never, LoginResponse>(
    '/api/auth/v1/validate',
    async ({ request }) => {
      const token =
        request.headers.get('Authorization')?.replace('Bearer', '').trim() || ''
      const user = verifyJWT(token)
      if (user?.email) {
        return HttpResponse.json<LoginResponse>(
          { user, token: createJWT(user), expiredIn: user.exp },
          { status: 200 },
        )
      } else {
        return HttpResponse.json({ error: 'Invalid token' }, { status: 401 })
      }
    },
  ),
  http.get<never, LoginResponse>('/api/auth/v1/extend', async ({ request }) => {
    const token =
      request.headers.get('Authorization')?.replace('Bearer', '').trim() || ''
    const user = verifyJWT(token)
    if (user?.email) {
      const token = extendActionToken(user)
      const userPayload = verifyJWT(token)
      return HttpResponse.json<LoginResponse>(
        { token, expiredIn: userPayload.exp },
        { status: 200 },
      )
    } else {
      return HttpResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
  }),
  http.get<never, LoginResponse>(
    '/api/auth/v1/refresh_token',
    async ({ request }) => {
      const token =
        request.headers.get('Authorization')?.replace('Bearer', '').trim() || ''
      const user = verifyJWT(token)
      if (user?.email) {
        const refreshToken = createJWT(user, 'refresh_token')
        const userPayload = verifyJWT(refreshToken, 'refresh_token')
        return HttpResponse.json<LoginResponse>(
          { refreshToken, expiredIn: userPayload.exp },
          { status: 200 },
        )
      } else {
        return HttpResponse.json({ error: 'Invalid token' }, { status: 401 })
      }
    },
  ),
  http.post<never, ReLoginPayload, LoginResponse>(
    '/api/auth/v1/relogin',
    async ({ request }) => {
      const { refreshToken } = await request.json()
      const user = verifyJWT(refreshToken, 'refresh_token')
      if (user) {
        const token = createJWT(user)
        const userPayload = verifyJWT(token)
        return HttpResponse.json<LoginResponse>(
          {
            user: userPayload,
            token: createJWT(user),
            expiredIn: userPayload.exp,
          },
          { status: 200 },
        )
      } else {
        return HttpResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 },
        )
      }
    },
  ),
]
