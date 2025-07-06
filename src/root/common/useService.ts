import React from 'react'
import { getService } from '../../hooks/service'
const controller: any = {
  validate: undefined,
}

const useService = () => {
  const ValidateService = React.useCallback(async () => {
    try {
      if (controller?.validate) {
        controller?.validate?.abort()
      }
      controller.validate = new AbortController()
      await getService(
        { path: '/v1/validate', api: '/api/auth' },
        { signal: controller?.validate?.signal },
      )
    } catch (e) {
      console.error(e)
    }
  }, [])

  return {
    ValidateService,
  }
}

export default useService
