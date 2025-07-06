import * as React from 'react'
import ErrorBoundry from '../../components/ErrorBoundry'
import Root, { PREFIX, classes } from './common/style'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Link as RouterLink, Routes, Route } from 'react-router'
import Loader from '../../components/Loader'
import useController from './common/useController'

const Task = React.lazy(() => import('../Task'))

function TaskRouting() {
  const { pathname, navigate, rest, pathnames, projectId, isReady } =
    useController()
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
        {pathnames.map((value, index) => {
          const to = '/' + pathnames.slice(0, index + 1).join('/')
          const isLast = index === pathnames.length - 1
          return isLast ? (
            <Typography color='text.primary' key={to}>
              {decodeURIComponent(value)}
            </Typography>
          ) : (
            <Link component={RouterLink} to={to} key={to}>
              {decodeURIComponent(value)}
            </Link>
          )
        })}
      </Root>
      <Routes>
        <Route path='/' element={<Task />} />
      </Routes>
    </ErrorBoundry>
  )
}

export default React.memo(TaskRouting)
