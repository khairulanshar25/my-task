import * as React from 'react'
import MaterialUISwitch from './common/style'
import useController from './common/useController'

function ThemeSwitch() {
  const { toggleColorMode, mode } = useController()
  return (
    <MaterialUISwitch
      sx={{ m: 1 }}
      size='small'
      defaultChecked={mode === 'dark'}
      value={mode === 'dark'}
      onChange={toggleColorMode}
    />
  )
}

export default React.memo(ThemeSwitch)
