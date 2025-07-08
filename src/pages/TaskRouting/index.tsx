import * as React from 'react'
import ErrorBoundry from '../../components/ErrorBoundry'
import Root, { PREFIX, classes } from './common/style'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Link as RouterLink, Routes, Route } from 'react-router'
import Loader from '../../components/Loader'
import useController from './common/useController'

const Task = React.lazy(() => import('../Task'))
const NewTask = React.lazy(() => import('../NewTask'))

function TaskRouting() {
  const { store, projectId, pathnames, isReady, hideNewTask } = useController()
  if (!isReady) {
    return <Loader />
  }
  return (
    <ErrorBoundry>
      <Root
        aria-label='breadcrumb'
        className={classes.root}
        data-testid={PREFIX}
      >
        <Breadcrumbs className={classes.breadcrumb}>
          {pathnames.map((value, index) => {
            const to = '/' + pathnames.slice(0, index + 1).join('/')
            const isLast = index === pathnames.length - 1
            let val = value
            const indexProject =
              store?.projects?.findIndex((p: any) => p._id === value) ?? -1
            if (indexProject >= 0) {
              val = value.slice(0, 8)
            }
            const indexTask =
              store?.tasks?.findIndex((t: any) => t._id === value) ?? -1
            if (indexTask >= 0) {
              val = value.slice(0, 8)
            }
            return isLast ? (
              <Typography color='text.primary' key={to}>
                {decodeURIComponent(val)}
              </Typography>
            ) : (
              <Link component={RouterLink} to={to} key={to}>
                {decodeURIComponent(val)}
              </Link>
            )
          })}
        </Breadcrumbs>
        <Link
          component={RouterLink}
          to={`/project/${projectId}/task/new`}
          sx={{ display: hideNewTask ? 'none' : 'block' }}
        >
          New Task
        </Link>
      </Root>

      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/task/:taskId/edit' element={<NewTask />} />
          <Route path='/task/new' element={<NewTask />} />
          <Route path='/*' element={<Task />} />
        </Routes>
      </React.Suspense>
    </ErrorBoundry>
  )
}

export default React.memo(TaskRouting)
