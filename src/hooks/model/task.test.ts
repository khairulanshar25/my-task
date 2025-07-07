import { describe, it, expect } from 'vitest'
import { TaskStatus, Task, TaskStatusType } from './task'

describe('TaskStatus', () => {
  it('should have correct status values', () => {
    expect(TaskStatus.NOT_STARTED).toBe('not started')
    expect(TaskStatus.IN_PROGRESS).toBe('in progress')
    expect(TaskStatus.COMPLETED).toBe('completed')
    expect(TaskStatus.CANCELLED).toBe('cancelled')
  })

  it('should have all status keys', () => {
    expect(Object.keys(TaskStatus)).toEqual([
      'NOT_STARTED',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
    ])
  })
})

describe('Task type', () => {
  const now = new Date()
  const task: Task = {
    _id: '1',
    name: 'Test Task',
    description: 'A task for testing',
    status: TaskStatus.NOT_STARTED,
    startedAt: now,
    targetEndAt: new Date(now.getTime() + 1000 * 60 * 60),
    createdAt: now,
    projectId: 'project1',
  }

  it('should allow valid Task object', () => {
    expect(task._id).toBe('1')
    expect(task.status).toBe('not started')
    expect(task.projectId).toBe('project1')
    expect(task.endedAt).toBeUndefined()
    expect(task.priority).toBeUndefined()
  })

  it('should allow optional endedAt, updatedAt, and priority', () => {
    const completedTask: Task = {
      ...task,
      status: TaskStatus.COMPLETED,
      endedAt: new Date(),
      updatedAt: new Date(),
      priority: 2,
    }
    expect(completedTask.endedAt).toBeInstanceOf(Date)
    expect(completedTask.updatedAt).toBeInstanceOf(Date)
    expect(completedTask.priority).toBe(2)
  })

  it('should only allow valid TaskStatusType values', () => {
    const validStatuses: TaskStatusType[] = [
      'not started',
      'in progress',
      'completed',
      'cancelled',
    ]
    validStatuses.forEach((status) => {
      const t: Task = { ...task, status }
      expect(validStatuses).toContain(t.status)
    })
  })
})
