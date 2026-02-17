// import React from 'react';
// import { Box, Typography, Card, Grid, Button } from '@mui/material';
// import { 
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   LocationOn as LocationOnIcon,
//   Groups as GroupsIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../components/shared/PageHeader';

// export default function Dashboard() {
//   const navigate = useNavigate();

//   return (
//     <Box>
//       <PageHeader
//         title="Welcome to Prometheus CRM"
//         subtitle="Your enterprise real estate management system"
//       />

//       <Grid container spacing={3}>
//         {/* Leads Module Card */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-4px)',
//                 boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//               }
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <PeopleIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" gutterBottom>
//                   Leads
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Manage your potential customers
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="contained" 
//               fullWidth
//               onClick={() => navigate('/leads')}
//               sx={{ mt: 2 }}
//             >
//               Go to Leads
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Partners */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <HandshakeIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Partners
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Marketing */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <CampaignIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Marketing
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Locations */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <LocationOnIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Locations
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - HR */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <GroupsIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   HR
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }



// ===================================================================
// MINIMAL FIX: Dashboard.js
// This version works WITHOUT AuthContext
// Just improves the UI and adds user greeting
// ===================================================================

// import React from 'react';
// import { Box, Typography, Card, Grid, Button, Chip } from '@mui/material';
// import { 
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   LocationOn as LocationOnIcon,
//   Groups as GroupsIcon,
//   TrendingUp as TrendingUpIcon,
//   CalendarToday as CalendarTodayIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../components/shared/PageHeader';
// import { DataService } from '../data/mod1dataService';

// export default function Dashboard() {
//   const navigate = useNavigate();

//   // Get user data from localStorage (set by Login page)
//   const getUserData = () => {
//     const userDataStr = localStorage.getItem('userData');
//     if (!userDataStr) return null;
//     try {
//       return JSON.parse(userDataStr);
//     } catch {
//       return null;
//     }
//   };

//   const user = getUserData();

//   // Get statistics
//   const leads = DataService.getLeads();
//   const todayDate = new Date().toISOString().split('T')[0];
//   const todayLeads = leads.filter(lead => lead.created_at === todayDate).length;

//   // Extract user info with fallbacks
//   const userName = user?.full_name || user?.username || 'User';
//   const userDepartment = user?.department || 'Sales';
//   const userRole = user?.role || 'team_member';

//   return (
//     <Box>
//       {/* Personalized Header */}
//       <PageHeader
//         title={`Welcome back, ${userName.split(' ')[0]}! 👋`}
//         subtitle={
//           <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
//             <Chip 
//               label={userDepartment} 
//               size="small" 
//               color="primary" 
//               variant="outlined"
//               sx={{ fontWeight: 600 }}
//             />
//             <Typography variant="body2" color="text.secondary">
//               {userRole.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
//             </Typography>
//           </Box>
//         }
//       />

//       {/* Quick Statistics */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Total Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <PeopleIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {todayLeads}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Today's Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <CalendarTodayIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length > 0 ? Math.round((todayLeads / leads.length) * 100) : 0}%
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Growth Rate
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <TrendingUpIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Modules Section */}
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
//           Your Modules
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Access different sections of the CRM system
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Leads Module Card - Always visible */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-4px)',
//                 boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//               }
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <PeopleIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" gutterBottom>
//                   Leads
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Manage your potential customers
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="contained" 
//               fullWidth
//               onClick={() => navigate('/leads')}
//               sx={{ mt: 2 }}
//             >
//               Go to Leads
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Partners */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <HandshakeIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Partners
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Marketing */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <CampaignIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Marketing
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Locations */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <LocationOnIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Locations
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - HR */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <GroupsIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   HR
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }








// import React from 'react';
// import { Box, Typography, Card, Grid, Button, Chip } from '@mui/material';
// import { 
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   LocationOn as LocationOnIcon,
//   Groups as GroupsIcon,
//   TrendingUp as TrendingUpIcon,
//   CalendarToday as CalendarTodayIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../components/shared/PageHeader';
// import { DataService } from '../data/mod1dataService';

// export default function Dashboard() {
//   const navigate = useNavigate();

//   // Get user data from localStorage (set by Login page)
//   const getUserData = () => {
//     const userDataStr = localStorage.getItem('userData');
//     if (!userDataStr) return null;
//     try {
//       return JSON.parse(userDataStr);
//     } catch {
//       return null;
//     }
//   };

//   const user = getUserData();

//   // Get statistics
//   const leads = DataService.getLeads();
//   const todayDate = new Date().toISOString().split('T')[0];
//   const todayLeads = leads.filter(lead => lead.created_at === todayDate).length;

//   // Extract user info with fallbacks
//   const userName = user?.full_name || user?.username || 'User';
//   const userDepartment = user?.department || 'Sales';
//   const userRole = user?.role || 'team_member';

//   return (
//     <Box>
//       {/* Personalized Header */}
//       <PageHeader
//         title={`Welcome back, ${userName.split(' ')[0]}! 👋`}
//         subtitle={
//           <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
//             <Chip 
//               label={userDepartment} 
//               size="small" 
//               color="primary" 
//               variant="outlined"
//               sx={{ fontWeight: 600 }}
//             />
//             <Typography variant="body2" color="text.secondary">
//               {userRole.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
//             </Typography>
//           </Box>
//         }
//       />

//       {/* Quick Statistics */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Total Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <PeopleIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {todayLeads}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Today's Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <CalendarTodayIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length > 0 ? Math.round((todayLeads / leads.length) * 100) : 0}%
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Growth Rate
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <TrendingUpIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Modules Section */}
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
//           Your Modules
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Access different sections of the CRM system
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Leads Module Card - Always visible */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-4px)',
//                 boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//               }
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <PeopleIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" gutterBottom>
//                   Leads
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Manage your potential customers
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="contained" 
//               fullWidth
//               onClick={() => navigate('/leads')}
//               sx={{ mt: 2 }}
//             >
//               Go to Leads
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Partners */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <HandshakeIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Partners
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Marketing */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <CampaignIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Marketing
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Locations */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <LocationOnIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Locations
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - HR */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <GroupsIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   HR
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }


// ===================================================================
// INTEGRATED Dashboard.js
// Uses AuthContext for user data and authentication state
// ===================================================================

// import React from 'react';
// import { Box, Typography, Card, Grid, Button, Chip, Avatar } from '@mui/material';
// import { 
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   LocationOn as LocationOnIcon,
//   Groups as GroupsIcon,
//   TrendingUp as TrendingUpIcon,
//   CalendarToday as CalendarTodayIcon,
//   PersonOutline as PersonOutlineIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../components/shared/PageHeader';
// import { DataService } from '../data/mod1dataService';
// import { useAuth } from '../contexts/AuthContext';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { user, hasPermission, hasRole } = useAuth();

//   // Get statistics
//   const leads = DataService.getLeads();
//   const todayDate = new Date().toISOString().split('T')[0];
//   const todayLeads = leads.filter(lead => lead.created_at === todayDate).length;

//   // Extract user info with fallbacks
//   const userName = user?.full_name || user?.username || 'User';
//   const userDepartment = user?.department || 'Unknown';
//   const userRole = user?.role || 'team_member';
//   const userEmail = user?.email || '';

//   // Get initials for avatar
//   const getInitials = (name) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   // Role-based statistics display
//   const canViewAllLeads = hasPermission('can_view_team_leads') || hasRole(['admin', 'manager']);

//   return (
//     <Box>
//       {/* Personalized Header with User Avatar */}
//       <Box sx={{ mb: 4 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//           <Avatar
//             sx={{
//               width: 56,
//               height: 56,
//               background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
//               fontSize: 20,
//               fontWeight: 700,
//             }}
//           >
//             {getInitials(userName)}
//           </Avatar>
//           <Box>
//             <Typography variant="h4" fontWeight={700}>
//               Welcome back, {userName.split(' ')[0]}! 👋
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
//               <Chip 
//                 label={userDepartment} 
//                 size="small" 
//                 color="primary" 
//                 variant="outlined"
//                 sx={{ fontWeight: 600 }}
//               />
//               <Typography variant="body2" color="text.secondary">
//                 {userRole.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
//               </Typography>
//               {userEmail && (
//                 <>
//                   <Typography variant="body2" color="text.secondary">•</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {userEmail}
//                   </Typography>
//                 </>
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       {/* Quick Statistics */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
//               cursor: 'pointer',
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-4px)',
//                 boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4)',
//               }
//             }}
//             onClick={() => navigate('/leads')}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   {canViewAllLeads ? 'Total Leads' : 'My Leads'}
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <PeopleIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {todayLeads}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Today's Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <CalendarTodayIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length > 0 ? Math.round((todayLeads / leads.length) * 100) : 0}%
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Growth Rate
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <TrendingUpIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Permissions Info Card (for debugging/demo) */}
//       {user && user.permissions && (
//         <Card 
//           sx={{ 
//             p: 2.5, 
//             mb: 4, 
//             backgroundColor: '#F0F9FF',
//             border: '1px solid #BAE6FD'
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//             <PersonOutlineIcon sx={{ color: '#0284C7' }} />
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="subtitle2" fontWeight={600} color="#0369A1">
//                 Your Permissions
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 {Object.entries(user.permissions)
//                   .filter(([_, value]) => value)
//                   .map(([key]) => key.replace(/can_/g, '').replace(/_/g, ' '))
//                   .join(' • ')}
//               </Typography>
//             </Box>
//           </Box>
//         </Card>
//       )}

//       {/* Modules Section */}
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
//           Your Modules
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Access different sections of the CRM system
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Leads Module Card - Conditionally shown based on permissions */}
//         {(hasPermission('can_view_own_leads') || hasPermission('can_view_team_leads')) && (
//           <Grid item xs={12} md={6} lg={4}>
//             <Card 
//               sx={{ 
//                 p: 3,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 transition: 'all 0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//                 }
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Box 
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: '12px',
//                     background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mr: 2,
//                   }}
//                 >
//                   <PeopleIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" gutterBottom>
//                     Leads
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Manage {canViewAllLeads ? 'all' : 'your'} potential customers
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ flexGrow: 1 }} />
              
//               <Button 
//                 variant="contained" 
//                 fullWidth
//                 onClick={() => navigate('/leads')}
//                 sx={{ 
//                   mt: 2,
//                   background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                 }}
//               >
//                 Go to Leads
//               </Button>
//             </Card>
//           </Grid>
//         )}

//         {/* Coming Soon - Partners */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <HandshakeIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h6" color="text.secondary">
//                   Partners
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Marketing */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <CampaignIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h6" color="text.secondary">
//                   Marketing
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Locations */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <LocationOnIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h6" color="text.secondary">
//                   Locations
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - HR (only show for HR users or admins) */}
//         {(hasPermission('can_manage_employees') || hasRole('admin')) && (
//           <Grid item xs={12} md={6} lg={4}>
//             <Card 
//               sx={{ 
//                 p: 3,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 backgroundColor: '#F9FAFB',
//                 border: '1px solid #E5E7EB',
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Box 
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: '12px',
//                     backgroundColor: '#E5E7EB',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mr: 2,
//                   }}
//                 >
//                   <GroupsIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" color="text.secondary">
//                     HR
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Coming soon
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ flexGrow: 1 }} />
              
//               <Button 
//                 variant="outlined" 
//                 fullWidth
//                 disabled
//                 sx={{ mt: 2 }}
//               >
//                 Coming Soon
//               </Button>
//             </Card>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// }


// import React from 'react';
// import { Box, Typography, Card, Grid, Button, Chip, Avatar } from '@mui/material';
// import { 
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   LocationOn as LocationOnIcon,
//   Groups as GroupsIcon,
//   TrendingUp as TrendingUpIcon,
//   CalendarToday as CalendarTodayIcon,
//   PersonOutline as PersonOutlineIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../components/shared/PageHeader';
// import { LeadsDataService } from '../data/leadsDataService';
// import { useAuth } from '../contexts/AuthContext';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { user, hasPermission, hasRole } = useAuth();

//   // Get statistics from leads data
//   const leads = LeadsDataService.getLeads();
//   const todayDate = new Date().toISOString().split('T')[0];
//   const todayLeads = leads.filter(lead => 
//     lead.created_at.startsWith(todayDate)
//   ).length;

//   // Extract user info - UPDATED to match API structure
//   const userName = user?.full_name || user?.username || 'User';
//   const userEmail = user?.email || '';
//   const userDepartment = user?.department_name || 'Unknown'; // ✅ Use department_name
//   const userDepartmentId = user?.department || 0; // ✅ Department ID
//   const userRole = user?.role || 'team_member';
//   const userPhone = user?.phone || '';
//   const userNationalId = user?.national_id || '';
//   const isActive = user?.is_active ?? true;

//   // Get initials for avatar
//   const getInitials = (name) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   // Role-based statistics display
//   const canViewAllLeads = hasPermission('can_view_team_leads') || hasRole(['admin', 'manager']);

//   return (
//     <Box>
//       {/* Personalized Header with User Avatar */}
//       <Box sx={{ mb: 4 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//           <Avatar
//             sx={{
//               width: 56,
//               height: 56,
//               background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
//               fontSize: 20,
//               fontWeight: 700,
//             }}
//           >
//             {getInitials(userName)}
//           </Avatar>
//           <Box>
//             <Typography variant="h4" fontWeight={700}>
//               Welcome back, {userName.split(' ')[0]}! 👋
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5, flexWrap: 'wrap' }}>
//               <Chip 
//                 label={userDepartment} 
//                 size="small" 
//                 color="primary" 
//                 variant="outlined"
//                 sx={{ fontWeight: 600 }}
//               />
//               <Typography variant="body2" color="text.secondary">
//                 {userRole.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
//               </Typography>
//               {userEmail && (
//                 <>
//                   <Typography variant="body2" color="text.secondary">•</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {userEmail}
//                   </Typography>
//                 </>
//               )}
//               {!isActive && (
//                 <Chip 
//                   label="Inactive" 
//                   size="small" 
//                   color="error" 
//                   variant="outlined"
//                 />
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       {/* Quick Statistics */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
//               cursor: 'pointer',
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-4px)',
//                 boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4)',
//               }
//             }}
//             onClick={() => navigate('/leads')}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   {canViewAllLeads ? 'Total Leads' : 'My Leads'}
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <PeopleIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {todayLeads}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Today's Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <CalendarTodayIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length > 0 ? Math.round((todayLeads / leads.length) * 100) : 0}%
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Growth Rate
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <TrendingUpIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* User Details Card - Shows API-aligned data */}
//       {user && user.permissions && (
//         <Card 
//           sx={{ 
//             p: 3, 
//             mb: 4, 
//             backgroundColor: '#F0F9FF',
//             border: '1px solid #BAE6FD'
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
//             <PersonOutlineIcon sx={{ color: '#0284C7', fontSize: 28 }} />
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="h6" fontWeight={600} color="#0369A1" gutterBottom>
//                 Your Profile Information
//               </Typography>
              
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <Typography variant="caption" color="text.secondary">
//                     Full Name
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {userName}
//                   </Typography>
//                 </Grid>
                
//                 <Grid item xs={12} sm={6} md={3}>
//                   <Typography variant="caption" color="text.secondary">
//                     Department
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {userDepartment} (ID: {userDepartmentId})
//                   </Typography>
//                 </Grid>
                
//                 {userPhone && (
//                   <Grid item xs={12} sm={6} md={3}>
//                     <Typography variant="caption" color="text.secondary">
//                       Phone
//                     </Typography>
//                     <Typography variant="body2" fontWeight={600}>
//                       {userPhone}
//                     </Typography>
//                   </Grid>
//                 )}
                
//                 {userNationalId && (
//                   <Grid item xs={12} sm={6} md={3}>
//                     <Typography variant="caption" color="text.secondary">
//                       National ID
//                     </Typography>
//                     <Typography variant="body2" fontWeight={600}>
//                       {userNationalId}
//                     </Typography>
//                   </Grid>
//                 )}
//               </Grid>
              
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
//                   Your Permissions
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                   {Object.entries(user.permissions)
//                     .filter(([_, value]) => value)
//                     .map(([key]) => (
//                       <Chip
//                         key={key}
//                         label={key.replace(/can_/g, '').replace(/_/g, ' ')}
//                         size="small"
//                         sx={{
//                           backgroundColor: '#DBEAFE',
//                           color: '#1E40AF',
//                           fontWeight: 500,
//                           fontSize: '11px'
//                         }}
//                       />
//                     ))}
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         </Card>
//       )}

//       {/* Modules Section */}
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
//           Your Modules
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Access different sections of the CRM system
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Leads Module Card - Conditionally shown based on permissions */}
//         {(hasPermission('can_view_own_leads') || hasPermission('can_view_team_leads')) && (
//           <Grid item xs={12} md={6} lg={4}>
//             <Card 
//               sx={{ 
//                 p: 3,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 transition: 'all 0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//                 }
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Box 
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: '12px',
//                     background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mr: 2,
//                   }}
//                 >
//                   <PeopleIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" gutterBottom>
//                     Leads
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Manage {canViewAllLeads ? 'all' : 'your'} potential customers
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ flexGrow: 1 }} />
              
//               <Button 
//                 variant="contained" 
//                 fullWidth
//                 onClick={() => navigate('/leads')}
//                 sx={{ 
//                   mt: 2,
//                   background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                 }}
//               >
//                 Go to Leads
//               </Button>
//             </Card>
//           </Grid>
//         )}

//         {/* Coming Soon - Partners */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <HandshakeIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h6" color="text.secondary">
//                   Partners
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Marketing (Admin only) */}
//         {hasPermission('can_manage_config') && (
//           <Grid item xs={12} md={6} lg={4}>
//             <Card 
//               sx={{ 
//                 p: 3,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 backgroundColor: '#F9FAFB',
//                 border: '1px solid #E5E7EB',
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Box 
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: '12px',
//                     backgroundColor: '#E5E7EB',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mr: 2,
//                   }}
//                 >
//                   <CampaignIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" color="text.secondary">
//                     Marketing
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Coming soon
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ flexGrow: 1 }} />
              
//               <Button 
//                 variant="outlined" 
//                 fullWidth
//                 disabled
//                 sx={{ mt: 2 }}
//               >
//                 Coming Soon
//               </Button>
//             </Card>
//           </Grid>
//         )}

//         {/* Coming Soon - HR (only show for HR users or admins) */}
//         {(hasPermission('can_manage_employees') || hasRole('admin')) && (
//           <Grid item xs={12} md={6} lg={4}>
//             <Card 
//               sx={{ 
//                 p: 3,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 backgroundColor: '#F9FAFB',
//                 border: '1px solid #E5E7EB',
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Box 
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: '12px',
//                     backgroundColor: '#E5E7EB',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mr: 2,
//                   }}
//                 >
//                   <GroupsIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" color="text.secondary">
//                     HR
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Coming soon
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ flexGrow: 1 }} />
              
//               <Button 
//                 variant="outlined" 
//                 fullWidth
//                 disabled
//                 sx={{ mt: 2 }}
//               >
//                 Coming Soon
//               </Button>
//             </Card>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// }


// import React from 'react';
// import {
//   Box, Card, Grid, Button, Chip, Avatar, Typography,
// } from '@mui/material';
// import {
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   Groups as GroupsIcon,
//   TrendingUp as TrendingUpIcon,
//   CalendarToday as CalendarTodayIcon,
//   LocationOn as LocationOnIcon,
//   Event as EventIcon,
//   Apartment as ApartmentIcon,
//   HomeWork as HomeWorkIcon,
//   Badge as BadgeIcon,
//   AccountTree as OrgIcon,
//   Lock as LockIcon,
//   CheckCircle as CheckCircleIcon,
//   Add as AddIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { DataService }          from '../data/mod1dataService';
// import { PartnersDataService }  from '../data/partnersDataService';
// import { MarketingDataService } from '../data/marketingDataService';
// import { LocationsDataService } from '../data/locationsDataService';
// import { HRDataService }        from '../data/hrDataService';

// // ── Helpers ───────────────────────────────────────────────────────────────
// function getInitials(name = '') {
//   return name.split(' ').map((w) => w[0]).join('').toUpperCase().substring(0, 2);
// }

// const ROLE_STYLES = {
//   admin:             { label: 'Admin',             bg: '#FEE2E2', color: '#991B1B' },
//   manager:           { label: 'Manager',           bg: '#DBEAFE', color: '#1D4ED8' },
//   sales_rep:         { label: 'Sales Rep',         bg: '#DCFCE7', color: '#166534' },
//   hr_manager:        { label: 'HR Manager',        bg: '#EDE9FE', color: '#6D28D9' },
//   call_center_agent: { label: 'Call Center Agent', bg: '#FEF3C7', color: '#92400E' },
// };

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { user, access } = useAuth();

//   const userName  = user?.full_name || user?.username || 'User';
//   const roleStyle = ROLE_STYLES[user?.role] || { label: user?.role || 'User', bg: '#F3F4F6', color: '#374151' };

//   // ── Fetch only what this user is allowed to see ───────────────────────
//   const leads        = access.canAccessLeads     ? DataService.getLeads()               : [];
//   const partners     = access.canAccessPartners  ? PartnersDataService.getPartners()    : [];
//   const campaigns    = access.canAccessMarketing ? MarketingDataService.getCampaigns()  : [];
//   const events       = access.canAccessMarketing ? MarketingDataService.getEvents()     : [];
//   const branches     = access.canAccessLocations ? LocationsDataService.getBranches()   : [];
//   const sites        = access.canAccessLocations ? LocationsDataService.getProjectSites() : [];
//   const employees    = access.canAccessHR        ? HRDataService.getEmployees()         : [];
//   const teams        = access.canAccessHR        ? HRDataService.getTeams()             : [];

//   const today           = new Date().toISOString().split('T')[0];
//   const todayLeads      = leads.filter((l) => l.created_at?.startsWith(today)).length;
//   const activePartners  = partners.filter((p) => p.contract_active).length;
//   const activeCampaigns = campaigns.filter((c) => c.is_active).length;
//   const upcomingEvents  = events.filter((e) => MarketingDataService.getEventStatus(e) === 'Upcoming').length;
//   const activeBranches  = branches.filter((b) => b.is_active).length;
//   const activeSites     = sites.filter((s) => s.is_active).length;
//   const activeEmployees = employees.filter((e) => e.is_active).length;
//   const activeTeams     = teams.filter((t) => t.is_active).length;

//   // ── Stat cards — only shown for modules user can access ───────────────
//   const statCards = [
//     // Leads stats
//     {
//       show:     access.canAccessLeads,
//       label:    access.canViewTeamLeads ? 'Total Leads' : 'My Leads',
//       value:    leads.length,
//       gradient: 'linear-gradient(135deg,#3B82F6,#2563EB)',
//       shadow:   'rgba(37,99,235,0.32)',
//       icon:     <PeopleIcon sx={{ fontSize: 24 }} />,
//       path:     '/leads',
//     },
//     {
//       show:     access.canAccessLeads,
//       label:    "Today's Leads",
//       value:    todayLeads,
//       gradient: 'linear-gradient(135deg,#10B981,#059669)',
//       shadow:   'rgba(16,185,129,0.32)',
//       icon:     <CalendarTodayIcon sx={{ fontSize: 24 }} />,
//     },
//     // Partners stats
//     {
//       show:     access.canAccessPartners,
//       label:    'Active Partners',
//       value:    activePartners,
//       gradient: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
//       shadow:   'rgba(124,58,237,0.32)',
//       icon:     <HandshakeIcon sx={{ fontSize: 24 }} />,
//       path:     '/partners',
//     },
//     // Marketing stats
//     {
//       show:     access.canAccessMarketing,
//       label:    'Active Campaigns',
//       value:    activeCampaigns,
//       gradient: 'linear-gradient(135deg,#0891B2,#06B6D4)',
//       shadow:   'rgba(8,145,178,0.32)',
//       icon:     <CampaignIcon sx={{ fontSize: 24 }} />,
//       path:     '/marketing',
//     },
//     {
//       show:     access.canAccessMarketing,
//       label:    'Upcoming Events',
//       value:    upcomingEvents,
//       gradient: 'linear-gradient(135deg,#EC4899,#F43F5E)',
//       shadow:   'rgba(236,72,153,0.32)',
//       icon:     <EventIcon sx={{ fontSize: 24 }} />,
//       path:     '/marketing?tab=events',
//     },
//     // Locations stats
//     {
//       show:     access.canAccessLocations,
//       label:    'Active Branches',
//       value:    activeBranches,
//       gradient: 'linear-gradient(135deg,#059669,#10B981)',
//       shadow:   'rgba(5,150,105,0.32)',
//       icon:     <ApartmentIcon sx={{ fontSize: 24 }} />,
//       path:     '/locations?tab=branches',
//     },
//     {
//       show:     access.canAccessLocations,
//       label:    'Project Sites',
//       value:    activeSites,
//       gradient: 'linear-gradient(135deg,#0E7490,#0891B2)',
//       shadow:   'rgba(14,116,144,0.32)',
//       icon:     <HomeWorkIcon sx={{ fontSize: 24 }} />,
//       path:     '/locations?tab=sites',
//     },
//     // HR stats
//     {
//       show:     access.canAccessHR,
//       label:    'Active Employees',
//       value:    activeEmployees,
//       gradient: 'linear-gradient(135deg,#DC2626,#F87171)',
//       shadow:   'rgba(220,38,38,0.32)',
//       icon:     <BadgeIcon sx={{ fontSize: 24 }} />,
//       path:     '/hr?tab=employees',
//     },
//     {
//       show:     access.canAccessHR,
//       label:    'Active Teams',
//       value:    activeTeams,
//       gradient: 'linear-gradient(135deg,#9333EA,#C084FC)',
//       shadow:   'rgba(147,51,234,0.32)',
//       icon:     <OrgIcon sx={{ fontSize: 24 }} />,
//       path:     '/hr?tab=teams',
//     },
//   ].filter((s) => s.show);

//   // ── Module cards — ALL shown, locked ones are grayed ──────────────────
//   const moduleCards = [
//     {
//       key:        'leads',
//       title:      'Leads',
//       desc:       access.canViewTeamLeads ? 'Manage all team leads' : 'Manage your leads',
//       icon:       <PeopleIcon sx={{ fontSize: 26 }} />,
//       gradient:   'linear-gradient(135deg,#2563EB,#3B82F6)',
//       path:       '/leads',
//       metric:     leads.length,
//       metricLabel: access.canViewTeamLeads ? 'total leads' : 'my leads',
//       allowed:    !!access.canAccessLeads,
//       quickAction: access.canCreateLeads ? { label: 'New Lead', path: '/leads/create' } : null,
//     },
//     {
//       key:        'partners',
//       title:      'Partners',
//       desc:       'Brokers & ambassadors',
//       icon:       <HandshakeIcon sx={{ fontSize: 26 }} />,
//       gradient:   'linear-gradient(135deg,#7C3AED,#A78BFA)',
//       path:       '/partners',
//       metric:     activePartners,
//       metricLabel: 'active partners',
//       allowed:    !!access.canAccessPartners,
//     },
//     {
//       key:        'marketing',
//       title:      'Marketing',
//       desc:       'Campaigns and events',
//       icon:       <CampaignIcon sx={{ fontSize: 26 }} />,
//       gradient:   'linear-gradient(135deg,#0891B2,#06B6D4)',
//       path:       '/marketing',
//       metric:     activeCampaigns,
//       metricLabel: 'active campaigns',
//       allowed:    !!access.canAccessMarketing,
//       adminOnly:  true,
//     },
//     {
//       key:        'locations',
//       title:      'Locations',
//       desc:       'Branches & project sites',
//       icon:       <LocationOnIcon sx={{ fontSize: 26 }} />,
//       gradient:   'linear-gradient(135deg,#059669,#10B981)',
//       path:       '/locations',
//       metric:     activeBranches + activeSites,
//       metricLabel: `${activeBranches} branches · ${activeSites} sites`,
//       allowed:    !!access.canAccessLocations,
//       adminOnly:  true,
//     },
//     {
//       key:        'hr',
//       title:      'Human Resources',
//       desc:       'Employees & teams',
//       icon:       <GroupsIcon sx={{ fontSize: 26 }} />,
//       gradient:   'linear-gradient(135deg,#DC2626,#F87171)',
//       path:       '/hr',
//       metric:     activeEmployees,
//       metricLabel: `${activeEmployees} employees · ${activeTeams} teams`,
//       allowed:    !!access.canAccessHR,
//     },
//   ];

//   const grantedPerms = Object.entries(user?.permissions || {}).filter(([, v]) => v);

//   return (
//     <Box>
//       {/* ── Welcome header ────────────────────────────────────────────── */}
//       <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Avatar
//             sx={{
//               width: 54, height: 54, fontSize: 19, fontWeight: 800,
//               background: 'linear-gradient(135deg,#2563EB,#0EA5E9)',
//               boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
//             }}
//           >
//             {getInitials(userName)}
//           </Avatar>
//           <Box>
//             <Typography variant="h4" fontWeight={800} sx={{ lineHeight: 1.1, mb: 0.5 }}>
//               Welcome back, {userName.split(' ')[0]}! 👋
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
//               <Chip
//                 label={user?.department_name}
//                 size="small"
//                 color="primary"
//                 variant="outlined"
//                 sx={{ fontWeight: 600, fontSize: '11px' }}
//               />
//               <Chip
//                 label={roleStyle.label}
//                 size="small"
//                 sx={{ fontWeight: 700, fontSize: '11px', backgroundColor: roleStyle.bg, color: roleStyle.color }}
//               />
//               {user?.email && (
//                 <Typography variant="caption" color="text.secondary">{user.email}</Typography>
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       {/* ── Stat cards (only what user can access) ────────────────────── */}
//       {statCards.length > 0 && (
//         <Grid container spacing={2} sx={{ mb: 4 }}>
//           {statCards.map((s) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={s.label}>
//               <Card
//                 onClick={() => s.path && navigate(s.path)}
//                 sx={{
//                   p: 2.5,
//                   background: s.gradient,
//                   color: '#fff',
//                   cursor: s.path ? 'pointer' : 'default',
//                   boxShadow: `0 4px 14px ${s.shadow}`,
//                   transition: 'all 0.25s',
//                   '&:hover': s.path ? { transform: 'translateY(-4px)', boxShadow: `0 10px 24px ${s.shadow}` } : {},
//                   borderRadius: '14px',
//                 }}
//               >
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                   <Box>
//                     <Typography fontWeight={800} sx={{ fontSize: '24px', lineHeight: 1 }}>{s.value}</Typography>
//                     <Typography sx={{ opacity: 0.88, fontSize: '12px', mt: 0.5 }}>{s.label}</Typography>
//                   </Box>
//                   <Box sx={{ p: 1, backgroundColor: 'rgba(255,255,255,0.22)', borderRadius: '10px' }}>
//                     {s.icon}
//                   </Box>
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* ── Permissions summary card ────────────────────────────────────── */}
//       {grantedPerms.length > 0 && (
//         <Card
//           sx={{
//             p: 3, mb: 4,
//             backgroundColor: '#F0F9FF',
//             border: '1px solid #BAE6FD',
//             borderRadius: '14px',
//           }}
//         >
//           <Typography variant="subtitle2" fontWeight={700} color="#0369A1" sx={{ mb: 1.5 }}>
//             🔐 Your Access Permissions
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//             {grantedPerms.map(([key]) => (
//               <Chip
//                 key={key}
//                 icon={<CheckCircleIcon sx={{ fontSize: '13px !important', color: '#1D4ED8 !important' }} />}
//                 label={key.replace(/can_/g, '').replace(/_/g, ' ')}
//                 size="small"
//                 sx={{ backgroundColor: '#DBEAFE', color: '#1E40AF', fontWeight: 600, fontSize: '11px' }}
//               />
//             ))}
//           </Box>
//         </Card>
//       )}

//       {/* ── Module cards ──────────────────────────────────────────────── */}
//       <Box sx={{ mb: 2.5 }}>
//         <Typography variant="h5" fontWeight={800} sx={{ mb: 0.5 }}>Modules</Typography>
//         <Typography variant="body2" color="text.secondary">
//           {moduleCards.filter((m) => m.allowed).length} of {moduleCards.length} modules accessible with your role
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {moduleCards.map((mod) => {
//           const locked = !mod.allowed;
//           return (
//             <Grid item xs={12} sm={6} lg={4} key={mod.key}>
//               <Card
//                 sx={{
//                   p: 3,
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   borderRadius: '16px',
//                   border: locked ? '1px solid #F3F4F6' : '1px solid #E5E7EB',
//                   backgroundColor: locked ? '#FAFAFA' : '#FFFFFF',
//                   opacity: locked ? 0.65 : 1,
//                   transition: 'all 0.25s',
//                   ...(!locked && {
//                     '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.09)' },
//                   }),
//                 }}
//               >
//                 {/* Icon + title */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5, gap: 2 }}>
//                   <Box
//                     sx={{
//                       width: 52, height: 52,
//                       borderRadius: '13px',
//                       background: locked ? '#E5E7EB' : mod.gradient,
//                       display: 'flex', alignItems: 'center', justifyContent: 'center',
//                       flexShrink: 0,
//                       position: 'relative',
//                       color: locked ? '#9CA3AF' : '#FFFFFF',
//                     }}
//                   >
//                     {mod.icon}
//                     {locked && (
//                       <Box
//                         sx={{
//                           position: 'absolute', bottom: -5, right: -5,
//                           width: 20, height: 20, borderRadius: '50%',
//                           background: '#DC2626',
//                           display: 'flex', alignItems: 'center', justifyContent: 'center',
//                           border: '2px solid #FFFFFF',
//                         }}
//                       >
//                         <LockIcon sx={{ fontSize: 10, color: '#FFFFFF' }} />
//                       </Box>
//                     )}
//                   </Box>

//                   <Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <Typography variant="h6" fontWeight={700} color={locked ? 'text.secondary' : 'text.primary'}>
//                         {mod.title}
//                       </Typography>
//                       {mod.adminOnly && !locked && (
//                         <Chip
//                           label="Admin"
//                           size="small"
//                           sx={{ height: 16, fontSize: '9px', fontWeight: 700, backgroundColor: '#FEF3C7', color: '#92400E', '& .MuiChip-label': { px: 0.75 } }}
//                         />
//                       )}
//                     </Box>
//                     <Typography variant="caption" color="text.secondary">{mod.desc}</Typography>
//                   </Box>
//                 </Box>

//                 {/* Metric or locked message */}
//                 {locked ? (
//                   <Box
//                     sx={{
//                       mb: 2, p: 1.5, borderRadius: '10px',
//                       backgroundColor: '#FEE2E2',
//                       display: 'flex', alignItems: 'center', gap: 1,
//                     }}
//                   >
//                     <LockIcon sx={{ fontSize: 14, color: '#DC2626', flexShrink: 0 }} />
//                     <Typography variant="caption" sx={{ color: '#991B1B', fontWeight: 600 }}>
//                       Not accessible with your current role
//                     </Typography>
//                   </Box>
//                 ) : (
//                   <Box sx={{ mb: 2 }}>
//                     <Typography variant="h3" fontWeight={800} sx={{ lineHeight: 1 }}>{mod.metric}</Typography>
//                     <Typography variant="caption" color="text.secondary">{mod.metricLabel}</Typography>
//                   </Box>
//                 )}

//                 <Box sx={{ flexGrow: 1 }} />

//                 {/* Action buttons */}
//                 <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
//                   <Button
//                     variant={locked ? 'outlined' : 'contained'}
//                     fullWidth
//                     disabled={locked}
//                     onClick={() => navigate(mod.path)}
//                     sx={{
//                       borderRadius: '10px',
//                       fontWeight: 700,
//                       ...(!locked && { background: mod.gradient }),
//                       ...(locked && { borderColor: '#E5E7EB', color: '#9CA3AF' }),
//                     }}
//                   >
//                     {locked ? 'No Access' : `Open ${mod.title}`}
//                   </Button>

//                   {mod.quickAction && !locked && (
//                     <Button
//                       variant="outlined"
//                       onClick={() => navigate(mod.quickAction.path)}
//                       sx={{
//                         borderRadius: '10px',
//                         fontWeight: 700,
//                         flexShrink: 0,
//                         minWidth: 0,
//                         px: 1.5,
//                       }}
//                     >
//                       <AddIcon fontSize="small" />
//                     </Button>
//                   )}
//                 </Box>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// }



// import React from 'react';
// import { Box, Typography, Card, Grid, Button } from '@mui/material';
// import { 
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   LocationOn as LocationOnIcon,
//   Groups as GroupsIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../components/shared/PageHeader';

// export default function Dashboard() {
//   const navigate = useNavigate();

//   return (
//     <Box>
//       <PageHeader
//         title="Welcome to Prometheus CRM"
//         subtitle="Your enterprise real estate management system"
//       />

//       <Grid container spacing={3}>
//         {/* Leads Module Card */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-4px)',
//                 boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//               }
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <PeopleIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" gutterBottom>
//                   Leads
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Manage your potential customers
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="contained" 
//               fullWidth
//               onClick={() => navigate('/leads')}
//               sx={{ mt: 2 }}
//             >
//               Go to Leads
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Partners */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <HandshakeIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Partners
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Marketing */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <CampaignIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Marketing
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Locations */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <LocationOnIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Locations
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - HR */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <GroupsIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   HR
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }



// ===================================================================
// MINIMAL FIX: Dashboard.js
// This version works WITHOUT AuthContext
// Just improves the UI and adds user greeting
// ===================================================================

// import React from 'react';
// import { Box, Typography, Card, Grid, Button, Chip } from '@mui/material';
// import { 
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   LocationOn as LocationOnIcon,
//   Groups as GroupsIcon,
//   TrendingUp as TrendingUpIcon,
//   CalendarToday as CalendarTodayIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../components/shared/PageHeader';
// import { DataService } from '../data/mod1dataService';

// export default function Dashboard() {
//   const navigate = useNavigate();

//   // Get user data from localStorage (set by Login page)
//   const getUserData = () => {
//     const userDataStr = localStorage.getItem('userData');
//     if (!userDataStr) return null;
//     try {
//       return JSON.parse(userDataStr);
//     } catch {
//       return null;
//     }
//   };

//   const user = getUserData();

//   // Get statistics
//   const leads = DataService.getLeads();
//   const todayDate = new Date().toISOString().split('T')[0];
//   const todayLeads = leads.filter(lead => lead.created_at === todayDate).length;

//   // Extract user info with fallbacks
//   const userName = user?.full_name || user?.username || 'User';
//   const userDepartment = user?.department || 'Sales';
//   const userRole = user?.role || 'team_member';

//   return (
//     <Box>
//       {/* Personalized Header */}
//       <PageHeader
//         title={`Welcome back, ${userName.split(' ')[0]}! 👋`}
//         subtitle={
//           <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
//             <Chip 
//               label={userDepartment} 
//               size="small" 
//               color="primary" 
//               variant="outlined"
//               sx={{ fontWeight: 600 }}
//             />
//             <Typography variant="body2" color="text.secondary">
//               {userRole.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
//             </Typography>
//           </Box>
//         }
//       />

//       {/* Quick Statistics */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Total Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <PeopleIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {todayLeads}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Today's Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <CalendarTodayIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length > 0 ? Math.round((todayLeads / leads.length) * 100) : 0}%
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Growth Rate
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <TrendingUpIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Modules Section */}
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
//           Your Modules
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Access different sections of the CRM system
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Leads Module Card - Always visible */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-4px)',
//                 boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//               }
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <PeopleIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" gutterBottom>
//                   Leads
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Manage your potential customers
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="contained" 
//               fullWidth
//               onClick={() => navigate('/leads')}
//               sx={{ mt: 2 }}
//             >
//               Go to Leads
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Partners */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <HandshakeIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Partners
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Marketing */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <CampaignIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Marketing
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Locations */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <LocationOnIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Locations
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - HR */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <GroupsIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   HR
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }








// import React from 'react';
// import { Box, Typography, Card, Grid, Button, Chip } from '@mui/material';
// import { 
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   LocationOn as LocationOnIcon,
//   Groups as GroupsIcon,
//   TrendingUp as TrendingUpIcon,
//   CalendarToday as CalendarTodayIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../components/shared/PageHeader';
// import { DataService } from '../data/mod1dataService';

// export default function Dashboard() {
//   const navigate = useNavigate();

//   // Get user data from localStorage (set by Login page)
//   const getUserData = () => {
//     const userDataStr = localStorage.getItem('userData');
//     if (!userDataStr) return null;
//     try {
//       return JSON.parse(userDataStr);
//     } catch {
//       return null;
//     }
//   };

//   const user = getUserData();

//   // Get statistics
//   const leads = DataService.getLeads();
//   const todayDate = new Date().toISOString().split('T')[0];
//   const todayLeads = leads.filter(lead => lead.created_at === todayDate).length;

//   // Extract user info with fallbacks
//   const userName = user?.full_name || user?.username || 'User';
//   const userDepartment = user?.department || 'Sales';
//   const userRole = user?.role || 'team_member';

//   return (
//     <Box>
//       {/* Personalized Header */}
//       <PageHeader
//         title={`Welcome back, ${userName.split(' ')[0]}! 👋`}
//         subtitle={
//           <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
//             <Chip 
//               label={userDepartment} 
//               size="small" 
//               color="primary" 
//               variant="outlined"
//               sx={{ fontWeight: 600 }}
//             />
//             <Typography variant="body2" color="text.secondary">
//               {userRole.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
//             </Typography>
//           </Box>
//         }
//       />

//       {/* Quick Statistics */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Total Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <PeopleIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {todayLeads}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Today's Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <CalendarTodayIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length > 0 ? Math.round((todayLeads / leads.length) * 100) : 0}%
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Growth Rate
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <TrendingUpIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Modules Section */}
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
//           Your Modules
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Access different sections of the CRM system
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Leads Module Card - Always visible */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-4px)',
//                 boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//               }
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <PeopleIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" gutterBottom>
//                   Leads
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Manage your potential customers
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="contained" 
//               fullWidth
//               onClick={() => navigate('/leads')}
//               sx={{ mt: 2 }}
//             >
//               Go to Leads
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Partners */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <HandshakeIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Partners
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Marketing */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <CampaignIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Marketing
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Locations */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <LocationOnIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   Locations
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - HR */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <GroupsIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h3" color="text.secondary">
//                   HR
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }


// ===================================================================
// INTEGRATED Dashboard.js
// Uses AuthContext for user data and authentication state
// ===================================================================

// import React from 'react';
// import { Box, Typography, Card, Grid, Button, Chip, Avatar } from '@mui/material';
// import { 
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   LocationOn as LocationOnIcon,
//   Groups as GroupsIcon,
//   TrendingUp as TrendingUpIcon,
//   CalendarToday as CalendarTodayIcon,
//   PersonOutline as PersonOutlineIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../components/shared/PageHeader';
// import { DataService } from '../data/mod1dataService';
// import { useAuth } from '../contexts/AuthContext';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { user, hasPermission, hasRole } = useAuth();

//   // Get statistics
//   const leads = DataService.getLeads();
//   const todayDate = new Date().toISOString().split('T')[0];
//   const todayLeads = leads.filter(lead => lead.created_at === todayDate).length;

//   // Extract user info with fallbacks
//   const userName = user?.full_name || user?.username || 'User';
//   const userDepartment = user?.department || 'Unknown';
//   const userRole = user?.role || 'team_member';
//   const userEmail = user?.email || '';

//   // Get initials for avatar
//   const getInitials = (name) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   // Role-based statistics display
//   const canViewAllLeads = hasPermission('can_view_team_leads') || hasRole(['admin', 'manager']);

//   return (
//     <Box>
//       {/* Personalized Header with User Avatar */}
//       <Box sx={{ mb: 4 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//           <Avatar
//             sx={{
//               width: 56,
//               height: 56,
//               background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
//               fontSize: 20,
//               fontWeight: 700,
//             }}
//           >
//             {getInitials(userName)}
//           </Avatar>
//           <Box>
//             <Typography variant="h4" fontWeight={700}>
//               Welcome back, {userName.split(' ')[0]}! 👋
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
//               <Chip 
//                 label={userDepartment} 
//                 size="small" 
//                 color="primary" 
//                 variant="outlined"
//                 sx={{ fontWeight: 600 }}
//               />
//               <Typography variant="body2" color="text.secondary">
//                 {userRole.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
//               </Typography>
//               {userEmail && (
//                 <>
//                   <Typography variant="body2" color="text.secondary">•</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {userEmail}
//                   </Typography>
//                 </>
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       {/* Quick Statistics */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
//               cursor: 'pointer',
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-4px)',
//                 boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4)',
//               }
//             }}
//             onClick={() => navigate('/leads')}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   {canViewAllLeads ? 'Total Leads' : 'My Leads'}
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <PeopleIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {todayLeads}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Today's Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <CalendarTodayIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length > 0 ? Math.round((todayLeads / leads.length) * 100) : 0}%
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Growth Rate
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <TrendingUpIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Permissions Info Card (for debugging/demo) */}
//       {user && user.permissions && (
//         <Card 
//           sx={{ 
//             p: 2.5, 
//             mb: 4, 
//             backgroundColor: '#F0F9FF',
//             border: '1px solid #BAE6FD'
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//             <PersonOutlineIcon sx={{ color: '#0284C7' }} />
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="subtitle2" fontWeight={600} color="#0369A1">
//                 Your Permissions
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 {Object.entries(user.permissions)
//                   .filter(([_, value]) => value)
//                   .map(([key]) => key.replace(/can_/g, '').replace(/_/g, ' '))
//                   .join(' • ')}
//               </Typography>
//             </Box>
//           </Box>
//         </Card>
//       )}

//       {/* Modules Section */}
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
//           Your Modules
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Access different sections of the CRM system
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Leads Module Card - Conditionally shown based on permissions */}
//         {(hasPermission('can_view_own_leads') || hasPermission('can_view_team_leads')) && (
//           <Grid item xs={12} md={6} lg={4}>
//             <Card 
//               sx={{ 
//                 p: 3,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 transition: 'all 0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//                 }
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Box 
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: '12px',
//                     background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mr: 2,
//                   }}
//                 >
//                   <PeopleIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" gutterBottom>
//                     Leads
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Manage {canViewAllLeads ? 'all' : 'your'} potential customers
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ flexGrow: 1 }} />
              
//               <Button 
//                 variant="contained" 
//                 fullWidth
//                 onClick={() => navigate('/leads')}
//                 sx={{ 
//                   mt: 2,
//                   background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                 }}
//               >
//                 Go to Leads
//               </Button>
//             </Card>
//           </Grid>
//         )}

//         {/* Coming Soon - Partners */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <HandshakeIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h6" color="text.secondary">
//                   Partners
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Marketing */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <CampaignIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h6" color="text.secondary">
//                   Marketing
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Locations */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <LocationOnIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h6" color="text.secondary">
//                   Locations
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - HR (only show for HR users or admins) */}
//         {(hasPermission('can_manage_employees') || hasRole('admin')) && (
//           <Grid item xs={12} md={6} lg={4}>
//             <Card 
//               sx={{ 
//                 p: 3,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 backgroundColor: '#F9FAFB',
//                 border: '1px solid #E5E7EB',
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Box 
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: '12px',
//                     backgroundColor: '#E5E7EB',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mr: 2,
//                   }}
//                 >
//                   <GroupsIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" color="text.secondary">
//                     HR
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Coming soon
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ flexGrow: 1 }} />
              
//               <Button 
//                 variant="outlined" 
//                 fullWidth
//                 disabled
//                 sx={{ mt: 2 }}
//               >
//                 Coming Soon
//               </Button>
//             </Card>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// }


// import React from 'react';
// import { Box, Typography, Card, Grid, Button, Chip, Avatar } from '@mui/material';
// import { 
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   LocationOn as LocationOnIcon,
//   Groups as GroupsIcon,
//   TrendingUp as TrendingUpIcon,
//   CalendarToday as CalendarTodayIcon,
//   PersonOutline as PersonOutlineIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../components/shared/PageHeader';
// import { LeadsDataService } from '../data/leadsDataService';
// import { useAuth } from '../contexts/AuthContext';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { user, hasPermission, hasRole } = useAuth();

//   // Get statistics from leads data
//   const leads = LeadsDataService.getLeads();
//   const todayDate = new Date().toISOString().split('T')[0];
//   const todayLeads = leads.filter(lead => 
//     lead.created_at.startsWith(todayDate)
//   ).length;

//   // Extract user info - UPDATED to match API structure
//   const userName = user?.full_name || user?.username || 'User';
//   const userEmail = user?.email || '';
//   const userDepartment = user?.department_name || 'Unknown'; // ✅ Use department_name
//   const userDepartmentId = user?.department || 0; // ✅ Department ID
//   const userRole = user?.role || 'team_member';
//   const userPhone = user?.phone || '';
//   const userNationalId = user?.national_id || '';
//   const isActive = user?.is_active ?? true;

//   // Get initials for avatar
//   const getInitials = (name) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   // Role-based statistics display
//   const canViewAllLeads = hasPermission('can_view_team_leads') || hasRole(['admin', 'manager']);

//   return (
//     <Box>
//       {/* Personalized Header with User Avatar */}
//       <Box sx={{ mb: 4 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//           <Avatar
//             sx={{
//               width: 56,
//               height: 56,
//               background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
//               fontSize: 20,
//               fontWeight: 700,
//             }}
//           >
//             {getInitials(userName)}
//           </Avatar>
//           <Box>
//             <Typography variant="h4" fontWeight={700}>
//               Welcome back, {userName.split(' ')[0]}! 👋
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5, flexWrap: 'wrap' }}>
//               <Chip 
//                 label={userDepartment} 
//                 size="small" 
//                 color="primary" 
//                 variant="outlined"
//                 sx={{ fontWeight: 600 }}
//               />
//               <Typography variant="body2" color="text.secondary">
//                 {userRole.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
//               </Typography>
//               {userEmail && (
//                 <>
//                   <Typography variant="body2" color="text.secondary">•</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {userEmail}
//                   </Typography>
//                 </>
//               )}
//               {!isActive && (
//                 <Chip 
//                   label="Inactive" 
//                   size="small" 
//                   color="error" 
//                   variant="outlined"
//                 />
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       {/* Quick Statistics */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
//               cursor: 'pointer',
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-4px)',
//                 boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4)',
//               }
//             }}
//             onClick={() => navigate('/leads')}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   {canViewAllLeads ? 'Total Leads' : 'My Leads'}
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <PeopleIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {todayLeads}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Today's Leads
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <CalendarTodayIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <Box>
//                 <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
//                   {leads.length > 0 ? Math.round((todayLeads / leads.length) * 100) : 0}%
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   Growth Rate
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 p: 1.5, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                 borderRadius: '12px' 
//               }}>
//                 <TrendingUpIcon sx={{ fontSize: 32 }} />
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* User Details Card - Shows API-aligned data */}
//       {user && user.permissions && (
//         <Card 
//           sx={{ 
//             p: 3, 
//             mb: 4, 
//             backgroundColor: '#F0F9FF',
//             border: '1px solid #BAE6FD'
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
//             <PersonOutlineIcon sx={{ color: '#0284C7', fontSize: 28 }} />
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="h6" fontWeight={600} color="#0369A1" gutterBottom>
//                 Your Profile Information
//               </Typography>
              
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <Typography variant="caption" color="text.secondary">
//                     Full Name
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {userName}
//                   </Typography>
//                 </Grid>
                
//                 <Grid item xs={12} sm={6} md={3}>
//                   <Typography variant="caption" color="text.secondary">
//                     Department
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {userDepartment} (ID: {userDepartmentId})
//                   </Typography>
//                 </Grid>
                
//                 {userPhone && (
//                   <Grid item xs={12} sm={6} md={3}>
//                     <Typography variant="caption" color="text.secondary">
//                       Phone
//                     </Typography>
//                     <Typography variant="body2" fontWeight={600}>
//                       {userPhone}
//                     </Typography>
//                   </Grid>
//                 )}
                
//                 {userNationalId && (
//                   <Grid item xs={12} sm={6} md={3}>
//                     <Typography variant="caption" color="text.secondary">
//                       National ID
//                     </Typography>
//                     <Typography variant="body2" fontWeight={600}>
//                       {userNationalId}
//                     </Typography>
//                   </Grid>
//                 )}
//               </Grid>
              
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
//                   Your Permissions
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                   {Object.entries(user.permissions)
//                     .filter(([_, value]) => value)
//                     .map(([key]) => (
//                       <Chip
//                         key={key}
//                         label={key.replace(/can_/g, '').replace(/_/g, ' ')}
//                         size="small"
//                         sx={{
//                           backgroundColor: '#DBEAFE',
//                           color: '#1E40AF',
//                           fontWeight: 500,
//                           fontSize: '11px'
//                         }}
//                       />
//                     ))}
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         </Card>
//       )}

//       {/* Modules Section */}
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
//           Your Modules
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Access different sections of the CRM system
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Leads Module Card - Conditionally shown based on permissions */}
//         {(hasPermission('can_view_own_leads') || hasPermission('can_view_team_leads')) && (
//           <Grid item xs={12} md={6} lg={4}>
//             <Card 
//               sx={{ 
//                 p: 3,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 transition: 'all 0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//                 }
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Box 
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: '12px',
//                     background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mr: 2,
//                   }}
//                 >
//                   <PeopleIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" gutterBottom>
//                     Leads
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Manage {canViewAllLeads ? 'all' : 'your'} potential customers
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ flexGrow: 1 }} />
              
//               <Button 
//                 variant="contained" 
//                 fullWidth
//                 onClick={() => navigate('/leads')}
//                 sx={{ 
//                   mt: 2,
//                   background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
//                 }}
//               >
//                 Go to Leads
//               </Button>
//             </Card>
//           </Grid>
//         )}

//         {/* Coming Soon - Partners */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card 
//             sx={{ 
//               p: 3,
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               backgroundColor: '#F9FAFB',
//               border: '1px solid #E5E7EB',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box 
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: '12px',
//                   backgroundColor: '#E5E7EB',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <HandshakeIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//               </Box>
//               <Box>
//                 <Typography variant="h6" color="text.secondary">
//                   Partners
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Coming soon
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Box sx={{ flexGrow: 1 }} />
            
//             <Button 
//               variant="outlined" 
//               fullWidth
//               disabled
//               sx={{ mt: 2 }}
//             >
//               Coming Soon
//             </Button>
//           </Card>
//         </Grid>

//         {/* Coming Soon - Marketing (Admin only) */}
//         {hasPermission('can_manage_config') && (
//           <Grid item xs={12} md={6} lg={4}>
//             <Card 
//               sx={{ 
//                 p: 3,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 backgroundColor: '#F9FAFB',
//                 border: '1px solid #E5E7EB',
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Box 
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: '12px',
//                     backgroundColor: '#E5E7EB',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mr: 2,
//                   }}
//                 >
//                   <CampaignIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" color="text.secondary">
//                     Marketing
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Coming soon
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ flexGrow: 1 }} />
              
//               <Button 
//                 variant="outlined" 
//                 fullWidth
//                 disabled
//                 sx={{ mt: 2 }}
//               >
//                 Coming Soon
//               </Button>
//             </Card>
//           </Grid>
//         )}

//         {/* Coming Soon - HR (only show for HR users or admins) */}
//         {(hasPermission('can_manage_employees') || hasRole('admin')) && (
//           <Grid item xs={12} md={6} lg={4}>
//             <Card 
//               sx={{ 
//                 p: 3,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 backgroundColor: '#F9FAFB',
//                 border: '1px solid #E5E7EB',
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Box 
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: '12px',
//                     backgroundColor: '#E5E7EB',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mr: 2,
//                   }}
//                 >
//                   <GroupsIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" color="text.secondary">
//                     HR
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Coming soon
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ flexGrow: 1 }} />
              
//               <Button 
//                 variant="outlined" 
//                 fullWidth
//                 disabled
//                 sx={{ mt: 2 }}
//               >
//                 Coming Soon
//               </Button>
//             </Card>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// }


import React from 'react';
import {
  Box, Card, Grid, Button, Chip, Avatar, Typography,
} from '@mui/material';
import {
  People as PeopleIcon,
  Handshake as HandshakeIcon,
  Campaign as CampaignIcon,
  Groups as GroupsIcon,
  CalendarToday as CalendarTodayIcon,
  LocationOn as LocationOnIcon,
  Event as EventIcon,
  Apartment as ApartmentIcon,
  HomeWork as HomeWorkIcon,
  Badge as BadgeIcon,
  AccountTree as OrgIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DataService }          from '../data/mod1dataService';
import { PartnersDataService }  from '../data/partnersDataService';
import { MarketingDataService } from '../data/marketingDataService';
import { LocationsDataService } from '../data/locationsDataService';
import { HRDataService }        from '../data/hrDataService';

// ── Helpers ───────────────────────────────────────────────────────────────
function getInitials(name = '') {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().substring(0, 2);
}

const ROLE_STYLES = {
  admin:             { label: 'Admin',             bg: '#FEE2E2', color: '#991B1B' },
  manager:           { label: 'Manager',           bg: '#DBEAFE', color: '#1D4ED8' },
  sales_rep:         { label: 'Sales Rep',         bg: '#DCFCE7', color: '#166534' },
  hr_manager:        { label: 'HR Manager',        bg: '#EDE9FE', color: '#6D28D9' },
  call_center_agent: { label: 'Call Center Agent', bg: '#FEF3C7', color: '#92400E' },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, access } = useAuth();

  const userName  = user?.full_name || user?.username || 'User';
  const roleStyle = ROLE_STYLES[user?.role] || { label: user?.role || 'User', bg: '#F3F4F6', color: '#374151' };

  // ── Fetch only what this user is allowed to see ───────────────────────
  const leads        = access.canAccessLeads     ? DataService.getLeads()               : [];
  const partners     = access.canAccessPartners  ? PartnersDataService.getPartners()    : [];
  const campaigns    = access.canAccessMarketing ? MarketingDataService.getCampaigns()  : [];
  const events       = access.canAccessMarketing ? MarketingDataService.getEvents()     : [];
  const branches     = access.canAccessLocations ? LocationsDataService.getBranches()   : [];
  const sites        = access.canAccessLocations ? LocationsDataService.getProjectSites() : [];
  const employees    = access.canAccessHR        ? HRDataService.getEmployees()         : [];
  const teams        = access.canAccessHR        ? HRDataService.getTeams()             : [];

  const today           = new Date().toISOString().split('T')[0];
  const todayLeads      = leads.filter((l) => l.created_at?.startsWith(today)).length;
  const activePartners  = partners.filter((p) => p.contract_active).length;
  const activeCampaigns = campaigns.filter((c) => c.is_active).length;
  const upcomingEvents  = events.filter((e) => MarketingDataService.getEventStatus(e) === 'Upcoming').length;
  const activeBranches  = branches.filter((b) => b.is_active).length;
  const activeSites     = sites.filter((s) => s.is_active).length;
  const activeEmployees = employees.filter((e) => e.is_active).length;
  const activeTeams     = teams.filter((t) => t.is_active).length;

  // ── Stat cards — only shown for modules user can access ───────────────
  const statCards = [
    // Leads stats
    {
      show:     access.canAccessLeads,
      label:    access.canViewTeamLeads ? 'Total Leads' : 'My Leads',
      value:    leads.length,
      gradient: 'linear-gradient(135deg,#3B82F6,#2563EB)',
      shadow:   'rgba(37,99,235,0.32)',
      icon:     <PeopleIcon sx={{ fontSize: 24 }} />,
      path:     '/leads',
    },
    {
      show:     access.canAccessLeads,
      label:    "Today's Leads",
      value:    todayLeads,
      gradient: 'linear-gradient(135deg,#10B981,#059669)',
      shadow:   'rgba(16,185,129,0.32)',
      icon:     <CalendarTodayIcon sx={{ fontSize: 24 }} />,
    },
    // Partners stats
    {
      show:     access.canAccessPartners,
      label:    'Active Partners',
      value:    activePartners,
      gradient: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
      shadow:   'rgba(124,58,237,0.32)',
      icon:     <HandshakeIcon sx={{ fontSize: 24 }} />,
      path:     '/partners',
    },
    // Marketing stats
    {
      show:     access.canAccessMarketing,
      label:    'Active Campaigns',
      value:    activeCampaigns,
      gradient: 'linear-gradient(135deg,#0891B2,#06B6D4)',
      shadow:   'rgba(8,145,178,0.32)',
      icon:     <CampaignIcon sx={{ fontSize: 24 }} />,
      path:     '/marketing',
    },
    {
      show:     access.canAccessMarketing,
      label:    'Upcoming Events',
      value:    upcomingEvents,
      gradient: 'linear-gradient(135deg,#EC4899,#F43F5E)',
      shadow:   'rgba(236,72,153,0.32)',
      icon:     <EventIcon sx={{ fontSize: 24 }} />,
      path:     '/marketing?tab=events',
    },
    // Locations stats
    {
      show:     access.canAccessLocations,
      label:    'Active Branches',
      value:    activeBranches,
      gradient: 'linear-gradient(135deg,#059669,#10B981)',
      shadow:   'rgba(5,150,105,0.32)',
      icon:     <ApartmentIcon sx={{ fontSize: 24 }} />,
      path:     '/locations?tab=branches',
    },
    {
      show:     access.canAccessLocations,
      label:    'Project Sites',
      value:    activeSites,
      gradient: 'linear-gradient(135deg,#0E7490,#0891B2)',
      shadow:   'rgba(14,116,144,0.32)',
      icon:     <HomeWorkIcon sx={{ fontSize: 24 }} />,
      path:     '/locations?tab=sites',
    },
    // HR stats
    {
      show:     access.canAccessHR,
      label:    'Active Employees',
      value:    activeEmployees,
      gradient: 'linear-gradient(135deg,#DC2626,#F87171)',
      shadow:   'rgba(220,38,38,0.32)',
      icon:     <BadgeIcon sx={{ fontSize: 24 }} />,
      path:     '/hr?tab=employees',
    },
    {
      show:     access.canAccessHR,
      label:    'Active Teams',
      value:    activeTeams,
      gradient: 'linear-gradient(135deg,#9333EA,#C084FC)',
      shadow:   'rgba(147,51,234,0.32)',
      icon:     <OrgIcon sx={{ fontSize: 24 }} />,
      path:     '/hr?tab=teams',
    },
  ].filter((s) => s.show);

  // ── Module cards — ALL shown, locked ones are grayed ──────────────────
  const moduleCards = [
    {
      key:        'leads',
      title:      'Leads',
      desc:       access.canViewTeamLeads ? 'Manage all team leads' : 'Manage your leads',
      icon:       <PeopleIcon sx={{ fontSize: 26 }} />,
      gradient:   'linear-gradient(135deg,#2563EB,#3B82F6)',
      path:       '/leads',
      metric:     leads.length,
      metricLabel: access.canViewTeamLeads ? 'total leads' : 'my leads',
      allowed:    !!access.canAccessLeads,
    },
    {
      key:        'partners',
      title:      'Partners',
      desc:       'Brokers & ambassadors',
      icon:       <HandshakeIcon sx={{ fontSize: 26 }} />,
      gradient:   'linear-gradient(135deg,#7C3AED,#A78BFA)',
      path:       '/partners',
      metric:     activePartners,
      metricLabel: 'active partners',
      allowed:    !!access.canAccessPartners,
    },
    {
      key:        'marketing',
      title:      'Marketing',
      desc:       'Campaigns and events',
      icon:       <CampaignIcon sx={{ fontSize: 26 }} />,
      gradient:   'linear-gradient(135deg,#0891B2,#06B6D4)',
      path:       '/marketing',
      metric:     activeCampaigns,
      metricLabel: 'active campaigns',
      allowed:    !!access.canAccessMarketing,
    },
    {
      key:        'locations',
      title:      'Locations',
      desc:       'Branches & project sites',
      icon:       <LocationOnIcon sx={{ fontSize: 26 }} />,
      gradient:   'linear-gradient(135deg,#059669,#10B981)',
      path:       '/locations',
      metric:     activeBranches + activeSites,
      metricLabel: `${activeBranches} branches · ${activeSites} sites`,
      allowed:    !!access.canAccessLocations,
    },
    {
      key:        'hr',
      title:      'Human Resources',
      desc:       'Employees & teams',
      icon:       <GroupsIcon sx={{ fontSize: 26 }} />,
      gradient:   'linear-gradient(135deg,#DC2626,#F87171)',
      path:       '/hr',
      metric:     activeEmployees,
      metricLabel: `${activeEmployees} employees · ${activeTeams} teams`,
      allowed:    !!access.canAccessHR,
    },
  ];

  const grantedPerms = Object.entries(user?.permissions || {}).filter(([, v]) => v);

  return (
    <Box>
      {/* ── Welcome header + Permissions ──────────────────────────────── */}
      <Card sx={{ mb: 4, p: 3, borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: grantedPerms.length > 0 ? 2.5 : 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 54, height: 54, fontSize: 19, fontWeight: 800,
                background: 'linear-gradient(135deg,#2563EB,#0EA5E9)',
                boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
              }}
            >
              {getInitials(userName)}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={800} sx={{ lineHeight: 1.1, mb: 0.5 }}>
                Welcome back, {userName.split(' ')[0]}! 👋
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Chip
                  label={user?.department_name}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600, fontSize: '11px' }}
                />
                <Chip
                  label={roleStyle.label}
                  size="small"
                  sx={{ fontWeight: 700, fontSize: '11px', backgroundColor: roleStyle.bg, color: roleStyle.color }}
                />
                {user?.email && (
                  <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Permissions inside welcome card */}
        {grantedPerms.length > 0 && (
          <Box sx={{ pt: 2, borderTop: '1px solid #F3F4F6' }}>
            <Typography variant="subtitle2" fontWeight={700} color="#0369A1" sx={{ mb: 1.5 }}>
              🔐 Your Access Permissions
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {grantedPerms.map(([key]) => (
                <Chip
                  key={key}
                  icon={<CheckCircleIcon sx={{ fontSize: '13px !important', color: '#1D4ED8 !important' }} />}
                  label={key.replace(/can_/g, '').replace(/_/g, ' ')}
                  size="small"
                  sx={{ backgroundColor: '#DBEAFE', color: '#1E40AF', fontWeight: 600, fontSize: '11px' }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Card>
      {statCards.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {statCards.map((s) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={s.label}>
              <Card
                onClick={() => s.path && navigate(s.path)}
                sx={{
                  p: 2.5,
                  background: s.gradient,
                  color: '#fff',
                  cursor: s.path ? 'pointer' : 'default',
                  boxShadow: `0 4px 14px ${s.shadow}`,
                  transition: 'all 0.25s',
                  '&:hover': s.path ? { transform: 'translateY(-4px)', boxShadow: `0 10px 24px ${s.shadow}` } : {},
                  borderRadius: '14px',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography fontWeight={800} sx={{ fontSize: '24px', lineHeight: 1 }}>{s.value}</Typography>
                    <Typography sx={{ opacity: 0.88, fontSize: '12px', mt: 0.5 }}>{s.label}</Typography>
                  </Box>
                  <Box sx={{ p: 1, backgroundColor: 'rgba(255,255,255,0.22)', borderRadius: '10px' }}>
                    {s.icon}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ── Stat cards (only what user can access) ────────────────────── */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h5" fontWeight={800} sx={{ mb: 0.5 }}>Modules</Typography>
        <Typography variant="body2" color="text.secondary">
          {moduleCards.filter((m) => m.allowed).length} of {moduleCards.length} modules accessible with your role
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {moduleCards.map((mod) => {
          const locked = !mod.allowed;
          return (
            <Grid item xs={12} sm={6} lg={4} key={mod.key}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  border: locked ? '1px solid #F3F4F6' : '1px solid #E5E7EB',
                  backgroundColor: locked ? '#FAFAFA' : '#FFFFFF',
                  opacity: locked ? 0.65 : 1,
                  transition: 'all 0.25s',
                  ...(!locked && {
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.09)' },
                  }),
                }}
              >
                {/* Icon + title */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5, gap: 2 }}>
                  <Box
                    sx={{
                      width: 52, height: 52,
                      borderRadius: '13px',
                      background: locked ? '#E5E7EB' : mod.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      position: 'relative',
                      color: locked ? '#9CA3AF' : '#FFFFFF',
                    }}
                  >
                    {mod.icon}
                    {locked && (
                      <Box
                        sx={{
                          position: 'absolute', bottom: -5, right: -5,
                          width: 20, height: 20, borderRadius: '50%',
                          background: '#DC2626',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: '2px solid #FFFFFF',
                        }}
                      >
                        <LockIcon sx={{ fontSize: 10, color: '#FFFFFF' }} />
                      </Box>
                    )}
                  </Box>

                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" fontWeight={700} color={locked ? 'text.secondary' : 'text.primary'}>
                        {mod.title}
                      </Typography>
                      {mod.adminOnly && !locked && (
                        <Chip
                          label="Admin"
                          size="small"
                          sx={{ height: 16, fontSize: '9px', fontWeight: 700, backgroundColor: '#FEF3C7', color: '#92400E', '& .MuiChip-label': { px: 0.75 } }}
                        />
                      )}
                    </Box>
                    <Typography variant="caption" color="text.secondary">{mod.desc}</Typography>
                  </Box>
                </Box>

                {/* Metric or locked message */}
                {locked ? (
                  <Box
                    sx={{
                      mb: 2, p: 1.5, borderRadius: '10px',
                      backgroundColor: '#FEE2E2',
                      display: 'flex', alignItems: 'center', gap: 1,
                    }}
                  >
                    <LockIcon sx={{ fontSize: 14, color: '#DC2626', flexShrink: 0 }} />
                    <Typography variant="caption" sx={{ color: '#991B1B', fontWeight: 600 }}>
                      Not accessible with your current role
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h3" fontWeight={800} sx={{ lineHeight: 1 }}>{mod.metric}</Typography>
                    <Typography variant="caption" color="text.secondary">{mod.metricLabel}</Typography>
                  </Box>
                )}

                <Box sx={{ flexGrow: 1 }} />

                {/* Action buttons */}
                <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                  <Button
                    variant={locked ? 'outlined' : 'contained'}
                    fullWidth
                    disabled={locked}
                    onClick={() => navigate(mod.path)}
                    sx={{
                      borderRadius: '10px',
                      fontWeight: 700,
                      ...(!locked && { background: mod.gradient }),
                      ...(locked && { borderColor: '#E5E7EB', color: '#9CA3AF' }),
                    }}
                  >
                    {locked ? 'No Access' : `Open ${mod.title}`}
                  </Button>

                  {mod.quickAction && !locked && (
                    <Button
                      variant="outlined"
                      onClick={() => navigate(mod.quickAction.path)}
                      sx={{
                        borderRadius: '10px',
                        fontWeight: 700,
                        flexShrink: 0,
                        minWidth: 0,
                        px: 1.5,
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}