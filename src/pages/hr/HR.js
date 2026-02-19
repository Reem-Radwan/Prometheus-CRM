import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box, Card, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton,
  Chip, Tooltip, Typography, Popover, TextField, Checkbox,
  FormControlLabel, Fade, Grow, Tabs, Tab, Switch, Divider,
  InputAdornment, MenuItem, Select, FormControl, InputLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  Groups as GroupsIcon,
  Business as BusinessIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HRDataService } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showDeleteConfirmation, showSuccessToast, showErrorToast } from '../../utils/sweetalert';
import { PaginationWithSize } from '../../components/shared/PaginationWithSize';

const PAGE_SIZE_OPTIONS = [100, 200, 500, 1000, 1500, 2000];

// ─── Sticky cell styles ────────────────────────────────────────────────────────
const stickyHeaderSx = {
  py: 1.5, px: 2, whiteSpace: 'nowrap',
  position: { xs: 'sticky', md: 'static' }, left: { xs: 0, md: 'auto' },
  zIndex: { xs: 3, md: 'auto' }, backgroundColor: { xs: '#F9FAFB', md: 'inherit' },
  boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
};
const stickyBodySx = {
  py: 1.5, px: 2, whiteSpace: 'nowrap',
  position: { xs: 'sticky', md: 'static' }, left: { xs: 0, md: 'auto' },
  zIndex: { xs: 2, md: 'auto' }, backgroundColor: { xs: '#ffffff', md: 'transparent' },
  boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
  'tr:hover &': { backgroundColor: { xs: '#f0f9ff', md: 'transparent' } },
};

// ─── Shared table hook ────────────────────────────────────────────────────────
function useTableControls(data, columnDefs, getVal) {
  const [sortColumn, setSortColumn]                   = useState(null);
  const [sortDirection, setSortDirection]             = useState('asc');
  const [filterAnchorEl, setFilterAnchorEl]           = useState(null);
  const [currentFilterColumn, setCurrentFilterColumn] = useState(null);
  const [filters, setFilters]   = useState(Object.fromEntries(Object.keys(columnDefs).map((k) => [k, []])));
  const [searchText, setSearchText]   = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [page, setPage]         = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  const filtered = useMemo(() => {
    let f = [...data];
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      f = f.filter((row) => Object.keys(columnDefs).some((col) => String(getVal(row, col)).toLowerCase().includes(q)));
    }
    Object.keys(filters).forEach((col) => {
      if (filters[col].length > 0) f = f.filter((row) => filters[col].includes(getVal(row, col)));
    });
    if (sortColumn) {
      f.sort((a, b) => {
        const av = getVal(a, sortColumn), bv = getVal(b, sortColumn);
        if (sortColumn === 'id') return sortDirection === 'asc' ? parseInt(av.replace('#', '')) - parseInt(bv.replace('#', '')) : parseInt(bv.replace('#', '')) - parseInt(av.replace('#', ''));
        const cmp = av.localeCompare(bv, undefined, { sensitivity: 'base' });
        return sortDirection === 'asc' ? cmp : -cmp;
      });
    }
    return f;
  }, [data, filters, sortColumn, sortDirection, getVal, globalSearch, columnDefs]);

  const getUniqueVals = useCallback((col) => {
    let d = [...data];
    Object.keys(filters).forEach((c) => { if (c !== col && filters[c].length > 0) d = d.filter((row) => filters[c].includes(getVal(row, c))); });
    return [...new Set(d.map((row) => getVal(row, col)))].sort();
  }, [data, filters, getVal]);

  const handleSortClick    = (col) => { if (sortColumn === col) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); else { setSortColumn(col); setSortDirection('asc'); } };
  const handleFilterClick  = (e, col) => { setFilterAnchorEl(e.currentTarget); setCurrentFilterColumn(col); setSearchText(''); };
  const handleFilterClose  = () => { setFilterAnchorEl(null); setCurrentFilterColumn(null); setSearchText(''); };
  const handleFilterToggle = (val) => { const col = currentFilterColumn; const cur = filters[col]; setFilters({ ...filters, [col]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val] }); };
  const handleSelectAll    = () => setFilters({ ...filters, [currentFilterColumn]: getUniqueVals(currentFilterColumn) });
  const handleClearAll     = () => setFilters({ ...filters, [currentFilterColumn]: [] });

  useEffect(() => { setPage(0); }, [filters, sortColumn, sortDirection, globalSearch, pageSize]);

  const paginated    = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages   = Math.ceil(filtered.length / pageSize);
  const filterOpen   = Boolean(filterAnchorEl);
  const filteredPopoverValues = currentFilterColumn
    ? getUniqueVals(currentFilterColumn).filter((v) => String(v).toLowerCase().includes(searchText.toLowerCase()))
    : [];

  return {
    filtered, paginated, page, setPage, pageSize, setPageSize, totalPages,
    sortColumn, sortDirection, handleSortClick,
    filterAnchorEl, filterOpen, currentFilterColumn, filters,
    searchText, setSearchText, globalSearch, setGlobalSearch,
    handleFilterClick, handleFilterClose, handleFilterToggle, handleSelectAll, handleClearAll,
    filteredPopoverValues,
  };
}

// ─── Shared filter popover ────────────────────────────────────────────────────
function FilterPopover({ open, anchorEl, onClose, title, searchText, onSearch, onSelectAll, onClearAll, values, filters, currentCol, onToggle }) {
  return (
    <Popover open={open} anchorEl={anchorEl} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      PaperProps={{ sx: { p: 1.5, minWidth: 260, maxHeight: 360, borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}>
      <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.95rem' }}>{title}</Typography>
      <TextField fullWidth size="small" placeholder="Search..." value={searchText} onChange={(e) => onSearch(e.target.value)}
        sx={{ mb: 1.5, '& .MuiInputBase-root': { height: '32px', fontSize: '0.875rem' } }} />
      <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
        <Button size="small" variant="outlined" onClick={onSelectAll} fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Select All</Button>
        <Button size="small" variant="outlined" onClick={onClearAll}  fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Clear All</Button>
      </Box>
      <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
        {values.map((val) => (
          <FormControlLabel key={val}
            control={<Checkbox checked={currentCol ? filters[currentCol]?.includes(val) : false} onChange={() => onToggle(val)} size="small" sx={{ py: 0.25, '& .MuiSvgIcon-root': { fontSize: 18 } }} />}
            label={val}
            sx={{ display: 'block', mb: 0, ml: 0, mr: 0, '& .MuiFormControlLabel-label': { fontSize: '0.8125rem', lineHeight: 1.4 }, '& .MuiCheckbox-root': { py: 0.5 } }} />
        ))}
      </Box>
    </Popover>
  );
}

// ─── Shared sort+filter header ────────────────────────────────────────────────
function SortFilterHeader({ label, column, sortColumn, sortDirection, filterCount, onSort, onFilter, sticky = false }) {
  return (
    <TableCell sx={sticky ? stickyHeaderSx : { py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {label}
        <Tooltip title={`Sort by ${label}`} arrow>
          <IconButton size="small" onClick={() => onSort(column)} sx={{ p: 0.5, color: sortColumn === column ? 'primary.main' : 'inherit', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59,130,246,0.1)' } }}>
            {sortColumn === column && sortDirection === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 18 }} /> : <ArrowDownwardIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        </Tooltip>
        <Tooltip title={`Filter ${label}`} arrow>
          <IconButton size="small" onClick={(e) => onFilter(e, column)} sx={{ p: 0.5, color: filterCount > 0 ? 'primary.main' : 'inherit', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59,130,246,0.1)' } }}>
            <FilterListIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </TableCell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DEPARTMENTS TAB
// ═══════════════════════════════════════════════════════════════════════════════
const deptCols = { name: 'Name', code: 'Code', employees: 'Employees' };

function DepartmentsTab({ onDepartmentsChange }) {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  const load = () => { setDepartments(HRDataService.getDepartments()); onDepartmentsChange?.(); };
  useEffect(() => { load(); }, []); // eslint-disable-line

  const getDeptVal = useCallback((row, col) => {
    switch (col) {
      case 'name':      return row.name;
      case 'code':      return row.code;
      case 'employees': return String(HRDataService.getEmployeeCountByDepartment(row.id));
      default:          return '';
    }
  }, []);

  const controls = useTableControls(departments, deptCols, getDeptVal);

  const visibleColumns = useMemo(() => {
    if (controls.paginated.length === 0) return Object.keys(deptCols);
    return Object.keys(deptCols).filter(col => controls.paginated.some(row => {
      const v = getDeptVal(row, col); return v && v !== '-';
    }));
  }, [controls.paginated, getDeptVal]);

  const handleDelete = async (dept) => {
    const empCount  = HRDataService.getEmployeeCountByDepartment(dept.id);
    const extraNote = empCount > 0 ? ` ${empCount} employee${empCount > 1 ? 's' : ''} in this department will show "—" instead.` : '';
    const result    = await showDeleteConfirmation('Delete Department?', `Delete "${dept.name}"?${extraNote}`);
    if (result.isConfirmed) {
      if (HRDataService.deleteDepartment(dept.id)) { showSuccessToast('Department deleted!'); load(); }
      else showErrorToast('Failed to delete department');
    }
  };

  const totalEmployees = departments.reduce((sum, d) => sum + HRDataService.getEmployeeCountByDepartment(d.id), 0);
  const largest = departments.reduce((best, d) => {
    const c = HRDataService.getEmployeeCountByDepartment(d.id);
    return c > (best?.count || 0) ? { name: d.name, count: c } : best;
  }, null);

  return (
    <Box>
      {/* ── Stats ── */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
        {[
          { label: 'Total Departments', value: departments.length,    color: 'primary.main' },
          { label: 'Total Employees',   value: totalEmployees,        color: '#16A34A' },
          { label: 'Largest Dept.',     value: largest?.name || '—', color: '#0891B2' },
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
          <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB' }}>
            <TextField size="small" placeholder="Search departments..." value={controls.globalSearch}
              onChange={e => controls.setGlobalSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment> }}
              sx={{ width: '100%', '& .MuiInputBase-root': { height: '38px', fontSize: '0.85rem', borderRadius: '10px' } }} />
          </Box>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table stickyHeader sx={{ tableLayout: 'auto' }}>
              <TableHead>
                <TableRow>
                  {visibleColumns.map((col, idx) => (
                    <SortFilterHeader key={col} label={deptCols[col]} column={col} sticky={idx === 0}
                      sortColumn={controls.sortColumn} sortDirection={controls.sortDirection}
                      filterCount={controls.filters[col]?.length || 0}
                      onSort={controls.handleSortClick} onFilter={controls.handleFilterClick} />
                  ))}
                  <TableCell align="center" sx={{ py: 1.5, px: 2 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {controls.paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 8 }}>
                      <BusinessIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">No departments found</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {controls.globalSearch || Object.values(controls.filters).flat().length > 0
                          ? 'Try adjusting your search'
                          : 'Create your first department'}
                      </Typography>
                      {!controls.globalSearch && Object.values(controls.filters).flat().length === 0 && (
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/hr/departments/create')}>
                          Create Department
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  controls.paginated.map((dept) => {
                    const empCount = HRDataService.getEmployeeCountByDepartment(dept.id);
                    return (
                      <TableRow key={dept.id} hover sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>
                        {visibleColumns.map((col, idx) => (
                          <TableCell key={col} sx={idx === 0 ? stickyBodySx : { py: 1.5, px: 2 }}>
                            {col === 'name'      && <Typography variant="body2" fontWeight={700}>{dept.name}</Typography>}
                            {col === 'code'      && <Chip label={dept.code} size="small" sx={{ backgroundColor: '#F1F5F9', color: '#475569', fontWeight: 700, fontSize: '11px', fontFamily: 'monospace' }} />}
                            {col === 'employees' && (
                              <Chip label={`${empCount} employee${empCount !== 1 ? 's' : ''}`} size="small"
                                sx={{ backgroundColor: empCount > 0 ? '#F0FDF4' : '#F3F4F6', color: empCount > 0 ? '#166534' : '#6B7280', fontWeight: 600, fontSize: '12px' }} />
                            )}
                          </TableCell>
                        ))}
                        <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="Edit" arrow>
                              <IconButton size="small" onClick={() => navigate(`/hr/departments/edit/${dept.id}`)}
                                sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}>
                                <EditIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={empCount > 0 ? 'Cannot delete — has employees' : 'Delete'} arrow>
                              <span>
                                <IconButton size="small" onClick={() => handleDelete(dept)}
                                  sx={{ p: 0.5, color: 'error.main', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)', transform: 'scale(1.2)' } }}>
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

          <PaginationWithSize page={controls.page} totalPages={controls.totalPages} totalCount={controls.filtered.length}
            pageSize={controls.pageSize} onPageChange={controls.setPage} onPageSizeChange={controls.setPageSize} />
        </Card>
      </Grow>

      <FilterPopover open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
        title={controls.currentFilterColumn ? `${deptCols[controls.currentFilterColumn]} Filter` : 'Filter'}
        searchText={controls.searchText} onSearch={controls.setSearchText}
        onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
        values={controls.filteredPopoverValues} filters={controls.filters}
        currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EMPLOYEES TAB
// ═══════════════════════════════════════════════════════════════════════════════
const empCols = { id: 'ID', full_name: 'Full Name', department: 'Department', phone: 'Phone', status: 'Status' };

function EmployeesTab({ departmentVersion }) {
  const navigate = useNavigate();
  const [employees, setEmployees]   = useState([]);
  const [deptFilter, setDeptFilter] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => { setEmployees(HRDataService.getEmployees()); }, []);
  useEffect(() => { setDepartments(HRDataService.getDepartments()); }, [departmentVersion]);

  const getEmpVal = useCallback((row, col) => {
    switch (col) {
      case 'id':         return `#${row.id}`;
      case 'full_name':  return row.full_name;
      case 'department': return HRDataService.getDepartmentById(row.department) ? HRDataService.getDepartmentName(row.department) : '—';
      case 'phone':      return row.phone || '-';
      case 'status':     return row.is_active ? 'Active' : 'Inactive';
      default:           return '';
    }
  }, []);

  const controls = useTableControls(employees, empCols, getEmpVal);

  const finalFiltered = useMemo(() => {
    if (!deptFilter) return controls.filtered;
    return controls.filtered.filter((e) => e.department === deptFilter);
  }, [controls.filtered, deptFilter]);

  const rowsPerPage     = controls.pageSize;
  const finalPaginated  = finalFiltered.slice(controls.page * rowsPerPage, (controls.page + 1) * rowsPerPage);
  const finalTotalPages = Math.ceil(finalFiltered.length / rowsPerPage);

  useEffect(() => { controls.setPage(0); }, [deptFilter]); // eslint-disable-line

  const visibleColumns = useMemo(() => {
    if (finalPaginated.length === 0) return Object.keys(empCols);
    return Object.keys(empCols).filter(col => finalPaginated.some(row => { const val = getEmpVal(row, col); return val && val !== '-'; }));
  }, [finalPaginated, getEmpVal]);

  const hasAnyFilter = deptFilter || controls.globalSearch || Object.values(controls.filters).flat().length > 0;

  const handleToggleActive = (emp) => {
    const updated = HRDataService.updateEmployee(emp.id, { is_active: !emp.is_active });
    if (updated) { setEmployees(prev => prev.map(e => e.id === emp.id ? updated : e)); showSuccessToast(`Employee ${updated.is_active ? 'activated' : 'deactivated'}!`); }
  };
  const handleDelete = async (emp) => {
    const result = await showDeleteConfirmation('Delete Employee?', `Delete "${emp.full_name}"?`);
    if (result.isConfirmed) {
      if (HRDataService.deleteEmployee(emp.id)) { setEmployees(prev => prev.filter(e => e.id !== emp.id)); showSuccessToast('Employee deleted!'); }
      else showErrorToast('Failed to delete');
    }
  };

  const activeEmps = employees.filter(e => e.is_active).length;

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
        {[
          { label: 'Total Employees', value: employees.length,              color: 'primary.main' },
          { label: 'Active',          value: activeEmps,                    color: '#16A34A' },
          { label: 'Inactive',        value: employees.length - activeEmps, color: '#DC2626' },
          { label: 'Departments',     value: departments.length,            color: '#0891B2' },
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
          <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB', display: 'flex', gap: 2, alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField size="small" placeholder="Search employees by name or phone..." value={controls.globalSearch}
              onChange={e => controls.setGlobalSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment> }}
              sx={{ flex: 1, width: '100%', '& .MuiInputBase-root': { height: '38px', fontSize: '0.85rem', borderRadius: '10px' } }} />
            <FormControl size="small" sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}>
              <InputLabel>Filter by Department</InputLabel>
              <Select value={deptFilter} label="Filter by Department" onChange={e => setDeptFilter(e.target.value)}
                sx={{ borderRadius: '10px', height: '38px', fontSize: '0.85rem' }}>
                <MenuItem value=""><em>All Departments</em></MenuItem>
                {departments.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
              </Select>
            </FormControl>
            {hasAnyFilter && (
              <Button size="small" variant="outlined" color="error" startIcon={<CloseIcon fontSize="small" />}
                onClick={() => { controls.setGlobalSearch(''); setDeptFilter(''); controls.handleClearAll?.(); }}
                sx={{ borderRadius: '10px', whiteSpace: 'nowrap', height: '38px', flexShrink: 0 }}>
                Clear All
              </Button>
            )}
          </Box>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table stickyHeader sx={{ tableLayout: 'auto' }}>
              <TableHead>
                <TableRow>
                  {visibleColumns.map((col) => (
                    <SortFilterHeader key={col} label={empCols[col]} column={col}
                      sticky={col === 'full_name'}
                      sortColumn={controls.sortColumn} sortDirection={controls.sortDirection}
                      filterCount={controls.filters[col]?.length || 0}
                      onSort={controls.handleSortClick} onFilter={controls.handleFilterClick} />
                  ))}
                  <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Active</TableCell>
                  <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {finalPaginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length + 2} align="center" sx={{ py: 8 }}>
                      <PeopleIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">No employees found</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {hasAnyFilter ? 'Try adjusting your search or filters' : 'Add your first employee'}
                      </Typography>
                      {!hasAnyFilter && (
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/hr/employees/create')}>Create Employee</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  finalPaginated.map(emp => {
                    const deptStyle = HRDataService.getDepartmentStyle(emp.department);
                    return (
                      <TableRow key={emp.id} hover sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>
                        {visibleColumns.map((col) => (
                          <TableCell key={col} sx={col === 'full_name' ? stickyBodySx : { py: 1.5, px: 2 }}>
                            {col === 'id'         && <Chip label={`#${emp.id}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />}
                            {col === 'full_name'  && <Typography variant="body2" fontWeight={600}>{emp.full_name}</Typography>}
                            {col === 'department' && (HRDataService.getDepartmentById(emp.department)
                              ? <Chip label={HRDataService.getDepartmentName(emp.department)} size="small" sx={{ fontWeight: 600, fontSize: '12px', backgroundColor: deptStyle.bg, color: deptStyle.color }} />
                              : <Typography variant="body2" color="text.disabled">—</Typography>)}
                            {col === 'phone'  && <Typography variant="body2" color="text.secondary">{emp.phone || '-'}</Typography>}
                            {col === 'status' && <Chip label={emp.is_active ? 'Active' : 'Inactive'} size="small" sx={{ backgroundColor: emp.is_active ? '#DCFCE7' : '#FEE2E2', color: emp.is_active ? '#166534' : '#991B1B', fontWeight: 600, fontSize: '12px' }} />}
                          </TableCell>
                        ))}
                        <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
                          <Switch checked={emp.is_active} onChange={() => handleToggleActive(emp)} size="small" color="success" />
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="Edit" arrow>
                              <IconButton size="small" onClick={() => navigate(`/hr/employees/edit/${emp.id}`)}
                                sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}>
                                <EditIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                              <IconButton size="small" onClick={() => handleDelete(emp)}
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

          <PaginationWithSize page={controls.page} totalPages={finalTotalPages} totalCount={finalFiltered.length}
            pageSize={controls.pageSize} onPageChange={controls.setPage} onPageSizeChange={controls.setPageSize} />
        </Card>
      </Grow>

      <FilterPopover open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
        title={controls.currentFilterColumn ? `${empCols[controls.currentFilterColumn]} Filter` : 'Filter'}
        searchText={controls.searchText} onSearch={controls.setSearchText}
        onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
        values={controls.filteredPopoverValues} filters={controls.filters}
        currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SALES TEAMS TAB
// ═══════════════════════════════════════════════════════════════════════════════
const teamCols = { name: 'Team Name', code: 'Code', members: 'Members', status: 'Status' };

function TeamsTab({ selectedTeam, onSelectTeam }) {
  const navigate = useNavigate();
  const [teams, setTeams]       = useState([]);

  useEffect(() => { setTeams(HRDataService.getTeams()); }, []);

  const getTeamVal = useCallback((row, col) => {
    switch (col) {
      case 'name':    return row.name;
      case 'code':    return row.code || '-';
      case 'members': return String(HRDataService.getTeamMemberCount(row.id));
      case 'status':  return row.is_active ? 'Active' : 'Inactive';
      default:        return '';
    }
  }, []);

  const controls = useTableControls(teams, teamCols, getTeamVal);

  const visibleDataColumns = useMemo(() => {
    if (controls.paginated.length === 0) return Object.keys(teamCols);
    return Object.keys(teamCols).filter(col => controls.paginated.some(row => { const val = getTeamVal(row, col); return val && val !== '-'; }));
  }, [controls.paginated, getTeamVal]);

  const showDescriptionCol = useMemo(() => {
    if (controls.paginated.length === 0) return true;
    return controls.paginated.some(row => row.description && row.description.trim() !== '');
  }, [controls.paginated]);

  const handleToggleActive = (team) => {
    const updated = HRDataService.updateTeam(team.id, { is_active: !team.is_active });
    if (updated) {
      setTeams(prev => prev.map(t => t.id === team.id ? updated : t));
      if (selectedTeam?.id === team.id) onSelectTeam(updated);
      showSuccessToast(`Team ${updated.is_active ? 'activated' : 'deactivated'}!`);
    }
  };
  const handleDelete = async (team) => {
    const result = await showDeleteConfirmation('Delete Team?', `Delete "${team.name}"? This will also remove all team members.`);
    if (result.isConfirmed) {
      if (HRDataService.deleteTeam(team.id)) {
        setTeams(prev => prev.filter(t => t.id !== team.id));
        if (selectedTeam?.id === team.id) onSelectTeam(null);
        showSuccessToast('Team deleted!');
      } else showErrorToast('Failed to delete team');
    }
  };

  const activeTeams  = teams.filter(t => t.is_active).length;
  const totalMembers = teams.reduce((sum, t) => sum + HRDataService.getTeamMemberCount(t.id), 0);
  const totalCols    = visibleDataColumns.length + (showDescriptionCol ? 1 : 0) + 2;

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
        {[
          { label: 'Total Teams',   value: teams.length,               color: 'primary.main' },
          { label: 'Active Teams',  value: activeTeams,                color: '#16A34A' },
          { label: 'Total Members', value: totalMembers,               color: '#0891B2' },
          { label: 'Inactive',      value: teams.length - activeTeams, color: '#DC2626' },
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
          <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB' }}>
            <TextField fullWidth size="small" placeholder="Search teams by name or code..." value={controls.globalSearch}
              onChange={e => controls.setGlobalSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment> }}
              sx={{ '& .MuiInputBase-root': { height: '38px', fontSize: '0.85rem' } }} />
          </Box>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table stickyHeader sx={{ tableLayout: 'auto' }}>
              <TableHead>
                <TableRow>
                  {visibleDataColumns.map((col, index) => (
                    <SortFilterHeader key={col} label={teamCols[col]} column={col} sticky={index === 0}
                      sortColumn={controls.sortColumn} sortDirection={controls.sortDirection}
                      filterCount={controls.filters[col]?.length || 0}
                      onSort={controls.handleSortClick} onFilter={controls.handleFilterClick} />
                  ))}
                  {showDescriptionCol && <TableCell sx={{ py: 1.5, px: 2 }}>Description</TableCell>}
                  <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Active</TableCell>
                  <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {controls.paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={totalCols} align="center" sx={{ py: 8 }}>
                      <GroupsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">No teams found</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {Object.values(controls.filters).flat().length > 0 || controls.globalSearch
                          ? 'Try adjusting your search or filters'
                          : 'Create your first team'}
                      </Typography>
                      {Object.values(controls.filters).flat().length === 0 && !controls.globalSearch && (
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/hr/teams/create')}>Create Sales Team</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  controls.paginated.map(team => {
                    const memberCount = HRDataService.getTeamMemberCount(team.id);
                    const isSelected  = selectedTeam?.id === team.id;
                    return (
                      <TableRow key={team.id} hover sx={{ '&:last-child td': { borderBottom: 0 }, backgroundColor: isSelected ? 'rgba(59,130,246,0.06)' : 'inherit', '&:hover': { backgroundColor: isSelected ? 'rgba(59,130,246,0.09)' : 'rgba(59,130,246,0.04)' } }}>
                        {visibleDataColumns.map((col, idx) => (
                          <TableCell key={col} sx={idx === 0 ? stickyBodySx : { py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                            {col === 'name'    && <Typography variant="body2" fontWeight={600}>{team.name}</Typography>}
                            {col === 'code'    && <Chip label={team.code} size="small" sx={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', fontWeight: 700, fontSize: '11px', fontFamily: 'monospace' }} />}
                            {col === 'members' && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip label={`${memberCount} member${memberCount !== 1 ? 's' : ''}`} size="small"
                                  sx={{ backgroundColor: memberCount > 0 ? '#F0FDF4' : '#F3F4F6', color: memberCount > 0 ? '#166534' : '#6B7280', fontWeight: 600, fontSize: '12px' }} />
                                <Button size="small" variant="outlined" startIcon={<ViewIcon sx={{ fontSize: 13 }} />}
                                  onClick={() => navigate(`/hr/teams/${team.id}/members`)}
                                  sx={{ py: 0.25, px: 1, fontSize: '11px', fontWeight: 600, minHeight: '24px', borderRadius: '6px', borderColor: '#BFDBFE', color: '#1D4ED8', backgroundColor: '#EFF6FF', whiteSpace: 'nowrap', '&:hover': { backgroundColor: '#DBEAFE', borderColor: '#93C5FD', transform: 'translateY(-1px)', boxShadow: '0 2px 6px rgba(59,130,246,0.25)' }, transition: 'all 0.2s ease' }}>
                                  View
                                </Button>
                              </Box>
                            )}
                            {col === 'status' && <Chip label={team.is_active ? 'Active' : 'Inactive'} size="small"
                              sx={{ backgroundColor: team.is_active ? '#DCFCE7' : '#FEE2E2', color: team.is_active ? '#166534' : '#991B1B', fontWeight: 600, fontSize: '12px' }} />}
                          </TableCell>
                        ))}
                        {showDescriptionCol && (
                          <TableCell sx={{ py: 1.5, px: 2 }}>
                            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 220 }}>{team.description || '—'}</Typography>
                          </TableCell>
                        )}
                        <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
                          <Switch checked={team.is_active} onChange={() => handleToggleActive(team)} size="small" color="success" />
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="Edit" arrow>
                              <IconButton size="small" onClick={() => navigate(`/hr/teams/edit/${team.id}`)}
                                sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}>
                                <EditIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                              <IconButton size="small" onClick={() => handleDelete(team)}
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

          <PaginationWithSize page={controls.page} totalPages={controls.totalPages} totalCount={controls.filtered.length}
            pageSize={controls.pageSize} onPageChange={controls.setPage} onPageSizeChange={controls.setPageSize} />
        </Card>
      </Grow>

      <FilterPopover open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
        title={controls.currentFilterColumn ? `${teamCols[controls.currentFilterColumn]} Filter` : 'Filter'}
        searchText={controls.searchText} onSearch={controls.setSearchText}
        onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
        values={controls.filteredPopoverValues} filters={controls.filters}
        currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN HR PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function HR() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [departmentVersion, setDepartmentVersion] = useState(0);

  const tabParam  = searchParams.get('tab');
  const activeTab = tabParam === 'teams' ? 1 : tabParam === 'departments' ? 2 : tabParam === 'members' ? 3 : 0;

  const handleTabChange = (_, newVal) => {
    if      (newVal === 0) setSearchParams({ tab: 'employees' },  { replace: true });
    else if (newVal === 1) setSearchParams({ tab: 'teams' },       { replace: true });
    else if (newVal === 2) setSearchParams({ tab: 'departments' }, { replace: true });
    else if (newVal === 3 && selectedTeam) navigate(`/hr/teams/${selectedTeam.id}/members`);
  };

  const isTeamsTab = activeTab === 1;
  const isDeptsTab = activeTab === 2;

  const headerButtonLabel = isDeptsTab ? 'Create Department' : isTeamsTab ? 'Create Team' : 'Create Employee';
  const handleHeaderButton = () => {
    if      (isDeptsTab) navigate('/hr/departments/create');
    else if (isTeamsTab) navigate('/hr/teams/create');
    else                 navigate('/hr/employees/create');
  };

  return (
    <Fade in timeout={500}>
      <Box>
        <PageHeader
          title="Human Resources"
          subtitle="Manage departments, employees and sales teams"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'HR', active: true }]}
          actions={
            <Button variant="contained"
              startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
              size="large"
              onClick={handleHeaderButton}
              sx={{ boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)', transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.5)', transform: 'translateY(-2px)' }, minWidth: { xs: '48px', sm: 'auto' }, px: { xs: 1.5, sm: 3 } }}>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{headerButtonLabel}</Box>
              <AddIcon sx={{ display: { xs: 'inline-flex', sm: 'none' } }} />
            </Button>
          }
        />

        <Card sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              px: 2,
              '& .MuiTab-root': { fontWeight: 600, fontSize: '14px', textTransform: 'none', minHeight: 52 },
              '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
            }}
          >
            <Tab icon={<PeopleIcon   sx={{ fontSize: 20 }} />} iconPosition="start" label="Employees"   sx={{ gap: 1 }} />
            <Tab icon={<GroupsIcon   sx={{ fontSize: 20 }} />} iconPosition="start" label="Sales Teams" sx={{ gap: 1 }} />
            <Tab icon={<BusinessIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Departments" sx={{ gap: 1 }} />
            {selectedTeam && (
              <Tab
                icon={<ViewIcon sx={{ fontSize: 20 }} />} iconPosition="start"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <span>View Members</span>
                    <Chip label={selectedTeam.name} size="small"
                      sx={{ height: 20, fontSize: '11px', fontWeight: 700, backgroundColor: '#DBEAFE', color: '#1D4ED8', cursor: 'pointer' }} />
                    <Box component="span"
                      onClick={(e) => { e.stopPropagation(); setSelectedTeam(null); setSearchParams({ tab: 'teams' }, { replace: true }); }}
                      sx={{ display: 'inline-flex', alignItems: 'center', ml: 0.25, color: 'text.secondary', '&:hover': { color: 'error.main' }, transition: 'color 0.2s ease' }}>
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </Box>
                  </Box>
                }
                sx={{ gap: 1 }}
              />
            )}
          </Tabs>
          <Divider />
        </Card>

        {activeTab === 0 && <EmployeesTab departmentVersion={departmentVersion} />}
        {activeTab === 1 && <TeamsTab selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />}
        {activeTab === 2 && <DepartmentsTab onDepartmentsChange={() => setDepartmentVersion(v => v + 1)} />}
      </Box>
    </Fade>
  );
}