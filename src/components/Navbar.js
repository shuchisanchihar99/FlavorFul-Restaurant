import React, { useState, useContext } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../theme/ThemeContext';
import logo from '../assets/—Pngtree—restaurant logo_7932128.png'; 

const navLinks = [
  { text: 'Home', path: '/' },
  { text: 'Events', path: '/events' },
  { text: 'Gallery', path: '/gallery' },
  { text: 'Visit Us', path: '/visitus' }
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const theme = useTheme();

  const handleDrawerToggle = () => setDrawerOpen(prev => !prev);

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navLinks.map(({ text, path }) => (
          <ListItemButton key={text} component={Link} to={path}>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
        {/* Reservation button in drawer */}
        <ListItemButton component={Link} to="/reservation">
          <ListItemText primary="Reservation" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >

    
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              fontFamily: 'monospace',
              letterSpacing: '.1rem'
            }}
          >
          <img src={logo} alt="Restaurant Logo" style={{ height: '40px', marginRight: '10px' }} />
            FlavorTown
          </Typography>

          {/* Mobile Hamburger */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <IconButton size="large" color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              fontFamily: 'monospace',
              letterSpacing: '.1rem'
            }}
          >
            <img src={logo} alt="Restaurant Logo" style={{ height: '30px', marginRight: '10px' }} />
            FlavorTown
          </Typography>

          {/* Desktop Nav Links (excluding reservation) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map(({ text, path }) => (
              <Button
                key={text}
                component={Link}
                to={path}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                {text}
              </Button>
            ))}
          </Box>

          {/* Reservation Button - Highlighted on Right */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link}
              to="/reservation"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '20px',
                fontWeight: 600,
                px: 3,
                textTransform: 'none',
                ml: 2,
                boxShadow: 3
              }}
            >
              Reserve a Table
            </Button>
          </Box>

          {/* Theme Switcher */}
          <IconButton sx={{ ml: 2 }} onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;