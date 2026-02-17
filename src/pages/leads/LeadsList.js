import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Popover,
  TextField,
  Checkbox,
  FormControlLabel,
  Fade,
  Grow,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../../data/mod1dataService';
import { useAuth } from '../../contexts/AuthContext';
import PageHeader from '../../components/shared/PageHeader';
import { showDeleteConfirmation, showSuccessToast, showErrorToast } from '../../utils/sweetalert';

const DialogTransition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

// ── Search match types for the hierarchy indicator ─────────────────────────
const MATCH_TYPE_LABEL = {
  name:        { label: 'Name',        color: '#16A34A', bg: '#DCFCE7' },
  phone:       { label: 'Phone',       color: '#1D4ED8', bg: '#DBEAFE' },
  email:       { label: 'Email',       color: '#7C3AED', bg: '#EDE9FE' },
  national_id: { label: 'National ID', color: '#B45309', bg: '#FEF3C7' },
};

export default function LeadsList() {
  const navigate = useNavigate();
  const { access } = useAuth();
  const canDeleteLeads = !!access.canDeleteLeads;

  const [leads, setLeads] = useState([]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // ── Search & source filter ─────────────────────────────────────────────────
  const [globalSearch, setGlobalSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');   // '' = All

  // Pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Sorting
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Column filter popover (kept as-is)
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [currentFilterColumn, setCurrentFilterColumn] = useState(null);
  const [filters, setFilters] = useState({
    id: [], name: [], phone: [], national_id: [],
    source: [], partner: [], created_at: [],
  });
  const [searchText, setSearchText] = useState('');

  const columnLabels = {
    id: 'ID', name: 'Name', phone: 'Phone',
    national_id: 'National ID', source: 'Source Name',
    partner: 'Partner', created_at: 'Created Date',
  };

  useEffect(() => { loadLeads(); }, []);

  const loadLeads = () => setLeads(DataService.getLeads());

  const getLeadSource = useCallback((sourceId) => {
    const source = DataService.getLeadSourceById(sourceId);
    return source ? source.name : '-';
  }, []);

  const getPartnerName = useCallback((lead) => {
    if (!lead.partner_id) return '-';
    const partner = DataService.getPartnerById(lead.partner_id);
    return partner ? partner.name : '-';
  }, []);

  const getColumnValue = useCallback((lead, column) => {
    switch (column) {
      case 'id':         return `#${lead.id}`;
      case 'name':       return `${lead.first_name} ${lead.last_name}`;
      case 'phone':      return lead.phone;
      case 'national_id':return lead.national_id ? String(lead.national_id) : '-';
      case 'source':     return getLeadSource(lead.source_id);
      case 'partner':    return getPartnerName(lead);
      case 'created_at': return lead.created_at || '-';
      default:           return '';
    }
  }, [getLeadSource, getPartnerName]);

  // ── All unique sources for the dropdown ───────────────────────────────────
  const allSources = useMemo(() => {
    const sources = DataService.getLeadSources();
    return sources.map(s => ({ id: s.id, name: s.name }));
  }, []);

  // ── Normalize phone for comparison ────────────────────────────────────────
  const normalizePhone = (phone = '') => {
    if (phone.startsWith('01')) return '+20' + phone.substring(1);
    return phone;
  };

  // ── Global search with hierarchy ──────────────────────────────────────────
  // For NAME search: match anywhere in full name (case-insensitive)
  // For contact search: try phone first, then email, then national_id
  // Returns { matched: bool, matchType: 'name'|'phone'|'email'|'national_id'|null }

  // ── Determine which hierarchy level we are actually using ─────────────────
  // If ANY lead matches on phone → we're in "phone mode" (don't show email/nationalId matches)
  // If no phone match but email matches → "email mode", etc.
  const activeMatchType = useMemo(() => {
    if (!globalSearch.trim()) return null;
    const q = globalSearch.trim().toLowerCase();

    const hasNameMatch  = leads.some(l => `${l.first_name} ${l.last_name}`.toLowerCase().includes(q));
    if (hasNameMatch) return 'name';

    const normalizedQ = normalizePhone(globalSearch.trim());
    const hasPhoneMatch = leads.some(l =>
      (l.phone || '').toLowerCase().includes(q) ||
      normalizePhone(l.phone || '').includes(normalizedQ)
    );
    if (hasPhoneMatch) return 'phone';

    const hasEmailMatch = leads.some(l => (l.email || '').toLowerCase().includes(q));
    if (hasEmailMatch) return 'email';

    const hasNidMatch = leads.some(l => String(l.national_id || '').includes(q));
    if (hasNidMatch) return 'national_id';

    return null;
  }, [globalSearch, leads]);

  // ── Main filtered + sorted list ───────────────────────────────────────────
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // 1. Column filters (existing popover filters)
    Object.keys(filters).forEach((column) => {
      if (filters[column].length > 0) {
        result = result.filter((lead) => filters[column].includes(getColumnValue(lead, column)));
      }
    });

    // 2. Source dropdown filter
    if (sourceFilter) {
      result = result.filter(l => l.source_id === sourceFilter);
    }

    // 3. Global search with hierarchy
    if (globalSearch.trim()) {
      result = result.filter((lead) => {
        if (!activeMatchType) return false;
        // Only include leads that match at the active hierarchy level
        const q = globalSearch.trim().toLowerCase();
        const normalizedQ = normalizePhone(globalSearch.trim());
        switch (activeMatchType) {
          case 'name':
            return `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(q);
          case 'phone':
            return (
              (lead.phone || '').toLowerCase().includes(q) ||
              normalizePhone(lead.phone || '').includes(normalizedQ)
            );
          case 'email':
            return (lead.email || '').toLowerCase().includes(q);
          case 'national_id':
            return String(lead.national_id || '').includes(q);
          default:
            return false;
        }
      });
    }

    // 4. Sort
    if (sortColumn) {
      result.sort((a, b) => {
        const aVal = getColumnValue(a, sortColumn);
        const bVal = getColumnValue(b, sortColumn);
        if (sortColumn === 'id') {
          const diff = parseInt(aVal.replace('#', '')) - parseInt(bVal.replace('#', ''));
          return sortDirection === 'asc' ? diff : -diff;
        }
        const cmp = aVal.localeCompare(bVal, undefined, { sensitivity: 'base' });
        return sortDirection === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [leads, filters, sourceFilter, globalSearch, activeMatchType, sortColumn, sortDirection, getColumnValue]);

  const getUniqueColumnValues = useCallback((column) => {
    let data = [...leads];
    Object.keys(filters).forEach((col) => {
      if (col !== column && filters[col].length > 0) {
        data = data.filter(lead => filters[col].includes(getColumnValue(lead, col)));
      }
    });
    const values = new Set();
    data.forEach(lead => values.add(getColumnValue(lead, column)));
    return Array.from(values).sort();
  }, [leads, filters, getColumnValue]);

  const handleSortClick = (column) => {
    if (sortColumn === column) setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortColumn(column); setSortDirection('asc'); }
  };

  const handleFilterClick = (event, column) => {
    setFilterAnchorEl(event.currentTarget);
    setCurrentFilterColumn(column);
    setSearchText('');
  };
  const handleFilterClose = () => { setFilterAnchorEl(null); setCurrentFilterColumn(null); setSearchText(''); };
  const handleFilterToggle = (value) => {
    const col = currentFilterColumn;
    const cur = filters[col];
    setFilters({ ...filters, [col]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] });
  };
  const handleSelectAll = () => setFilters({ ...filters, [currentFilterColumn]: getUniqueColumnValues(currentFilterColumn) });
  const handleClearAll  = () => setFilters({ ...filters, [currentFilterColumn]: [] });

  const handleView   = (lead) => { setSelectedLead(lead); setViewDialogOpen(true); };
  const handleEdit   = (lead) => navigate(`/leads/edit/${lead.id}`);
  const handleDeleteClick = async (lead) => {
    const result = await showDeleteConfirmation('Delete Lead?', `Are you sure you want to delete ${lead.first_name} ${lead.last_name}?`);
    if (result.isConfirmed) {
      if (DataService.deleteLead(lead.id)) {
        setLeads(prev => prev.filter(l => l.id !== lead.id));
        showSuccessToast('Lead deleted successfully!');
      } else showErrorToast('Failed to delete lead');
    }
  };

  const handlePageChange = (newPage) => setPage(newPage);

  const paginatedLeads = filteredLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);

  useEffect(() => { setPage(0); }, [filters, sortColumn, sortDirection, globalSearch, sourceFilter]);

  const filterOpen = Boolean(filterAnchorEl);
  const filteredColumnValues = currentFilterColumn
    ? getUniqueColumnValues(currentFilterColumn).filter(v => String(v).toLowerCase().includes(searchText.toLowerCase()))
    : [];

  const matchInfo = activeMatchType ? MATCH_TYPE_LABEL[activeMatchType] : null;

  return (
    <Fade in timeout={500}>
      <Box>
        <PageHeader
          title="Leads Management"
          subtitle="Track and manage all your potential customers in one place"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Leads', active: true }]}
          actions={
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
              size="large"
              onClick={() => navigate('/leads/create')}
              sx={{
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.5)', transform: 'translateY(-2px)' },
                minWidth: { xs: '48px', sm: 'auto' },
                px: { xs: 1.5, sm: 3 },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Create Lead</Box>
              <AddIcon sx={{ display: { xs: 'inline-flex', sm: 'none' } }} />
            </Button>
          }
        />

        {/* Stats Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          {[
            { label: 'Total Leads',      value: leads.length,          color: 'primary' },
            { label: 'Filtered Results', value: filteredLeads.length,   color: 'success.main' },
            { label: 'Active Filters',   value: Object.values(filters).flat().length + (sourceFilter ? 1 : 0), color: 'info.main' },
          ].map((stat, i) => (
            <Grow in timeout={600 + i * 100} key={stat.label}>
              <Card sx={{ p: 3, flex: 1, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>{stat.label}</Typography>
                <Typography variant="h2" color={stat.color}>{stat.value}</Typography>
              </Card>
            </Grow>
          ))}
        </Box>

        {/* ── Search & Source Filter Bar ──────────────────────────────────── */}
        <Grow in timeout={850}>
          <Card sx={{ mb: 3, p: 2.5 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' } }}>

              {/* Global Search */}
              <Box sx={{ flex: 1, width: '100%' }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search by name or contact (phone → email → national ID)…"
                  value={globalSearch}
                  onChange={e => setGlobalSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: globalSearch && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setGlobalSearch('')}>
                          <CloseIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                />
                {/* Hierarchy indicator — only for contact searches, not name */}
                {globalSearch.trim() && activeMatchType !== 'name' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                    {['phone', 'email', 'national_id'].map((type, idx) => {
                      const info = MATCH_TYPE_LABEL[type];
                      const isActive = activeMatchType === type;
                      const isPassed = (
                        (type === 'email'       && activeMatchType === 'national_id') ||
                        (type === 'phone'       && ['email', 'national_id'].includes(activeMatchType))
                      );
                      return (
                        <React.Fragment key={type}>
                          <Chip
                            label={info.label}
                            size="small"
                            sx={{
                              fontSize: '11px',
                              height: 22,
                              fontWeight: 600,
                              backgroundColor: isActive ? info.bg : isPassed ? '#F3F4F6' : '#F9FAFB',
                              color: isActive ? info.color : isPassed ? '#9CA3AF' : '#D1D5DB',
                              border: `1px solid ${isActive ? info.color : '#E5E7EB'}`,
                              textDecoration: isPassed ? 'line-through' : 'none',
                            }}
                          />
                          {idx < 2 && (
                            <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '11px' }}>→</Typography>
                          )}
                        </React.Fragment>
                      );
                    })}
                    {matchInfo && activeMatchType !== 'name' && (
                      <Typography variant="caption" sx={{ color: matchInfo.color, fontWeight: 600, fontSize: '11px', ml: 0.5 }}>
                        Matching by {matchInfo.label}
                      </Typography>
                    )}
                    {!activeMatchType && (
                      <Typography variant="caption" sx={{ color: '#EF4444', fontSize: '11px' }}>
                        No results found
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>

              {/* Source Filter Dropdown */}
              <FormControl size="small" sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}>
                <InputLabel>Filter by Source</InputLabel>
                <Select
                  value={sourceFilter}
                  label="Filter by Source"
                  onChange={e => setSourceFilter(e.target.value)}
                  sx={{ borderRadius: '10px' }}
                >
                  <MenuItem value="">
                    <em>All Sources</em>
                  </MenuItem>
                  {allSources.map(source => (
                    <MenuItem key={source.id} value={source.id}>
                      {source.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Clear all filters button */}
              {(globalSearch || sourceFilter || Object.values(filters).flat().length > 0) && (
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<CloseIcon fontSize="small" />}
                  onClick={() => {
                    setGlobalSearch('');
                    setSourceFilter('');
                    setFilters({ id: [], name: [], phone: [], national_id: [], source: [], partner: [], created_at: [] });
                  }}
                  sx={{ borderRadius: '10px', whiteSpace: 'nowrap', height: 40 }}
                >
                  Clear All
                </Button>
              )}
            </Box>
          </Card>
        </Grow>

        {/* Table */}
        <Grow in timeout={900}>
          <Card>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table stickyHeader sx={{ tableLayout: 'auto' }}>
                <TableHead>
                  <TableRow>
                    {Object.keys(columnLabels).map((column, index) => (
                      <TableCell
                        key={column}
                        sx={{
                          py: 1.5, px: 2, whiteSpace: 'nowrap',
                          ...(index === 0 && {
                            position: { xs: 'sticky', md: 'static' },
                            left: { xs: 0, md: 'auto' },
                            zIndex: { xs: 3, md: 'auto' },
                            backgroundColor: { xs: '#ffffff', md: 'transparent' },
                            boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
                          }),
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {columnLabels[column]}
                          <Tooltip title={`Sort by ${columnLabels[column]}`} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
                            <IconButton size="small" onClick={() => handleSortClick(column)}
                              sx={{ p: 0.5, color: sortColumn === column ? 'primary.main' : 'inherit', transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59, 130, 246, 0.1)' } }}
                            >
                              {sortColumn === column && sortDirection === 'asc'
                                ? <ArrowUpwardIcon sx={{ fontSize: 18 }} />
                                : <ArrowDownwardIcon sx={{ fontSize: 18 }} />}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={`Filter ${columnLabels[column]}`} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
                            <IconButton size="small" onClick={(e) => handleFilterClick(e, column)}
                              sx={{ p: 0.5, color: filters[column].length > 0 ? 'primary.main' : 'inherit', transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59, 130, 246, 0.1)' } }}
                            >
                              <FilterListIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    ))}
                    <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                        <Box>
                          <PeopleIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                          <Typography variant="h6" color="text.secondary" gutterBottom>No leads found</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {(globalSearch || sourceFilter || Object.values(filters).flat().length > 0)
                              ? 'Try adjusting your search or filters'
                              : 'Create your first lead to get started'}
                          </Typography>
                          {!globalSearch && !sourceFilter && Object.values(filters).flat().length === 0 && (
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/leads/create')}>
                              Create Lead
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedLeads.map((lead) => {
                      return (
                        <TableRow
                          key={lead.id}
                          hover
                          sx={{
                            '&:last-child td': { borderBottom: 0 },
                            transition: 'background-color 0.2s ease',
                            '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.04)' },
                          }}
                        >
                          <TableCell sx={{
                            py: 1.5, px: 2,
                            position: { xs: 'sticky', md: 'static' },
                            left: { xs: 0, md: 'auto' },
                            zIndex: { xs: 2, md: 'auto' },
                            backgroundColor: { xs: '#ffffff', md: 'transparent' },
                            boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
                            'tr:hover &': { backgroundColor: { xs: '#f0f9ff', md: 'transparent' } },
                          }}>
                            <Chip label={`#${lead.id}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
                          </TableCell>
                          <TableCell sx={{ py: 1.5, px: 2 }}>
                            <Typography variant="body2" fontWeight={600} noWrap>
                              {lead.first_name} {lead.last_name}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 1.5, px: 2 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }} noWrap>{lead.phone}</Typography>
                          </TableCell>
                          <TableCell sx={{ py: 1.5, px: 2 }}>
                            {lead.national_id
                              ? <Typography variant="body2" sx={{ fontFamily: 'monospace' }} noWrap>{lead.national_id}</Typography>
                              : <Typography variant="body2" color="text.disabled">-</Typography>}
                          </TableCell>
                          <TableCell sx={{ py: 1.5, px: 2 }}>
                            <Chip label={getLeadSource(lead.source_id)} size="small" sx={{ backgroundColor: '#E0E7FF', color: '#3730A3', fontWeight: 600, fontSize: '12px' }} />
                          </TableCell>
                          <TableCell sx={{ py: 1.5, px: 2 }}>
                            <Typography variant="body2" noWrap>{getPartnerName(lead)}</Typography>
                          </TableCell>
                          <TableCell sx={{ py: 1.5, px: 2 }}>
                            <Typography variant="body2" color="text.secondary" noWrap>{lead.created_at || '-'}</Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                              <Tooltip title="View Details" arrow TransitionComponent={Fade}>
                                <IconButton size="small" onClick={() => handleView(lead)}
                                  sx={{ p: 0.5, color: 'info.main', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)', transform: 'scale(1.2)' } }}>
                                  <ViewIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit" arrow TransitionComponent={Fade}>
                                <IconButton size="small" onClick={() => handleEdit(lead)}
                                  sx={{ p: 0.5, color: 'warning.main', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(245, 158, 11, 0.1)', transform: 'scale(1.2)' } }}>
                                  <EditIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete" arrow TransitionComponent={Fade}>
                                <span>
                                  <IconButton size="small" onClick={() => handleDeleteClick(lead)} disabled={!canDeleteLeads}
                                    sx={{ p: 0.5, color: canDeleteLeads ? 'error.main' : 'text.disabled', transition: 'all 0.2s ease',
                                      '&:hover': { backgroundColor: canDeleteLeads ? 'rgba(239, 68, 68, 0.1)' : 'transparent', transform: canDeleteLeads ? 'scale(1.2)' : 'none' } }}>
                                    <DeleteIcon sx={{ fontSize: 20 }} />
                                  </IconButton>
                                </span>
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

            {/* Pagination */}
            {filteredLeads.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, p: 2, borderTop: '1px solid #E5E7EB' }}>
                <IconButton size="small" onClick={() => handlePageChange(page - 1)} disabled={page === 0}
                  sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}>
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
                {Array.from({ length: totalPages }, (_, i) => i).map((pageNum) => (
                  <IconButton key={pageNum} size="small" onClick={() => handlePageChange(pageNum)}
                    sx={{ minWidth: '36px', height: '36px', borderRadius: '8px', fontWeight: 600, fontSize: '14px',
                      backgroundColor: page === pageNum ? 'primary.main' : 'transparent',
                      color: page === pageNum ? '#FFFFFF' : 'text.primary',
                      border: '1px solid', borderColor: page === pageNum ? 'primary.main' : '#E5E7EB',
                      transition: 'all 0.3s ease', '&:hover': { backgroundColor: page === pageNum ? 'primary.dark' : 'rgba(59, 130, 246, 0.1)', transform: 'scale(1.1)' } }}>
                    {pageNum + 1}
                  </IconButton>
                ))}
                <IconButton size="small" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}
                  sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}>
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Card>
        </Grow>

        {/* Column Filter Popover */}
        <Popover
          open={filterOpen}
          anchorEl={filterAnchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          TransitionComponent={Grow}
          TransitionProps={{ timeout: 300 }}
          PaperProps={{ sx: { p: 1.5, minWidth: 260, maxHeight: 360, borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.95rem' }}>
            {currentFilterColumn ? `${columnLabels[currentFilterColumn]} Filter` : 'Filter Options'}
          </Typography>
          <TextField fullWidth size="small" placeholder="Search..." value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ mb: 1.5, '& .MuiInputBase-root': { height: '32px', fontSize: '0.875rem' } }} />
          <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
            <Button size="small" variant="outlined" onClick={handleSelectAll} fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Select All</Button>
            <Button size="small" variant="outlined" onClick={handleClearAll} fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Clear All</Button>
          </Box>
          <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
            {filteredColumnValues.map((value) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox checked={currentFilterColumn ? filters[currentFilterColumn].includes(value) : false}
                    onChange={() => handleFilterToggle(value)} size="small"
                    sx={{ py: 0.25, '& .MuiSvgIcon-root': { fontSize: 18 } }} />
                }
                label={value}
                sx={{ display: 'block', mb: 0, ml: 0, mr: 0, '& .MuiFormControlLabel-label': { fontSize: '0.8125rem', lineHeight: 1.4 }, '& .MuiCheckbox-root': { py: 0.5 } }}
              />
            ))}
          </Box>
        </Popover>

        {/* View Lead Dialog */}
        <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="sm" fullWidth
          TransitionComponent={DialogTransition} TransitionProps={{ timeout: 400 }}
          PaperProps={{ sx: { borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' } }}>
          <DialogTitle sx={{ fontWeight: 600, borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 1 }}>
            Lead Details
            {selectedLead && <Chip label={`#${selectedLead.id}`} size="small" color="primary" sx={{ fontWeight: 600 }} />}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            {selectedLead && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Name',        value: `${selectedLead.first_name} ${selectedLead.last_name}` },
                  { label: 'Phone',       value: selectedLead.phone,       mono: true },
                  { label: 'National ID', value: selectedLead.national_id, mono: true, hide: !selectedLead.national_id },
                  { label: 'Email',       value: selectedLead.email,       hide: !selectedLead.email },
                  { label: 'Source',      value: getLeadSource(selectedLead.source_id) },
                  { label: 'Partner',     value: getPartnerName(selectedLead), hide: !selectedLead.partner_id },
                  { label: 'Created Date',value: selectedLead.created_at || '-' },
                ].filter(f => !f.hide).map(field => (
                  <Box key={field.label}>
                    <Typography variant="caption" color="text.secondary">{field.label}</Typography>
                    <Typography variant="body1" fontWeight={field.label === 'Name' ? 600 : 400} sx={field.mono ? { fontFamily: 'monospace' } : {}}>
                      {field.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 0 }}>
            <Button onClick={() => setViewDialogOpen(false)} variant="contained"
              sx={{ transition: 'all 0.2s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' } }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
}