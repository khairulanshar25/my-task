import { styled } from '@mui/material/styles'
import { hideScrollbarX, hideScrollbarY } from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_home`
export const classes = {
  root: `${PREFIX}-root`,
  content: `${PREFIX}-content`,
}

const Root = styled('main')(() => ({
  [`&.${classes.root}`]: {
    width: '100%',
    height: '100vh',
    ...hideScrollbarY,
    ...hideScrollbarX,
  },
  [`& .${classes.content}`]: {
    width: '100%',
    padding: '8px',
    margin: 0,
    border: 0,
    ...hideScrollbarY,
    ...hideScrollbarX,
  },
}))

export default Root
