import { styled } from '@mui/material/styles'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { hideScrollbarX, hideScrollbarY } from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_task_routing`
export const classes = {
  root: `${PREFIX}-root`,
}

const Root = styled(Breadcrumbs)(({ theme }) => ({
  [`&.${classes.root}`]: {
    padding: '0px 8px',
    ...hideScrollbarY,
    ...hideScrollbarX,
    marginBottom: theme.spacing(1),
    '& .MuiTypography-root': {
      textTransform: 'capitalize',
    },
    '& .MuiLink-underlineAlways': {
      color: theme.palette.info.light,
      '--Link-underlineColor': theme.palette.info.light,
      '&:hover': {
        color: theme.palette.info.main,
        '--Link-underlineColor': theme.palette.info.main,
      },
    },
  },
}))

export default Root
