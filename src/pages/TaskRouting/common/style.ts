import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import { hideScrollbarX, hideScrollbarY } from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_task_routing`
export const classes = {
  root: `${PREFIX}-root`,
  breadcrumb: `${PREFIX}-breadcrumb`,
}

const Root = styled(Stack)(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: theme.spacing(1),
    padding: '0px 8px',
    marginBottom: theme.spacing(1),
    ...hideScrollbarY,
    ...hideScrollbarX,
  },
  [`& .${classes.breadcrumb}`]: {
    ...hideScrollbarY,
    ...hideScrollbarX,
  },
  '& .MuiTypography-root': {
    textTransform: 'capitalize',
  },
  '& .MuiLink-underlineAlways': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.info.light
        : theme.palette.info.dark,
    '--Link-underlineColor':
      theme.palette.mode === 'dark'
        ? theme.palette.info.light
        : theme.palette.info.dark,
    '&:hover': {
      color: theme.palette.info.main,
      '--Link-underlineColor': theme.palette.info.main,
    },
  },
}))

export default Root
