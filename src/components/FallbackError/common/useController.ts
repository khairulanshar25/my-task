import React from 'react'
import { ErrorState } from '../../../hooks/model/root'
//import { putService } from '../../../hooks/service'

const useController = (props: ErrorState) => {
  React.useEffect(() => {
    // props.error &&
    //   putService(
    //     { api: '/api/elastics', path: '/v1/error/ui' },
    //     { ...props.error },
    //   )
  }, [props.error])

  return {}
}

export default useController
