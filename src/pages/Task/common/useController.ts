import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useContext } from '../../../hooks/provider'

const useController = () => {
  const [store] = useContext()
  const { projectId } = useParams()
  return {
    projectId,
    store,
  }
}

export default useController
