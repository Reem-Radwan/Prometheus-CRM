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
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Dns as DnsIcon,
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
import PageHeader from '../../components/shared/PageHeader';
import { showDeleteConfirmation, showSuccessToast, showErrorToast } from '../../utils/sweetalert';

// ── Constants ──────────────────────────────────────────────────────────────────

const CATEGORY_COLORS = {
  direct:   { bg: '#EFF6FF', color: '#1D4ED8', label: 'Direct' },
  indirect: { bg: '#F0FDF4', color: '#15803D', label: 'Indirect' },
};

const columnLabels = {
  id:          'ID',
  name:        'Name',
  category:    'Category',
  system_code: 'System Code',
};

// ── Main Component ─────────────────────────────────────────────────────────────

export default function LeadSources() {
  const navigate = useNavigate();
  const [sources, setSources] = useState(() => [...DataService.getLeadSources()]);

  const [globalSearch, setGlobalSearch] = useState('');
  const [page, setPage]                 = useState(0);
  const rowsPerPage                     = 5;

  const [sortColumn, setSortColumn]       = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const [filterAnchorEl, setFilterAnchorEl]           = useState(null);
  const [currentFilterColumn, setCurrentFilterColumn] = useState(null);
  const [filters, setFilters]                         = useState({ id: [], name: [], category: [], system_code: [] });
  const [filterSearchText, setFilterSearchText]       = useState('');

  // ── Column value extractor ──────────────────────────────────────────────────
  const getColumnValue = useCallback((row, col) => {
    switch (col) {
      case 'id':          return `#${row.id}`;
      case 'name':        return row.name;
      case 'category':    return CATEGORY_COLORS[row.category]?.label || row.category;
      case 'system_code': return row.system_code;
      default:            return '';
    }
  }, []);

  // ── Filtered + sorted list ──────────────────────────────────────────────────
  const filteredSources = useMemo(() => {
    let result = [...sources];

    Object.keys(filters).forEach(col => {
      if (filters[col].length > 0)
        result = result.filter(row => filters[col].includes(getColumnValue(row, col)));
    });

    if (globalSearch.trim()) {
      const q = globalSearch.trim().toLowerCase();
      result = result.filter(row =>
        Object.keys(columnLabels).some(col =>
          String(getColumnValue(row, col)).toLowerCase().includes(q)
        )
      );
    }

    if (sortColumn) {
      result.sort((a, b) => {
        const av = getColumnValue(a, sortColumn);
        const bv = getColumnValue(b, sortColumn);
        if (sortColumn === 'id') {
          const diff = parseInt(av.replace('#', '')) - parseInt(bv.replace('#', ''));
          return sortDirection === 'asc' ? diff : -diff;
        }
        const cmp = av.localeCompare(bv, undefined, { sensitivity: 'base' });
        return sortDirection === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [sources, filters, globalSearch, sortColumn, sortDirection, getColumnValue]);

  const getUniqueColumnValues = useCallback(col => {
    let data = [...sources];
    Object.keys(filters).forEach(c => {
      if (c !== col && filters[c].length > 0)
        data = data.filter(row => filters[c].includes(getColumnValue(row, c)));
    });
    return [...new Set(data.map(row => getColumnValue(row, col)))].sort();
  }, [sources, filters, getColumnValue]);

  const paginatedSources = filteredSources.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const totalPages        = Math.ceil(filteredSources.length / rowsPerPage);

  useEffect(() => { setPage(0); }, [filters, sortColumn, sortDirection, globalSearch]);

  // ── Sort ────────────────────────────────────────────────────────────────────
  const handleSortClick = col => {
    if (sortColumn === col) setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortColumn(col); setSortDirection('asc'); }
  };

  // ── Filter ──────────────────────────────────────────────────────────────────
  const handleFilterClick  = (e, col) => { setFilterAnchorEl(e.currentTarget); setCurrentFilterColumn(col); setFilterSearchText(''); };
  const handleFilterClose  = ()        => { setFilterAnchorEl(null); setCurrentFilterColumn(null); setFilterSearchText(''); };
  const handleFilterToggle = val       => {
    const col = currentFilterColumn;
    const cur = filters[col];
    setFilters({ ...filters, [col]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] });
  };
  const handleSelectAll = () => setFilters({ ...filters, [currentFilterColumn]: getUniqueColumnValues(currentFilterColumn) });
  const handleClearAll  = () => setFilters({ ...filters, [currentFilterColumn]: [] });

  const filterOpen            = Boolean(filterAnchorEl);
  const filteredPopoverValues = currentFilterColumn
    ? getUniqueColumnValues(currentFilterColumn).filter(v => String(v).toLowerCase().includes(filterSearchText.toLowerCase()))
    : [];

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async source => {
    const result = await showDeleteConfirmation(
      'Delete Lead Source?',
      `Delete "${source.name}"? This may affect existing leads using this source.`
    );
    if (result.isConfirmed) {
      if (DataService.deleteLeadSource(source.id)) {
        setSources([...DataService.getLeadSources()]);
        showSuccessToast('Lead source deleted successfully!');
      } else {
        showErrorToast('Failed to delete lead source');
      }
    }
  };

  const hasAnyFilter  = globalSearch || Object.values(filters).flat().length > 0;
  const directCount   = sources.filter(s => s.category === 'direct').length;
  const indirectCount = sources.filter(s => s.category === 'indirect').length;

  return (
    <Fade in timeout={500}>
      <Box>
        <PageHeader
          title="Lead Sources"
          subtitle="Manage lead source types and their system codes"
          breadcrumbs={[
            { label: 'Home',         href: '/' },
            { label: 'Leads',        href: '/leads' },
            { label: 'Lead Sources', active: true },
          ]}
          actions={
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
              size="large"
              onClick={() => navigate('/lead-sources/create')}
              sx={{
                boxShadow: '0 4px 6px -1px rgba(59,130,246,0.4)',
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 10px 15px -3px rgba(59,130,246,0.5)', transform: 'translateY(-2px)' },
                minWidth: { xs: '48px', sm: 'auto' },
                px: { xs: 1.5, sm: 3 },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Create Source</Box>
              <AddIcon sx={{ display: { xs: 'inline-flex', sm: 'none' } }} />
            </Button>
          }
        />

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          {[
            { label: 'Total Sources',    value: sources.length,         color: 'primary.main' },
            { label: 'Direct Sources',   value: directCount,            color: '#1D4ED8' },
            { label: 'Indirect Sources', value: indirectCount,          color: '#15803D' },
            { label: 'Filtered Results', value: filteredSources.length, color: 'text.secondary' },
          ].map((stat, i) => (
            <Grow in timeout={600 + i * 100} key={stat.label}>
              <Card sx={{ p: 3, flex: 1, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>{stat.label}</Typography>
                <Typography variant="h2" sx={{ color: stat.color }}>{stat.value}</Typography>
              </Card>
            </Grow>
          ))}
        </Box>

        {/* Search Bar */}
        <Grow in timeout={850}>
          <Card sx={{ mb: 3, p: 2.5 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                fullWidth size="small"
                placeholder="Search by name, category, or system code…"
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
              {hasAnyFilter && (
                <Button size="small" variant="outlined" color="error"
                  startIcon={<CloseIcon fontSize="small" />}
                  onClick={() => { setGlobalSearch(''); setFilters({ id: [], name: [], category: [], system_code: [] }); }}
                  sx={{ borderRadius: '10px', whiteSpace: 'nowrap', height: 40 }}>
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
                    {Object.keys(columnLabels).map((col, index) => (
                      <TableCell key={col}
                        sx={{
                          py: 1.5, px: 2, whiteSpace: 'nowrap',
                          ...(index === 0 && {
                            position: { xs: 'sticky', md: 'static' }, left: { xs: 0, md: 'auto' },
                            zIndex: { xs: 3, md: 'auto' }, backgroundColor: { xs: '#ffffff', md: 'transparent' },
                            boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
                          }),
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {columnLabels[col]}
                          <Tooltip title={`Sort by ${columnLabels[col]}`} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
                            <IconButton size="small" onClick={() => handleSortClick(col)}
                              sx={{ p: 0.5, color: sortColumn === col ? 'primary.main' : 'inherit', transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59,130,246,0.1)' } }}>
                              {sortColumn === col && sortDirection === 'asc'
                                ? <ArrowUpwardIcon sx={{ fontSize: 18 }} />
                                : <ArrowDownwardIcon sx={{ fontSize: 18 }} />}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={`Filter ${columnLabels[col]}`} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
                            <IconButton size="small" onClick={e => handleFilterClick(e, col)}
                              sx={{ p: 0.5, color: filters[col].length > 0 ? 'primary.main' : 'inherit', transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59,130,246,0.1)' } }}>
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
                  {paginatedSources.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                        <DnsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>No lead sources found</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          {hasAnyFilter ? 'Try adjusting your search or filters' : 'Add your first lead source to get started'}
                        </Typography>
                        {!hasAnyFilter && (
                          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/lead-sources/create')}>
                            Create Source
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedSources.map(source => {
                      const catStyle = CATEGORY_COLORS[source.category] || { bg: '#F3F4F6', color: '#374151', label: source.category };
                      return (
                        <TableRow key={source.id} hover
                          sx={{ '&:last-child td': { borderBottom: 0 }, transition: 'background-color 0.2s ease', '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>

                          <TableCell sx={{
                            py: 1.5, px: 2,
                            position: { xs: 'sticky', md: 'static' }, left: { xs: 0, md: 'auto' },
                            zIndex: { xs: 2, md: 'auto' }, backgroundColor: { xs: '#ffffff', md: 'transparent' },
                            boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
                            'tr:hover &': { backgroundColor: { xs: '#f0f9ff', md: 'transparent' } },
                          }}>
                            <Chip label={`#${source.id}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
                          </TableCell>

                          <TableCell sx={{ py: 1.5, px: 2 }}>
                            <Typography variant="body2" fontWeight={600}>{source.name}</Typography>
                          </TableCell>

                          <TableCell sx={{ py: 1.5, px: 2 }}>
                            <Chip label={catStyle.label} size="small"
                              sx={{ backgroundColor: catStyle.bg, color: catStyle.color, fontWeight: 600, fontSize: '0.75rem' }} />
                          </TableCell>

                          <TableCell sx={{ py: 1.5, px: 2 }}>
                            <Typography variant="body2"
                              sx={{ fontFamily: 'monospace', backgroundColor: '#F3F4F6', px: 1, py: 0.25, borderRadius: '4px', display: 'inline-block', fontSize: '0.8125rem', color: '#4B5563' }}>
                              {source.system_code}
                            </Typography>
                          </TableCell>

                          <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                              <Tooltip title="Edit" arrow TransitionComponent={Fade}>
                                <IconButton size="small" onClick={() => navigate(`/lead-sources/edit/${source.id}`)}
                                  sx={{ p: 0.5, color: 'warning.main', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}>
                                  <EditIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete" arrow TransitionComponent={Fade}>
                                <IconButton size="small" onClick={() => handleDelete(source)}
                                  sx={{ p: 0.5, color: 'error.main', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)', transform: 'scale(1.2)' } }}>
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

            {filteredSources.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, p: 2, borderTop: '1px solid #E5E7EB' }}>
                <IconButton size="small" onClick={() => setPage(p => p - 1)} disabled={page === 0}
                  sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}>
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
                {Array.from({ length: totalPages }, (_, i) => i).map(n => (
                  <IconButton key={n} size="small" onClick={() => setPage(n)}
                    sx={{ minWidth: '36px', height: '36px', borderRadius: '8px', fontWeight: 600, fontSize: '14px',
                      backgroundColor: page === n ? 'primary.main' : 'transparent',
                      color: page === n ? '#FFFFFF' : 'text.primary',
                      border: '1px solid', borderColor: page === n ? 'primary.main' : '#E5E7EB',
                      transition: 'all 0.3s ease', '&:hover': { backgroundColor: page === n ? 'primary.dark' : 'rgba(59,130,246,0.1)', transform: 'scale(1.1)' } }}>
                    {n + 1}
                  </IconButton>
                ))}
                <IconButton size="small" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}
                  sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}>
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
          <TextField fullWidth size="small" placeholder="Search..." value={filterSearchText}
            onChange={e => setFilterSearchText(e.target.value)}
            sx={{ mb: 1.5, '& .MuiInputBase-root': { height: '32px', fontSize: '0.875rem' } }} />
          <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
            <Button size="small" variant="outlined" onClick={handleSelectAll} fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Select All</Button>
            <Button size="small" variant="outlined" onClick={handleClearAll}  fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Clear All</Button>
          </Box>
          <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
            {filteredPopoverValues.map(value => (
              <FormControlLabel key={value}
                control={
                  <Checkbox
                    checked={currentFilterColumn ? filters[currentFilterColumn].includes(value) : false}
                    onChange={() => handleFilterToggle(value)}
                    size="small"
                    sx={{ py: 0.25, '& .MuiSvgIcon-root': { fontSize: 18 } }}
                  />
                }
                label={value}
                sx={{ display: 'block', mb: 0, ml: 0, mr: 0, '& .MuiFormControlLabel-label': { fontSize: '0.8125rem', lineHeight: 1.4 }, '& .MuiCheckbox-root': { py: 0.5 } }}
              />
            ))}
          </Box>
        </Popover>
      </Box>
    </Fade>
  );
}