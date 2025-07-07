/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import Table, { SortedAscendingIcon, SortedDescendingIcon } from './index'

// Mock dependencies
vi.mock('./common/style', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  PREFIX: 'table-root',
  classes: { root: 'table-root-class' },
}))
vi.mock('./common/useController', () => ({
  __esModule: true,
  default: () => ({
    paginationModel: { page: 0, pageSize: 10 },
    setPaginationModel: vi.fn(),
    pageSizeOptions: [10, 20, 50],
    dataGridRef: { current: null },
  }),
}))
vi.mock('../ErrorBoundry', () => ({
  __esModule: true,
  default: ({ children }: any) => <>{children}</>,
}))
vi.mock('@mui/x-data-grid-pro', () => ({
  __esModule: true,
  DataGridPro: (props: any) => (
    <div data-testid='datagridpro-mock' {...props}>
      DataGridPro
    </div>
  ),
}))
vi.mock('./CustomNoRowsOverlay', () => ({
  __esModule: true,
  default: () => <div data-testid='no-rows-overlay'>No Rows</div>,
}))
vi.mock('./CustomPagination', () => ({
  __esModule: true,
  default: () => <div data-testid='custom-pagination'>Pagination</div>,
}))
vi.mock('@mui/icons-material/ExpandLess', () => ({
  __esModule: true,
  default: (props: any) => <svg data-testid='expand-less-icon' {...props} />,
}))
vi.mock('@mui/icons-material/ExpandMore', () => ({
  __esModule: true,
  default: (props: any) => <svg data-testid='expand-more-icon' {...props} />,
}))

describe('Table', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
  ]
  const rows = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]

  it('renders without crashing', () => {
    render(<Table columns={columns} rows={rows} />)
    expect(screen.getByTestId('table-root')).toBeInTheDocument()
    expect(screen.getByTestId('datagridpro-mock')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Table columns={columns} rows={rows} className='custom-class' />)
    const root = screen.getByTestId('table-root')
    expect(root.className).toContain('table-root-class')
    expect(root.className).toContain('custom-class')
  })
})

describe('SortedAscendingIcon', () => {
  it('renders ExpandLessIcon', () => {
    render(<SortedAscendingIcon />)
    expect(screen.getByTestId('expand-less-icon')).toBeInTheDocument()
  })
})

describe('SortedDescendingIcon', () => {
  it('renders ExpandMoreIcon', () => {
    render(<SortedDescendingIcon />)
    expect(screen.getByTestId('expand-more-icon')).toBeInTheDocument()
  })
})
