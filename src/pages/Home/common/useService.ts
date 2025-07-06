import React from 'react'
import { getService, postService } from '../../../hooks/service'

const controller: any = {
  extend: undefined,
  refreshToken: undefined,
  reLogin: undefined,
}
const useService = () => {
  const ExtendService = React.useCallback(async () => {
    try {
      if (controller.extend) {
        controller?.extend?.abort()
      }
      controller.extend = new AbortController()
      await getService(
        { path: '/v1/extend', api: '/api/auth' },
        { signal: controller?.extend?.signal },
      )
    } catch (e) {
      console.error(e)
    }
  }, [])
  const RefreshTokenService = React.useCallback(async () => {
    try {
      if (controller.refreshToken) {
        controller?.refreshToken?.abort()
      }
      controller.refreshToken = new AbortController()
      await getService(
        { path: '/v1/refresh_token', api: '/api/auth' },
        { signal: controller?.refreshToken?.signal },
      )
    } catch (e) {
      console.error(e)
    }
  }, [])
  const ReLoginService = React.useCallback(async (refreshToken: string) => {
    try {
      if (controller.reLogin) {
        controller?.reLogin?.abort()
      }
      controller.reLogin = new AbortController()
      await postService(
        { path: '/v1/relogin', api: '/api/auth' },
        { refreshToken },
        { signal: controller?.reLogin?.signal },
      )
    } catch (e) {
      console.error(e)
    }
  }, [])

  return {
    ExtendService,
    RefreshTokenService,
    ReLoginService,
  }
}

export default useService
