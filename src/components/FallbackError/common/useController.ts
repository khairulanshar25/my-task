import React from 'react'
import { ErrorState } from '../../../hooks/model/root'

const useController = (props: ErrorState) => {
  React.useEffect(() => {
    //send error to server or log it
  }, [props.error])

  return {}
}

export default useController
