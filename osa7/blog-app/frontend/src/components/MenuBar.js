import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import userService from '../services/user'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../reducers/userReducer'
import { setNotify } from '../reducers/notifyReducer'
import { Link } from 'react-router-dom'

const MenuBar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const logout = () => {
    dispatch(userData(null))
    userService.clearUser()
    dispatch(setNotify('good bye!', 5))
  }
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            BLOGS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              aria-label="menu"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Button component={Link} to="/" color="inherit">
                  Home
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button component={Link} to="/users" color="inherit">
                  Users
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            BLOGS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to="/"
              color="inherit"
            >
              Home
            </Button>

            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to="/users"
              color="inherit"
            >
              Users
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Typography
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                fontStyle: 'italic',
                fontFamily: 'monospace',
                fontWeight: 100,
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              {user.name} logged in
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default MenuBar
