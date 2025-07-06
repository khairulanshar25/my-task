import * as React from 'react'
import { Routes, Route } from 'react-router'
import ErrorBoundry from '../../components/ErrorBoundry'
import Loader from '../../components/Loader'
import useController from './common/useController'

const Project = React.lazy(() => import('../Project'))
const TaskRouting = React.lazy(() => import('../TaskRouting'))
const ProjectRouting = () => {
  const { pathname, navigate, rest, isReady } = useController()
  if (!isReady) {
    return <Loader />
  }
  return (
    <ErrorBoundry>
      <Routes>
        <Route path='/' element={<Project />} />
        <Route path='/:projectId' element={<TaskRouting />} />
      </Routes>
    </ErrorBoundry>
  )
}

export default React.memo(ProjectRouting)
