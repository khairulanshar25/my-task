import * as React from 'react'
import ErrorBoundry from '../../components/ErrorBoundry'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import {
  Link as RouterLink,
  Routes,
  Route,
  useLocation,
  useParams,
} from 'react-router'

function Task() {
  const { pathname, ...rest } = useLocation()
  const { projectId } = useParams()

  const pathnames = React.useMemo(
    () => pathname.split('/').filter((x) => x),
    [pathname],
  )

  return (
    <ErrorBoundry>
      <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 2 }}>
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
      </Breadcrumbs>
      <div>{projectId}</div>
    </ErrorBoundry>
  )
}

export default React.memo(Task)
