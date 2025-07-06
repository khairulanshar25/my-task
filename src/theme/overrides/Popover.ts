import { Theme } from '@mui/material/styles'

export default function Dialog(_theme: Theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: 'none!important',
        },
      },
    },
  }
}
