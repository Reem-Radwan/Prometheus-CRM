import React from 'react';
import { Box, Typography, Card, Grid, Button } from '@mui/material';
import { 
  People as PeopleIcon,
  Handshake as HandshakeIcon,
  Campaign as CampaignIcon,
  LocationOn as LocationOnIcon,
  Groups as GroupsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/shared/PageHeader';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: { xs: 4, sm: 5, md: 0 } }}>
      <PageHeader
        title="Welcome to Prometheus CRM"
        subtitle="Your enterprise real estate management system"
      />

      <Grid container spacing={3}>
        {/* Leads Module Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card 
            sx={{ 
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <PeopleIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
              </Box>
              <Box>
                <Typography variant="h3" gutterBottom>
                  Leads
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your potential customers
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Button 
              variant="contained" 
              fullWidth
              onClick={() => navigate('/leads')}
              sx={{ mt: 2 }}
            >
              Go to Leads
            </Button>
          </Card>
        </Grid>

        {/* Coming Soon - Partners */}
        <Grid item xs={12} md={6} lg={4}>
          <Card 
            sx={{ 
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '12px',
                  backgroundColor: '#E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <HandshakeIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
              </Box>
              <Box>
                <Typography variant="h3" color="text.secondary">
                  Partners
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Coming soon
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Button 
              variant="outlined" 
              fullWidth
              disabled
              sx={{ mt: 2 }}
            >
              Coming Soon
            </Button>
          </Card>
        </Grid>

        {/* Coming Soon - Marketing */}
        <Grid item xs={12} md={6} lg={4}>
          <Card 
            sx={{ 
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '12px',
                  backgroundColor: '#E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <CampaignIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
              </Box>
              <Box>
                <Typography variant="h3" color="text.secondary">
                  Marketing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Coming soon
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Button 
              variant="outlined" 
              fullWidth
              disabled
              sx={{ mt: 2 }}
            >
              Coming Soon
            </Button>
          </Card>
        </Grid>

        {/* Coming Soon - Locations */}
        <Grid item xs={12} md={6} lg={4}>
          <Card 
            sx={{ 
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '12px',
                  backgroundColor: '#E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <LocationOnIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
              </Box>
              <Box>
                <Typography variant="h3" color="text.secondary">
                  Locations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Coming soon
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Button 
              variant="outlined" 
              fullWidth
              disabled
              sx={{ mt: 2 }}
            >
              Coming Soon
            </Button>
          </Card>
        </Grid>

        {/* Coming Soon - HR */}
        <Grid item xs={12} md={6} lg={4}>
          <Card 
            sx={{ 
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '12px',
                  backgroundColor: '#E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <GroupsIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
              </Box>
              <Box>
                <Typography variant="h3" color="text.secondary">
                  HR
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Coming soon
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Button 
              variant="outlined" 
              fullWidth
              disabled
              sx={{ mt: 2 }}
            >
              Coming Soon
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}