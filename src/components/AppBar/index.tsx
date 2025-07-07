import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { StyledRoot, StyledToolbar, classes, PREFIX } from './common/style'
import ThemeSwitch from './common/components/ThemeSwitch'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import useController from './common/useController'
import { NavLink } from 'react-router'

function AppBar() {
  const { auth, handleClose, handleMenu, handleLogout, anchorEl, open } =
    useController()
  return (
    <StyledRoot position='static' data-testid={PREFIX}>
      <StyledToolbar>
        {auth && (
          <MenuItem component={NavLink} to='/' className={classes.menuItem}>
            <Typography variant='h6'>My Task</Typography>
          </MenuItem>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction='row'
          alignItems='center'
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <ThemeSwitch />
          {auth && (
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={NavLink}
                  to='/pofile'
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  )
}

export default React.memo(AppBar)
