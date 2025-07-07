import React from 'react'
import { useContext } from '../../../hooks/provider'
import { Project } from '../../../hooks/model/project'
import { formatDate } from '../../../utils/date'
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid-pro'
import IconButton from '@mui/material/IconButton'
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined'
import { useNavigate } from 'react-router'
import { CustomTooltip } from './style'

const useTable = () => {
  const [store] = useContext()
  const navigate = useNavigate()
  const columns: GridColDef<Project>[] = [
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 30,
      getActions: (params) => {
        const { _id } = params.row
        const handleClick = (_event: React.MouseEvent<HTMLElement>) => {
          navigate(`/project/${_id}`)
        }
        return [
          <GridActionsCellItem
            icon={
              <CustomTooltip title={`Open Task Detail for ${_id}`} arrow>
                <IconButton color='info' aria-label='Open Task Detail'>
                  <TaskOutlinedIcon />
                </IconButton>
              </CustomTooltip>
            }
            label='Open Task'
            key='task'
            onClick={handleClick}
          />,
        ]
      },
    },
    { field: '_id', headerName: 'ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      valueFormatter: (params: any) =>
        params.charAt(0).toUpperCase() + params.slice(1).replace(/_/g, ' '),
    },
    {
      field: 'startedAt',
      headerName: 'Started At',
      width: 200,
      valueFormatter: (params: string) => formatDate(params),
    },
    {
      field: 'targetEndAt',
      headerName: 'Target End At',
      width: 200,
      valueFormatter: (params: string) => formatDate(params),
    },
    {
      field: 'endedAt',
      headerName: 'Ended At',
      width: 200,
      valueFormatter: (params: string) => formatDate(params),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      valueFormatter: (params: string) => formatDate(params),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 200,
      valueFormatter: (params: string) => formatDate(params),
    },
    {
      field: 'numberofTasks',
      headerName: 'Number of Tasks',
      width: 180,
    },
    {
      field: 'ownerId',
      headerName: 'Owner ID',
      width: 140,
      valueGetter: (params: any) =>
        store?.user?._id === params ? store?.user?.name : 'Unknown User',
    },
  ]
  return {
    store,
    columns,
  }
}

export default useTable
