import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

const drawerWidth = 240;

export default function Layout({ children }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: '#F5F7FA',
      overflow: 'hidden',
    }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          minHeight: '100vh',
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
            p: 4,
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
    </Box>
  );
}
