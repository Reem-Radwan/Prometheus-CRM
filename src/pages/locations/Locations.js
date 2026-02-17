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
  Apartment as ApartmentIcon,
  Construction as ConstructionIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LocationsDataService } from '../../data/locationsDataService';
import PageHeader from '../../components/shared/PageHeader';
import {
  showDeleteConfirmation,
  showSuccessToast,
  showErrorToast,
} from '../../utils/sweetalert';

// ─── Reusable table-controls hook ────────────────────────────────────────────
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

// ─── Pagination ───────────────────────────────────────────────────────────────
function PaginationStrip({ page, totalPages, filteredCount, onPageChange }) {
  if (filteredCount === 0) return null;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, p: 2, borderTop: '1px solid #E5E7EB' }}>
      <IconButton
        size="small"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        sx={{
          border: '1px solid #E5E7EB', borderRadius: '8px',
          transition: 'all 0.2s ease',
          '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)', transform: 'scale(1.1)' },
          '&:disabled': { opacity: 0.3 },
        }}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>

      {Array.from({ length: totalPages }, (_, i) => i).map((n) => (
        <IconButton
          key={n}
          size="small"
          onClick={() => onPageChange(n)}
          sx={{
            minWidth: '36px', height: '36px', borderRadius: '8px',
            fontWeight: 600, fontSize: '14px',
            backgroundColor: page === n ? 'primary.main' : 'transparent',
            color: page === n ? '#FFFFFF' : 'text.primary',
            border: '1px solid', borderColor: page === n ? 'primary.main' : '#E5E7EB',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: page === n ? 'primary.dark' : 'rgba(59,130,246,0.1)',
              transform: 'scale(1.1)',
            },
          }}
        >
          {n + 1}
        </IconButton>
      ))}

      <IconButton
        size="small"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
        sx={{
          border: '1px solid #E5E7EB', borderRadius: '8px',
          transition: 'all 0.2s ease',
          '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)', transform: 'scale(1.1)' },
          '&:disabled': { opacity: 0.3 },
        }}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

// ─── Sort + Filter header ─────────────────────────────────────────────────────
const headerCellSx = {
  py: 1.5,
  px: 2,
  whiteSpace: 'nowrap',
  fontSize: '0.82rem',
  fontWeight: 700,
  color: '#374151',
  backgroundColor: '#F9FAFB',
  borderBottom: '2px solid #E5E7EB',
};

// Sticky first-column header sx (mobile only)
const stickyHeaderCellSx = {
  ...headerCellSx,
  position: { xs: 'sticky', md: 'static' },
  left: { xs: 0, md: 'auto' },
  zIndex: { xs: 3, md: 'auto' },
  boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
};

function SortFilterHeader({ label, column, sortColumn, sortDirection, filterCount, onSort, onFilter, sticky = false }) {
  return (
    <TableCell sx={sticky ? stickyHeaderCellSx : headerCellSx}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
        {label}
        <Tooltip title={`Sort by ${label}`} arrow>
          <IconButton size="small" onClick={() => onSort(column)}
            sx={{ p: 0.35, color: sortColumn === column ? 'primary.main' : '#9CA3AF',
              '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)' } }}>
            {sortColumn === column && sortDirection === 'asc'
              ? <ArrowUpwardIcon sx={{ fontSize: 16 }} />
              : <ArrowDownwardIcon sx={{ fontSize: 16 }} />}
          </IconButton>
        </Tooltip>
        <Tooltip title={`Filter ${label}`} arrow>
          <IconButton size="small" onClick={(e) => onFilter(e, column)}
            sx={{ p: 0.35, color: filterCount > 0 ? 'primary.main' : '#9CA3AF',
              '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)' } }}>
            <FilterListIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </TableCell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BRANCHES TAB
// ═══════════════════════════════════════════════════════════════════════════════
function BranchesTab() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);

  useEffect(() => { setBranches(LocationsDataService.getBranches()); }, []);

  const branchCols = {
    id: 'ID',
    name: 'Branch Name',
    address: 'Address',
    status: 'Status',
  };

  const getBranchVal = useCallback((row, col) => {
    switch (col) {
      case 'id': return `#${row.id}`;
      case 'name': return row.name;
      case 'address': return row.address || '-';
      case 'status': return row.is_active ? 'Active' : 'Inactive';
      default: return '';
    }
  }, []);

  const controls = useTableControls(branches, branchCols, getBranchVal);

  const handleToggleActive = (branch) => {
    const updated = LocationsDataService.updateBranch(branch.id, { is_active: !branch.is_active });
    if (updated) {
      setBranches((prev) => prev.map((b) => (b.id === branch.id ? updated : b)));
      showSuccessToast(`Branch ${updated.is_active ? 'activated' : 'deactivated'} successfully!`);
    }
  };

  const handleDelete = async (branch) => {
    const result = await showDeleteConfirmation('Delete Branch?', `Delete "${branch.name}"?`);
    if (result.isConfirmed) {
      if (LocationsDataService.deleteBranch(branch.id)) {
        setBranches((prev) => prev.filter((b) => b.id !== branch.id));
        showSuccessToast('Branch deleted successfully!');
      } else showErrorToast('Failed to delete branch');
    }
  };

  const activeBranches = branches.filter((b) => b.is_active).length;

  return (
    <Box>
      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexDirection: { xs: 'column', sm: 'row' } }}>
        {[
          { label: 'Total Branches', value: branches.length, color: 'primary.main' },
          { label: 'Active', value: activeBranches, color: '#16A34A' },
          { label: 'Inactive', value: branches.length - activeBranches, color: '#DC2626' },
        ].map((stat, i) => (
          <Grow in timeout={600 + i * 100} key={stat.label}>
            <Card sx={{ p: 2.5, flex: 1, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
              <Typography color="text.secondary" sx={{ mb: 0.5, fontSize: '0.78rem', fontWeight: 500 }}>{stat.label}</Typography>
              <Typography sx={{ color: stat.color, fontSize: '1.85rem', fontWeight: 700, lineHeight: 1 }}>{stat.value}</Typography>
            </Card>
          </Grow>
        ))}
      </Box>

      <Grow in timeout={900}>
        <Card>
          {/* Search Bar */}
          <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB' }}>
            <TextField
              fullWidth size="small"
              placeholder="Search branches by name or address..."
              value={controls.globalSearch}
              onChange={(e) => controls.setGlobalSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiInputBase-root': { height: '38px', fontSize: '0.85rem' } }}
            />
          </Box>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table stickyHeader sx={{ tableLayout: 'auto' }}>
              <TableHead>
                <TableRow>
                  {Object.entries(branchCols).map(([col, label], index) => (
                    <SortFilterHeader
                      key={col}
                      label={label}
                      column={col}
                      sticky={index === 0}
                      sortColumn={controls.sortColumn}
                      sortDirection={controls.sortDirection}
                      filterCount={controls.filters[col]?.length || 0}
                      onSort={controls.handleSortClick}
                      onFilter={controls.handleFilterClick}
                    />
                  ))}
                  <TableCell align="center" sx={{ ...headerCellSx }}>Active</TableCell>
                  <TableCell align="center" sx={{ ...headerCellSx }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {controls.paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <ApartmentIcon sx={{ fontSize: 52, color: 'text.disabled', mb: 1 }} />
                      <Typography color="text.secondary" sx={{ fontSize: '0.95rem', fontWeight: 600 }}>No branches found</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2, fontSize: '0.82rem' }}>
                        {Object.values(controls.filters).flat().length > 0 || controls.globalSearch
                          ? 'Try adjusting your search or filters'
                          : 'Add your first branch'}
                      </Typography>
                      {Object.values(controls.filters).flat().length === 0 && !controls.globalSearch && (
                        <Button variant="contained" size="small" startIcon={<AddIcon />}
                          onClick={() => navigate('/locations/branches/create')}>
                          New Branch
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  controls.paginated.map((branch) => {
                    const statusBg    = branch.is_active ? '#DCFCE7' : '#FEE2E2';
                    const statusColor = branch.is_active ? '#166534' : '#991B1B';
                    return (
                      <TableRow key={branch.id} hover
                        sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>

                        {/* ID — sticky on mobile */}
                        <TableCell sx={{
                          py: 1.5, px: 2, whiteSpace: 'nowrap',
                          position: { xs: 'sticky', md: 'static' },
                          left: { xs: 0, md: 'auto' },
                          zIndex: { xs: 2, md: 'auto' },
                          backgroundColor: { xs: '#ffffff', md: 'transparent' },
                          boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
                          'tr:hover &': { backgroundColor: { xs: '#f0f9ff', md: 'transparent' } },
                        }}>
                          <Chip label={`#${branch.id}`} size="small" color="primary" variant="outlined"
                            sx={{ fontWeight: 700, fontSize: '0.8rem', height: '28px', px: 0.5 }} />
                        </TableCell>

                        {/* Branch Name */}
                        <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Typography sx={{ fontSize: '0.93rem', fontWeight: 600, color: '#111827' }}>
                            {branch.name}
                          </Typography>
                        </TableCell>

                        {/* Address */}
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <LocationOnIcon sx={{ fontSize: 16, color: '#9CA3AF', flexShrink: 0 }} />
                            <Typography sx={{ fontSize: '0.9rem', color: '#4B5563' }}>
                              {branch.address || '-'}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* Status chip */}
                        <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Chip label={branch.is_active ? 'Active' : 'Inactive'} size="small"
                            sx={{ backgroundColor: statusBg, color: statusColor, fontWeight: 700,
                              fontSize: '0.8rem', height: '28px', px: 0.5 }} />
                        </TableCell>

                        {/* Active toggle */}
                        <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Switch checked={branch.is_active} onChange={() => handleToggleActive(branch)}
                            color="success" />
                        </TableCell>

                        {/* Actions */}
                        <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Box sx={{ display: 'flex', gap: 0.75, justifyContent: 'center' }}>
                            <Tooltip title="Edit" arrow>
                              <IconButton size="small"
                                onClick={() => navigate(`/locations/branches/edit/${branch.id}`)}
                                sx={{ p: 0.5, color: 'warning.main', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}>
                                <EditIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                              <IconButton size="small" onClick={() => handleDelete(branch)}
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
          <PaginationStrip page={controls.page} totalPages={controls.totalPages} filteredCount={controls.filtered.length} onPageChange={controls.setPage} />
        </Card>
      </Grow>

      <FilterPopover
        open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
        title={controls.currentFilterColumn ? `${branchCols[controls.currentFilterColumn]} Filter` : 'Filter'}
        searchText={controls.filterSearchText} onSearch={controls.setFilterSearchText}
        onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
        values={controls.filteredPopoverValues} filters={controls.filters}
        currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROJECT SITES TAB
// ═══════════════════════════════════════════════════════════════════════════════
function ProjectSitesTab() {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);

  useEffect(() => { setSites(LocationsDataService.getProjectSites()); }, []);

  const siteCols = {
    id: 'ID',
    name: 'Project Name',
    code: 'Code',
    status: 'Status',
  };

  const getSiteVal = useCallback((row, col) => {
    switch (col) {
      case 'id': return `#${row.id}`;
      case 'name': return row.name;
      case 'code': return row.code || '-';
      case 'status': return row.is_active ? 'Active' : 'Inactive';
      default: return '';
    }
  }, []);

  const controls = useTableControls(sites, siteCols, getSiteVal);

  const handleToggleActive = (site) => {
    const updated = LocationsDataService.updateProjectSite(site.id, { is_active: !site.is_active });
    if (updated) {
      setSites((prev) => prev.map((s) => (s.id === site.id ? updated : s)));
      showSuccessToast(`Project site ${updated.is_active ? 'activated' : 'deactivated'} successfully!`);
    }
  };

  const handleDelete = async (site) => {
    const result = await showDeleteConfirmation('Delete Project Site?', `Delete "${site.name}"?`);
    if (result.isConfirmed) {
      if (LocationsDataService.deleteProjectSite(site.id)) {
        setSites((prev) => prev.filter((s) => s.id !== site.id));
        showSuccessToast('Project site deleted successfully!');
      } else showErrorToast('Failed to delete project site');
    }
  };

  const activeSites = sites.filter((s) => s.is_active).length;

  return (
    <Box>
      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexDirection: { xs: 'column', sm: 'row' } }}>
        {[
          { label: 'Total Sites', value: sites.length, color: 'primary.main' },
          { label: 'Active', value: activeSites, color: '#16A34A' },
          { label: 'Inactive', value: sites.length - activeSites, color: '#DC2626' },
        ].map((stat, i) => (
          <Grow in timeout={600 + i * 100} key={stat.label}>
            <Card sx={{ p: 2.5, flex: 1, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
              <Typography color="text.secondary" sx={{ mb: 0.5, fontSize: '0.78rem', fontWeight: 500 }}>{stat.label}</Typography>
              <Typography sx={{ color: stat.color, fontSize: '1.85rem', fontWeight: 700, lineHeight: 1 }}>{stat.value}</Typography>
            </Card>
          </Grow>
        ))}
      </Box>

      <Grow in timeout={900}>
        <Card>
          {/* Search Bar */}
          <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB' }}>
            <TextField
              fullWidth size="small"
              placeholder="Search project sites by name or code..."
              value={controls.globalSearch}
              onChange={(e) => controls.setGlobalSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiInputBase-root': { height: '38px', fontSize: '0.85rem' } }}
            />
          </Box>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table stickyHeader sx={{ tableLayout: 'auto' }}>
              <TableHead>
                <TableRow>
                  {Object.entries(siteCols).map(([col, label], index) => (
                    <SortFilterHeader
                      key={col}
                      label={label}
                      column={col}
                      sticky={index === 0}
                      sortColumn={controls.sortColumn}
                      sortDirection={controls.sortDirection}
                      filterCount={controls.filters[col]?.length || 0}
                      onSort={controls.handleSortClick}
                      onFilter={controls.handleFilterClick}
                    />
                  ))}
                  <TableCell align="center" sx={{ ...headerCellSx }}>Active</TableCell>
                  <TableCell align="center" sx={{ ...headerCellSx }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {controls.paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <ConstructionIcon sx={{ fontSize: 52, color: 'text.disabled', mb: 1 }} />
                      <Typography color="text.secondary" sx={{ fontSize: '0.95rem', fontWeight: 600 }}>No project sites found</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2, fontSize: '0.82rem' }}>
                        {Object.values(controls.filters).flat().length > 0 || controls.globalSearch
                          ? 'Try adjusting your search or filters'
                          : 'Add your first project site'}
                      </Typography>
                      {Object.values(controls.filters).flat().length === 0 && !controls.globalSearch && (
                        <Button variant="contained" size="small" startIcon={<AddIcon />}
                          onClick={() => navigate('/locations/sites/create')}>
                          New Project Site
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  controls.paginated.map((site) => {
                    const statusBg    = site.is_active ? '#DCFCE7' : '#FEE2E2';
                    const statusColor = site.is_active ? '#166534' : '#991B1B';
                    return (
                      <TableRow key={site.id} hover
                        sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>

                        {/* ID — sticky on mobile */}
                        <TableCell sx={{
                          py: 1.5, px: 2, whiteSpace: 'nowrap',
                          position: { xs: 'sticky', md: 'static' },
                          left: { xs: 0, md: 'auto' },
                          zIndex: { xs: 2, md: 'auto' },
                          backgroundColor: { xs: '#ffffff', md: 'transparent' },
                          boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
                          'tr:hover &': { backgroundColor: { xs: '#f0f9ff', md: 'transparent' } },
                        }}>
                          <Chip label={`#${site.id}`} size="small" color="primary" variant="outlined"
                            sx={{ fontWeight: 700, fontSize: '0.8rem', height: '28px', px: 0.5 }} />
                        </TableCell>

                        {/* Project Name */}
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          <Typography sx={{ fontSize: '0.93rem', fontWeight: 600, color: '#111827' }}>
                            {site.name}
                          </Typography>
                        </TableCell>

                        {/* Code chip */}
                        <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Chip label={site.code || '-'} size="small"
                            sx={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', fontWeight: 700,
                              fontSize: '0.8rem', height: '28px', px: 0.5, fontFamily: 'monospace' }} />
                        </TableCell>

                        {/* Status chip */}
                        <TableCell sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Chip label={site.is_active ? 'Active' : 'Inactive'} size="small"
                            sx={{ backgroundColor: statusBg, color: statusColor, fontWeight: 700,
                              fontSize: '0.8rem', height: '28px', px: 0.5 }} />
                        </TableCell>

                        {/* Active toggle */}
                        <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Switch checked={site.is_active} onChange={() => handleToggleActive(site)}
                            color="success" />
                        </TableCell>

                        {/* Actions */}
                        <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Box sx={{ display: 'flex', gap: 0.75, justifyContent: 'center' }}>
                            <Tooltip title="Edit" arrow>
                              <IconButton size="small"
                                onClick={() => navigate(`/locations/sites/edit/${site.id}`)}
                                sx={{ p: 0.5, color: 'warning.main', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}>
                                <EditIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                              <IconButton size="small" onClick={() => handleDelete(site)}
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
          <PaginationStrip page={controls.page} totalPages={controls.totalPages} filteredCount={controls.filtered.length} onPageChange={controls.setPage} />
        </Card>
      </Grow>

      <FilterPopover
        open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
        title={controls.currentFilterColumn ? `${siteCols[controls.currentFilterColumn]} Filter` : 'Filter'}
        searchText={controls.filterSearchText} onSearch={controls.setFilterSearchText}
        onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
        values={controls.filteredPopoverValues} filters={controls.filters}
        currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN LOCATIONS PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function Locations() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = tabParam === 'sites' ? 1 : 0;

  const handleTabChange = (_, newVal) => {
    setSearchParams({ tab: newVal === 1 ? 'sites' : 'branches' });
  };

  const isSitesTab = activeTab === 1;

  return (
    <Fade in timeout={500}>
      <Box>
        <PageHeader
          title="Locations"
          subtitle="Manage your branches and project sites"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Locations', active: true },
          ]}
          actions={
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
              size="large"
              onClick={() =>
                navigate(isSitesTab ? '/locations/sites/create' : '/locations/branches/create')
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
                {isSitesTab ? 'New Project Site' : 'New Branch'}
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
            <Tab icon={<ApartmentIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Branches" sx={{ gap: 1 }} />
            <Tab icon={<ConstructionIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Project Sites" sx={{ gap: 1 }} />
          </Tabs>
          <Divider />
        </Card>

        {activeTab === 0 ? <BranchesTab /> : <ProjectSitesTab />}
      </Box>
    </Fade>
  );
}