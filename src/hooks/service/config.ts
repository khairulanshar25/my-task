import axios, { type AxiosRequestConfig } from 'axios'
import { errorHandler } from './util/error.response.handler'
import { successHandler } from './util/succes.response.handler'
import { requestHandler } from './util/success.request.handler'

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Accept: 'application/json, text/plain',
  },
  //withCredentials: true,
  timeout: 5 * 60000,
}
const service = axios.create(config)
service.interceptors.request.use(requestHandler)
service.interceptors.response.use(successHandler(service), errorHandler)

export default service
