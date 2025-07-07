import * as React from 'react'
import {
  Box,
  Button,
  Paper,
  TextField,
  MenuItem,
  Typography,
  Stack,
} from '@mui/material'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import Root, { PREFIX, classes } from './common/style'
import { TaskStatus } from '../../hooks/model/task'
import useController from './common/useController'

function NewTask() {
  const {
    handleSubmit,
    handleChange,
    handleStartedAt,
    handleTargetEndAt,
    errors,
    task,
    taskId,
  } = useController()
  return (
    <Root aria-label='new task' className={classes.root} data-testid={PREFIX}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant='h5' gutterBottom>
          {taskId ? `Edit Task: ${taskId.slice(0, 8)}` : 'Create New Task'}
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label='Name'
              name='name'
              value={task.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
            />
            <TextField
              label='Description'
              name='description'
              value={task.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              fullWidth
              required
              multiline
              minRows={2}
            />
            <TextField
              select
              label='Status'
              name='status'
              value={task.status}
              onChange={handleChange}
              fullWidth
            >
              {Object.values(TaskStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            <MobileDateTimePicker
              label='Started At'
              name='startedAt'
              type='date'
              //@ts-expect-error
              value={task.startedAt}
              //@ts-expect-error
              onChange={handleStartedAt}
              error={!!errors.startedAt}
              helperText={errors.startedAt}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              disablePast={!taskId}
            />
            <MobileDateTimePicker
              label='Target End At'
              name='targetEndAt'
              type='date'
              //@ts-expect-error
              value={task.targetEndAt}
              //@ts-expect-error
              onChange={handleTargetEndAt}
              error={!!errors.targetEndAt}
              helperText={errors.targetEndAt}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              disablePast={!taskId}
              //@ts-expect-error
              minDateTime={task.startedAt ? task.startedAt : undefined}
            />
            <Button type='submit' variant='contained' color='primary' fullWidth>
              {taskId ? `Edit Task: ${taskId.slice(0, 8)}` : 'Create New Task'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Root>
  )
}

export default React.memo(NewTask)
