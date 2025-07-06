import {
  GlobalStyles as MUIGlobalStyles,
  darken,
  useTheme,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
import React from 'react'

/**
 * Applies global CSS styles to the application using MUI's `GlobalStyles` component.
 *
 * - Sets box-sizing, disables text selection, and applies font and color styles globally.
 * - Customizes scrollbars and hides specific UI elements (e.g., `.lil-gui`).
 * - Ensures consistent styling for images, lists, and number input fields across browsers.
 * - Dynamically updates the document body's background color based on the current theme.
 *
 * @returns The global styles component to be included at the root of the app.
 */
export default function GlobalStyles() {
  const theme: Theme = useTheme()
  React.useEffect(() => {
    if (theme.palette.background.default) {
      document.body.style.backgroundColor = theme.palette.background.default
    }
  }, [theme.palette.background.default])
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
          userSelect: 'none',
        },
        '& .globalCss': {
          margin: 0,
          padding: 0,
          width: 'calc(100vw + 1px)',
          height: '100%',
          userSelect: 'none',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
          fontFamily: '"Helvetica Neue",Roboto',
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.default,
          '& .lil-gui': {
            display: 'none!important',
          },
          '& ::-webkit-scrollbar': {
            width: '3px',
            borderRadius: '3px',
          },
          '& ::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px transparent',
            borderRadius: '3px',
          },
          '& ::-webkit-scrollbar-thumb': {
            background: darken('#ffffff', 0.7),
            borderRadius: '3px',
            '& :hover': {
              background: darken('#ffffff', 0.3),
            },
          },
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        ul: {
          margin: 0,
          padding: 0,
        },
      }}
    />
  )

  return inputGlobalStyles
}
