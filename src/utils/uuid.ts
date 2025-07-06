import { v4 as uuidv4 } from 'uuid'

/**
 * Generates a new unique identifier string using the UUID v4 standard.
 *
 * @returns {string} A randomly generated UUID v4 string.
 */
export const getId: () => string = (): string => uuidv4()
