import { TaskStatusType } from '../../../hooks/model/task'

export const ItemTypes = {
  TASK: 'task',
  STATUS: 'STATUS',
}

export interface TaskCardProps {
  task: {
    _id: string
    description: string
    status: TaskStatusType
    priority: string
    startedAt: string | Date
  }
  index: number
  status: TaskStatusType
  moveTask: (
    draggedId: string,
    targetId: string,
    targetStatus: TaskStatusType,
  ) => void
}
