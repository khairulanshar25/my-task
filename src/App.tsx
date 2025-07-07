import React, { StrictMode } from 'react'
import Provider from './hooks/provider'
import ThemeProvider from './theme'
import Root from './root'
import { RootProps } from './root/common/interface'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App: React.FC<RootProps> = (props: RootProps): React.ReactElement => (
  <StrictMode>
    <Provider>
      <ThemeProvider {...props}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Root {...props} />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)

export default React.memo(App)
