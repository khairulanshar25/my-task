import { describe, it, expect } from 'vitest'
import { ProjectStatus, ProjectStatusType, Project } from './project'

describe('ProjectStatusType', () => {
  it('should allow only valid status values', () => {
    const validStatuses: ProjectStatusType[] = [
      'not started',
      'in progress',
      'completed',
      'on hold',
      'cancelled',
    ]
    expect(validStatuses).toContain(ProjectStatus.NOT_STARTED)
    expect(validStatuses).toContain(ProjectStatus.IN_PROGRESS)
    expect(validStatuses).toContain(ProjectStatus.COMPLETED)
    expect(validStatuses).toContain(ProjectStatus.ON_HOLD)
    expect(validStatuses).toContain(ProjectStatus.CANCELLED)
  })
})

describe('ProjectStatus', () => {
  it('should have correct status values', () => {
    expect(ProjectStatus.NOT_STARTED).toBe('not started')
    expect(ProjectStatus.IN_PROGRESS).toBe('in progress')
    expect(ProjectStatus.COMPLETED).toBe('completed')
    expect(ProjectStatus.ON_HOLD).toBe('on hold')
    expect(ProjectStatus.CANCELLED).toBe('cancelled')
  })
})

describe('Project interface', () => {
  const now = new Date()
  const project: Project = {
    _id: '123',
    name: 'Test Project',
    description: 'A test project',
    status: ProjectStatus.IN_PROGRESS,
    startedAt: now,
    targetEndAt: new Date(now.getTime() + 1000000),
    createdAt: now,
    ownerId: 'owner1',
    numberofTasks: 5,
  }

  it('should have all required properties', () => {
    expect(project).toHaveProperty('_id')
    expect(project).toHaveProperty('name')
    expect(project).toHaveProperty('description')
    expect(project).toHaveProperty('status')
    expect(project).toHaveProperty('startedAt')
    expect(project).toHaveProperty('targetEndAt')
    expect(project).toHaveProperty('createdAt')
    expect(project).toHaveProperty('ownerId')
  })

  it('should allow optional properties', () => {
    const projectWithOptional: Project = {
      ...project,
      endedAt: new Date(now.getTime() + 2000000),
      updatedAt: new Date(now.getTime() + 3000000),
      numberofTasks: 10,
    }
    expect(projectWithOptional.endedAt).toBeInstanceOf(Date)
    expect(projectWithOptional.updatedAt).toBeInstanceOf(Date)
    expect(typeof projectWithOptional.numberofTasks).toBe('number')
  })

  it('should only accept valid status values', () => {
    const statuses: ProjectStatusType[] = [
      ProjectStatus.NOT_STARTED,
      ProjectStatus.IN_PROGRESS,
      ProjectStatus.COMPLETED,
      ProjectStatus.ON_HOLD,
      ProjectStatus.CANCELLED,
    ]
    statuses.forEach((status) => {
      const p: Project = { ...project, status }
      expect(p.status).toBe(status)
    })
  })
})
