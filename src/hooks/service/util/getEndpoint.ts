export interface EndPoint {
  api?: string
  path: string
}
let domain = 'https://khairulanshar.com/be'
if (import.meta.env.DEV) {
  domain = ''
}
export const getEndPoint = ({ api = '/api', path }: EndPoint) => {
  return domain + api + path
}
