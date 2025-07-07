import * as React from 'react'
import MaterialUISwitch, { PREFIX } from './common/style'
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
      data-testid={PREFIX}
    />
  )
}

export default React.memo(ThemeSwitch)
