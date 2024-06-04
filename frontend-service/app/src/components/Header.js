import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SecurityIcon from '@mui/icons-material/Security';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Header.css';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar className="toolbar">
        <Box className="left-section">
          <SecurityIcon className="icon-security" />
          <Box className="time-container">
            <Box className="status-indicator" />
            <Typography variant="caption" color="inherit" className="time-text">
              00:00:00
            </Typography>
          </Box>
        </Box>

        <Typography variant="h4" className="title">
          ELECTED
        </Typography>

        <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            className="drawer"
          >
            <List className="drawer-list">
              <ListItem button component={Link} to="/home" className="drawer-list-item">
                <ListItemIcon>
                  <HomeIcon className="drawer-list-item-icon" />
                </ListItemIcon>
                <ListItemText primary="Home" className="drawer-list-item-text" />
              </ListItem>
              <ListItem button component={Link} to="/dashboard" className="drawer-list-item">
                <ListItemIcon>
                  <DashboardIcon className="drawer-list-item-icon" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" className="drawer-list-item-text" />
              </ListItem>
              <ListItem button component={Link} to="/settings" className="drawer-list-item">
                <ListItemIcon>
                  <SettingsIcon className="drawer-list-item-icon" />
                </ListItemIcon>
                <ListItemText primary="Settings" className="drawer-list-item-text" />
              </ListItem>
              <ListItem button component={Link} to="/login" className="drawer-list-item">
                <ListItemIcon>
                  <LoginIcon className="drawer-list-item-icon" />
                </ListItemIcon>
                <ListItemText primary="Login" className="drawer-list-item-text" />
              </ListItem>
              <ListItem button component={Link} to="/register" className="drawer-list-item">
                <ListItemIcon>
                  <PersonAddIcon className="drawer-list-item-icon" />
                </ListItemIcon>
                <ListItemText primary="Register" className="drawer-list-item-text" />
              </ListItem>
              <ListItem button onClick={handleLogout} className="drawer-list-item">
                <ListItemIcon>
                  <LogoutIcon className="drawer-list-item-icon" />
                </ListItemIcon>
                <ListItemText primary="Logout" className="drawer-list-item-text" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
