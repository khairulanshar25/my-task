import * as React from 'react'
import { Task } from '../../hooks/model/task'
import { Box, Paper, Typography } from '@mui/material'
import { classes } from './common/style'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './common/interface'
import TaskCard from './TaskCard'
import { getId } from '../../utils/uuid'

function StatusColumn({
  status,
  tasks,
  moveTask,
  onDropTask,
  onEditTask,
  onDeleteTask,
}: any) {
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
    //@ts-expect-error
    <Paper ref={drop} elevation={3} className={classes.statusList}>
      <Typography variant='h6' className={classes.statusTitle}>
        {status}
      </Typography>
      <Box id='task-list' className={classes.taskList}>
        {tasks.length === 0 ? (
          <Typography variant='body2' color='text.secondary'>
            No tasks
          </Typography>
        ) : (
          tasks
            .slice()
            .sort((a: Task, b: Task) => (a.priority ?? 0) - (b.priority ?? 0))
            .map((task: Task, idx: number) => (
              <TaskCard
                key={`${status}-${task._id}-${getId()}`}
                task={task}
                index={idx}
                status={status}
                moveTask={moveTask}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            ))
        )}
      </Box>
    </Paper>
  )
}

export default React.memo(StatusColumn)
