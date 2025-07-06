import { putService, postService, getService, deleteService } from './index'
import service from './config'
import { getEndPoint, type EndPoint } from './util/getEndpoint'

vi.mock('./config', () => ({
  default: {
    put: vi.fn(),
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  },
}))
vi.mock('./util/getEndpoint', () => ({
  getEndPoint: vi.fn((pathApi: string) => `/api/${pathApi}`),
}))

describe('service hooks', () => {
  const pathApi: EndPoint = 'test-endpoint' as EndPoint
  const data = { foo: 'bar' }
  const config = { signal: 'signal' }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('putService calls service.put with correct arguments', () => {
    putService(pathApi, data, config)
    expect(getEndPoint).toHaveBeenCalledWith(pathApi)
    expect(service.put).toHaveBeenCalledWith('/api/test-endpoint', data, config)
  })

  it('putService uses default config if not provided', () => {
    putService(pathApi, data)
    expect(service.put).toHaveBeenCalledWith('/api/test-endpoint', data, {
      signal: undefined,
    })
  })

  it('postService calls service.post with correct arguments', () => {
    postService(pathApi, data, config)
    expect(getEndPoint).toHaveBeenCalledWith(pathApi)
    expect(service.post).toHaveBeenCalledWith(
      '/api/test-endpoint',
      data,
      config,
    )
  })

  it('postService uses default config if not provided', () => {
    postService(pathApi, data)
    expect(service.post).toHaveBeenCalledWith('/api/test-endpoint', data, {
      signal: undefined,
    })
  })

  it('getService calls service.get with correct arguments', () => {
    getService(pathApi, config)
    expect(getEndPoint).toHaveBeenCalledWith(pathApi)
    expect(service.get).toHaveBeenCalledWith('/api/test-endpoint', config)
  })

  it('getService uses default config if not provided', () => {
    getService(pathApi)
    expect(service.get).toHaveBeenCalledWith('/api/test-endpoint', {
      signal: undefined,
    })
  })

  it('deleteService calls service.delete with correct arguments', () => {
    deleteService(pathApi, config)
    expect(getEndPoint).toHaveBeenCalledWith(pathApi)
    expect(service.delete).toHaveBeenCalledWith('/api/test-endpoint', config)
  })

  it('deleteService uses default config if not provided', () => {
    deleteService(pathApi)
    expect(service.delete).toHaveBeenCalledWith('/api/test-endpoint', {
      signal: undefined,
    })
  })
})
