import React from 'react'
import useController from './common/useController'
import Root, { PREFIX, classes } from './common/style'
import { type ErrorState } from '../../hooks/model/root'

const Fallback: React.FC<ErrorState> = (
  props: ErrorState,
): React.ReactElement => {
  useController(props)
  return (
    <Root className={classes.root} data-testid={PREFIX}>
      <div>Error Name: {props.error?.name}</div>
      <div>Message: {props.error?.message}</div>
      <div>Stack: {props.error?.stack}</div>
    </Root>
  )
}

export default React.memo(Fallback)
