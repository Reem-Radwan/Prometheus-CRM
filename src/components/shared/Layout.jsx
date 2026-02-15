import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
      }}
    >
      {/* Header */}
      <Header onMenuClick={handleMenuClick} />

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '70px', // Account for fixed header
          minHeight: 'calc(100vh - 70px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '1600px',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>

      {/* Backdrop when sidebar is open */}
      {sidebarOpen && (
        <Box
          onClick={handleSidebarClose}
          sx={{
            position: 'fixed',
            top: 70,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1100,
          }}
        />
      )}
    </Box>
  );
}