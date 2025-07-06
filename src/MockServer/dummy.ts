import { ProjectStatus, type Project } from '../hooks/model/project'
import { User } from '../hooks/model/root'

/**
 * An array of mock user objects used for testing or development purposes.
 * Each user object contains properties such as `_id`, `email`, `password`, `name`, `role`,
 * `createdAt`, `updatedAt`, `isActive`, and `lastLogin`.
 *
 * @remarks
 * - The `password` field contains plain text for demonstration only; do not use in production.
 * - The `createdAt`, `updatedAt`, and `lastLogin` fields are set to the current ISO timestamp.
 * - The `role` field indicates the user's role in the system.
 * - The `isActive` field indicates whether the user account is active.
 *
 * @example
 * ```typescript
 * import { dummyUsers } from './MockServer/dummy';
 * console.log(dummyUsers[0].email); // Outputs: 'any@email.com'
 * ```
 */
export const dummyUsers: User[] = [
  {
    _id: '1234567890',
    email: 'any@email.com',
    password: 'spassword123',
    name: 'John Doe',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    lastLogin: new Date().toISOString(),
  },
  {
    _id: '0987654321',
    email: 'two@email.com',
    password: 'spassword123',
    name: 'Jane Smith',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    lastLogin: new Date().toISOString(),
  },
  {
    _id: '1122334455',
    email: 'two@email.com',
    password: 'spassword123',
    name: 'Alice Johnson',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    lastLogin: new Date().toISOString(),
  },
]

/**
 * Generates an array of mock `Project` objects for each user in `dummyUsers`.
 *
 * For each user, a random number (between 50 and 80) of projects are created.
 * Each project includes randomized properties such as status, creation date, start date, and target end date.
 *
 * - `updatedAt` is set to a random date after `createdAt`.
 * - `endedAt` is set only if the project's status is `ProjectStatus.COMPLETED`, and is a random date after `startedAt`.
 * - The `ownerId` is set to the user's `_id`.
 *
 * @remarks
 * This mock data is intended for testing and development purposes.
 *
 * @see Project
 * @see ProjectStatus
 * @see dummyUsers
 */
export const dummyProjects: Project[] = dummyUsers.flatMap((user) => {
  const arr = Array.from(
    { length: Math.floor(Math.random() * 31) + 50 },
    (_, index) => ({
      _id: `project-${user._id}-${index}`,
      name: `Project ${index + 1} for ${user.name}`,
      description: `This is a description for project ${index + 1} created by ${user.name}.`,
      status:
        Object.values(ProjectStatus)[
          Math.floor(Math.random() * Object.values(ProjectStatus).length)
        ],
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 90 + 1) * 24 * 60 * 60 * 1000,
      ),
      updatedAt: undefined,
      startedAt: new Date(
        Date.now() - Math.floor(Math.random() * 90 + 2) * 24 * 60 * 60 * 1000,
      ),
      targetEndAt: new Date(
        Date.now() + Math.floor(Math.random() * 90 + 2) * 24 * 60 * 60 * 1000,
      ),
      endedAt: undefined,
      ownerId: user._id,
    }),
  )
  return arr.flatMap((project) => ({
    ...project,
    updatedAt: new Date(
      project.createdAt.getTime() +
        Math.floor(Math.random() * 90 + 2) * 24 * 60 * 60 * 1000,
    ),
    endedAt:
      project.status === ProjectStatus.COMPLETED
        ? new Date(
            project.startedAt.getTime() +
              Math.floor(Math.random() * 90 + 1) * 24 * 60 * 60 * 1000,
          )
        : undefined,
  }))
})
