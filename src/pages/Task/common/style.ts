import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import { hideScrollbarX, hideScrollbarY } from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_task`
export const classes = {
  root: `${PREFIX}-root`,
  task: `${PREFIX}-task`,
  statusList: `${PREFIX}-statusList`,
  statusTitle: `${PREFIX}-statusTitle`,
  taskList: `${PREFIX}-taskList`,
  card: `${PREFIX}-card`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    height: 'calc(100vh - 104px)',
    overflowY: 'auto',
    display: 'block',
    padding: '0px 8px',
  },
  [`& .${classes.task}`]: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    gap: theme.spacing(1),
    ...hideScrollbarY,
    ...hideScrollbarX,
  },
  [`& .${classes.statusList}`]: {
    flex: 1,
    minWidth: '180px',
    padding: 0,
    textAlign: 'center',
    textTransform: 'capitalize',
    ...hideScrollbarY,
    ...hideScrollbarX,
    backgroundColor: theme.palette.background.paper,
    display: 'block',
    borderRadius: '16px',
    height: 'calc(100vh - 112px)',
  },
  [`& .${classes.statusTitle}`]: {
    fontWeight: 600,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  [`& .${classes.taskList}`]: {
    height: 'calc(100vh - 164px)',
    overflowY: 'auto',
    padding: '0px 16px 4px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  [`& .${classes.card}`]: {
    textAlign: 'left',
    backgroundColor: theme.palette.background.default,
    overflowY: 'auto',
    minHeight: '170px',
    marginBottom: theme.spacing(1),
    '& .MuiCardContent-root': {
      padding: theme.spacing(1, 1.5),
      minHeight: '170px',
    },
  },
}))

export default Root
