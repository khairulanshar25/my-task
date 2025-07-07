import * as React from 'react'
import { Typography, Card, CardContent, useTheme } from '@mui/material'
import { classes } from './common/style'
import { formatDate } from '../../utils/date'
import { ItemTypes, TaskCardProps } from './common/interface'
// React DnD imports
import { useDrag, useDrop } from 'react-dnd'

function TaskCard({ task, index, status, moveTask }: TaskCardProps) {
  const theme = useTheme()
  const ref = React.useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop(item: any) {
      moveTask(item.id, task._id, task.status)
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task._id, index, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <Card
      ref={ref}
      variant='outlined'
      className={classes.card}
      sx={{
        opacity: isDragging ? 0.7 : 1,
        boxShadow: isDragging ? 6 : undefined,
      }}
    >
      <CardContent>
        <Typography variant='body2' gutterBottom>
          ID: {task._id.slice(0, 8)}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          gutterBottom
          fontWeight={400}
        >
          {task.description}
        </Typography>
        <Typography
          variant='body2'
          color={theme.palette.mode === 'dark' ? 'info.light' : 'info.dark'}
        >
          Status: {task.status}
        </Typography>
        <Typography
          variant='body2'
          color={
            theme.palette.mode === 'dark' ? 'warning.light' : 'warning.dark'
          }
        >
          Priority: {task.priority}
        </Typography>
        <Typography variant='caption' sx={{ display: 'block' }}>
          Started At: {formatDate(task.startedAt)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TaskCard
