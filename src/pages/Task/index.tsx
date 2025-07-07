import * as React from 'react'
import { Box } from '@mui/material'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import useController from './common/useController'
import Root, { PREFIX, classes } from './common/style'
import StatusColumn from './StatusColumn'

function Task() {
  const {
    isMdUp,
    statusList,
    tasksByStatus,
    moveTask,
    onDropTask,
    autoKey,
    onEditTask,
    onDeleteTask,
  } = useController()

  return (
    <div key={autoKey}>
      <DndProvider backend={HTML5Backend}>
        <Root className={classes.root} data-testid={PREFIX}>
          <Box
            flexDirection={isMdUp ? 'row' : 'column'}
            className={classes.task}
          >
            {statusList.map((status) => (
              <StatusColumn
                key={`${status}-autoKey`}
                status={status}
                tasks={tasksByStatus[status]}
                moveTask={moveTask}
                onDropTask={onDropTask}
                isMdUp={isMdUp}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </Box>
        </Root>
      </DndProvider>
    </div>
  )
}

export default React.memo(Task)
