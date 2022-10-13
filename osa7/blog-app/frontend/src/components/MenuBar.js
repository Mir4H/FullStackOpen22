import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem
} from '@mui/material/'
import MenuIcon from '@mui/icons-material/Menu'
import userService from '../services/user'
import { userData } from '../reducers/userReducer'
import { setNotify } from '../reducers/notifyReducer'

const MenuBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const user = useSelector((state) => state.user)

  const logout = () => {
    dispatch(userData(null))
    userService.clearUser()
    navigate('/login')
    dispatch(setNotify('Good bye!', 5))
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  if (user === null) {
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
                display: { xs: 'flex', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              BLOGS
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    )
  }

  return (
    <AppBar position="static" id="menubar">
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
              id="home"
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
            <Button id="logout-button" onClick={logout} color="inherit">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default MenuBar
