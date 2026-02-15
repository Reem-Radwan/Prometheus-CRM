import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  HomeWork as HomeWorkIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Navigate to login page
    navigate('/login');
    setLogoutDialogOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <>
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '12px',
                  padding: '2px',
                  background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0.6,
                },
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
                  background: 'linear-gradient(135deg, #FCD34D 0%, #FBBF24 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                }}
              >
                Prometheus
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#BFDBFE',
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

        {/* Right Side - Logout Button */}
        <Tooltip title="Logout" arrow>
          <IconButton
            onClick={handleLogoutClick}
            sx={{
              color: '#FFFFFF',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(239, 68, 68, 0.3)',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: '20px',
            borderBottom: '1px solid #E5E7EB',
            pb: 2,
          }}
        >
          Confirm Logout
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Are you sure you want to logout from your account?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button
            onClick={handleLogoutCancel}
            variant="outlined"
            sx={{
              minWidth: '100px',
              borderColor: '#E5E7EB',
              color: 'text.primary',
              '&:hover': {
                borderColor: '#9CA3AF',
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            sx={{
              minWidth: '100px',
              backgroundColor: '#EF4444',
              '&:hover': {
                backgroundColor: '#DC2626',
              },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}