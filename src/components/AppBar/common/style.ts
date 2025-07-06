import { styled } from '@mui/material/styles'
import { AppBar as MuiAppBar, Toolbar } from '@mui/material'
import { bgBlur } from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_appbar`
export const classes = {
  menuItem: `${PREFIX}-menuitem`,
}

export const HEADER_MOBILE = 64

export const HEADER_DESKTOP = 72

export const StyledRoot = styled(MuiAppBar)(({ theme }) => ({
  ...(bgBlur({ color: theme.palette.background.default }) as any),
  boxShadow: 'none',
  backgroundColor: 'transparent!important',
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
}))

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
  [`& .${classes.menuItem}`]: {
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))
