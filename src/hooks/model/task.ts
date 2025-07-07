export type TaskStatusType =
  | 'not started'
  | 'in progress'
  | 'completed'
  | 'cancelled'

export const TaskStatus = {
  NOT_STARTED: 'not started' as TaskStatusType,
  IN_PROGRESS: 'in progress' as TaskStatusType,
  COMPLETED: 'completed' as TaskStatusType,
  CANCELLED: 'cancelled' as TaskStatusType,
}

export interface Task {
  _id: string
  name: string
  description: string
  status: TaskStatusType
  startedAt: string | Date
  targetEndAt: string | Date
  endedAt?: string | Date
  createdAt: string | Date
  updatedAt?: string | Date
  priority?: number
  projectId: string
}
