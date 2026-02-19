import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box, Card, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton,
  Chip, Tooltip, Typography, Switch, Grow, Fade,
  Avatar, TextField, InputAdornment,
  Popover, Checkbox, FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Groups as GroupsIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { HRDataService, TEAM_MEMBER_ROLES } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showDeleteConfirmation, showSuccessToast, showErrorToast } from '../../utils/sweetalert';
import { PaginationWithSize } from '../../components/shared/PaginationWithSize';

const PAGE_SIZE_OPTIONS = [100, 200, 500, 1000, 1500, 2000];

function getInitials(name = '') {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().substring(0, 2);
}

const stickyHeaderSx = {
  py: 1.5, px: 2, whiteSpace: 'nowrap',
  position: { xs: 'sticky', md: 'static' }, left: { xs: 0, md: 'auto' },
  zIndex: { xs: 3, md: 'auto' }, backgroundColor: { xs: '#F9FAFB', md: 'transparent' },
  boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
};
const stickyBodySx = {
  py: 1.5, px: 2,
  position: { xs: 'sticky', md: 'static' }, left: { xs: 0, md: 'auto' },
  zIndex: { xs: 2, md: 'auto' }, backgroundColor: { xs: '#ffffff', md: 'transparent' },
  boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
  'tr:hover &': { backgroundColor: { xs: '#f0f9ff', md: 'transparent' } },
};

// ── leader column removed ──────────────────────────────────────────────────────
const COLS = { member: 'Member', username: 'Username', role: 'Role', status: 'Status' };

export default function TeamMembers() {
  const { teamId } = useParams();
  const navigate   = useNavigate();
  const [members, setMembers] = useState([]);

  const [globalSearch,     setGlobalSearch]     = useState('');
  const [sortColumn,       setSortColumn]       = useState(null);
  const [sortDirection,    setSortDirection]    = useState('asc');
  const [filters,          setFilters]          = useState(Object.fromEntries(Object.keys(COLS).map(k => [k, []])));
  const [filterAnchorEl,   setFilterAnchorEl]   = useState(null);
  const [currentFilterCol, setCurrentFilterCol] = useState(null);
  const [filterSearch,     setFilterSearch]     = useState('');
  const [page,     setPage]     = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  const team = HRDataService.getTeamById(Number(teamId));

  useEffect(() => {
    if (team) setMembers(HRDataService.getTeamMembersByTeam(Number(teamId)));
  }, [teamId, team]);

  const getVal = useCallback((m, col) => {
    const emp = HRDataService.getEmployeeById(m.employee_id);
    switch (col) {
      case 'member':   return emp?.full_name || `Employee #${m.employee_id}`;
      case 'username': return emp?.username  || '—';
      case 'role':     return TEAM_MEMBER_ROLES.find(r => r.value === m.role)?.label || m.role;
      case 'status':   return m.is_active ? 'Active' : 'Inactive';
      default:         return '';
    }
  }, []);

  const getUniqueVals = useCallback((col) => {
    let list = [...members];
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      list = list.filter(m => Object.keys(COLS).some(c => getVal(m, c).toLowerCase().includes(q)));
    }
    Object.keys(filters).forEach(c => {
      if (c !== col && filters[c].length) list = list.filter(m => filters[c].includes(getVal(m, c)));
    });
    return [...new Set(list.map(m => getVal(m, col)))].sort();
  }, [members, globalSearch, filters, getVal]);

  const processed = useMemo(() => {
    let list = [...members];
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      list = list.filter(m => Object.keys(COLS).some(col => getVal(m, col).toLowerCase().includes(q)));
    }
    Object.keys(filters).forEach(col => {
      if (filters[col].length) list = list.filter(m => filters[col].includes(getVal(m, col)));
    });
    if (sortColumn) {
      list.sort((a, b) => {
        const cmp = getVal(a, sortColumn).localeCompare(getVal(b, sortColumn), undefined, { sensitivity: 'base' });
        return sortDirection === 'asc' ? cmp : -cmp;
      });
    }
    return list;
  }, [members, globalSearch, filters, sortColumn, sortDirection, getVal]);

  useEffect(() => { setPage(0); }, [globalSearch, filters, sortColumn, pageSize]);

  const paginated  = processed.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(processed.length / pageSize);
  const filterOpen = Boolean(filterAnchorEl);
  const hasFilter  = globalSearch || Object.values(filters).flat().length > 0;

  const popoverVals = currentFilterCol
    ? getUniqueVals(currentFilterCol).filter(v => v.toLowerCase().includes(filterSearch.toLowerCase()))
    : [];

  const handleSortClick   = (col) => { if (sortColumn === col) setSortDirection(d => d === 'asc' ? 'desc' : 'asc'); else { setSortColumn(col); setSortDirection('asc'); } };
  const handleFilterClick = (e, col) => { setFilterAnchorEl(e.currentTarget); setCurrentFilterCol(col); setFilterSearch(''); };
  const handleFilterClose = () => { setFilterAnchorEl(null); setCurrentFilterCol(null); setFilterSearch(''); };
  const handleToggle      = (val) => { const col = currentFilterCol; const cur = filters[col]; setFilters(f => ({ ...f, [col]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] })); };
  const handleSelectAll   = () => setFilters(f => ({ ...f, [currentFilterCol]: getUniqueVals(currentFilterCol) }));
  const handleClearCol    = () => setFilters(f => ({ ...f, [currentFilterCol]: [] }));
  const handleClearAll    = () => { setGlobalSearch(''); setFilters(Object.fromEntries(Object.keys(COLS).map(k => [k, []]))); };

  if (!team) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">Team not found.</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }} startIcon={<ArrowBackIcon />}>Go Back</Button>
      </Box>
    );
  }

  const handleToggleActive = (member) => {
    const updated = HRDataService.updateTeamMember(member.id, { is_active: !member.is_active });
    if (updated) {
      setMembers(prev => prev.map(m => m.id === member.id ? updated : m));
      showSuccessToast(`Member ${updated.is_active ? 'activated' : 'deactivated'} successfully!`);
    }
  };

  const handleDelete = async (member) => {
    const emp    = HRDataService.getEmployeeById(member.employee_id);
    const result = await showDeleteConfirmation('Remove Member?', `Remove "${emp?.full_name || 'this member'}" from ${team.name}?`);
    if (result.isConfirmed) {
      if (HRDataService.deleteTeamMember(member.id)) {
        setMembers(prev => prev.filter(m => m.id !== member.id));
        showSuccessToast('Member removed successfully!');
      } else showErrorToast('Failed to remove member');
    }
  };

  const activeCount = members.filter(m => m.is_active).length;
  const leaderCount = members.filter(m => m.is_team_leader).length;

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
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>Back</Button>
              <Button variant="contained" size="large"
                startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
                onClick={() => navigate(`/hr/teams/${teamId}/assign`)}
                sx={{ boxShadow: '0 4px 6px -1px rgba(59,130,246,0.4)', '&:hover': { transform: 'translateY(-2px)' } }}>
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
            {/* ── Search bar ── */}
            <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB', display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField size="small" fullWidth placeholder="Search members..."
                value={globalSearch} onChange={e => setGlobalSearch(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment>,
                  endAdornment: globalSearch && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setGlobalSearch('')}><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiInputBase-root': { height: '38px', fontSize: '0.85rem', borderRadius: '10px' } }} />
              {hasFilter && (
                <Button size="small" variant="outlined" color="error" startIcon={<CloseIcon fontSize="small" />}
                  onClick={handleClearAll}
                  sx={{ borderRadius: '10px', whiteSpace: 'nowrap', height: '38px', flexShrink: 0 }}>
                  Clear All
                </Button>
              )}
            </Box>

            {hasFilter && (
              <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #F3F4F6', backgroundColor: '#FAFAFA' }}>
                <Typography variant="caption" color="text.secondary">
                  Showing <strong>{processed.length}</strong> of <strong>{members.length}</strong> members
                </Typography>
              </Box>
            )}

            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table stickyHeader sx={{ tableLayout: 'auto' }}>
                <TableHead>
                  <TableRow>
                    {Object.keys(COLS).map((col, index) => (
                      <TableCell key={col} sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap', ...(index === 0 && stickyHeaderSx) }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {COLS[col]}
                          <Tooltip title={`Sort by ${COLS[col]}`} arrow>
                            <IconButton size="small" onClick={() => handleSortClick(col)}
                              sx={{ p: 0.5, color: sortColumn === col ? 'primary.main' : 'inherit', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59,130,246,0.1)' } }}>
                              {sortColumn === col && sortDirection === 'asc'
                                ? <ArrowUpwardIcon sx={{ fontSize: 18 }} />
                                : <ArrowDownwardIcon sx={{ fontSize: 18 }} />}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={`Filter ${COLS[col]}`} arrow>
                            <IconButton size="small" onClick={e => handleFilterClick(e, col)}
                              sx={{ p: 0.5, color: filters[col]?.length > 0 ? 'primary.main' : 'inherit', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59,130,246,0.1)' } }}>
                              <FilterListIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    ))}
                    <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Active</TableCell>
                    <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginated.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={Object.keys(COLS).length + 2} align="center" sx={{ py: 8 }}>
                        <GroupsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          {hasFilter ? 'No members match your search' : 'No members yet'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          {hasFilter ? 'Try adjusting your filters' : 'Assign the first sales employee to this team'}
                        </Typography>
                        {!hasFilter && (
                          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate(`/hr/teams/${teamId}/assign`)}>Assign Member</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginated.map((member) => {
                      const emp       = HRDataService.getEmployeeById(member.employee_id);
                      const roleLabel = TEAM_MEMBER_ROLES.find(r => r.value === member.role)?.label || member.role;
                      return (
                        <TableRow key={member.id} hover sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>

                          {/* Member (sticky) */}
                          <TableCell sx={stickyBodySx}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar sx={{ width: 36, height: 36, fontSize: 13, fontWeight: 700, background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)', flexShrink: 0 }}>
                                {getInitials(emp?.full_name || '?')}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: { xs: 120, sm: 'none' } }}>
                                  {emp?.full_name || `Employee #${member.employee_id}`}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" noWrap>{emp?.email || '—'}</Typography>
                              </Box>
                            </Box>
                          </TableCell>

                          {/* Username */}
                          <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{emp?.username || '—'}</Typography>
                          </TableCell>

                          {/* Role */}
                          <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                            <Chip label={roleLabel} size="small" variant="outlined" sx={{ fontSize: '12px', fontWeight: 500 }} />
                          </TableCell>

                          {/* Status */}
                          <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                            <Chip label={member.is_active ? 'Active' : 'Inactive'} size="small"
                              sx={{ backgroundColor: member.is_active ? '#DCFCE7' : '#FEE2E2', color: member.is_active ? '#166534' : '#991B1B', fontWeight: 600, fontSize: '12px' }} />
                          </TableCell>

                          {/* Active toggle */}
                          <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
                            <Switch checked={member.is_active} onChange={() => handleToggleActive(member)} size="small" color="success" />
                          </TableCell>

                          {/* Actions */}
                          <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                              <Tooltip title="Edit member" arrow>
                                <IconButton size="small" onClick={() => navigate(`/hr/teams/${teamId}/members/${member.id}/edit`)}
                                  sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}>
                                  <EditIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Remove from team" arrow>
                                <IconButton size="small" onClick={() => handleDelete(member)}
                                  sx={{ p: 0.5, color: 'error.main', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)', transform: 'scale(1.2)' } }}>
                                  <DeleteIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <PaginationWithSize
              page={page} totalPages={totalPages} totalCount={processed.length}
              pageSize={pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />
          </Card>
        </Grow>

        {/* ── Filter Popover — matching LeadSources style ── */}
        <Popover
          open={filterOpen} anchorEl={filterAnchorEl} onClose={handleFilterClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          TransitionComponent={Grow} TransitionProps={{ timeout: 300 }}
          PaperProps={{ sx: { p: 1.5, minWidth: 260, maxHeight: 360, borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}>
          <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.95rem' }}>
            {currentFilterCol ? `${COLS[currentFilterCol]} Filter` : 'Filter Options'}
          </Typography>
          <TextField fullWidth size="small" placeholder="Search..." value={filterSearch}
            onChange={e => setFilterSearch(e.target.value)}
            sx={{ mb: 1.5, '& .MuiInputBase-root': { height: '32px', fontSize: '0.875rem' } }} />
          <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
            <Button size="small" variant="outlined" onClick={handleSelectAll} fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Select All</Button>
            <Button size="small" variant="outlined" onClick={handleClearCol}  fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Clear All</Button>
          </Box>
          <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
            {popoverVals.map(val => (
              <FormControlLabel key={val}
                control={
                  <Checkbox
                    checked={currentFilterCol ? (filters[currentFilterCol]?.includes(val) ?? false) : false}
                    onChange={() => handleToggle(val)}
                    size="small"
                    sx={{ py: 0.25, '& .MuiSvgIcon-root': { fontSize: 18 } }} />
                }
                label={val}
                sx={{ display: 'block', mb: 0, ml: 0, mr: 0, '& .MuiFormControlLabel-label': { fontSize: '0.8125rem', lineHeight: 1.4 }, '& .MuiCheckbox-root': { py: 0.5 } }} />
            ))}
          </Box>
        </Popover>
      </Box>
    </Fade>
  );
}