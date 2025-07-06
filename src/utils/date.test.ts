import { describe, it, expect } from 'vitest'

// Example date utility function
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

describe('formatDate', () => {
  it('should format date as YYYY-MM-DD', () => {
    const date = new Date('2024-06-01T12:00:00Z')
    expect(formatDate(date)).toBe('2024-06-01')
  })
})
