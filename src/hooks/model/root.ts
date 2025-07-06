import { Project } from './project'

export interface ComponentPropsDefault {
  children: React.ReactNode
}
export interface ErrorState {
  hasError: boolean
  error?: Error
}
export interface User {
  _id: string
  email: string
  password?: string
  name: string
  role: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  lastLogin: string
}
export interface RootModel {
  user?: User
  expiredIn?: number
  token?: string
  refreshToken?: string
  errorMsg?: string
  showAlert?: boolean
  isLoading?: boolean
  theme?: 'dark' | 'light'
  themeConfig?: Object
  shadowContainer?: ShadowRoot | HTMLElement
  shadowRootElement?: HTMLElement
  projects?: Project[]
  isProjectsLoading?: boolean
}
//set initial data for the theme
export const initialTheme = (localStorage.getItem('theme') || 'dark') as
  | 'dark'
  | 'light'
//set initial token
export const initialToken = localStorage.getItem('token') || undefined

export const initialData: RootModel = {
  user: undefined,
  expiredIn: undefined,
  errorMsg: undefined,
  isLoading: true,
  theme: initialTheme,
  themeConfig: undefined,
  token: initialToken,
  projects: [],
  isProjectsLoading: false,
}
