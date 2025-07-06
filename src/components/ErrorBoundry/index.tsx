import React, { Component } from 'react'
import { ReactElement } from 'react'
import { ComponentPropsDefault, ErrorState } from '../../hooks/model/root'
import Fallback from '../FallbackError'

class ErrorBoundary extends Component<ComponentPropsDefault, ErrorState> {
  state: ErrorState = {
    hasError: false,
    error: undefined,
  }

  constructor(props: ComponentPropsDefault) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  /*componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo)
    }*/

  render() {
    if (this.state.hasError) {
      return <Fallback {...this.state} />
    }
    return this.props.children
  }
}

const Error: React.FC<ComponentPropsDefault> = (
  props: ComponentPropsDefault,
): ReactElement => {
  return <ErrorBoundary>{props.children}</ErrorBoundary>
}
export default React.memo(Error)
