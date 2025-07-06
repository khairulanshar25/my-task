import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import { hideScrollbarX, hideScrollbarY } from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_project`
export const classes = {
  root: `${PREFIX}-root`,
  toggleButtonGroup: `${PREFIX}-toggle-button-group`,
  table: `${PREFIX}-table`,
}

const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    ...hideScrollbarY,
    ...hideScrollbarX,
    '& .MuiTypography-root': {
      fontWeight: 400,
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
      },
    },
  },
  [`& .${classes.toggleButtonGroup}`]: {
    '& .MuiToggleButton-root': {
      height: '28px',
      padding: '6px 12px',
      fontWeight: 400,
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.down('sm')]: {
        fontSize: '9px',
        height: '32px',
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
  [`& .${classes.table}`]: {
    display: 'flex',
    height: 'calc(100vh - 109px)',
    width: '100%',
    ...hideScrollbarY,
    ...hideScrollbarX,
  },
}))

export const CustomTooltip = styled(Tooltip)(({ theme }) => ({}))

export default Root
