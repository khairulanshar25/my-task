import { styled } from '@mui/material/styles'
import { use } from 'react'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_Fallback`
export const classes = {
  root: `${PREFIX}-root`,
}

const Root = styled('section')(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: '100%',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    '& *': {
      userSelect: 'text',
    },
  },
}))

export default Root
