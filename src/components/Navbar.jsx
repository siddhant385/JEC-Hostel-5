import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from '../contexts/ThemeContext';


function Navbar() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useThemeContext();
  const { currentUser, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = [
    { name: "Home", id: "/" },
    { name: "Contact", id: "/contact" },
    { name: "About", id: "/about" },
  ];
  
  const settings = [
    { 
      name: 'Profile', 
      action: () => navigate('/settings') 
    }, 
    { 
      name: 'Logout', 
      action: handleLogout 
    }
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logged Out Successfully");
      navigate('/');
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JEC5
          </Typography>

          {/* Mobile Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.id} 
                  component={NavLink} 
                  to={page.id}
                  onClick={handleCloseNavMenu}
                >
                  <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          {/* Mobile Logo */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JEC5
          </Typography>
          
          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={NavLink}
                to={page.id}
                key={page.id}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'red', 
                  display: 'block',
                  '&.active': {
                    fontWeight: 'bold',
                    textDecoration: 'underline'
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          {currentUser && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar 
                    alt={currentUser.name || currentUser.email} 
                    src={currentUser.profilePic} 
                    sx={{ objectFit: "contain" }}
                  />
                </IconButton>
                <IconButton onClick={toggleTheme} color="inherit">
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                
                
              </Tooltip>
              
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem 
                    key={setting.name} 
                    onClick={() => {
                      handleCloseUserMenu();
                      setting.action();
                    }}
                  >
                    <Typography sx={{ textAlign: 'center' }}>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            
          
          )}
          
          {/* Login/Signup Buttons when not logged in */}
          {!currentUser && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                component={NavLink} 
                to="/login"
                variant="outlined" 
                color="inherit"
                size="small"
              >
                Login
              </Button>
              <Button 
                component={NavLink} 
                to="/createAccount"
                variant="contained" 
                color="secondary"
                size="small"
              >
                Sign Up
              </Button>
              <IconButton onClick={toggleTheme} color="inherit">
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;