/**
 * Represents the possible statuses for a project.
 *
 * - `'not started'`: The project has not begun yet.
 * - `'in progress'`: The project is currently ongoing.
 * - `'completed'`: The project has been finished.
 * - `'on hold'`: The project is temporarily paused.
 * - `'cancelled'`: The project has been terminated before completion.
 */
export type ProjectStatusType =
  | 'not started'
  | 'in progress'
  | 'completed'
  | 'on hold'
  | 'cancelled'

/**
 * Enum-like object representing the possible statuses for a project.
 *
 * @property NOT_STARTED - Indicates the project has not started yet.
 * @property IN_PROGRESS - Indicates the project is currently in progress.
 * @property COMPLETED - Indicates the project has been completed.
 * @property ON_HOLD - Indicates the project is currently on hold.
 * @property CANCELLED - Indicates the project has been cancelled.
 */
export const ProjectStatus = {
  NOT_STARTED: 'not started' as ProjectStatusType,
  IN_PROGRESS: 'in progress' as ProjectStatusType,
  COMPLETED: 'completed' as ProjectStatusType,
  ON_HOLD: 'on hold' as ProjectStatusType,
  CANCELLED: 'cancelled' as ProjectStatusType,
}

/**
 * Represents a project entity with its metadata and status.
 *
 * @property _id - Unique identifier for the project.
 * @property name - Name of the project.
 * @property description - Detailed description of the project.
 * @property status - Current status of the project.
 * @property startedAt - Date when the project was started.
 * @property targetEndAt - Target date for project completion.
 * @property endedAt - (Optional) Actual date when the project ended.
 * @property createdAt - Date when the project was created.
 * @property updatedAt - (Optional) Date when the project was last updated.
 * @property ownerId - Identifier of the user who owns the project.
 * @property numberofTasks - (Optional) Number of tasks associated with the project.
 */
export interface Project {
  _id: string
  name: string
  description: string
  status: ProjectStatusType
  startedAt: Date
  targetEndAt: Date
  endedAt?: Date
  createdAt: Date
  updatedAt?: Date
  ownerId: string
  numberofTasks?: number
}
