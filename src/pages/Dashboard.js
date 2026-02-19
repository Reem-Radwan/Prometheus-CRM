import React from 'react';
import {
  Box, Card, Grid, Button, Chip, Avatar, Typography,
} from '@mui/material';
import {
  People as PeopleIcon,
  Handshake as HandshakeIcon,
  Campaign as CampaignIcon,
  Groups as GroupsIcon,
  LocationOn as LocationOnIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
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
  const leads       = access.canAccessLeads     ? DataService.getLeads()                   : [];
  const partners    = access.canAccessPartners  ? PartnersDataService.getPartners()         : [];
  const campaigns   = access.canAccessMarketing ? MarketingDataService.getCampaigns()       : [];
  const events      = access.canAccessMarketing ? MarketingDataService.getEvents()           : [];
  const branches    = access.canAccessLocations ? LocationsDataService.getBranches()        : [];
  const sites       = access.canAccessLocations ? LocationsDataService.getProjectSites()    : [];
  const employees   = access.canAccessHR        ? HRDataService.getEmployees()              : [];
  const teams       = access.canAccessHR        ? HRDataService.getTeams()                  : [];
  const departments = access.canAccessHR        ? HRDataService.getDepartments()            : [];

  // ── Derived counts ────────────────────────────────────────────────────
  const activePartners    = partners.filter((p) => p.contract_active).length;
  const brokers           = partners.filter((p) => p.type === 'broker').length;
  const ambassadors       = partners.filter((p) => p.type === 'ambassador').length;

  const activeCampaigns   = campaigns.filter((c) => c.is_active).length;
  const runningCampaigns  = campaigns.filter((c) => MarketingDataService.getCampaignStatus(c) === 'Running').length;
  const activeEvents      = events.filter((e) => e.is_active).length;
  const totalBudget       = campaigns.reduce((s, c) => s + (Number(c.budget) || 0), 0);

  const activeBranches    = branches.filter((b) => b.is_active).length;
  const activeSites       = sites.filter((s) => s.is_active).length;

  const activeEmployees   = employees.filter((e) => e.is_active).length;
  const activeTeams       = teams.filter((t) => t.is_active).length;

  // Recent leads (last 30 days)
  const recentLeads = leads.filter((l) => {
    if (!l.created_at) return false;
    try {
      const d = new Date(
        l.created_at.includes('-') && l.created_at.split('-')[0].length === 2
          ? l.created_at.split('-').reverse().join('-')
          : l.created_at
      );
      return (Date.now() - d) / 86400000 <= 30;
    } catch { return false; }
  }).length;

  // Top lead source name
  const allSources = DataService.getLeadSources ? DataService.getLeadSources() : [];
  const sourceCounts = {};
  leads.forEach((l) => {
    const name = allSources.find((s) => s.id === l.source_id)?.name || 'Unknown';
    sourceCounts[name] = (sourceCounts[name] || 0) + 1;
  });
  const topSource = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  // ── Module cards — ALL shown, locked ones are grayed ─────────────────
  const moduleCards = [
    {
      key:         'leads',
      title:       'Leads',
      desc:        access.canViewTeamLeads ? 'Manage all team leads' : 'Manage your leads',
      icon:        <PeopleIcon sx={{ fontSize: 26 }} />,
      gradient:    'linear-gradient(135deg,#2563EB,#3B82F6)',
      path:        '/leads',
      metric:      leads.length,
      metricLabel: access.canViewTeamLeads ? 'total leads' : 'my leads',
      extraStats: [
        { label: 'Added last 30 days', value: recentLeads },
        { label: 'Top source',         value: topSource   },
      ],
      allowed:     !!access.canAccessLeads,
    },
    {
      key:         'partners',
      title:       'Partners',
      desc:        'Brokers & Ambassadors',
      icon:        <HandshakeIcon sx={{ fontSize: 26 }} />,
      gradient:    'linear-gradient(135deg,#7C3AED,#A78BFA)',
      path:        '/partners',
      metric:      partners.length,
      metricLabel: `${activePartners} active · ${partners.length - activePartners} inactive`,
      extraStats: [
        { label: 'Brokers',     value: brokers     },
        { label: 'Ambassadors', value: ambassadors },
      ],
      allowed:     !!access.canAccessPartners,
    },
    {
      key:         'marketing',
      title:       'Marketing',
      desc:        'Campaigns & Events',
      icon:        <CampaignIcon sx={{ fontSize: 26 }} />,
      gradient:    'linear-gradient(135deg,#0891B2,#06B6D4)',
      path:        '/marketing',
      metric:      campaigns.length,
      metricLabel: `${activeCampaigns} active · ${events.length} events`,
      extraStats: [
        { label: 'Running now',   value: runningCampaigns },
        { label: 'Active events', value: activeEvents     },
        { label: 'Total budget',  value: totalBudget > 0 ? `${(totalBudget / 1000).toFixed(0)}K` : '—' },
      ],
      allowed:     !!access.canAccessMarketing,
    },
    {
      key:         'locations',
      title:       'Locations',
      desc:        'Branches & Project Sites',
      icon:        <LocationOnIcon sx={{ fontSize: 26 }} />,
      gradient:    'linear-gradient(135deg,#059669,#10B981)',
      path:        '/locations',
      metric:      branches.length + sites.length,
      metricLabel: `${branches.length} branches · ${sites.length} sites`,
      extraStats: [
        { label: 'Active branches', value: activeBranches                  },
        { label: 'Active sites',    value: activeSites                     },
        { label: 'Inactive total',  value: (branches.length - activeBranches) + (sites.length - activeSites) },
      ],
      allowed:     !!access.canAccessLocations,
    },
    {
      key:         'hr',
      title:       'Human Resources',
      desc:        'Employees, Teams & Departments',
      icon:        <GroupsIcon sx={{ fontSize: 26 }} />,
      gradient:    'linear-gradient(135deg,#DC2626,#F87171)',
      path:        '/hr',
      metric:      employees.length,
      metricLabel: `${activeTeams} active teams · ${departments.length} departments`,
      extraStats: [
        { label: 'Active employees',   value: activeEmployees                   },
        { label: 'Inactive employees', value: employees.length - activeEmployees },
        { label: 'Active teams',       value: activeTeams                        },
      ],
      allowed:     !!access.canAccessHR,
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
                    <Typography variant="h6" fontWeight={700} color={locked ? 'text.secondary' : 'text.primary'}>
                      {mod.title}
                    </Typography>
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
                    {/* Primary metric — same as original */}
                    <Typography variant="h3" fontWeight={800} sx={{ lineHeight: 1 }}>{mod.metric}</Typography>
                    <Typography variant="caption" color="text.secondary">{mod.metricLabel}</Typography>

                    {/* Extra stats row */}
                    {mod.extraStats?.length > 0 && (
                      <Box
                        sx={{
                          mt: 1.5,
                          pt: 1.5,
                          borderTop: '1px dashed #F3F4F6',
                          display: 'flex',
                          gap: 2,
                          flexWrap: 'wrap',
                        }}
                      >
                        {mod.extraStats.map((s) => (
                          <Box key={s.label}>
                            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>
                              {s.value}
                            </Typography>
                            <Typography sx={{ fontSize: '11px', color: '#9CA3AF', lineHeight: 1.3 }}>
                              {s.label}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                )}

                <Box sx={{ flexGrow: 1 }} />

                {/* Action buttons */}
                <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                  {/* Action button */}
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
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}