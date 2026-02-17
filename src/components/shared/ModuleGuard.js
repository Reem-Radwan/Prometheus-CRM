import React from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * ModuleGuard
 * ─────────────────────────────────────────────────────
 * Wraps any page to enforce permission checks at the
 * route level. If `allowed` is false the user sees a
 * clean "Access Denied" screen instead of the page.
 *
 * Usage:
 *   <ModuleGuard allowed={access.canAccessHR}>
 *     <HR />
 *   </ModuleGuard>
 */
export default function ModuleGuard({ allowed, children }) {
  const navigate = useNavigate();

  if (allowed) return children;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '62vh',
      }}
    >
      <Card
        sx={{
          maxWidth: 440,
          width: '100%',
          p: { xs: 4, sm: 6 },
          textAlign: 'center',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mx: 'auto', mb: 3,
            boxShadow: '0 4px 12px rgba(220,38,38,0.2)',
          }}
        >
          <LockIcon sx={{ fontSize: 38, color: '#DC2626' }} />
        </Box>

        <Typography variant="h4" fontWeight={800} sx={{ mb: 1, color: '#111827' }}>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          You don't have permission to access this page.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, opacity: 0.75 }}>
          Contact your system administrator if you believe this is a mistake.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            minWidth: 180,
            py: 1.5,
            borderRadius: '10px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
            boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(37,99,235,0.45)' },
            transition: 'all 0.25s ease',
          }}
        >
          Back to Dashboard
        </Button>
      </Card>
    </Box>
  );
}