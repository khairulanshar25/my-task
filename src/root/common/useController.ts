import React from 'react'
import { useContext } from '../../hooks/provider'
import useService from './useService'

const useController = () => {
  const [store] = useContext()
  const { ValidateService } = useService()
  const [ready, setReady] = React.useState(false)
  React.useEffect(() => {
    if (!ready) {
      ValidateService()
        .catch((error) => {
          console.error('Validation failed:', error)
        })
        .finally(() => {
          setReady(true)
        })
    }
  }, [ready])

  return {
    store,
    ready,
  }
}

export default useController
