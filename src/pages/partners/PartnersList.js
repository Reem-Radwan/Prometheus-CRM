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
  Switch,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Handshake as HandshakeIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PartnersDataService } from '../../data/partnersDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showDeleteConfirmation, showSuccessToast, showErrorToast } from '../../utils/sweetalert';
import { PaginationWithSize } from '../../components/shared/PaginationWithSize'; // 👈 imported from separate file

// No ID column — name is first (sticky on mobile)
const columnLabels = {
  name:        'Name',
  type:        'Type',
  phone:       'Phone',
  company_name:'Company',
  commission:  'Commission %',
  status:      'Status',
};

const PAGE_SIZE_OPTIONS = [100, 200, 500, 1000, 1500, 2000];

export default function PartnersList() {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);

  const [globalSearch, setGlobalSearch] = useState('');
  const [page, setPage]                 = useState(0);
  const [pageSize, setPageSize]         = useState(PAGE_SIZE_OPTIONS[0]);
  const [sortColumn, setSortColumn]     = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterAnchorEl, setFilterAnchorEl]           = useState(null);
  const [currentFilterColumn, setCurrentFilterColumn] = useState(null);
  const [filters, setFilters] = useState({ name: [], type: [], phone: [], company_name: [], commission: [], status: [] });
  const [searchText, setSearchText] = useState('');

  useEffect(() => { setPartners(PartnersDataService.getPartners()); }, []);

  const getColumnValue = useCallback((partner, column) => {
    switch (column) {
      case 'name':         return partner.name;
      case 'type':         return partner.type === 'broker' ? 'Broker' : 'Ambassador';
      case 'phone':        return partner.phone;
      case 'company_name': return partner.company_name || '-';
      case 'commission':   return partner.commission ? `${partner.commission}%` : '-';
      case 'status':       return partner.contract_active ? 'Active' : 'Inactive';
      default:             return '';
    }
  }, []);

  const filteredPartners = useMemo(() => {
    let filtered = [...partners];
    Object.keys(filters).forEach((col) => {
      if (filters[col].length > 0) filtered = filtered.filter((p) => filters[col].includes(getColumnValue(p, col)));
    });
    if (globalSearch.trim()) {
      const q = globalSearch.trim().toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.phone || '').toLowerCase().includes(q) ||
        (p.company_name || '').toLowerCase().includes(q)
      );
    }
    if (sortColumn) {
      filtered.sort((a, b) => {
        const aVal = getColumnValue(a, sortColumn);
        const bVal = getColumnValue(b, sortColumn);
        if (sortColumn === 'commission') {
          return sortDirection === 'asc' ? parseFloat(aVal) - parseFloat(bVal) : parseFloat(bVal) - parseFloat(aVal);
        }
        const cmp = aVal.localeCompare(bVal, undefined, { sensitivity: 'base' });
        return sortDirection === 'asc' ? cmp : -cmp;
      });
    }
    return filtered;
  }, [partners, filters, globalSearch, sortColumn, sortDirection, getColumnValue]);

  const paginatedPartners = filteredPartners.slice(page * pageSize, page * pageSize + pageSize);
  const totalPages = Math.ceil(filteredPartners.length / pageSize);

  const visibleColumns = useMemo(() => {
    if (paginatedPartners.length === 0) return Object.keys(columnLabels);
    return Object.keys(columnLabels).filter(col =>
      paginatedPartners.some(partner => { const val = getColumnValue(partner, col); return val && val !== '-'; })
    );
  }, [paginatedPartners, getColumnValue]);

  const getUniqueColumnValues = useCallback((column) => {
    let data = [...partners];
    Object.keys(filters).forEach((col) => {
      if (col !== column && filters[col].length > 0) data = data.filter((p) => filters[col].includes(getColumnValue(p, col)));
    });
    return [...new Set(data.map((p) => getColumnValue(p, column)))].sort();
  }, [partners, filters, getColumnValue]);

  const handleSortClick = (col) => {
    if (sortColumn === col) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    else { setSortColumn(col); setSortDirection('asc'); }
  };
  const handleFilterClick = (event, col) => { setFilterAnchorEl(event.currentTarget); setCurrentFilterColumn(col); setSearchText(''); };
  const handleFilterClose  = () => { setFilterAnchorEl(null); setCurrentFilterColumn(null); setSearchText(''); };
  const handleFilterToggle = (value) => {
    const col = currentFilterColumn, cur = filters[col];
    setFilters({ ...filters, [col]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] });
  };
  const handleSelectAll = () => setFilters({ ...filters, [currentFilterColumn]: getUniqueColumnValues(currentFilterColumn) });
  const handleClearAll  = () => setFilters({ ...filters, [currentFilterColumn]: [] });

  const handleToggleActive = async (partner) => {
    const updated = PartnersDataService.updatePartner(partner.id, { contract_active: !partner.contract_active });
    if (updated) {
      setPartners((prev) => prev.map((p) => (p.id === partner.id ? updated : p)));
      showSuccessToast(`Partner ${updated.contract_active ? 'activated' : 'deactivated'} successfully!`);
    }
  };

  const handleDeleteClick = async (partner) => {
    const result = await showDeleteConfirmation('Delete Partner?', `Are you sure you want to delete ${partner.name}?`);
    if (result.isConfirmed) {
      if (PartnersDataService.deletePartner(partner.id)) {
        setPartners((prev) => prev.filter((p) => p.id !== partner.id));
        showSuccessToast('Partner deleted successfully!');
      } else showErrorToast('Failed to delete partner');
    }
  };

  useEffect(() => { setPage(0); }, [filters, sortColumn, sortDirection, globalSearch, pageSize]);

  const filterOpen = Boolean(filterAnchorEl);
  const filteredColumnValues = currentFilterColumn
    ? getUniqueColumnValues(currentFilterColumn).filter((v) => String(v).toLowerCase().includes(searchText.toLowerCase()))
    : [];

  const brokerCount     = partners.filter((p) => p.type === 'broker').length;
  const ambassadorCount = partners.filter((p) => p.type === 'ambassador').length;
  const activeCount     = partners.filter((p) => p.contract_active).length;
  const hasAnyFilter    = globalSearch || Object.values(filters).flat().length > 0;

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

  return (
    <Fade in timeout={500}>
      <Box>
        <PageHeader
          title="Partners Management"
          subtitle="Manage brokers and ambassadors in your partner network"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Partners', active: true }]}
          actions={
            <Button variant="contained" startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />} size="large"
              onClick={() => navigate('/partners/create')}
              sx={{ boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)', transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.5)', transform: 'translateY(-2px)' }, minWidth: { xs: '48px', sm: 'auto' }, px: { xs: 1.5, sm: 3 } }}>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Create Partner</Box>
              <AddIcon sx={{ display: { xs: 'inline-flex', sm: 'none' } }} />
            </Button>
          }
        />

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          {[
            { label: 'Total Partners', value: partners.length,   color: 'primary.main' },
            { label: 'Brokers',        value: brokerCount,        color: '#7C3AED' },
            { label: 'Ambassadors',    value: ambassadorCount,    color: '#0891B2' },
            { label: 'Active',         value: activeCount,        color: 'success.main' },
          ].map((stat, i) => (
            <Grow in timeout={600 + i * 100} key={stat.label}>
              <Card sx={{ p: 3, flex: 1, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>{stat.label}</Typography>
                <Typography variant="h2" sx={{ color: stat.color }}>{stat.value}</Typography>
              </Card>
            </Grow>
          ))}
        </Box>

        {/* Search */}
        <Grow in timeout={850}>
          <Card sx={{ mb: 3, p: 2.5 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField fullWidth size="small" placeholder="Search by name, phone, or company…" value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} /></InputAdornment>,
                  endAdornment: globalSearch && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setGlobalSearch('')}><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
              {hasAnyFilter && (
                <Button size="small" variant="outlined" color="error" startIcon={<CloseIcon fontSize="small" />}
                  onClick={() => { setGlobalSearch(''); setFilters({ name: [], type: [], phone: [], company_name: [], commission: [], status: [] }); }}
                  sx={{ borderRadius: '10px', whiteSpace: 'nowrap', height: 40 }}>
                  Clear All
                </Button>
              )}
            </Box>
          </Card>
        </Grow>

        {/* Table */}
        <Grow in timeout={1000}>
          <Card>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table stickyHeader sx={{ tableLayout: 'auto' }}>
                <TableHead>
                  <TableRow>
                    {visibleColumns.map((column, index) => (
                      <TableCell key={column} sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap', ...(index === 0 && stickyHeaderSx) }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {columnLabels[column]}
                          <Tooltip title={`Sort by ${columnLabels[column]}`} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
                            <IconButton size="small" onClick={() => handleSortClick(column)}
                              sx={{ p: 0.5, color: sortColumn === column ? 'primary.main' : 'inherit', transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59, 130, 246, 0.1)' } }}>
                              {sortColumn === column && sortDirection === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 18 }} /> : <ArrowDownwardIcon sx={{ fontSize: 18 }} />}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={`Filter ${columnLabels[column]}`} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
                            <IconButton size="small" onClick={(e) => handleFilterClick(e, column)}
                              sx={{ p: 0.5, color: filters[column]?.length > 0 ? 'primary.main' : 'inherit', transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59, 130, 246, 0.1)' } }}>
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
                  {paginatedPartners.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 8 }}>
                        <Box>
                          <HandshakeIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                          <Typography variant="h6" color="text.secondary" gutterBottom>No partners found</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {hasAnyFilter ? 'Try adjusting your search or filters' : 'Add your first partner to get started'}
                          </Typography>
                          {!hasAnyFilter && (
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/partners/create')}>Create Partner</Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedPartners.map((partner) => (
                      <TableRow key={partner.id} hover
                        sx={{ '&:last-child td': { borderBottom: 0 }, transition: 'background-color 0.2s ease', '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.04)' } }}>
                        {visibleColumns.map((column, idx) => (
                          <TableCell key={column} sx={idx === 0 ? stickyBodySx : { py: 1.5, px: 2 }}>
                            {column === 'name' && <Typography variant="body2" fontWeight={600} noWrap>{partner.name}</Typography>}
                            {column === 'type' && (
                              <Chip label={partner.type === 'broker' ? 'Broker' : 'Ambassador'} size="small"
                                sx={{ backgroundColor: partner.type === 'broker' ? '#EDE9FE' : '#E0F2FE', color: partner.type === 'broker' ? '#5B21B6' : '#0369A1', fontWeight: 600, fontSize: '12px' }} />
                            )}
                            {column === 'phone' && <Typography variant="body2" sx={{ fontFamily: 'monospace' }} noWrap>{partner.phone}</Typography>}
                            {column === 'company_name' && (partner.company_name ? <Typography variant="body2" noWrap>{partner.company_name}</Typography> : <Typography variant="body2" color="text.disabled">-</Typography>)}
                            {column === 'commission' && (partner.commission ? <Chip label={`${partner.commission}%`} size="small" sx={{ backgroundColor: '#DCFCE7', color: '#166534', fontWeight: 600, fontSize: '12px' }} /> : <Typography variant="body2" color="text.disabled">-</Typography>)}
                            {column === 'status' && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Switch checked={partner.contract_active} onChange={() => handleToggleActive(partner)} size="small" color="success" />
                                <Typography variant="caption" fontWeight={600} sx={{ color: partner.contract_active ? '#16A34A' : '#DC2626' }}>
                                  {partner.contract_active ? 'Active' : 'Inactive'}
                                </Typography>
                              </Box>
                            )}
                          </TableCell>
                        ))}
                        <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="Edit" arrow TransitionComponent={Fade}>
                              <IconButton size="small" onClick={() => navigate(`/partners/edit/${partner.id}`)}
                                sx={{ p: 0.5, color: 'warning.main', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(245, 158, 11, 0.1)', transform: 'scale(1.2)' } }}>
                                <EditIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow TransitionComponent={Fade}>
                              <IconButton size="small" onClick={() => handleDeleteClick(partner)}
                                sx={{ p: 0.5, color: 'error.main', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)', transform: 'scale(1.2)' } }}>
                                <DeleteIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* 👇 Using the shared PaginationWithSize component */}
            <PaginationWithSize
              page={page}
              totalPages={totalPages}
              totalCount={filteredPartners.length}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </Card>
        </Grow>

        {/* Filter Popover */}
        <Popover open={filterOpen} anchorEl={filterAnchorEl} onClose={handleFilterClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          TransitionComponent={Grow} TransitionProps={{ timeout: 300 }}
          PaperProps={{ sx: { p: 1.5, minWidth: 260, maxHeight: 360, borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}>
          <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.95rem' }}>
            {currentFilterColumn ? `${columnLabels[currentFilterColumn]} Filter` : 'Filter'}
          </Typography>
          <TextField fullWidth size="small" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)}
            sx={{ mb: 1.5, '& .MuiInputBase-root': { height: '32px', fontSize: '0.875rem' } }} />
          <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
            <Button size="small" variant="outlined" onClick={handleSelectAll} fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Select All</Button>
            <Button size="small" variant="outlined" onClick={handleClearAll}  fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Clear All</Button>
          </Box>
          <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
            {filteredColumnValues.map((value) => (
              <FormControlLabel key={value}
                control={<Checkbox checked={currentFilterColumn ? filters[currentFilterColumn]?.includes(value) : false} onChange={() => handleFilterToggle(value)} size="small" sx={{ py: 0.25, '& .MuiSvgIcon-root': { fontSize: 18 } }} />}
                label={value}
                sx={{ display: 'block', mb: 0, ml: 0, mr: 0, '& .MuiFormControlLabel-label': { fontSize: '0.8125rem', lineHeight: 1.4 }, '& .MuiCheckbox-root': { py: 0.5 } }} />
            ))}
          </Box>
        </Popover>
      </Box>
    </Fade>
  );
}