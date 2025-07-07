import * as React from 'react'
import { Box, Paper, Typography, Avatar } from '@mui/material'
import useController from './common/useController'

function UserProfile() {
  const { store } = useController()
  const user = store?.user

  if (!user) {
    return <Typography variant='h6'>No user data available.</Typography>
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='60vh'
    >
      <Paper elevation={3} sx={{ p: 4, minWidth: 320, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2,
            bgcolor: 'primary.main',
            fontSize: 32,
          }}
        >
          {user.name?.[0]?.toUpperCase() ||
            user.email?.[0]?.toUpperCase() ||
            '?'}
        </Avatar>
        <Typography variant='h5' gutterBottom>
          {user.name || 'No Name'}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          {user.email || 'No Email'}
        </Typography>
        {user.role && (
          <Typography variant='body2' color='primary' sx={{ mt: 1 }}>
            Role: {user.role}
          </Typography>
        )}
        {'isActive' in user && (
          <Typography
            variant='body2'
            color={user.isActive ? 'success.main' : 'error.main'}
            sx={{ mt: 1 }}
          >
            Status: {user.isActive ? 'Active' : 'Inactive'}
          </Typography>
        )}
        {'lastLogin' in user && user.lastLogin && (
          <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
            Last Login: {new Date(user.lastLogin).toLocaleString()}
          </Typography>
        )}
      </Paper>
    </Box>
  )
}

export default React.memo(UserProfile)
