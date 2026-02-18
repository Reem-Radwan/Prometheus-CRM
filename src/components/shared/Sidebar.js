import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Box, IconButton, Typography, Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Handshake as HandshakeIcon,
  Campaign as CampaignIcon,
  LocationOn as LocationOnIcon,
  Groups as GroupsIcon,
  Close as CloseIcon,
  Business as BusinessIcon,
  Dns as DnsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Event as EventIcon,
  Apartment as ApartmentIcon,
  Construction as ConstructionIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 264;

export default function Sidebar({ open, onClose }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { access } = useAuth();

  // Track which parent sections are expanded
  const [expanded, setExpanded] = useState({
    leads: false,
    marketing: false,
    locations: false,
    hr: false,
  });

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path) =>
    location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const isParentActive = (paths) => paths.some((p) => isActive(p));

  const handleNav = (path) => { navigate(path); onClose(); };

  // Auto-expand parent if a child route is active
  React.useEffect(() => {
    if (isParentActive(['/leads', '/lead-sources'])) setExpanded((p) => ({ ...p, leads: true }));
    if (isParentActive(['/marketing'])) setExpanded((p) => ({ ...p, marketing: true }));
    if (isParentActive(['/locations'])) setExpanded((p) => ({ ...p, locations: true }));
    if (isParentActive(['/hr'])) setExpanded((p) => ({ ...p, hr: true }));
  }, [location.pathname]); // eslint-disable-line

  // ── Shared style helpers ────────────────────────────────────────────────────

  const parentBtnSx = (active) => ({
    borderRadius: '12px',
    py: 1.35,
    px: 2,
    backgroundColor:  active ? 'rgba(255,255,255,0.16)' : 'transparent',
    backdropFilter:   active ? 'blur(10px)' : 'none',
    border:           active ? '1px solid rgba(255,255,255,0.26)' : '1px solid transparent',
    boxShadow:        active ? '0 4px 12px rgba(0,0,0,0.18)' : 'none',
    '&:hover': {
      backgroundColor: active ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.09)',
      transform: 'translateX(3px)',
    },
    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
  });

  const childBtnSx = (active) => ({
    borderRadius: '10px',
    py: 1,
    pl: 3,
    pr: 1.5,
    backgroundColor:  active ? 'rgba(255,255,255,0.13)' : 'transparent',
    border:           active ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
    '&:hover': {
      backgroundColor: active ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
      transform: 'translateX(3px)',
    },
    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
  });

  const iconSx = (active) => ({
    color: active ? '#FCD34D' : '#BFDBFE',
    minWidth: 38,
    '& .MuiSvgIcon-root': { fontSize: 21 },
  });

  const childIconSx = (active) => ({
    color: active ? '#FCD34D' : 'rgba(191,219,254,0.75)',
    minWidth: 32,
    '& .MuiSvgIcon-root': { fontSize: 16 },
  });

  const labelSx = (active) => ({
    fontSize: '14.5px',
    fontWeight: active ? 700 : 500,
    color: active ? '#FFFFFF' : '#DBEAFE',
    letterSpacing: '-0.2px',
  });

  const childLabelSx = (active) => ({
    fontSize: '13.5px',
    fontWeight: active ? 700 : 400,
    color: active ? '#FFFFFF' : 'rgba(219,234,254,0.85)',
    letterSpacing: '-0.1px',
  });

  // ── Render helpers ──────────────────────────────────────────────────────────

  const SimpleItem = ({ text, icon, path }) => {
    const active = isActive(path);
    return (
      <ListItem disablePadding sx={{ mb: 0.75 }}>
        <ListItemButton onClick={() => handleNav(path)} sx={parentBtnSx(active)}>
          <ListItemIcon sx={iconSx(active)}>{icon}</ListItemIcon>
          <ListItemText primary={text} primaryTypographyProps={labelSx(active)} />
        </ListItemButton>
      </ListItem>
    );
  };

  const ChildItem = ({ text, icon, path }) => {
    const active = isActive(path);
    return (
      <ListItem disablePadding sx={{ mb: 0.5 }}>
        <ListItemButton onClick={() => handleNav(path)} sx={childBtnSx(active)}>
          <ListItemIcon sx={childIconSx(active)}>
            {icon || <CircleIcon sx={{ fontSize: '8px !important' }} />}
          </ListItemIcon>
          <ListItemText primary={text} primaryTypographyProps={childLabelSx(active)} />
        </ListItemButton>
      </ListItem>
    );
  };

  const ParentItem = ({ text, icon, expandKey, childPaths, children, show = true }) => {
    if (!show) return null;
    const parentActive = isParentActive(childPaths) && !expanded[expandKey];
    const isOpen = expanded[expandKey];

    return (
      <>
        <ListItem disablePadding sx={{ mb: isOpen ? 0.25 : 0.75 }}>
          <ListItemButton onClick={() => toggleExpand(expandKey)} sx={parentBtnSx(parentActive)}>
            <ListItemIcon sx={iconSx(parentActive)}>{icon}</ListItemIcon>
            <ListItemText primary={text} primaryTypographyProps={labelSx(parentActive)} />
            {isOpen
              ? <ExpandLessIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', flexShrink: 0 }} />
              : <ExpandMoreIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={isOpen} timeout={220} unmountOnExit>
          <Box sx={{
            ml: 1.5,
            pl: 1.5,
            mb: 0.75,
            borderLeft: '1px solid rgba(255,255,255,0.15)',
          }}>
            <List disablePadding>
              {children}
            </List>
          </Box>
        </Collapse>
      </>
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
          overflowY: 'auto',
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

      {/* Menu label */}
      <Box sx={{ px: 3, pb: 1 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.38)', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Menu
        </Typography>
      </Box>

      <List sx={{ px: 2, pt: 0, pb: 3 }}>

        {/* Dashboard */}
        <SimpleItem text="Dashboard" icon={<DashboardIcon />} path="/" />

        {/* Leads (expandable) */}
        {!!access.canAccessLeads && (
          <ParentItem
            text="Leads"
            icon={<PeopleIcon />}
            expandKey="leads"
            childPaths={['/leads', '/lead-sources']}
          >
            <ChildItem text="All Leads" path="/leads" />
            {!!access.canAccessMarketing && (
              <ChildItem text="Lead Sources" icon={<DnsIcon />} path="/lead-sources" />
            )}
          </ParentItem>
        )}

        {/* Partners */}
        {!!access.canAccessPartners && (
          <SimpleItem text="Partners" icon={<HandshakeIcon />} path="/partners" />
        )}

        {/* Marketing (expandable) */}
        {!!access.canAccessMarketing && (
          <ParentItem
            text="Marketing"
            icon={<CampaignIcon />}
            expandKey="marketing"
            childPaths={['/marketing']}
          >
            <ChildItem text="Campaigns" icon={<CampaignIcon />} path="/marketing?tab=campaigns" />
            <ChildItem text="Events" icon={<EventIcon />} path="/marketing?tab=events" />
          </ParentItem>
        )}

        {/* Locations (expandable) */}
        {!!access.canAccessLocations && (
          <ParentItem
            text="Locations"
            icon={<LocationOnIcon />}
            expandKey="locations"
            childPaths={['/locations']}
          >
            <ChildItem text="Branches" icon={<ApartmentIcon />} path="/locations?tab=branches" />
            <ChildItem text="Project Sites" icon={<ConstructionIcon />} path="/locations?tab=sites" />
          </ParentItem>
        )}

        {/* HR (expandable) */}
        {!!access.canAccessHR && (
          <ParentItem
            text="HR"
            icon={<GroupsIcon />}
            expandKey="hr"
            childPaths={['/hr']}
          >
            <ChildItem text="Employees" icon={<PeopleIcon />} path="/hr?tab=employees" />
            <ChildItem text="Sales Teams" icon={<GroupsIcon />} path="/hr?tab=teams" />
            <ChildItem text="Departments" icon={<BusinessIcon />} path="/hr?tab=departments" />
          </ParentItem>
        )}

      </List>
    </Drawer>
  );
}