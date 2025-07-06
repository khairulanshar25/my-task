import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import {
  bgBlur,
  hideScrollbarX,
  hideScrollbarY,
} from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_login`
export const classes = {
  root: `${PREFIX}-root`,
  section: `${PREFIX}-section`,
  loginBox: `${PREFIX}-loginBox`,
  showButton: `${PREFIX}-showButton`,
}

const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    minHeight: '100vh',
    width: '100%',
    padding: 0,
    margin: 0,
    border: 0,
    backgroundImage: "url('/images/login.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    ...hideScrollbarY,
    ...hideScrollbarX,
  },
  [`& .${classes.section}`]: {
    minHeight: 'calc(100vh - 65px)', // Adjust for AppBar height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
  },
  [`& .${classes.loginBox}`]: {
    margin: '16px',
    minWidth: 320,
    padding: '24px',
    color: theme.palette.mode === 'light' ? '#000' : 'currentColor',
    ...(bgBlur({
      color: theme.palette.background.default,
      opacity: 0.3,
    }) as any),
    '& .MuiInputLabel-root': {
      color: theme.palette.mode === 'light' ? '#000' : 'currentColor',
    },
    '& .MuiOutlinedInput-input': {
      color: theme.palette.mode === 'light' ? '#000' : 'currentColor',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.mode === 'light' ? '#000' : 'currentColor',
    },
  },
  [`& .${classes.showButton}`]: {
    background: 'transparent!important',
    color: 'inherit',
    fontWeight: 400,
    ...(bgBlur({
      color: theme.palette.background.default,
      opacity: 0.1,
      important: true,
    }) as any),
    '&:hover': {
      ...(bgBlur({
        color: theme.palette.background.default,
        opacity: 0.3,
        important: true,
      }) as any),
    },
  },
}))

export default Root
