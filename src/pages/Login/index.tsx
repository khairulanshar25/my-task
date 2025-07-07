import React from 'react'
import AppBar from '../../components/AppBar'
import Root, { PREFIX, classes } from './common/style'
import { Box, Button, TextField, Typography, Paper } from '@mui/material'
import useController from './common/useController'
import { LoginProps } from './common/interface'
import ErrorBoundry from '../../components/ErrorBoundry'

const Login: React.FC<LoginProps> = () => {
  const {
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    email,
    password,
    showPassword,
    handleClickShowPassword,
  } = useController()
  return (
    <ErrorBoundry>
      <Root className={classes.root} data-testid={PREFIX}>
        <AppBar />
        <section className={classes.section}>
          <Paper elevation={3} className={classes.loginBox}>
            <Typography variant='h5' align='center' gutterBottom>
              Login
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              data-testid={`${PREFIX}-form`}
            >
              <TextField
                label='Email'
                type='email'
                fullWidth
                margin='normal'
                value={email}
                onChange={handleEmailChange}
                required
                inputProps={{ 'data-testid': `${PREFIX}-email` }}
              />
              <TextField
                label='Password'
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin='normal'
                value={password}
                onChange={handlePasswordChange}
                required
                inputProps={{ 'data-testid': `${PREFIX}-password` }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <Button
                        onClick={handleClickShowPassword}
                        tabIndex={-1}
                        size='small'
                        variant='text'
                        className={classes.showButton}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    ),
                  },
                }}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
                data-testid={`${PREFIX}-login`}
              >
                Login
              </Button>
            </Box>
          </Paper>
        </section>
      </Root>
    </ErrorBoundry>
  )
}

export default Login
