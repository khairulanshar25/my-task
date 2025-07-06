import * as React from 'react'
import { TaskStatus } from '../../hooks/model/task'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { classes } from './common/style'
import { formatDate } from '../../utils/date'
import { ItemTypes } from './common/interface'

// React DnD imports
import { useDrag, useDrop } from 'react-dnd'

function TaskCard({ task, index, status, moveTask, onDropTask }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(item: any) {
      if (!ref.current || item.status !== status) return
      if (item.index === index) return
      moveTask(item.index, index, status)
      item.index = index
    },
    drop(item: any) {
      if (item.status !== status) {
        onDropTask(item.id, status)
        item.status = status
        item.index = index
      }
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
        cursor: 'move',
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
  )
}

export default React.memo(TaskCard)
