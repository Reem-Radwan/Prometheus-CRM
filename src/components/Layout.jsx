import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';

const drawerWidth = 260;

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      overflow: 'hidden',
    }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          mt: { xs: '64px', md: 0 }, // Account for mobile header
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
              maxWidth: '1400px',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}