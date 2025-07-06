import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import { bgBlur } from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.VITE_APP_PREFIX_STYLE}_timeout`
export const classes = {
  root: `${PREFIX}-root`,
}

const Root = styled(Dialog)(({ theme }) => ({
  [`&.${classes.root}`]: {
    '& .MuiPaper-root': {
      '--papper-shadow':
        '0px 3px 3px -2px rgba(145, 158, 171, 0.2),0px 3px 4px 0px rgba(145, 158, 171, 0.14),0px 1px 8px 0px rgba(145, 158, 171, 0.12)',
      ...(bgBlur({
        color: theme.palette.background.paper,
        opacity: 0.5,
      }) as any),
    },
  },
}))

export default Root
