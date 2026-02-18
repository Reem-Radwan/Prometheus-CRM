import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Chip,
  Fade,
} from '@mui/material';
import {
  HomeWork as HomeWorkIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  LockReset as LockResetIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { showLogoutConfirmation } from '../../utils/sweetalert';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {
        overflow-y: scroll !important;
        padding-right: 0 !important;
      }
      .swal2-container {
        padding-right: 0 !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangePasswordClick = () => {
    handleMenuClose();
    navigate('/change-password');
  };

  const handleLogoutClick = async () => {
    handleMenuClose();
    const result = await showLogoutConfirmation();
    if (result.isConfirmed) {
      logout();
      navigate('/login');
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const userName       = user?.full_name || user?.username || 'User';
  const userEmail      = user?.email || '';
  const userDepartment = user?.department_name || (isNaN(user?.department) ? user?.department : '') || '';
  const userRole       = user?.role || '';

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1200,
        borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Left Side - Menu Button & Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          onClick={onMenuClick}
          sx={{
            color: '#FFFFFF',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Clickable logo + title → Dashboard */}
        <Box
          onClick={() => navigate('/')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            borderRadius: '12px',
            px: 1,
            py: 0.5,
            transition: 'all 0.25s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.25s ease',
            }}
          >
            <HomeWorkIcon sx={{ color: '#FFFFFF', fontSize: 26 }} />
          </Box>
          
          <Box>
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{
                fontSize: '22px',
                letterSpacing: '-0.5px',
                lineHeight: 1.2,
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Prometheus
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Real Estate CRM
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Side - User Profile */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>

        {/* Avatar + Username pill with glassy border */}
        <Tooltip title="Account" arrow>
          <Box
            onClick={handleMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              pl: 1,
              pr: 2,
              py: 0.75,
              borderRadius: '50px',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                border: '1.5px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            {/* Avatar with gradient glowing ring */}
            <Box
              sx={{
                borderRadius: '50%',
                padding: '2px',
                background: 'linear-gradient(135deg, #F59E0B, #EF4444, #F59E0B)',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
              }}
            >
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {getInitials(userName)}
              </Avatar>
            </Box>

            {/* Username - hidden on xs */}
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                display: { xs: 'none', sm: 'block' },
                color: '#FFFFFF',
                fontSize: '14px',
                letterSpacing: '0.2px',
                textShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            >
              {userName}
            </Typography>
          </Box>
        </Tooltip>
      </Box>

      {/* User Menu Dropdown */}
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        onClick={handleMenuClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 4px 16px rgba(0,0,0,0.15))',
            mt: 1.5,
            minWidth: 280,
            maxWidth: 320,
            borderRadius: 3,
            border: '1px solid rgba(37, 99, 235, 0.1)',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 12,
              height: 12,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              border: '1px solid rgba(37, 99, 235, 0.1)',
              borderBottom: 'none',
              borderRight: 'none',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          root: {
            slotProps: {
              backdrop: {
                sx: { position: 'fixed' },
              },
            },
          },
        }}
      >
        {/* User Info Header */}
        <Box sx={{ px: 2.5, py: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
            {userName}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 1.5, fontSize: '13px' }}
          >
            {userEmail}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {userDepartment && (
              <Chip
                label={userDepartment}
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #1E3A8A 100%)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '11px',
                  height: 24,
                }}
              />
            )}
            <Chip
              label={userRole.replace(/_/g, ' ')}
              size="small"
              variant="outlined"
              sx={{
                borderColor: '#2563EB',
                color: '#2563EB',
                fontWeight: 600,
                fontSize: '11px',
                height: 24,
              }}
            />
          </Box>
        </Box>

        <Divider />

        {/* Change Password */}
        <MenuItem
          onClick={handleChangePasswordClick}
          sx={{
            py: 1.5,
            px: 2.5,
            '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.06)' },
            transition: 'all 0.2s ease',
          }}
        >
          <ListItemIcon>
            <LockResetIcon fontSize="small" sx={{ color: '#2563EB' }} />
          </ListItemIcon>
          <ListItemText>
            <Typography fontWeight={600} sx={{ color: '#1E3A8A' }}>Change Password</Typography>
          </ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem 
          onClick={handleLogoutClick}
          sx={{
            py: 1.5,
            px: 2.5,
            '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.08)' },
            transition: 'all 0.2s ease',
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: '#EF4444' }} />
          </ListItemIcon>
          <ListItemText>
            <Typography color="error" fontWeight={600}>Logout</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}