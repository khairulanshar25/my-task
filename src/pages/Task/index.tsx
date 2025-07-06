import * as React from 'react'
import useController from './common/useController'
import { TaskStatus } from '../../hooks/model/task'
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from '@mui/material'
import Root, { PREFIX, classes } from './common/style'
import { formatDate } from '../../utils/date'

function Task() {
  const { projectId, store } = useController()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const statusList = [
    TaskStatus.NOT_STARTED,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETED,
    TaskStatus.CANCELLED,
  ]

  // Group tasks by status
  const tasksByStatus = React.useMemo(() => {
    const grouped: Record<string, typeof store.tasks> = {}
    statusList.forEach((status) => {
      grouped[status] =
        store.tasks?.filter(
          (task) => task.status === status && task.projectId === projectId,
        ) || []
    })
    return grouped
  }, [store.tasks, projectId])

  return (
    <Root
      flexDirection={isMdUp ? 'row' : 'column'}
      className={classes.root}
      data-testid={PREFIX}
    >
      {statusList.map((status) => (
        <Paper key={status} elevation={3} className={classes.statusList}>
          <Typography variant='h6' className={classes.statusTitle}>
            {status}
          </Typography>
          <Box id='task-list' className={classes.taskList}>
            {tasksByStatus[status].length === 0 ? (
              <Typography variant='body2' color='text.secondary'>
                No tasks
              </Typography>
            ) : (
              tasksByStatus[status].map((task) => (
                <Card
                  key={task._id}
                  variant='outlined'
                  className={classes.card}
                >
                  <CardContent sx={{ padding: '16px' }}>
                    <Typography variant='body2' fontWeight={500} gutterBottom>
                      {task.name}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      gutterBottom
                      fontWeight={400}
                    >
                      {task.description}
                    </Typography>
                    <Typography variant='body2' color='info.light'>
                      Status: {task.status}
                    </Typography>
                    <Typography variant='body2' color='warning'>
                      Priority: {task.priority}
                    </Typography>
                    <Typography variant='caption' sx={{ display: 'block' }}>
                      Started At: {formatDate(task.startedAt)}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Paper>
      ))}
    </Root>
  )
}

export default React.memo(Task)
