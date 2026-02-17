// import React from 'react';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Box,
//   IconButton,
// } from '@mui/material';
// import {
//   People as PeopleIcon,
//   Dashboard as DashboardIcon,
//   Close as CloseIcon,
// } from '@mui/icons-material';
// import { useNavigate, useLocation } from 'react-router-dom';

// const drawerWidth = 260;

// const menuItems = [
//   {
//     text: 'Dashboard',
//     icon: <DashboardIcon />,
//     path: '/',
//   },
//   {
//     text: 'Leads',
//     icon: <PeopleIcon />,
//     path: '/leads',
//   },
// ];

// export default function Sidebar({ open, onClose }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleNavigation = (path) => {
//     navigate(path);
//     onClose();
//   };

//   const drawerContent = (
//     <>
//       {/* Close Button */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'flex-end',
//           p: 2,
//           pb: 1,
//         }}
//       >
//         <IconButton
//           onClick={onClose}
//           sx={{
//             color: '#FFFFFF',
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//             '&:hover': {
//               backgroundColor: 'rgba(255, 255, 255, 0.2)',
//             },
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       {/* Navigation Menu */}
//       <List sx={{ px: 2.5, pt: 1 }}>
//         {menuItems.map((item) => {
//           const isActive =
//             location.pathname === item.path ||
//             (item.path !== '/' && location.pathname.startsWith(item.path));

//           return (
//             <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
//               <ListItemButton
//                 onClick={() => handleNavigation(item.path)}
//                 sx={{
//                   borderRadius: '12px',
//                   py: 1.4,
//                   px: 2.5,
//                   backgroundColor: isActive
//                     ? 'rgba(255, 255, 255, 0.15)'
//                     : 'transparent',
//                   backdropFilter: isActive ? 'blur(10px)' : 'none',
//                   border: isActive
//                     ? '1px solid rgba(255, 255, 255, 0.25)'
//                     : '1px solid transparent',
//                   boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
//                   '&:hover': {
//                     backgroundColor: isActive
//                       ? 'rgba(255, 255, 255, 0.2)'
//                       : 'rgba(255, 255, 255, 0.08)',
//                     transform: 'translateX(4px)',
//                   },
//                   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     color: isActive ? '#FCD34D' : '#BFDBFE',
//                     minWidth: 40,
//                     '& .MuiSvgIcon-root': {
//                       fontSize: 22,
//                     },
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={item.text}
//                   primaryTypographyProps={{
//                     fontSize: '15px',
//                     fontWeight: isActive ? 700 : 500,
//                     letterSpacing: '-0.2px',
//                     color: isActive ? '#FFFFFF' : '#DBEAFE',
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           );
//         })}
//       </List>

//       {/* Bottom Space */}
//       <Box sx={{ flexGrow: 1 }} />
//     </>
//   );

//   return (
//     <Drawer
//       open={open}
//       onClose={onClose}
//       sx={{
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           background: 'linear-gradient(180deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%)',
//           color: '#FFFFFF',
//           borderRight: 'none',
//           boxShadow: '4px 0 24px rgba(0, 0, 0, 0.12)',
//           marginTop: '70px', // Account for header height
//           height: 'calc(100vh - 70px)',
//         },
//       }}
//     >
//       {drawerContent}
//     </Drawer>
//   );
// }






// import React from 'react';
// import {
//   Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
//   Box, IconButton, Typography, Divider, Chip, Avatar,
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   Handshake as HandshakeIcon,
//   Campaign as CampaignIcon,
//   LocationOn as LocationOnIcon,
//   Groups as GroupsIcon,
//   Close as CloseIcon,
//   Shield as ShieldIcon,
// } from '@mui/icons-material';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// const drawerWidth = 264;

// // ── Role display map ──────────────────────────────────────────────────────────
// const ROLE_LABELS = {
//   admin:             { label: 'Admin',            bg: 'rgba(254,226,226,0.9)', color: '#991B1B' },
//   manager:           { label: 'Manager',          bg: 'rgba(219,234,254,0.9)', color: '#1D4ED8' },
//   sales_rep:         { label: 'Sales Rep',        bg: 'rgba(220,252,231,0.9)', color: '#166534' },
//   hr_manager:        { label: 'HR Manager',       bg: 'rgba(237,233,254,0.9)', color: '#6D28D9' },
//   call_center_agent: { label: 'Call Center Agent',bg: 'rgba(254,243,199,0.9)', color: '#92400E' },
// };

// function getInitials(name = '') {
//   return name.split(' ').map((w) => w[0]).join('').toUpperCase().substring(0, 2);
// }

// export default function Sidebar({ open, onClose }) {
//   const navigate  = useNavigate();
//   const location  = useLocation();
//   const { user, access } = useAuth();

//   // ── Build nav items — each one conditionally shown ───────────────────────
//   // Rules come directly from API docs section 6:
//   //   • Always show: Dashboard
//   //   • Leads:     show if canAccessLeads
//   //   • Partners:  show if canAccessPartners (= same as canAccessLeads)
//   //   • Marketing: show if canManageConfig  (doc: "Hide Admin screens if can_manage_config=false")
//   //   • Locations: show if canManageConfig  (doc: "Hide Admin screens if can_manage_config=false")
//   //   • HR:        show if canAccessHR      (doc: "Hide HR module if dept not HR/Management/Operations")
//   const navItems = [
//     {
//       text:     'Dashboard',
//       icon:     <DashboardIcon />,
//       path:     '/',
//       show:     true,
//     },
//     {
//       text:     'Leads',
//       icon:     <PeopleIcon />,
//       path:     '/leads',
//       show:     !!access.canAccessLeads,
//     },
//     {
//       text:     'Partners',
//       icon:     <HandshakeIcon />,
//       path:     '/partners',
//       show:     !!access.canAccessPartners,
//     },
//     {
//       text:     'Marketing',
//       icon:     <CampaignIcon />,
//       path:     '/marketing',
//       show:     !!access.canAccessMarketing,
//       badge:    'Admin',
//     },
//     {
//       text:     'Locations',
//       icon:     <LocationOnIcon />,
//       path:     '/locations',
//       show:     !!access.canAccessLocations,
//       badge:    'Admin',
//     },
//     {
//       text:     'HR',
//       icon:     <GroupsIcon />,
//       path:     '/hr',
//       show:     !!access.canAccessHR,
//     },
//   ].filter((item) => item.show);

//   const handleNav = (path) => { navigate(path); onClose(); };

//   const roleStyle = ROLE_LABELS[user?.role] || { label: user?.role || 'User', bg: 'rgba(243,244,246,0.9)', color: '#374151' };

//   return (
//     <Drawer
//       open={open}
//       onClose={onClose}
//       sx={{
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           background: 'linear-gradient(180deg, #1E3A8A 0%, #1E40AF 55%, #2563EB 100%)',
//           color: '#FFFFFF',
//           borderRight: 'none',
//           boxShadow: '6px 0 28px rgba(0,0,0,0.15)',
//           marginTop: '70px',
//           height: 'calc(100vh - 70px)',
//           overflowX: 'hidden',
//         },
//       }}
//     >
//       {/* ── Close ───────────────────────────────────────────────────────── */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, pb: 1.5 }}>
//         <IconButton
//           onClick={onClose}
//           size="small"
//           sx={{
//             color: '#FFFFFF',
//             backgroundColor: 'rgba(255,255,255,0.12)',
//             '&:hover': { backgroundColor: 'rgba(255,255,255,0.22)' },
//             borderRadius: '8px',
//             p: 0.75,
//           }}
//         >
//           <CloseIcon fontSize="small" />
//         </IconButton>
//       </Box>

//       {/* ── User card ────────────────────────────────────────────────────── */}
//       {user && (
//         <Box sx={{ px: 2.5, pb: 3 }}>
//           <Box
//             sx={{
//               p: 2,
//               borderRadius: '14px',
//               backgroundColor: 'rgba(255,255,255,0.1)',
//               border: '1px solid rgba(255,255,255,0.15)',
//               backdropFilter: 'blur(8px)',
//               display: 'flex',
//               alignItems: 'center',
//               gap: 1.5,
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 38, height: 38,
//                 fontSize: 14, fontWeight: 800,
//                 background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 100%)',
//                 border: '1.5px solid rgba(255,255,255,0.4)',
//                 flexShrink: 0,
//               }}
//             >
//               {getInitials(user.full_name)}
//             </Avatar>
//             <Box sx={{ minWidth: 0 }}>
//               <Typography
//                 variant="body2"
//                 fontWeight={700}
//                 sx={{ color: '#FFFFFF', lineHeight: 1.2, mb: 0.5 }}
//                 noWrap
//               >
//                 {user.full_name}
//               </Typography>
//               <Chip
//                 label={roleStyle.label}
//                 size="small"
//                 sx={{
//                   height: 18,
//                   fontSize: '10px',
//                   fontWeight: 700,
//                   backgroundColor: roleStyle.bg,
//                   color: roleStyle.color,
//                   border: 'none',
//                   '& .MuiChip-label': { px: 1 },
//                 }}
//               />
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {/* ── Nav label ────────────────────────────────────────────────────── */}
//       <Box sx={{ px: 3, pb: 1.5 }}>
//         <Typography
//           variant="caption"
//           sx={{
//             color: 'rgba(255,255,255,0.38)',
//             fontSize: '10px',
//             fontWeight: 700,
//             letterSpacing: '1.5px',
//             textTransform: 'uppercase',
//           }}
//         >
//           Navigation
//         </Typography>
//       </Box>

//       {/* ── Nav items ────────────────────────────────────────────────────── */}
//       <List sx={{ px: 2, pt: 0, flex: 1 }}>
//         {navItems.map((item) => {
//           const isActive =
//             location.pathname === item.path ||
//             (item.path !== '/' && location.pathname.startsWith(item.path));

//           return (
//             <ListItem key={item.text} disablePadding sx={{ mb: 0.75 }}>
//               <ListItemButton
//                 onClick={() => handleNav(item.path)}
//                 sx={{
//                   borderRadius: '12px',
//                   py: 1.35,
//                   px: 2,
//                   backgroundColor:  isActive ? 'rgba(255,255,255,0.16)' : 'transparent',
//                   backdropFilter:   isActive ? 'blur(10px)' : 'none',
//                   border:           isActive ? '1px solid rgba(255,255,255,0.26)' : '1px solid transparent',
//                   boxShadow:        isActive ? '0 4px 12px rgba(0,0,0,0.18)' : 'none',
//                   '&:hover': {
//                     backgroundColor: isActive
//                       ? 'rgba(255,255,255,0.22)'
//                       : 'rgba(255,255,255,0.09)',
//                     transform: 'translateX(3px)',
//                   },
//                   transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     color: isActive ? '#FCD34D' : '#BFDBFE',
//                     minWidth: 38,
//                     '& .MuiSvgIcon-root': { fontSize: 21 },
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>

//                 <ListItemText
//                   primary={item.text}
//                   primaryTypographyProps={{
//                     fontSize: '14.5px',
//                     fontWeight: isActive ? 700 : 500,
//                     color: isActive ? '#FFFFFF' : '#DBEAFE',
//                     letterSpacing: '-0.2px',
//                   }}
//                 />

//                 {item.badge && (
//                   <Chip
//                     label={item.badge}
//                     size="small"
//                     sx={{
//                       height: 16,
//                       fontSize: '9px',
//                       fontWeight: 700,
//                       letterSpacing: '0.5px',
//                       backgroundColor: 'rgba(252,211,77,0.2)',
//                       color: '#FCD34D',
//                       border: '1px solid rgba(252,211,77,0.35)',
//                       '& .MuiChip-label': { px: 0.75 },
//                     }}
//                   />
//                 )}
//               </ListItemButton>
//             </ListItem>
//           );
//         })}
//       </List>

//       {/* ── Footer ───────────────────────────────────────────────────────── */}
//       <Box sx={{ px: 3, pb: 3, mt: 'auto' }}>
//         <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
//           <ShieldIcon sx={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }} />
//           <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px' }}>
//             {navItems.length - 1} module{navItems.length - 1 !== 1 ? 's' : ''} accessible
//           </Typography>
//         </Box>
//         <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.18)', fontSize: '10px' }}>
//           Prometheus CRM · v1.0
//         </Typography>
//       </Box>
//     </Drawer>
//   );
// }

import React from 'react';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Box, IconButton, Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Handshake as HandshakeIcon,
  Campaign as CampaignIcon,
  LocationOn as LocationOnIcon,
  Groups as GroupsIcon,
  Close as CloseIcon,
  Dns as DnsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 264;


export default function Sidebar({ open, onClose }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { access } = useAuth();

  const navItems = [
    { text: 'Dashboard',   icon: <DashboardIcon />,  path: '/',             show: true },
    { text: 'Leads',       icon: <PeopleIcon />,      path: '/leads',        show: !!access.canAccessLeads },
    { text: 'Lead Sources',icon: <DnsIcon />,         path: '/lead-sources', show: !!access.canAccessMarketing },
    { text: 'Partners',    icon: <HandshakeIcon />,   path: '/partners',     show: !!access.canAccessPartners },
    { text: 'Marketing',   icon: <CampaignIcon />,    path: '/marketing',    show: !!access.canAccessMarketing },
    { text: 'Locations',   icon: <LocationOnIcon />,  path: '/locations',    show: !!access.canAccessLocations },
    { text: 'HR',          icon: <GroupsIcon />,      path: '/hr',           show: !!access.canAccessHR }
  ].filter((i) => i.show);

  const handleNav = (path) => { navigate(path); onClose(); };

  const NavItem = ({ item }) => {
    const isActive =
      location.pathname === item.path ||
      (item.path !== '/' && location.pathname.startsWith(item.path));

    return (
      <ListItem disablePadding sx={{ mb: 0.75 }}>
        <ListItemButton
          onClick={() => handleNav(item.path)}
          sx={{
            borderRadius: '12px',
            py: 1.35,
            px: 2,
            backgroundColor:  isActive ? 'rgba(255,255,255,0.16)' : 'transparent',
            backdropFilter:   isActive ? 'blur(10px)' : 'none',
            border:           isActive ? '1px solid rgba(255,255,255,0.26)' : '1px solid transparent',
            boxShadow:        isActive ? '0 4px 12px rgba(0,0,0,0.18)' : 'none',
            '&:hover': {
              backgroundColor: isActive ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.09)',
              transform: 'translateX(3px)',
            },
            transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <ListItemIcon sx={{ color: isActive ? '#FCD34D' : '#BFDBFE', minWidth: 38, '& .MuiSvgIcon-root': { fontSize: 21 } }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontSize: '14.5px',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#FFFFFF' : '#DBEAFE',
              letterSpacing: '-0.2px',
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #1E3A8A 0%, #1E40AF 55%, #2563EB 100%)',
          color: '#FFFFFF',
          borderRight: 'none',
          boxShadow: '6px 0 28px rgba(0,0,0,0.15)',
          marginTop: '70px',
          height: 'calc(100vh - 70px)',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Close button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, pb: 1.5 }}>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: '#FFFFFF',
            backgroundColor: 'rgba(255,255,255,0.12)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.22)' },
            borderRadius: '8px',
            p: 0.75,
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Single nav section */}
      <Box sx={{ px: 3, pb: 1 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.38)', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Menu
        </Typography>
      </Box>
      <List sx={{ px: 2, pt: 0 }}>
        {navItems.map((item) => <NavItem key={item.text} item={item} />)}
      </List>
    </Drawer>
  );
}