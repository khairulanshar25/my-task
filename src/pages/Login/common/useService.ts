import React from 'react'
import { postService } from '../../../hooks/service'
const controller: any = {
  login: undefined,
}
const useService = () => {
  const LoginService = React.useCallback(
    async (email: string, password: string) => {
      try {
        if (controller?.login) {
          controller?.login?.abort()
        }
        controller.Login = new AbortController()
        await postService(
          { path: '/v1/login', api: '/api/auth' },
          { email, password },
          { signal: controller?.login?.signal },
        )
      } catch (e) {
        console.error(e)
      }
    },
    [],
  )

  return {
    LoginService,
  }
}

export default useService
