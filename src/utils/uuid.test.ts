import { describe, it, expect } from 'vitest'
import { getId } from './uuid'

describe('getId', () => {
  it('should return a string', () => {
    const id = getId()
    expect(typeof id).toBe('string')
  })

  it('should return a valid UUID v4', () => {
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const id = getId()
    expect(uuidV4Regex.test(id)).toBe(true)
  })

  it('should return unique values on multiple calls', () => {
    const ids = new Set(Array.from({ length: 10 }, () => getId()))
    expect(ids.size).toBe(10)
  })
})
