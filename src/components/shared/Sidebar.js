import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
} from '@mui/material';
import {
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/',
  },
  {
    text: 'Leads',
    icon: <PeopleIcon />,
    path: '/leads',
  },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const drawerContent = (
    <>
      {/* Close Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
          pb: 1,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            color: '#FFFFFF',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 2.5, pt: 1 }}>
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: '12px',
                  py: 1.4,
                  px: 2.5,
                  backgroundColor: isActive
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'transparent',
                  backdropFilter: isActive ? 'blur(10px)' : 'none',
                  border: isActive
                    ? '1px solid rgba(255, 255, 255, 0.25)'
                    : '1px solid transparent',
                  boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                  '&:hover': {
                    backgroundColor: isActive
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'rgba(255, 255, 255, 0.08)',
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#FCD34D' : '#BFDBFE',
                    minWidth: 40,
                    '& .MuiSvgIcon-root': {
                      fontSize: 22,
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '15px',
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '-0.2px',
                    color: isActive ? '#FFFFFF' : '#DBEAFE',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Space */}
      <Box sx={{ flexGrow: 1 }} />
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%)',
          color: '#FFFFFF',
          borderRight: 'none',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.12)',
          marginTop: '70px', // Account for header height
          height: 'calc(100vh - 70px)',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}