import { vi, expect, describe, it } from 'vitest'
import { getEndPoint } from './getEndpoint'

const originalLocation = ''

describe('getEndPoint', () => {
  it('should return the correct endpoint with default api', () => {
    const result = getEndPoint({ path: '/users' })
    expect(result).toBe(originalLocation + '/api/users')
  })

  it('should return the correct endpoint with custom api', () => {
    const result = getEndPoint({ api: '/v1', path: '/tasks' })
    expect(result).toBe(originalLocation + '/v1/tasks')
  })

  it('should handle empty path', () => {
    const result = getEndPoint({ path: '' })
    expect(result).toBe(originalLocation + '/api')
  })

  it('should handle api without leading slash', () => {
    const result = getEndPoint({ api: '/v2', path: '/data' })
    expect(result).toBe(originalLocation + '/v2/data')
  })

  it('should handle path without leading slash', () => {
    const result = getEndPoint({ api: '/api', path: 'info' })
    expect(result).toBe(originalLocation + '/apiinfo')
  })
})
