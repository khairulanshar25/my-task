import React from 'react'
import { ReactElement } from 'react'
import { Theme, EmotionCache } from '@emotion/react'
import { RootProps } from '../RootProps'
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import GlobalStyles from './globalStyles'
import Config from './config'
import { useContext } from '../hooks/provider'
import useDispatcher from '../hooks/useDispatcher'
import { CacheProvider } from '@emotion/react'

/**
 * Provides theming context and configuration for the application using Material-UI and Emotion.
 *
 * @param props - The properties for the ThemeProvider component.
 * @param props.children - The child components to be rendered within the theme context.
 * @param props.shadowRootElement - The root element for shadow DOM styling.
 * @param props.shadowContainer - The container element for shadow DOM styling.
 *
 * @returns Themed React elements wrapped with Emotion's CacheProvider and Material-UI's ThemeProvider.
 *
 * @remarks
 * - Initializes theme configuration and cache using the `Config` function.
 * - Dispatches theme configuration and root elements to the global store.
 * - Applies global styles and CSS baseline for consistent styling.
 */
const ThemeProvider: React.FC<RootProps> = (props: RootProps): ReactElement => {
  const { children, shadowRootElement, shadowContainer } = props
  const [store] = useContext()
  const { dispatchThemeConfig, dispatchRoot } = useDispatcher()
  const [theme, cache] = React.useMemo(() => {
    const [config, cache] = Config(
      shadowRootElement,
      shadowContainer,
      store.theme as 'dark' | 'light',
    )
    dispatchThemeConfig(config)
    return [config, cache]
  }, [store.theme, shadowRootElement, shadowContainer])
  React.useEffect(() => {
    dispatchRoot(shadowRootElement, shadowContainer)
  }, [shadowRootElement, shadowContainer])
  return (
    <CacheProvider value={cache as EmotionCache}>
      <MUIThemeProvider theme={theme as Theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  )
}

export default React.memo(ThemeProvider)
