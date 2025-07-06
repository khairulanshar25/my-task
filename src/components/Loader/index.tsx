import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

function Loader() {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <div>Loading</div>
      <div>
        <CircularProgress color='inherit' />
      </div>
    </Backdrop>
  )
}

export default React.memo(Loader)
