import React, { Suspense } from 'react'
import Root, { PREFIX, classes } from './common/style'
import useController from './common/useController'
import Loader from '../components/Loader'
import { RootProps } from './common/interface'

const Home = React.lazy(() => import('../pages/Home'))
const Login = React.lazy(() => import('../pages/Login'))

const RootComp: React.FC<RootProps> = (
  _props: RootProps,
): React.ReactElement => {
  const { store, ready } = useController()
  if (!ready) {
    return <Loader />
  }
  return (
    <Root className={classes.root} data-testid={PREFIX}>
      <Suspense fallback={<Loader />}>
        {store?.user?.email ? <Home /> : <Login />}
      </Suspense>
    </Root>
  )
}

export default React.memo(RootComp)
