import { styled } from '@mui/material/styles'
import { hideScrollbarX, hideScrollbarY } from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_home`
export const classes = {
  root: `${PREFIX}-root`,
}

const Root = styled('main')(() => ({
  [`&.${classes.root}`]: {
    width: '100%',
    ...hideScrollbarY,
    ...hideScrollbarX,
  },
}))

export default Root
