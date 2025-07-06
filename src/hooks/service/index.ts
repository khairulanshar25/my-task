import service from './config'
import { getEndPoint, type EndPoint } from './util/getEndpoint'

const putService = (
  pathApi: EndPoint,
  data: any,
  config = { signal: undefined },
) => {
  return service.put(getEndPoint(pathApi), data, config)
}

const postService = (
  pathApi: EndPoint,
  data: any,
  config = { signal: undefined },
) => {
  return service.post(getEndPoint(pathApi), data, config)
}

const getService = (pathApi: EndPoint, config = { signal: undefined }) => {
  return service.get(getEndPoint(pathApi), config)
}

const deleteService = (pathApi: EndPoint, config = { signal: undefined }) => {
  return service.delete(getEndPoint(pathApi), config)
}

export { putService, postService, getService, deleteService, service }
