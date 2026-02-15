import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  actions,
  compact = false
}) {
  const navigate = useNavigate();

  const headerContent = (
    <Box 
      sx={{ 
        mb: 4,
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)',
        borderRadius: '16px',
        p: 3,
        border: '1px solid #DBEAFE',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 2 }}
        >
          {breadcrumbs.map((crumb, index) => (
            <Link
              key={index}
              underline="hover"
              color={crumb.active ? 'primary' : 'inherit'}
              sx={{ 
                cursor: crumb.href ? 'pointer' : 'default',
                fontWeight: crumb.active ? 600 : 400,
                fontSize: '14px',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
              onClick={() => crumb.href && navigate(crumb.href)}
            >
              {crumb.label}
            </Link>
          ))}
        </Breadcrumbs>
      )}

      {/* Header with Title and Actions */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        gap: 3,
        flexDirection: { xs: 'column', sm: 'row' },
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h1" 
            sx={{ 
              mb: 1,
              background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '15px',
                maxWidth: '600px',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {/* Action Buttons */}
        {actions && (
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            flexShrink: 0,
            width: { xs: '100%', sm: 'auto' },
          }}>
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );

  // If compact, wrap in container with same width as form (1000px)
  if (compact) {
    return (
      <Box sx={{ maxWidth: '1000px', mx: 'auto', width: '100%' }}>
        {headerContent}
      </Box>
    );
  }

  // Otherwise, return header content directly (full width)
  return headerContent;
}