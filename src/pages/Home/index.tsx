import * as React from 'react'
import Root, { PREFIX, classes } from './common/style'
import ErrorBoundry from '../../components/ErrorBoundry'
import AppBar from '../../components/AppBar'
import { HomeProps } from './common/interface'
import Timeout from '../../components/Timeout'
import useController from './common/useController'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Loader from '../../components/Loader'

const ProjectRouting = React.lazy(() => import('../ProjectRouting'))
const UserProfile = React.lazy(() => import('../UserProfile'))

const Home: React.FC<HomeProps> = (_props): React.ReactElement => {
  const { showtimeout, continueSession, logout } = useController()
  return (
    <ErrorBoundry>
      <Root className={classes.root} data-testid={PREFIX}>
        <Router>
          <AppBar />
          <section className={classes.content}>
            <React.Suspense fallback={<Loader />}>
              <Routes>
                <Route path='/pofile' element={<UserProfile />} />
                <Route path='/project/*' element={<ProjectRouting />} />
                <Route path='/' element={<ProjectRouting />} />
              </Routes>
            </React.Suspense>
          </section>
        </Router>
        <Timeout
          open={showtimeout}
          title='Idle Timeout'
          content={`Click 'Continue' to extend your session, or 'Logout' to return to the login page.`}
          continueSession={continueSession}
          logout={logout}
        />
      </Root>
    </ErrorBoundry>
  )
}

export default React.memo(Home)
