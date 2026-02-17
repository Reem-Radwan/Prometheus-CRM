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
  Typography,
  Popover,
  TextField,
  Checkbox,
  FormControlLabel,
  Fade,
  Grow,
  Tabs,
  Tab,
  Switch,
  Divider,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Campaign as CampaignIcon,
  Event as EventIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  CalendarMonth as CalendarIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MarketingDataService, getPlatformStyle } from '../../data/marketingDataService';
import PageHeader from '../../components/shared/PageHeader';
import {
  showDeleteConfirmation,
  showSuccessToast,
  showErrorToast,
} from '../../utils/sweetalert';

// ─── Reusable filter + search hook ───────────────────────────────────────────
function useTableControls(data, columnDefs, getVal) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [currentFilterColumn, setCurrentFilterColumn] = useState(null);
  const [filters, setFilters] = useState(
    Object.fromEntries(Object.keys(columnDefs).map((k) => [k, []]))
  );
  const [filterSearchText, setFilterSearchText] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const filtered = useMemo(() => {
    let f = [...data];
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      f = f.filter((row) =>
        Object.keys(columnDefs).some((col) =>
          String(getVal(row, col)).toLowerCase().includes(q)
        )
      );
    }
    Object.keys(filters).forEach((col) => {
      if (filters[col].length > 0)
        f = f.filter((row) => filters[col].includes(getVal(row, col)));
    });
    if (sortColumn) {
      f.sort((a, b) => {
        const av = getVal(a, sortColumn);
        const bv = getVal(b, sortColumn);
        if (sortColumn === 'id') {
          return sortDirection === 'asc'
            ? parseInt(av.replace('#', '')) - parseInt(bv.replace('#', ''))
            : parseInt(bv.replace('#', '')) - parseInt(av.replace('#', ''));
        }
        if (sortColumn === 'budget') {
          return sortDirection === 'asc'
            ? parseFloat(av.replace(/[^0-9.]/g, '')) - parseFloat(bv.replace(/[^0-9.]/g, ''))
            : parseFloat(bv.replace(/[^0-9.]/g, '')) - parseFloat(av.replace(/[^0-9.]/g, ''));
        }
        const cmp = av.localeCompare(bv, undefined, { sensitivity: 'base' });
        return sortDirection === 'asc' ? cmp : -cmp;
      });
    }
    return f;
  }, [data, filters, sortColumn, sortDirection, getVal, globalSearch, columnDefs]);

  const getUniqueVals = useCallback(
    (col) => {
      let d = [...data];
      Object.keys(filters).forEach((c) => {
        if (c !== col && filters[c].length > 0)
          d = d.filter((row) => filters[c].includes(getVal(row, c)));
      });
      return [...new Set(d.map((row) => getVal(row, col)))].sort();
    },
    [data, filters, getVal]
  );

  const handleSortClick = (col) => {
    if (sortColumn === col) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    else { setSortColumn(col); setSortDirection('asc'); }
  };
  const handleFilterClick = (e, col) => {
    setFilterAnchorEl(e.currentTarget);
    setCurrentFilterColumn(col);
    setFilterSearchText('');
  };
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
    setCurrentFilterColumn(null);
    setFilterSearchText('');
  };
  const handleFilterToggle = (val) => {
    const col = currentFilterColumn;
    const cur = filters[col];
    setFilters({ ...filters, [col]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val] });
  };
  const handleSelectAll = () =>
    setFilters({ ...filters, [currentFilterColumn]: getUniqueVals(currentFilterColumn) });
  const handleClearAll = () => setFilters({ ...filters, [currentFilterColumn]: [] });

  useEffect(() => { setPage(0); }, [filters, sortColumn, sortDirection, globalSearch]);

  const paginated = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const filterOpen = Boolean(filterAnchorEl);
  const filteredPopoverValues = currentFilterColumn
    ? getUniqueVals(currentFilterColumn).filter((v) =>
        String(v).toLowerCase().includes(filterSearchText.toLowerCase())
      )
    : [];

  return {
    filtered, paginated, page, setPage, totalPages,
    sortColumn, sortDirection, handleSortClick,
    filterAnchorEl, filterOpen, currentFilterColumn,
    filters, filterSearchText, setFilterSearchText,
    globalSearch, setGlobalSearch,
    handleFilterClick, handleFilterClose,
    handleFilterToggle, handleSelectAll, handleClearAll,
    filteredPopoverValues,
  };
}

// ─── Shared Filter Popover ────────────────────────────────────────────────────
function FilterPopover({ open, anchorEl, onClose, title, searchText, onSearch,
  onSelectAll, onClearAll, values, filters, currentCol, onToggle }) {
  return (
    <Popover
      open={open} anchorEl={anchorEl} onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      TransitionComponent={Grow} TransitionProps={{ timeout: 300 }}
      PaperProps={{ sx: { p: 1.5, minWidth: 250, maxHeight: 350, borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}
    >
      <Typography sx={{ mb: 1.25, fontWeight: 600, fontSize: '0.9rem' }}>{title}</Typography>
      <TextField fullWidth size="small" placeholder="Search..." value={searchText}
        onChange={(e) => onSearch(e.target.value)}
        sx={{ mb: 1.25, '& .MuiInputBase-root': { height: '32px', fontSize: '0.85rem' } }} />
      <Box sx={{ display: 'flex', gap: 0.75, mb: 1.25 }}>
        <Button size="small" variant="outlined" onClick={onSelectAll} fullWidth sx={{ py: 0.4, fontSize: '0.75rem', minHeight: '28px' }}>Select All</Button>
        <Button size="small" variant="outlined" onClick={onClearAll} fullWidth sx={{ py: 0.4, fontSize: '0.75rem', minHeight: '28px' }}>Clear All</Button>
      </Box>
      <Box sx={{ maxHeight: 210, overflowY: 'auto' }}>
        {values.map((val) => (
          <FormControlLabel key={val}
            control={<Checkbox checked={currentCol ? filters[currentCol]?.includes(val) : false}
              onChange={() => onToggle(val)} size="small"
              sx={{ py: 0.3, '& .MuiSvgIcon-root': { fontSize: 17 } }} />}
            label={val}
            sx={{ display: 'block', mb: 0, ml: 0, mr: 0,
              '& .MuiFormControlLabel-label': { fontSize: '0.82rem', lineHeight: 1.5 },
              '& .MuiCheckbox-root': { py: 0.3 } }} />
        ))}
      </Box>
    </Popover>
  );
}

// ─── Pagination strip ────────────────────────────────────────────────────────
function PaginationStrip({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.75, p: 1.5, borderTop: '1px solid #E5E7EB' }}>
      <IconButton size="small" onClick={() => onPageChange(page - 1)} disabled={page === 0}
        sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)' }, '&:disabled': { opacity: 0.3 } }}>
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      {Array.from({ length: totalPages }, (_, i) => i).map((n) => (
        <IconButton key={n} size="small" onClick={() => onPageChange(n)}
          sx={{ minWidth: '34px', height: '34px', borderRadius: '8px', fontWeight: 600, fontSize: '13px',
            backgroundColor: page === n ? 'primary.main' : 'transparent',
            color: page === n ? '#FFFFFF' : 'text.primary',
            border: '1px solid', borderColor: page === n ? 'primary.main' : '#E5E7EB',
            '&:hover': { backgroundColor: page === n ? 'primary.dark' : 'rgba(59,130,246,0.1)' } }}>
          {n + 1}
        </IconButton>
      ))}
      <IconButton size="small" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages - 1}
        sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)' }, '&:disabled': { opacity: 0.3 } }}>
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

// ─── Column header cell ───────────────────────────────────────────────────────
const headerCellSx = {
  py: 1.25, px: 1.5, whiteSpace: 'nowrap',
  fontSize: '0.8rem', fontWeight: 700, backgroundColor: '#F9FAFB',
};

const stickyHeaderCellSx = {
  ...headerCellSx,
  position: { xs: 'sticky', md: 'static' },
  left: { xs: 0, md: 'auto' },
  zIndex: { xs: 4, md: 'auto' },
  boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
};

// Sticky body cell sx for ID column
const stickyBodyCellSx = {
  py: 1.1, px: 1.5,
  position: { xs: 'sticky', md: 'static' },
  left: { xs: 0, md: 'auto' },
  zIndex: { xs: 2, md: 'auto' },
  backgroundColor: { xs: '#ffffff', md: 'transparent' },
  boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
  'tr:hover &': { backgroundColor: { xs: '#f0f9ff', md: 'transparent' } },
};

function SortFilterHeader({ label, column, sortColumn, sortDirection, filterCount, onSort, onFilter, sticky = false }) {
  return (
    <TableCell sx={sticky ? stickyHeaderCellSx : headerCellSx}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {label}
        <Tooltip title={`Sort by ${label}`} arrow>
          <IconButton size="small" onClick={() => onSort(column)}
            sx={{ p: 0.3, color: sortColumn === column ? 'primary.main' : 'text.secondary',
              '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)' } }}>
            {sortColumn === column && sortDirection === 'asc'
              ? <ArrowUpwardIcon sx={{ fontSize: 15 }} />
              : <ArrowDownwardIcon sx={{ fontSize: 15 }} />}
          </IconButton>
        </Tooltip>
        <Tooltip title={`Filter ${label}`} arrow>
          <IconButton size="small" onClick={(e) => onFilter(e, column)}
            sx={{ p: 0.3, color: filterCount > 0 ? 'primary.main' : 'text.secondary',
              '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)' } }}>
            <FilterListIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </TableCell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CAMPAIGNS TAB
// ═══════════════════════════════════════════════════════════════════════════════
function CampaignsTab() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const platforms = MarketingDataService.getPlatforms();

  useEffect(() => { setCampaigns(MarketingDataService.getCampaigns()); }, []);

  const campaignCols = { id: 'ID', name: 'Name', platform: 'Platform', budget: 'Budget', start_date: 'Start Date', end_date: 'End Date', status: 'Status' };

  const getCampaignVal = useCallback((row, col) => {
    switch (col) {
      case 'id': return `#${row.id}`;
      case 'name': return row.name;
      case 'platform': return platforms.find((p) => p.id === row.platform_id)?.name || '-';
      case 'budget': return row.budget ? `${Number(row.budget).toLocaleString()}` : '-';
      case 'start_date': return row.start_date || '-';
      case 'end_date': return row.end_date || '-';
      case 'status': return MarketingDataService.getCampaignStatus(row);
      default: return '';
    }
  }, [platforms]);

  const controls = useTableControls(campaigns, campaignCols, getCampaignVal);

  const handleToggleActive = (campaign) => {
    const updated = MarketingDataService.updateCampaign(campaign.id, { is_active: !campaign.is_active });
    if (updated) {
      setCampaigns((prev) => prev.map((c) => (c.id === campaign.id ? updated : c)));
      showSuccessToast(`Campaign ${updated.is_active ? 'activated' : 'deactivated'} successfully!`);
    }
  };

  const handleDelete = async (campaign) => {
    const result = await showDeleteConfirmation('Delete Campaign?', `Delete "${campaign.name}"?`);
    if (result.isConfirmed) {
      if (MarketingDataService.deleteCampaign(campaign.id)) {
        setCampaigns((prev) => prev.filter((c) => c.id !== campaign.id));
        showSuccessToast('Campaign deleted successfully!');
      } else showErrorToast('Failed to delete campaign');
    }
  };

  const activeCampaigns = campaigns.filter((c) => c.is_active).length;
  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
  const runningCount = campaigns.filter((c) => MarketingDataService.getCampaignStatus(c) === 'Running').length;

  return (
    <Box>
      {/* Stats — 2×2 grid on mobile, 4 columns on sm+ */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
        gap: 2,
        mb: 2.5,
      }}>
        {[
          { label: 'Total Campaigns', value: campaigns.length, color: 'primary.main' },
          { label: 'Active', value: activeCampaigns, color: '#16A34A' },
          { label: 'Currently Running', value: runningCount, color: '#0891B2' },
          { label: 'Total Budget', value: `${(totalBudget / 1000).toFixed(0)}K`, color: '#D97706' },
        ].map((stat, i) => (
          <Grow in timeout={600 + i * 100} key={stat.label}>
            <Card sx={{ p: 2, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
              <Typography color="text.secondary" sx={{ mb: 0.5, fontSize: '0.72rem', fontWeight: 500 }}>{stat.label}</Typography>
              <Typography sx={{ color: stat.color, fontSize: '1.6rem', fontWeight: 700, lineHeight: 1 }}>{stat.value}</Typography>
            </Card>
          </Grow>
        ))}
      </Box>

      <Grow in timeout={900}>
        <Card>
          {/* Search Bar */}
          <Box sx={{ p: 1.5, borderBottom: '1px solid #E5E7EB' }}>
            <TextField
              fullWidth size="small"
              placeholder="Search campaigns by name, platform, status..."
              value={controls.globalSearch}
              onChange={(e) => controls.setGlobalSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiInputBase-root': { height: '36px', fontSize: '0.85rem' } }}
            />
          </Box>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table size="small" sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {Object.entries(campaignCols).map(([col, label], index) => (
                    <SortFilterHeader
                      key={col} label={label} column={col}
                      sticky={index === 0}
                      sortColumn={controls.sortColumn} sortDirection={controls.sortDirection}
                      filterCount={controls.filters[col]?.length || 0}
                      onSort={controls.handleSortClick} onFilter={controls.handleFilterClick}
                    />
                  ))}
                  <TableCell align="center" sx={headerCellSx}>Active</TableCell>
                  <TableCell align="center" sx={headerCellSx}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {controls.paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                      <CampaignIcon sx={{ fontSize: 52, color: 'text.disabled', mb: 1 }} />
                      <Typography color="text.secondary" sx={{ fontSize: '0.95rem', fontWeight: 600 }}>No campaigns found</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2, fontSize: '0.82rem' }}>
                        {Object.values(controls.filters).flat().length > 0 || controls.globalSearch ? 'Try adjusting your search or filters' : 'Create your first campaign'}
                      </Typography>
                      {Object.values(controls.filters).flat().length === 0 && !controls.globalSearch && (
                        <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => navigate('/marketing/campaigns/create')}>New Campaign</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  controls.paginated.map((campaign) => {
                    const platformStyle = getPlatformStyle(campaign.platform_id);
                    const status = MarketingDataService.getCampaignStatus(campaign);
                    const statusStyle = MarketingDataService.getCampaignStatusStyle(status);
                    return (
                      <TableRow key={campaign.id} hover sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>
                        {/* ID — sticky on mobile */}
                        <TableCell sx={stickyBodyCellSx}>
                          <Chip label={`#${campaign.id}`} size="small" color="primary" variant="outlined"
                            sx={{ fontWeight: 600, fontSize: '0.72rem', height: '22px' }} />
                        </TableCell>
                        <TableCell sx={{ py: 1.1, px: 1.5 }}>
                          <Typography noWrap sx={{ fontSize: '0.82rem', fontWeight: 600 }} title={campaign.name}>{campaign.name}</Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1.1, px: 1.5 }}>
                          <Chip label={platformStyle.label} size="small"
                            sx={{ backgroundColor: platformStyle.bg, color: platformStyle.color, fontWeight: 600, fontSize: '0.72rem', height: '22px' }} />
                        </TableCell>
                        <TableCell sx={{ py: 1.1, px: 1.5 }}>
                          {campaign.budget
                            ? <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#92400E' }}>{Number(campaign.budget).toLocaleString()}</Typography>
                            : <Typography sx={{ fontSize: '0.82rem', color: 'text.disabled' }}>-</Typography>}
                        </TableCell>
                        <TableCell sx={{ py: 1.1, px: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarIcon sx={{ fontSize: 12, color: 'text.disabled', flexShrink: 0 }} />
                            <Typography noWrap sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>{campaign.start_date || '-'}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1.1, px: 1.5 }}>
                          <Typography noWrap sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>{campaign.end_date || '-'}</Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1.1, px: 1.5 }}>
                          <Chip label={status} size="small"
                            sx={{ backgroundColor: statusStyle.bg, color: statusStyle.color, fontWeight: 600, fontSize: '0.72rem', height: '22px' }} />
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1.1, px: 1.5 }}>
                          <Switch checked={campaign.is_active} onChange={() => handleToggleActive(campaign)} size="small" color="success" />
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1.1, px: 1.5 }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="Edit" arrow>
                              <IconButton size="small" onClick={() => navigate(`/marketing/campaigns/edit/${campaign.id}`)}
                                sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)' } }}>
                                <EditIcon sx={{ fontSize: 17 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                              <IconButton size="small" onClick={() => handleDelete(campaign)}
                                sx={{ p: 0.5, color: 'error.main', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)' } }}>
                                <DeleteIcon sx={{ fontSize: 17 }} />
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
          <PaginationStrip page={controls.page} totalPages={controls.totalPages} onPageChange={controls.setPage} />
        </Card>
      </Grow>

      <FilterPopover
        open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
        title={controls.currentFilterColumn ? `${campaignCols[controls.currentFilterColumn]} Filter` : 'Filter'}
        searchText={controls.filterSearchText} onSearch={controls.setFilterSearchText}
        onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
        values={controls.filteredPopoverValues} filters={controls.filters}
        currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EVENTS TAB
// ═══════════════════════════════════════════════════════════════════════════════
function EventsTab() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => { setEvents(MarketingDataService.getEvents()); }, []);

  const eventCols = { id: 'ID', name: 'Name', start_date: 'Start Date', end_date: 'End Date', status: 'Status' };

  const getEventVal = useCallback((row, col) => {
    switch (col) {
      case 'id': return `#${row.id}`;
      case 'name': return row.name;
      case 'start_date': return row.start_date || '-';
      case 'end_date': return row.end_date || '-';
      case 'status': return MarketingDataService.getEventStatus(row);
      default: return '';
    }
  }, []);

  const controls = useTableControls(events, eventCols, getEventVal);

  const handleToggleActive = (event) => {
    const updated = MarketingDataService.updateEvent(event.id, { is_active: !event.is_active });
    if (updated) {
      setEvents((prev) => prev.map((e) => (e.id === event.id ? updated : e)));
      showSuccessToast(`Event ${updated.is_active ? 'activated' : 'deactivated'} successfully!`);
    }
  };

  const handleDelete = async (event) => {
    const result = await showDeleteConfirmation('Delete Event?', `Delete "${event.name}"?`);
    if (result.isConfirmed) {
      if (MarketingDataService.deleteEvent(event.id)) {
        setEvents((prev) => prev.filter((e) => e.id !== event.id));
        showSuccessToast('Event deleted successfully!');
      } else showErrorToast('Failed to delete event');
    }
  };

  const activeEvents = events.filter((e) => e.is_active).length;
  const upcomingEvents = events.filter((e) => MarketingDataService.getEventStatus(e) === 'Upcoming').length;
  const ongoingEvents = events.filter((e) => MarketingDataService.getEventStatus(e) === 'Ongoing').length;

  return (
    <Box>
      {/* Stats — 2×2 grid on mobile, 4 columns on sm+ */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
        gap: 2,
        mb: 2.5,
      }}>
        {[
          { label: 'Total Events', value: events.length, color: 'primary.main' },
          { label: 'Active', value: activeEvents, color: '#16A34A' },
          { label: 'Upcoming', value: upcomingEvents, color: '#0891B2' },
          { label: 'Ongoing', value: ongoingEvents, color: '#D97706' },
        ].map((stat, i) => (
          <Grow in timeout={600 + i * 100} key={stat.label}>
            <Card sx={{ p: 2, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
              <Typography color="text.secondary" sx={{ mb: 0.5, fontSize: '0.72rem', fontWeight: 500 }}>{stat.label}</Typography>
              <Typography sx={{ color: stat.color, fontSize: '1.6rem', fontWeight: 700, lineHeight: 1 }}>{stat.value}</Typography>
            </Card>
          </Grow>
        ))}
      </Box>

      <Grow in timeout={900}>
        <Card>
          {/* Search Bar */}
          <Box sx={{ p: 1.5, borderBottom: '1px solid #E5E7EB' }}>
            <TextField
              fullWidth size="small"
              placeholder="Search events by name, status..."
              value={controls.globalSearch}
              onChange={(e) => controls.setGlobalSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiInputBase-root': { height: '36px', fontSize: '0.85rem' } }}
            />
          </Box>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table size="small" sx={{ minWidth: 480 }}>
              <TableHead>
                <TableRow>
                  {Object.entries(eventCols).map(([col, label], index) => (
                    <SortFilterHeader
                      key={col} label={label} column={col}
                      sticky={index === 0}
                      sortColumn={controls.sortColumn} sortDirection={controls.sortDirection}
                      filterCount={controls.filters[col]?.length || 0}
                      onSort={controls.handleSortClick} onFilter={controls.handleFilterClick}
                    />
                  ))}
                  <TableCell align="center" sx={headerCellSx}>Active</TableCell>
                  <TableCell align="center" sx={headerCellSx}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {controls.paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                      <EventIcon sx={{ fontSize: 52, color: 'text.disabled', mb: 1 }} />
                      <Typography color="text.secondary" sx={{ fontSize: '0.95rem', fontWeight: 600 }}>No events found</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2, fontSize: '0.82rem' }}>
                        {Object.values(controls.filters).flat().length > 0 || controls.globalSearch ? 'Try adjusting your search or filters' : 'Create your first event'}
                      </Typography>
                      {Object.values(controls.filters).flat().length === 0 && !controls.globalSearch && (
                        <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => navigate('/marketing/events/create')}>New Event</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  controls.paginated.map((event) => {
                    const status = MarketingDataService.getEventStatus(event);
                    const statusStyle = MarketingDataService.getEventStatusStyle(status);
                    return (
                      <TableRow key={event.id} hover sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>
                        {/* ID — sticky on mobile */}
                        <TableCell sx={stickyBodyCellSx}>
                          <Chip label={`#${event.id}`} size="small" color="primary" variant="outlined"
                            sx={{ fontWeight: 600, fontSize: '0.72rem', height: '22px' }} />
                        </TableCell>
                        <TableCell sx={{ py: 1.1, px: 1.5 }}>
                          <Typography noWrap sx={{ fontSize: '0.82rem', fontWeight: 600 }} title={event.name}>{event.name}</Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1.1, px: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarIcon sx={{ fontSize: 12, color: 'text.disabled', flexShrink: 0 }} />
                            <Typography noWrap sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>{event.start_date || '-'}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1.1, px: 1.5 }}>
                          <Typography noWrap sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>{event.end_date || '-'}</Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1.1, px: 1.5 }}>
                          <Chip label={status} size="small"
                            sx={{ backgroundColor: statusStyle.bg, color: statusStyle.color, fontWeight: 600, fontSize: '0.72rem', height: '22px' }} />
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1.1, px: 1.5 }}>
                          <Switch checked={event.is_active} onChange={() => handleToggleActive(event)} size="small" color="success" />
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1.1, px: 1.5 }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="Edit" arrow>
                              <IconButton size="small" onClick={() => navigate(`/marketing/events/edit/${event.id}`)}
                                sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)' } }}>
                                <EditIcon sx={{ fontSize: 17 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                              <IconButton size="small" onClick={() => handleDelete(event)}
                                sx={{ p: 0.5, color: 'error.main', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)' } }}>
                                <DeleteIcon sx={{ fontSize: 17 }} />
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
          <PaginationStrip page={controls.page} totalPages={controls.totalPages} onPageChange={controls.setPage} />
        </Card>
      </Grow>

      <FilterPopover
        open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
        title={controls.currentFilterColumn ? `${eventCols[controls.currentFilterColumn]} Filter` : 'Filter'}
        searchText={controls.filterSearchText} onSearch={controls.setFilterSearchText}
        onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
        values={controls.filteredPopoverValues} filters={controls.filters}
        currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN MARKETING PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function Marketing() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = tabParam === 'events' ? 1 : 0;

  const handleTabChange = (_, newVal) => {
    setSearchParams({ tab: newVal === 1 ? 'events' : 'campaigns' });
  };

  const isEventsTab = activeTab === 1;

  return (
    <Fade in timeout={500}>
      <Box>
        <PageHeader
          title="Marketing"
          subtitle="Manage your marketing campaigns and events in one place"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Marketing', active: true },
          ]}
          actions={
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
              size="large"
              onClick={() =>
                navigate(isEventsTab ? '/marketing/events/create' : '/marketing/campaigns/create')
              }
              sx={{
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.5)', transform: 'translateY(-2px)' },
                minWidth: { xs: '48px', sm: 'auto' },
                px: { xs: 1.5, sm: 3 },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {isEventsTab ? 'New Event' : 'New Campaign'}
              </Box>
              <AddIcon sx={{ display: { xs: 'inline-flex', sm: 'none' } }} />
            </Button>
          }
        />

        {/* Tabs */}
        <Card sx={{ mb: 2.5 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              px: 2,
              '& .MuiTab-root': { fontWeight: 600, fontSize: '14px', textTransform: 'none', minHeight: 48 },
              '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
            }}
          >
            <Tab icon={<CampaignIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Campaigns" sx={{ gap: 1 }} />
            <Tab icon={<EventIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Events" sx={{ gap: 1 }} />
          </Tabs>
          <Divider />
        </Card>

        {activeTab === 0 ? <CampaignsTab /> : <EventsTab />}
      </Box>
    </Fade>
  );
}