import * as React from 'react'
import ErrorBoundry from '../../components/ErrorBoundry'
import { Routes, Route, useLocation, useNavigate } from 'react-router'

const Project = React.lazy(() => import('../Project'))
const Task = React.lazy(() => import('../Task'))
const ProjectRouting = () => {
  const { pathname, ...rest } = useLocation()
  const navigate = useNavigate()
  React.useEffect(() => {
    if (pathname === '/') {
      navigate('/project')
    }
  }, [pathname])

  return (
    <ErrorBoundry>
      <Routes>
        <Route path='/' element={<Project />} />
        <Route path='/:projectId' element={<Task />} />
      </Routes>
    </ErrorBoundry>
  )
}

export default React.memo(ProjectRouting)
