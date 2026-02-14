import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  HomeWork as HomeWorkIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const menuItems = [
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    path: '/' 
  },
  { 
    text: 'Leads', 
    icon: <PeopleIcon />, 
    path: '/leads' 
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawerContent = (
    <>
      {/* Logo Section */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          mb: 1
        }}>
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: '14px',
              padding: '2px',
              background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 0.6,
            }
          }}>
            <HomeWorkIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
          </Box>
          <Box>
            <Typography 
              variant="h6" 
              fontWeight={800}
              sx={{ 
                fontSize: '20px',
                letterSpacing: '-0.5px',
                lineHeight: 1.2,
                background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
              }}
            >
              Prometheus
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#BFDBFE',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Real Estate CRM
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.15)', mx: 2.5, mb: 1 }} />

      {/* Navigation Menu */}
      <List sx={{ px: 2.5, pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
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
                      fontSize: 22
                    }
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

      {/* Bottom Info */}
      <Box sx={{ flexGrow: 1 }} />
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            px: 2,
            backgroundColor: '#1E3A8A',
            zIndex: theme.zIndex.appBar,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              color: '#FFFFFF',
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: '#FCD34D',
              fontWeight: 700,
              fontSize: '18px',
            }}
          >
            Prometheus CRM
          </Typography>
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%)',
              color: '#FFFFFF',
              borderRight: 'none',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={handleDrawerToggle} sx={{ color: '#FFFFFF' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          {drawerContent}
        </Drawer>
      ) : (
        // Desktop Drawer
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%)',
              color: '#FFFFFF',
              borderRight: 'none',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
