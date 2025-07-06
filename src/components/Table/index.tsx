import * as React from 'react'
import Root, { PREFIX, classes } from './common/style'
import useController from './common/useController'
import { TableProps } from './common/interface'
import ErrorBoundry from '../ErrorBoundry'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import CustomPagination from './CustomPagination'
import clsx from 'clsx'
import { DataGridPro } from '@mui/x-data-grid-pro'

export function SortedDescendingIcon() {
  return <ExpandMoreIcon className='icon' />
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className='icon' />
}

function Table(props: TableProps) {
  const {
    className,
    columnVisibilityModel = {},
    apiRef,
    initialState,
    ...restWithoutApiRef
  } = props
  const { paginationModel, setPaginationModel, pageSizeOptions, dataGridRef } =
    useController()

  return (
    <ErrorBoundry>
      <Root className={clsx(classes.root, className)} data-testid={PREFIX}>
        <DataGridPro
          ref={dataGridRef}
          {...restWithoutApiRef}
          initialState={{
            ...initialState,
            pagination: { paginationModel },
            columns: {
              columnVisibilityModel: {
                ...columnVisibilityModel,
                id: false, // Hide the 'id' column by default
                _id: false, // Hide the '_id' column by default
              },
            },
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={pageSizeOptions}
          density='compact'
          showToolbar
          pagination
          slots={{
            pagination: CustomPagination,
            columnSortedDescendingIcon: SortedDescendingIcon,
            columnSortedAscendingIcon: SortedAscendingIcon,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </Root>
    </ErrorBoundry>
  )
}

export default React.memo(Table)
