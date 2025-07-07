/**
 * @vitest-environment jsdom
 */
import { vi, expect, describe, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as React from 'react'
import Project from './index'
import * as useControllerModule from './common/useController'

// Mocks
vi.mock('./common/useController', () => ({
  default: () => ({
    filteredProjects: [
      { id: 1, name: 'Project 1', status: 'NOT_STARTED' },
      { id: 2, name: 'Project 2', status: 'COMPLETED' },
    ],
    getRowId: (row: any) => row.id,
    handleStatusChange: vi.fn(),
    status: 'all',
  }),
}))
vi.mock('./common/useTable', () => ({
  default: () => ({
    columns: [{ field: 'name', headerName: 'Name' }],
  }),
}))
vi.mock('../../components/ErrorBoundry', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))
vi.mock('./common/style', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  PREFIX: 'project-root',
  classes: {
    root: 'root-class',
    toggleButtonGroup: 'toggle-group-class',
    table: 'table-class',
  },
}))
vi.mock('../../components/Table', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid='mock-table'>
      {props.rows.map((row: any) => (
        <div key={row.id}>{row.name}</div>
      ))}
    </div>
  ),
}))
vi.mock('../../hooks/model/project', () => ({
  ProjectStatus: {
    NOT_STARTED: 'NOT_STARTED',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    ON_HOLD: 'ON_HOLD',
    CANCELLED: 'CANCELLED',
  },
}))

describe('Project Page', () => {
  it('renders without crashing and displays toggle buttons', () => {
    render(<Project />)
    expect(screen.getByTestId('project-root')).toBeInTheDocument()
    expect(screen.getByText('Status:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Not Started/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /In Progress/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Completed/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /On Hold/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Cancelled/i }),
    ).toBeInTheDocument()
  })

  it('renders the Table with filtered projects', () => {
    render(<Project />)
    expect(screen.getByTestId('mock-table')).toBeInTheDocument()
    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
  })

  it('calls handleStatusChange when a toggle button is clicked', async () => {
    const mockUseController =
      useControllerModule.default as unknown as jest.Mock
    const handleStatusChange = vi.fn()
    // Override the mock for this test
    vi.spyOn(useControllerModule, 'default').mockReturnValue({
      filteredProjects: [],
      getRowId: (row: any) => row.id,
      handleStatusChange,
      status: 'all',
    })

    // Re-import after doMock
    const ProjectWithMock = await import('./index').then((mod) => mod.default)
    render(<ProjectWithMock />)
    const notStartedBtn = screen.getByRole('button', { name: /Not Started/i })
    fireEvent.click(notStartedBtn)
    expect(handleStatusChange).toHaveBeenCalled()
  })
})
