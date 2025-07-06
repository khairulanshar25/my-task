import { Theme } from '@mui/material/styles'
export default function Dialog(_theme: Theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: 'none!important',
        },
      },
    },
  }
}
