import { Theme } from '@mui/material/styles'

export default function Tooltip(theme: Theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[2],
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
  }
}
