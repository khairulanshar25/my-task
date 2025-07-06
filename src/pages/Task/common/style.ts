import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import { hideScrollbarX, hideScrollbarY } from '../../../utils/cssStyles'

export const PREFIX = `${import.meta.env.MFE_APP_PREFIX_STYLE}_task`
export const classes = {
  root: `${PREFIX}-root`,
  statusList: `${PREFIX}-statusList`,
  statusTitle: `${PREFIX}-statusTitle`,
  taskList: `${PREFIX}-taskList`,
  card: `${PREFIX}-card`,
}

const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    gap: theme.spacing(1),
  },
  [`& .${classes.statusList}`]: {
    flex: 1,
    minWidth: '180px',
    padding: 0,
    textAlign: 'center',
    textTransform: 'capitalize',
    height: 'calc(100vh - 128px)',
    overflow: 'hidden',
    backgroundColor: 'background.paper',
    borderRadius: '16px',
  },
  [`& .${classes.statusTitle}`]: {
    fontWeight: 600,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  [`& .${classes.taskList}`]: {
    height: 'calc(100vh - 174px)',
    overflowY: 'auto',
    padding: '0px 16px 4px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  [`& .${classes.card}`]: {
    textAlign: 'left',
    backgroundColor: 'background.default',
    height: 'auto',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
}))

export default Root
