import { Project } from './project'
import { Task } from './task'

/**
 * Default props interface for React components that accept children.
 *
 * @property {React.ReactNode} children - The content to be rendered inside the component.
 */
export interface ComponentPropsDefault {
  children: React.ReactNode
}
/**
 * Represents the error state of a component or process.
 *
 * @property hasError - Indicates whether an error has occurred.
 * @property error - Optional error object containing details about the error.
 */
export interface ErrorState {
  hasError: boolean
  error?: Error
}
/**
 * Represents a user entity in the system.
 *
 * @property _id - Unique identifier for the user.
 * @property email - Email address of the user.
 * @property password - (Optional) Hashed password of the user.
 * @property name - Full name of the user.
 * @property role - Role assigned to the user (e.g., admin, user).
 * @property createdAt - ISO string representing when the user was created.
 * @property updatedAt - ISO string representing when the user was last updated.
 * @property isActive - Indicates whether the user account is active.
 * @property lastLogin - ISO string of the user's last login time.
 */
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
/**
 * Represents the root model for application state.
 *
 * @property {User} [user] - The currently authenticated user.
 * @property {number} [expiredIn] - The expiration time (in seconds) for the current session or token.
 * @property {string} [token] - The current authentication token.
 * @property {string} [refreshToken] - The refresh token for obtaining new authentication tokens.
 * @property {string} [errorMsg] - The error message to display, if any.
 * @property {boolean} [showAlert] - Indicates whether an alert should be shown.
 * @property {boolean} [isLoading] - Indicates whether a loading state is active.
 * @property {'dark' | 'light'} [theme] - The current theme of the application.
 * @property {Object} [themeConfig] - The configuration object for the theme.
 * @property {ShadowRoot | HTMLElement} [shadowContainer] - The container for shadow DOM elements.
 * @property {HTMLElement} [shadowRootElement] - The root element for the shadow DOM.
 * @property {Project[]} [projects] - The list of projects associated with the user.
 * @property {Task[]} [tasks] - The list of tasks associated with the user or projects.
 */
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
  tasks?: Task[]
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
  tasks: [],
}
