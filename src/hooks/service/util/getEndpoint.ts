export interface EndPoint {
  api?: string
  path: string
}
export const getEndPoint = ({ api = '/api', path }: EndPoint) => {
  return 'https://khairulanshar.com/be' + api + path
}
