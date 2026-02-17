import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, Card, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton,
  Chip, Tooltip, Typography, Switch, Grow, Fade,
  Avatar, TextField, InputAdornment, FormControl,
  InputLabel, Select, MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Star as StarIcon,
  Groups as GroupsIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { HRDataService, TEAM_MEMBER_ROLES } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import {
  showDeleteConfirmation,
  showSuccessToast,
  showErrorToast,
} from '../../utils/sweetalert';

function getInitials(name = '') {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().substring(0, 2);
}

const DEPT_COLORS = {
  1: { bg: '#DBEAFE', color: '#1D4ED8' },
  2: { bg: '#EDE9FE', color: '#6D28D9' },
  3: { bg: '#FEF9C3', color: '#92400E' },
  4: { bg: '#D1FAE5', color: '#065F46' },
  5: { bg: '#FCE7F3', color: '#9D174D' },
};

const stickyHeaderSx = {
  py: 1.5, px: 2,
  position: { xs: 'sticky', md: 'static' },
  left: { xs: 0, md: 'auto' },
  zIndex: { xs: 3, md: 'auto' },
  backgroundColor: { xs: '#F9FAFB', md: 'inherit' },
  boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
};

const stickyBodySx = {
  py: 1.5, px: 2,
  position: { xs: 'sticky', md: 'static' },
  left: { xs: 0, md: 'auto' },
  zIndex: { xs: 2, md: 'auto' },
  backgroundColor: { xs: '#ffffff', md: 'transparent' },
  boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
  'tr:hover &': { backgroundColor: { xs: '#f0f9ff', md: 'transparent' } },
};

export default function TeamMembers() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');

  // Pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const team = HRDataService.getTeamById(Number(teamId));
  const departments = HRDataService.getDepartments();

  useEffect(() => {
    if (team) setMembers(HRDataService.getTeamMembersByTeam(Number(teamId)));
  }, [teamId, team]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const emp = HRDataService.getEmployeeById(member.employee_id);
      const matchesDept = !deptFilter || emp?.department === deptFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        (emp?.full_name || '').toLowerCase().includes(q) ||
        (emp?.username || '').toLowerCase().includes(q) ||
        (emp?.email || '').toLowerCase().includes(q);
      return matchesDept && matchesSearch;
    });
  }, [members, search, deptFilter]);

  const paginatedMembers = filteredMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);

  useEffect(() => { setPage(0); }, [search, deptFilter]);

  const hasFilter = search || deptFilter;

  if (!team) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">Team not found.</Typography>
        <Button onClick={() => navigate('/hr?tab=teams')} sx={{ mt: 2 }} startIcon={<ArrowBackIcon />}>
          Back to Teams
        </Button>
      </Box>
    );
  }

  const handleToggleActive = (member) => {
    const updated = HRDataService.updateTeamMember(member.id, { is_active: !member.is_active });
    if (updated) {
      setMembers((prev) => prev.map((m) => (m.id === member.id ? updated : m)));
      showSuccessToast(`Member ${updated.is_active ? 'activated' : 'deactivated'} successfully!`);
    }
  };

  const handleDelete = async (member) => {
    const emp = HRDataService.getEmployeeById(member.employee_id);
    const result = await showDeleteConfirmation(
      'Remove Member?',
      `Remove "${emp?.full_name || 'this member'}" from ${team.name}?`
    );
    if (result.isConfirmed) {
      if (HRDataService.deleteTeamMember(member.id)) {
        setMembers((prev) => prev.filter((m) => m.id !== member.id));
        showSuccessToast('Member removed successfully!');
      } else showErrorToast('Failed to remove member');
    }
  };

  const activeCount = members.filter((m) => m.is_active).length;
  const leaderCount = members.filter((m) => m.is_team_leader).length;

  return (
    <Fade in timeout={500}>
      <Box>
        <PageHeader
          title={team.name}
          subtitle={`Team Code: ${team.code} · ${team.description || 'No description'}`}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'HR', href: '/hr' },
            { label: 'Teams', href: '/hr?tab=teams' },
            { label: team.name, active: true },
          ]}
          actions={
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/hr?tab=teams')}>
                Back
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
                size="large"
                onClick={() => navigate(`/hr/teams/${teamId}/assign`)}
                sx={{
                  boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)',
                  '&:hover': { transform: 'translateY(-2px)' },
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Assign Member</Box>
                <AddIcon sx={{ display: { xs: 'inline-flex', sm: 'none' } }} />
              </Button>
            </Box>
          }
        />

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          {[
            { label: 'Total Members', value: members.length,               color: 'primary.main' },
            { label: 'Active',        value: activeCount,                  color: '#16A34A' },
            { label: 'Team Leaders',  value: leaderCount,                  color: '#D97706' },
            { label: 'Inactive',      value: members.length - activeCount, color: '#DC2626' },
          ].map((stat, i) => (
            <Grow in timeout={600 + i * 100} key={stat.label}>
              <Card sx={{ p: 3, flex: 1, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>{stat.label}</Typography>
                <Typography variant="h2" sx={{ color: stat.color }}>{stat.value}</Typography>
              </Card>
            </Grow>
          ))}
        </Box>

        <Grow in timeout={900}>
          <Card>
            {/* Search + Department filter bar */}
            <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB', display: 'flex', gap: 2, alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                size="small"
                placeholder="Search by name, username or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                  endAdornment: search && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearch('')}>
                        <CloseIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ flex: 1, width: '100%', '& .MuiInputBase-root': { height: '38px', fontSize: '0.85rem', borderRadius: '10px' } }}
              />
              <FormControl size="small" sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}>
                <InputLabel>Filter by Department</InputLabel>
                <Select
                  value={deptFilter}
                  label="Filter by Department"
                  onChange={(e) => setDeptFilter(e.target.value)}
                  sx={{ borderRadius: '10px', height: '38px', fontSize: '0.85rem' }}
                >
                  <MenuItem value=""><em>All Departments</em></MenuItem>
                  {departments.map((d) => (
                    <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {hasFilter && (
                <Button
                  size="small" variant="outlined" color="error"
                  startIcon={<CloseIcon fontSize="small" />}
                  onClick={() => { setSearch(''); setDeptFilter(''); }}
                  sx={{ borderRadius: '10px', whiteSpace: 'nowrap', height: '38px', flexShrink: 0 }}
                >
                  Clear
                </Button>
              )}
            </Box>

            {/* Results count when filtering */}
            {hasFilter && (
              <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #F3F4F6', backgroundColor: '#FAFAFA' }}>
                <Typography variant="caption" color="text.secondary">
                  Showing <strong>{filteredMembers.length}</strong> of <strong>{members.length}</strong> members
                </Typography>
              </Box>
            )}

            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table stickyHeader sx={{ tableLayout: 'auto' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={stickyHeaderSx}>Member</TableCell>
                    <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Department</TableCell>
                    <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Username</TableCell>
                    <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Role</TableCell>
                    <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Leader</TableCell>
                    <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Active</TableCell>
                    <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                        <GroupsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          {hasFilter ? 'No members match your search' : 'No members yet'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          {hasFilter ? 'Try adjusting your search or filters' : 'Assign the first member to this team'}
                        </Typography>
                        {!hasFilter && (
                          <Button variant="contained" startIcon={<AddIcon />}
                            onClick={() => navigate(`/hr/teams/${teamId}/assign`)}>
                            Assign Member
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedMembers.map((member) => {
                      const emp = HRDataService.getEmployeeById(member.employee_id);
                      const dept = emp ? HRDataService.getDepartmentById(emp.department) : null;
                      const deptStyle = DEPT_COLORS[emp?.department] || { bg: '#F3F4F6', color: '#374151' };
                      const roleLabel = TEAM_MEMBER_ROLES.find((r) => r.value === member.role)?.label || member.role;
                      return (
                        <TableRow key={member.id} hover
                          sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>

                          <TableCell sx={stickyBodySx}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar sx={{ width: 36, height: 36, fontSize: 13, fontWeight: 700,
                                background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                                flexShrink: 0 }}>
                                {getInitials(emp?.full_name || '?')}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: { xs: 120, sm: 'none' } }}>
                                  {emp?.full_name || `Employee #${member.employee_id}`}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: { xs: 120, sm: 'none' } }}>
                                  {emp?.email || '-'}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>

                          <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                            {dept ? (
                              <Chip label={dept.name} size="small"
                                sx={{ backgroundColor: deptStyle.bg, color: deptStyle.color, fontWeight: 600, fontSize: '12px' }} />
                            ) : <Typography variant="body2" color="text.disabled">-</Typography>}
                          </TableCell>

                          <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                              {emp?.username || '-'}
                            </Typography>
                          </TableCell>

                          <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                            <Chip label={roleLabel} size="small" variant="outlined"
                              sx={{ fontSize: '12px', fontWeight: 500 }} />
                          </TableCell>

                          <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                            {member.is_team_leader ? (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <StarIcon sx={{ fontSize: 16, color: '#D97706' }} />
                                <Typography variant="caption" fontWeight={600} sx={{ color: '#D97706' }}>Leader</Typography>
                              </Box>
                            ) : (
                              <Typography variant="body2" color="text.disabled">—</Typography>
                            )}
                          </TableCell>

                          <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
                            <Switch checked={member.is_active} onChange={() => handleToggleActive(member)} size="small" color="success" />
                          </TableCell>

                          <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
                            <Tooltip title="Remove from team" arrow>
                              <IconButton size="small" onClick={() => handleDelete(member)}
                                sx={{ p: 0.5, color: 'error.main', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)', transform: 'scale(1.2)' } }}>
                                <DeleteIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {filteredMembers.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, p: 2, borderTop: '1px solid #E5E7EB' }}>
                <IconButton
                  size="small"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                  sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}
                >
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
                {Array.from({ length: totalPages }, (_, i) => i).map((pageNum) => (
                  <IconButton
                    key={pageNum}
                    size="small"
                    onClick={() => setPage(pageNum)}
                    sx={{
                      minWidth: '36px', height: '36px', borderRadius: '8px', fontWeight: 600, fontSize: '14px',
                      backgroundColor: page === pageNum ? 'primary.main' : 'transparent',
                      color: page === pageNum ? '#FFFFFF' : 'text.primary',
                      border: '1px solid', borderColor: page === pageNum ? 'primary.main' : '#E5E7EB',
                      transition: 'all 0.3s ease',
                      '&:hover': { backgroundColor: page === pageNum ? 'primary.dark' : 'rgba(59, 130, 246, 0.1)', transform: 'scale(1.1)' },
                    }}
                  >
                    {pageNum + 1}
                  </IconButton>
                ))}
                <IconButton
                  size="small"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages - 1}
                  sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}
                >
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Card>
        </Grow>
      </Box>
    </Fade>
  );
}