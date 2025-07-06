import { setupWorker } from 'msw/browser'
import { authHandlers } from './authHandlers'
import { projectHandlers } from './projectHandlers'
import { taskHandlers } from './taskHandlers'

const handlers = [...authHandlers, ...projectHandlers, ...taskHandlers]
export const worker = setupWorker(...handlers)
