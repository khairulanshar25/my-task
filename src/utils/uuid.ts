import { v4 as uuidv4 } from 'uuid'

export const getId: () => string = (): string => uuidv4()
