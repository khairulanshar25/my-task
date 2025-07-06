export interface EndPoint {
  api?: string
  path: string
}
export const getEndPoint = ({ api = '/api', path }: EndPoint) => {
  return api + path
}
