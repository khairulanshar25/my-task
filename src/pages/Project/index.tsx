import * as React from 'react'
import ErrorBoundry from '../../components/ErrorBoundry'
import Root, { PREFIX, classes } from './common/style'
import { ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material'
import useController from './common/useController'
import useTable from './common/useTable'
import { ProjectStatus } from '../../hooks/model/project'
import Table from '../../components/Table'

function Project() {
  const { filteredProjects, getRowId, handleStatusChange, status } =
    useController()
  const { columns } = useTable()
  return (
    <ErrorBoundry>
      <Root className={classes.root} data-testid={PREFIX}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography>Status:</Typography>
          <ToggleButtonGroup
            value={status}
            exclusive
            onChange={handleStatusChange}
            size='small'
            color='primary'
            className={classes.toggleButtonGroup}
          >
            <ToggleButton value='all' size='small'>
              All
            </ToggleButton>
            <ToggleButton value={ProjectStatus.NOT_STARTED} size='small'>
              Not Started
            </ToggleButton>
            <ToggleButton value={ProjectStatus.IN_PROGRESS} size='small'>
              In Progress
            </ToggleButton>
            <ToggleButton value={ProjectStatus.COMPLETED} size='small'>
              Completed
            </ToggleButton>
            <ToggleButton value={ProjectStatus.ON_HOLD} size='small'>
              On Hold
            </ToggleButton>
            <ToggleButton value={ProjectStatus.CANCELLED} size='small'>
              Cancelled
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Table
          rows={filteredProjects}
          columns={columns}
          getRowId={getRowId}
          loading={filteredProjects.length === 0}
          //rowCount={filteredProjects.length}
          className={classes.table}
          disableRowSelectionOnClick
          initialState={{
            //@ts-ignore
            pinnedColumns: { left: ['actions'], right: [] },
          }}
          columnVisibilityModel={{
            createdAt: false,
            updatedAt: false,
            ownerId: false,
          }}
          disableColumnMenu
        />
      </Root>
    </ErrorBoundry>
  )
}

export default React.memo(Project)
