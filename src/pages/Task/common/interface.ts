import { TaskStatusType, Task } from '../../../hooks/model/task'

export const ItemTypes = {
  TASK: 'task',
  STATUS: 'STATUS',
}

export interface TaskCardProps {
  task: Task
  index: number
  status: TaskStatusType
  moveTask: (
    draggedId: string,
    targetId: string,
    targetStatus: TaskStatusType,
  ) => void
  onEditTask: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
}
