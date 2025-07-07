import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { hideScrollbarX, hideScrollbarY } from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_table`
export const classes = {
  root: `${PREFIX}-root`,
}

const Root = styled(Box)(() => ({
  [`&.${classes.root}`]: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...hideScrollbarY,
    ...hideScrollbarX,
    '& .MuiDataGrid-scrollbar--horizontal': {
      height: '4px',
      borderRadius: '2px',
      backgroundColor: 'transparent',
    },
  },
}))

export const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .no-rows-primary': {
    fill: '#3D4751',
    ...theme.applyStyles('light', {
      fill: '#AEB8C2',
    }),
  },
  '& .no-rows-secondary': {
    fill: '#1D2126',
    ...theme.applyStyles('light', {
      fill: '#E8EAED',
    }),
  },
}))

export default Root
