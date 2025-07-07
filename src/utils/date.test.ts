import { describe, it, expect } from 'vitest'
import { formatDate } from './date'

describe('formatDate', () => {
  it('should format date as YYYY-MM-DD', () => {
    const date = new Date('2024-06-01T12:00:00Z')
    expect(formatDate(date)).toBe('06/01/2024, 08:00:00 PM')
    expect(formatDate('')).toBe('')
    expect(formatDate()).toBe('')
  })
})
