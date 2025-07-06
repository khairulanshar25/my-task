import * as React from 'react'
import Button from '@mui/material/Button'
import Root, { PREFIX, classes } from './common/style'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ConfirmDialogProps } from './common/interface'

function ConfirmDialog(props: ConfirmDialogProps) {
  return (
    <Root
      open={props.open}
      aria-labelledby='alert-timeout-title'
      aria-describedby='alert-timeout-description'
      className={classes.root}
      data-testid={PREFIX}
    >
      <DialogTitle id='alert-timeout-title'>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-timeout-description'>
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.continueSession}>Continue</Button>
        <Button onClick={props.logout} color='error'>
          Logout
        </Button>
      </DialogActions>
    </Root>
  )
}

export default React.memo(ConfirmDialog)
