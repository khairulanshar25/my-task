import * as React from 'react'
import useController from './common/useController'
import { TaskStatus } from '../../hooks/model/task'
import { Box, Paper, Typography } from '@mui/material'
import { classes } from './common/style'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './common/interface'
import TaskCard from './TaskCard'

function StatusColumn({ status, tasks, moveTask, onDropTask, isMdUp }) {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: any) => {
      if (item.status !== status) {
        onDropTask(item.id, status)
        item.status = status
      }
    },
  })

  return (
    <Paper ref={drop} elevation={3} className={classes.statusList}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {status}
      </Typography>
      <Box id='task-list' className={classes.taskList}>
        {tasks.length === 0 ? (
          <Typography variant='body2' color='text.secondary'>
            No tasks
          </Typography>
        ) : (
          tasks
            .slice() // create a shallow copy to avoid mutating props
            .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
            .map((task, idx) => (
              <TaskCard
                key={task._id}
                task={task}
                index={idx}
                status={status}
                moveTask={moveTask}
                onDropTask={onDropTask}
              />
            ))
        )}
      </Box>
    </Paper>
  )
}

export default React.memo(StatusColumn)
