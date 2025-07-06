import { styled } from '@mui/material/styles'
import { hideScrollbarX, hideScrollbarY } from '../../utils/cssStyles'

export const PREFIX = `${import.meta.env.VITE_APP_PREFIX_STYLE}_routing`
export const classes = {
  root: `${PREFIX}-root`,
}

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    border: 0,
    ...hideScrollbarY,
    ...hideScrollbarX,
  },
}))

export default Root
