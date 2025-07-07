import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { hideScrollbarX, hideScrollbarY } from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_new_task`
export const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
}

const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflowY: 'auto',
    padding: 2,
    height: 'calc(100vh - 108px)',
  },
  [`& .${classes.paper}`]: {
    padding: theme.spacing(4),
    minWidth: 350,
    width: '100%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.mode === 'light' ? '#000' : 'currentColor',
    },
  },
}))

export default Root
