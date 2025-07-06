import React, { StrictMode } from 'react'
import Provider from './hooks/provider'
import ThemeProvider from './theme'
import Root from './root'
import { RootProps } from './root/common/interface'

const App: React.FC<RootProps> = (props: RootProps): React.ReactElement => (
  <StrictMode>
    <Provider>
      <ThemeProvider {...props}>
        <Root {...props} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)

export default React.memo(App)
