// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Box, Card, Button, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, IconButton,
//   Chip, Tooltip, Typography, Popover, TextField, Checkbox,
//   FormControlLabel, Fade, Grow, Tabs, Tab, Switch, Divider,
//   InputAdornment, MenuItem, Select, FormControl, InputLabel,
//   Dialog, DialogTitle, DialogContent, DialogActions,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   People as PeopleIcon,
//   Groups as GroupsIcon,
//   Business as BusinessIcon,
//   FilterList as FilterListIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
//   Visibility as ViewIcon,
//   Search as SearchIcon,
//   Close as CloseIcon,
//   Save as SaveIcon,
// } from '@mui/icons-material';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { HRDataService } from '../../data/hrDataService';
// import PageHeader from '../../components/shared/PageHeader';
// import { showDeleteConfirmation, showSuccessToast, showErrorToast } from '../../utils/sweetalert';

// // ─── Sticky cell styles ────────────────────────────────────────────────────────
// const stickyHeaderSx = {
//   py: 1.5, px: 2, whiteSpace: 'nowrap',
//   position: { xs: 'sticky', md: 'static' }, left: { xs: 0, md: 'auto' },
//   zIndex: { xs: 3, md: 'auto' }, backgroundColor: { xs: '#F9FAFB', md: 'inherit' },
//   boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
// };
// const stickyBodySx = {
//   py: 1.5, px: 2, whiteSpace: 'nowrap',
//   position: { xs: 'sticky', md: 'static' }, left: { xs: 0, md: 'auto' },
//   zIndex: { xs: 2, md: 'auto' }, backgroundColor: { xs: '#ffffff', md: 'transparent' },
//   boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
//   'tr:hover &': { backgroundColor: { xs: '#f0f9ff', md: 'transparent' } },
// };

// // ─── Shared table hook ────────────────────────────────────────────────────────
// function useTableControls(data, columnDefs, getVal) {
//   const [sortColumn, setSortColumn]           = useState(null);
//   const [sortDirection, setSortDirection]     = useState('asc');
//   const [filterAnchorEl, setFilterAnchorEl]   = useState(null);
//   const [currentFilterColumn, setCurrentFilterColumn] = useState(null);
//   const [filters, setFilters] = useState(Object.fromEntries(Object.keys(columnDefs).map((k) => [k, []])));
//   const [searchText, setSearchText]           = useState('');
//   const [globalSearch, setGlobalSearch]       = useState('');
//   const [page, setPage]                       = useState(0);
//   const rowsPerPage = 5;

//   const filtered = useMemo(() => {
//     let f = [...data];
//     if (globalSearch.trim()) {
//       const q = globalSearch.toLowerCase();
//       f = f.filter((row) => Object.keys(columnDefs).some((col) => String(getVal(row, col)).toLowerCase().includes(q)));
//     }
//     Object.keys(filters).forEach((col) => {
//       if (filters[col].length > 0) f = f.filter((row) => filters[col].includes(getVal(row, col)));
//     });
//     if (sortColumn) {
//       f.sort((a, b) => {
//         const av = getVal(a, sortColumn), bv = getVal(b, sortColumn);
//         if (sortColumn === 'id') return sortDirection === 'asc' ? parseInt(av.replace('#','')) - parseInt(bv.replace('#','')) : parseInt(bv.replace('#','')) - parseInt(av.replace('#',''));
//         const cmp = av.localeCompare(bv, undefined, { sensitivity: 'base' });
//         return sortDirection === 'asc' ? cmp : -cmp;
//       });
//     }
//     return f;
//   }, [data, filters, sortColumn, sortDirection, getVal, globalSearch, columnDefs]);

//   const getUniqueVals = useCallback((col) => {
//     let d = [...data];
//     Object.keys(filters).forEach((c) => { if (c !== col && filters[c].length > 0) d = d.filter((row) => filters[c].includes(getVal(row, c))); });
//     return [...new Set(d.map((row) => getVal(row, col)))].sort();
//   }, [data, filters, getVal]);

//   const handleSortClick   = (col) => { if (sortColumn === col) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); else { setSortColumn(col); setSortDirection('asc'); } };
//   const handleFilterClick = (e, col) => { setFilterAnchorEl(e.currentTarget); setCurrentFilterColumn(col); setSearchText(''); };
//   const handleFilterClose = () => { setFilterAnchorEl(null); setCurrentFilterColumn(null); setSearchText(''); };
//   const handleFilterToggle = (val) => { const col = currentFilterColumn; const cur = filters[col]; setFilters({ ...filters, [col]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val] }); };
//   const handleSelectAll   = () => setFilters({ ...filters, [currentFilterColumn]: getUniqueVals(currentFilterColumn) });
//   const handleClearAll    = () => setFilters({ ...filters, [currentFilterColumn]: [] });

//   useEffect(() => { setPage(0); }, [filters, sortColumn, sortDirection, globalSearch]);

//   const paginated    = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
//   const totalPages   = Math.ceil(filtered.length / rowsPerPage);
//   const filterOpen   = Boolean(filterAnchorEl);
//   const filteredPopoverValues = currentFilterColumn ? getUniqueVals(currentFilterColumn).filter((v) => String(v).toLowerCase().includes(searchText.toLowerCase())) : [];

//   return { filtered, paginated, page, setPage, totalPages, sortColumn, sortDirection, handleSortClick, filterAnchorEl, filterOpen, currentFilterColumn, filters, searchText, setSearchText, globalSearch, setGlobalSearch, handleFilterClick, handleFilterClose, handleFilterToggle, handleSelectAll, handleClearAll, filteredPopoverValues };
// }

// // ─── Shared filter popover ────────────────────────────────────────────────────
// function FilterPopover({ open, anchorEl, onClose, title, searchText, onSearch, onSelectAll, onClearAll, values, filters, currentCol, onToggle }) {
//   return (
//     <Popover open={open} anchorEl={anchorEl} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//       PaperProps={{ sx: { p: 1.5, minWidth: 260, maxHeight: 360, borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}>
//       <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.95rem' }}>{title}</Typography>
//       <TextField fullWidth size="small" placeholder="Search..." value={searchText} onChange={(e) => onSearch(e.target.value)}
//         sx={{ mb: 1.5, '& .MuiInputBase-root': { height: '32px', fontSize: '0.875rem' } }} />
//       <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
//         <Button size="small" variant="outlined" onClick={onSelectAll} fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Select All</Button>
//         <Button size="small" variant="outlined" onClick={onClearAll}  fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Clear All</Button>
//       </Box>
//       <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
//         {values.map((val) => (
//           <FormControlLabel key={val}
//             control={<Checkbox checked={currentCol ? filters[currentCol]?.includes(val) : false} onChange={() => onToggle(val)} size="small" sx={{ py: 0.25, '& .MuiSvgIcon-root': { fontSize: 18 } }} />}
//             label={val}
//             sx={{ display: 'block', mb: 0, ml: 0, mr: 0, '& .MuiFormControlLabel-label': { fontSize: '0.8125rem', lineHeight: 1.4 }, '& .MuiCheckbox-root': { py: 0.5 } }} />
//         ))}
//       </Box>
//     </Popover>
//   );
// }

// // ─── Shared pagination ────────────────────────────────────────────────────────
// function PaginationStrip({ page, totalPages, filteredCount, onPageChange }) {
//   if (filteredCount === 0) return null;
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, p: 2, borderTop: '1px solid #E5E7EB' }}>
//       <IconButton size="small" onClick={() => onPageChange(page - 1)} disabled={page === 0}
//         sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}>
//         <ChevronLeftIcon fontSize="small" />
//       </IconButton>
//       {Array.from({ length: totalPages }, (_, i) => i).map((n) => (
//         <IconButton key={n} size="small" onClick={() => onPageChange(n)}
//           sx={{ minWidth: '36px', height: '36px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', backgroundColor: page === n ? 'primary.main' : 'transparent', color: page === n ? '#FFFFFF' : 'text.primary', border: '1px solid', borderColor: page === n ? 'primary.main' : '#E5E7EB', '&:hover': { backgroundColor: page === n ? 'primary.dark' : 'rgba(59,130,246,0.1)', transform: 'scale(1.1)' } }}>
//           {n + 1}
//         </IconButton>
//       ))}
//       <IconButton size="small" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages - 1}
//         sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}>
//         <ChevronRightIcon fontSize="small" />
//       </IconButton>
//     </Box>
//   );
// }

// // ─── Shared sort+filter header ────────────────────────────────────────────────
// function SortFilterHeader({ label, column, sortColumn, sortDirection, filterCount, onSort, onFilter, sticky = false }) {
//   return (
//     <TableCell sx={sticky ? stickyHeaderSx : { py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//         {label}
//         <Tooltip title={`Sort by ${label}`} arrow>
//           <IconButton size="small" onClick={() => onSort(column)} sx={{ p: 0.5, color: sortColumn === column ? 'primary.main' : 'inherit', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59,130,246,0.1)' } }}>
//             {sortColumn === column && sortDirection === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 18 }} /> : <ArrowDownwardIcon sx={{ fontSize: 18 }} />}
//           </IconButton>
//         </Tooltip>
//         <Tooltip title={`Filter ${label}`} arrow>
//           <IconButton size="small" onClick={(e) => onFilter(e, column)} sx={{ p: 0.5, color: filterCount > 0 ? 'primary.main' : 'inherit', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59,130,246,0.1)' } }}>
//             <FilterListIcon sx={{ fontSize: 18 }} />
//           </IconButton>
//         </Tooltip>
//       </Box>
//     </TableCell>
//   );
// }

// // ─── Department Dialog (Create / Edit) ───────────────────────────────────────
// function DepartmentDialog({ open, dept, onClose, onSave }) {
//   const [name,    setName]   = useState('');
//   const [code,    setCode]   = useState('');
//   const [errors,  setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const isEdit = Boolean(dept);

//   useEffect(() => {
//     if (open) {
//       if (dept) {
//         setName(dept.name);
//         setCode(dept.code);
//       } else {
//         setName('');
//         setCode('');
//       }
//       setErrors({});
//       setTouched({});
//     }
//   }, [open, dept]);

//   useEffect(() => {
//     if (!isEdit && !touched.code) {
//       setCode(name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''));
//     }
//   }, [name, isEdit, touched.code]);

//   const validate = (n, c) => {
//     const errs = {};
//     if (!n.trim()) errs.name = 'Department name is required';
//     if (!c.trim()) errs.code = 'Code is required';
//     else if (!/^[a-z0-9_]+$/.test(c.trim())) errs.code = 'Only lowercase letters, numbers and underscores';
//     return errs;
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     if (touched.name) {
//       const errs = validate(e.target.value, code);
//       setErrors(prev => ({ ...prev, name: errs.name }));
//     }
//   };

//   const handleCodeChange = (e) => {
//     const val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
//     setCode(val);
//     setTouched(prev => ({ ...prev, code: true }));
//     if (touched.code) {
//       const errs = validate(name, val);
//       setErrors(prev => ({ ...prev, code: errs.code }));
//     }
//   };

//   const handleBlur = (field) => {
//     setTouched(prev => ({ ...prev, [field]: true }));
//     const errs = validate(name, code);
//     setErrors(prev => ({ ...prev, [field]: errs[field] }));
//   };

//   const handleSave = () => {
//     setTouched({ name: true, code: true });
//     const errs = validate(name, code);
//     if (Object.keys(errs).length) { setErrors(errs); return; }
//     onSave({ name: name.trim(), code: code.trim() });
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth TransitionComponent={Grow}
//       TransitionProps={{ timeout: 350 }}
//       PaperProps={{ sx: { borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' } }}>
//       <DialogTitle sx={{ pb: 0, pt: 2.5, px: 3, borderBottom: '1px solid #E5E7EB' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
//           <Box sx={{ p: 1, borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex' }}>
//             <BusinessIcon sx={{ color: 'primary.main', fontSize: 22 }} />
//           </Box>
//           <Box>
//             <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
//               {isEdit ? 'Edit Department' : 'New Department'}
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               {isEdit ? `Editing "${dept.name}"` : 'Fill in the details below'}
//             </Typography>
//           </Box>
//         </Box>
//       </DialogTitle>
//       <DialogContent sx={{ px: 3, py: 3 }}>
//         <Box sx={{ p: 2.5, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
//           <Typography variant="subtitle2" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
//             🏢 Department Information
//           </Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             <TextField
//               label="Department Name" fullWidth required
//               value={name} onChange={handleNameChange} onBlur={() => handleBlur('name')}
//               error={!!errors.name} helperText={errors.name || ' '}
//               placeholder="e.g., Customer Success"
//               InputLabelProps={{ shrink: true }}
//             />
//             <TextField
//               label="Code" fullWidth required
//               value={code} onChange={handleCodeChange} onBlur={() => handleBlur('code')}
//               error={!!errors.code} helperText={errors.code || 'Auto-generated from name · lowercase letters, numbers, underscores only'}
//               placeholder="e.g., customer_success"
//               InputLabelProps={{ shrink: true }}
//               inputProps={{ style: { fontFamily: 'monospace', fontSize: '0.9rem' } }}
//             />
//           </Box>
//         </Box>
//       </DialogContent>
//       <DialogActions sx={{ px: 3, py: 2.5, gap: 1.5, borderTop: '1px solid #E5E7EB' }}>
//         <Button variant="outlined" onClick={onClose} sx={{ minWidth: 100 }}>Cancel</Button>
//         <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}
//           sx={{ minWidth: 140, boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)', '&:hover': { boxShadow: '0 6px 10px -2px rgba(37, 99, 235, 0.5)', transform: 'translateY(-1px)' }, transition: 'all 0.2s ease' }}>
//           {isEdit ? 'Save Changes' : 'Create Department'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // DEPARTMENTS TAB
// // ═══════════════════════════════════════════════════════════════════════════════
// function DepartmentsTab({ onDepartmentsChange, createTrigger }) {
//   const [departments, setDepartments] = useState([]);
//   const [dialogOpen, setDialogOpen]   = useState(false);
//   const [editingDept, setEditingDept] = useState(null);

//   const prevTrigger = React.useRef(createTrigger);
//   useEffect(() => {
//     if (createTrigger !== prevTrigger.current) {
//       prevTrigger.current = createTrigger;
//       setEditingDept(null);
//       setDialogOpen(true);
//     }
//   }, [createTrigger]);

//   const load = () => {
//     const depts = HRDataService.getDepartments();
//     setDepartments(depts);
//     onDepartmentsChange?.();
//   };

//   useEffect(() => { load(); }, []); // eslint-disable-line

//   const deptCols = { id: 'ID', name: 'Name', code: 'Code', employees: 'Employees' };

//   const getDeptVal = useCallback((row, col) => {
//     switch (col) {
//       case 'id':        return `#${row.id}`;
//       case 'name':      return row.name;
//       case 'code':      return row.code;
//       case 'employees': return String(HRDataService.getEmployeeCountByDepartment(row.id));
//       default:          return '';
//     }
//   }, []);

//   const controls = useTableControls(departments, deptCols, getDeptVal);

//   const visibleColumns = useMemo(() => {
//     if (controls.paginated.length === 0) return Object.keys(deptCols);
//     return Object.keys(deptCols).filter(col =>
//       controls.paginated.some(row => { const v = getDeptVal(row, col); return v && v !== '-'; })
//     );
//   }, [controls.paginated, getDeptVal]);

//   const handleCreate = () => { setEditingDept(null); setDialogOpen(true); };
//   const handleEdit   = (dept) => { setEditingDept(dept); setDialogOpen(true); };

//   const handleSave = (data) => {
//     if (editingDept) {
//       const updated = HRDataService.updateDepartment(editingDept.id, data);
//       if (updated) { showSuccessToast('Department updated successfully!'); load(); }
//       else           showErrorToast('Failed to update department');
//     } else {
//       HRDataService.createDepartment(data);
//       showSuccessToast('Department created successfully!');
//       load();
//     }
//     setDialogOpen(false);
//   };

//   const handleDelete = async (dept) => {
//     const empCount = HRDataService.getEmployeeCountByDepartment(dept.id);
//     const extraNote = empCount > 0
//       ? ` ${empCount} employee${empCount > 1 ? 's' : ''} in this department will show "—" instead.`
//       : '';
//     const result = await showDeleteConfirmation('Delete Department?', `Delete "${dept.name}"?${extraNote}`);
//     if (result.isConfirmed) {
//       if (HRDataService.deleteDepartment(dept.id)) {
//         showSuccessToast('Department deleted!');
//         load();
//       } else showErrorToast('Failed to delete department');
//     }
//   };

//   const totalEmployees = departments.reduce((sum, d) => sum + HRDataService.getEmployeeCountByDepartment(d.id), 0);
//   const largest = departments.reduce((best, d) => {
//     const c = HRDataService.getEmployeeCountByDepartment(d.id);
//     return c > (best?.count || 0) ? { name: d.name, count: c } : best;
//   }, null);

//   return (
//     <Box>
//       <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
//         {[
//           { label: 'Total Departments', value: departments.length,       color: 'primary.main' },
//           { label: 'Total Employees',   value: totalEmployees,           color: '#16A34A'      },
//           { label: 'Largest Dept.',     value: largest?.name || '—',    color: '#0891B2', small: true },
//         ].map((stat, i) => (
//           <Grow in timeout={600 + i * 100} key={stat.label}>
//             <Card sx={{ p: 2.5, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
//               <Typography color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem', fontWeight: 500 }}>{stat.label}</Typography>
//               <Typography sx={{ color: stat.color, fontSize: stat.small ? '1.1rem' : '1.7rem', fontWeight: 700, lineHeight: 1.2 }}>{stat.value}</Typography>
//             </Card>
//           </Grow>
//         ))}
//       </Box>

//       <Grow in timeout={900}>
//         <Card>
//           <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB' }}>
//             <TextField size="small" placeholder="Search departments..." value={controls.globalSearch}
//               onChange={e => controls.setGlobalSearch(e.target.value)}
//               InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment> }}
//               sx={{ width: '100%', '& .MuiInputBase-root': { height: '38px', fontSize: '0.85rem', borderRadius: '10px' } }} />
//           </Box>

//           <TableContainer sx={{ overflowX: 'auto' }}>
//             <Table stickyHeader sx={{ tableLayout: 'auto' }}>
//               <TableHead>
//                 <TableRow>
//                   {visibleColumns.map((col, idx) => (
//                     <SortFilterHeader key={col} label={deptCols[col]} column={col}
//                       sticky={idx === 0}
//                       sortColumn={controls.sortColumn} sortDirection={controls.sortDirection}
//                       filterCount={controls.filters[col]?.length || 0}
//                       onSort={controls.handleSortClick} onFilter={controls.handleFilterClick} />
//                   ))}
//                   <TableCell align="center" sx={{ py: 1.5, px: 2 }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {controls.paginated.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 8 }}>
//                       <BusinessIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
//                       <Typography variant="h6" color="text.secondary">No departments found</Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                         {controls.globalSearch || Object.values(controls.filters).flat().length > 0
//                           ? 'Try adjusting your search' : 'Create your first department'}
//                       </Typography>
//                       {!controls.globalSearch && Object.values(controls.filters).flat().length === 0 && (
//                         <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>New Department</Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   controls.paginated.map((dept) => {
//                     const empCount = HRDataService.getEmployeeCountByDepartment(dept.id);
//                     return (
//                       <TableRow key={dept.id} hover sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>
//                         {visibleColumns.map((col, idx) => (
//                           <TableCell key={col} sx={idx === 0 ? stickyBodySx : { py: 1.5, px: 2 }}>
//                             {col === 'id'   && <Chip label={`#${dept.id}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />}
//                             {col === 'name' && <Typography variant="body2" fontWeight={700}>{dept.name}</Typography>}
//                             {col === 'code' && (
//                               <Chip label={dept.code} size="small"
//                                 sx={{ backgroundColor: '#F1F5F9', color: '#475569', fontWeight: 700, fontSize: '11px', fontFamily: 'monospace' }} />
//                             )}
//                             {col === 'employees' && (
//                               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                 <Chip
//                                   label={`${empCount} employee${empCount !== 1 ? 's' : ''}`}
//                                   size="small"
//                                   sx={{ backgroundColor: empCount > 0 ? '#F0FDF4' : '#F3F4F6', color: empCount > 0 ? '#166534' : '#6B7280', fontWeight: 600, fontSize: '12px' }} />
//                               </Box>
//                             )}
//                           </TableCell>
//                         ))}
//                         <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
//                           <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
//                             <Tooltip title="Edit" arrow>
//                               <IconButton size="small" onClick={() => handleEdit(dept)}
//                                 sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}>
//                                 <EditIcon sx={{ fontSize: 20 }} />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title={empCount > 0 ? 'Cannot delete — has employees' : 'Delete'} arrow>
//                               <span>
//                                 <IconButton size="small" onClick={() => handleDelete(dept)}
//                                   disabled={false}
//                                   sx={{ p: 0.5, color: 'error.main', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)', transform: 'scale(1.2)' } }}>
//                                   <DeleteIcon sx={{ fontSize: 20 }} />
//                                 </IconButton>
//                               </span>
//                             </Tooltip>
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <PaginationStrip page={controls.page} totalPages={controls.totalPages} filteredCount={controls.filtered.length} onPageChange={controls.setPage} />
//         </Card>
//       </Grow>

//       <FilterPopover
//         open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
//         title={controls.currentFilterColumn ? `${deptCols[controls.currentFilterColumn]} Filter` : 'Filter'}
//         searchText={controls.searchText} onSearch={controls.setSearchText}
//         onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
//         values={controls.filteredPopoverValues} filters={controls.filters}
//         currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />

//       <DepartmentDialog
//         open={dialogOpen}
//         dept={editingDept}
//         onClose={() => setDialogOpen(false)}
//         onSave={handleSave}
//       />
//     </Box>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // EMPLOYEES TAB
// // ═══════════════════════════════════════════════════════════════════════════════
// function EmployeesTab({ departmentVersion }) {
//   const navigate = useNavigate();
//   const [employees, setEmployees] = useState([]);
//   const [deptFilter, setDeptFilter] = useState('');
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => { setEmployees(HRDataService.getEmployees()); }, []);
//   useEffect(() => { setDepartments(HRDataService.getDepartments()); }, [departmentVersion]);

//   const empCols = { id: 'ID', full_name: 'Full Name', department: 'Department', phone: 'Phone', status: 'Status' };

//   const getEmpVal = useCallback((row, col) => {
//     switch (col) {
//       case 'id':         return `#${row.id}`;
//       case 'full_name':  return row.full_name;
//       case 'department': return HRDataService.getDepartmentById(row.department)
//         ? HRDataService.getDepartmentName(row.department)
//         : '—';
//       case 'phone':      return row.phone || '-';
//       case 'status':     return row.is_active ? 'Active' : 'Inactive';
//       default:           return '';
//     }
//   }, []);

//   const controls = useTableControls(employees, empCols, getEmpVal);

//   const finalFiltered = useMemo(() => {
//     if (!deptFilter) return controls.filtered;
//     return controls.filtered.filter((e) => e.department === deptFilter);
//   }, [controls.filtered, deptFilter]);

//   const rowsPerPage     = 5;
//   const finalPaginated  = finalFiltered.slice(controls.page * rowsPerPage, (controls.page + 1) * rowsPerPage);
//   const finalTotalPages = Math.ceil(finalFiltered.length / rowsPerPage);

//   useEffect(() => { controls.setPage(0); }, [deptFilter]); // eslint-disable-line

//   const visibleColumns = useMemo(() => {
//     if (finalPaginated.length === 0) return Object.keys(empCols);
//     return Object.keys(empCols).filter(col =>
//       finalPaginated.some(row => { const val = getEmpVal(row, col); return val && val !== '-'; })
//     );
//   }, [finalPaginated, getEmpVal]);

//   const hasAnyFilter = deptFilter || controls.globalSearch || Object.values(controls.filters).flat().length > 0;

//   const handleToggleActive = (emp) => {
//     const updated = HRDataService.updateEmployee(emp.id, { is_active: !emp.is_active });
//     if (updated) { setEmployees(prev => prev.map(e => e.id === emp.id ? updated : e)); showSuccessToast(`Employee ${updated.is_active ? 'activated' : 'deactivated'}!`); }
//   };
//   const handleDelete = async (emp) => {
//     const result = await showDeleteConfirmation('Delete Employee?', `Delete "${emp.full_name}"?`);
//     if (result.isConfirmed) {
//       if (HRDataService.deleteEmployee(emp.id)) { setEmployees(prev => prev.filter(e => e.id !== emp.id)); showSuccessToast('Employee deleted!'); }
//       else showErrorToast('Failed to delete');
//     }
//   };

//   const activeEmps = employees.filter(e => e.is_active).length;

//   return (
//     <Box>
//       <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
//         {[
//           { label: 'Total Employees', value: employees.length,              color: 'primary.main' },
//           { label: 'Active',          value: activeEmps,                    color: '#16A34A'      },
//           { label: 'Inactive',        value: employees.length - activeEmps, color: '#DC2626'      },
//           { label: 'Departments',     value: departments.length,            color: '#0891B2'      },
//         ].map((stat, i) => (
//           <Grow in timeout={600 + i * 100} key={stat.label}>
//             <Card sx={{ p: 3, flex: 1, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
//               <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>{stat.label}</Typography>
//               <Typography variant="h2" sx={{ color: stat.color }}>{stat.value}</Typography>
//             </Card>
//           </Grow>
//         ))}
//       </Box>

//       <Grow in timeout={900}>
//         <Card>
//           <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB', display: 'flex', gap: 2, alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
//             <TextField size="small" placeholder="Search employees by name or phone..." value={controls.globalSearch} onChange={e => controls.setGlobalSearch(e.target.value)}
//               InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment> }}
//               sx={{ flex: 1, width: '100%', '& .MuiInputBase-root': { height: '38px', fontSize: '0.85rem', borderRadius: '10px' } }} />
//             <FormControl size="small" sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}>
//               <InputLabel>Filter by Department</InputLabel>
//               <Select value={deptFilter} label="Filter by Department" onChange={e => setDeptFilter(e.target.value)} sx={{ borderRadius: '10px', height: '38px', fontSize: '0.85rem' }}>
//                 <MenuItem value=""><em>All Departments</em></MenuItem>
//                 {departments.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
//               </Select>
//             </FormControl>
//             {hasAnyFilter && (
//               <Button size="small" variant="outlined" color="error" startIcon={<CloseIcon fontSize="small" />}
//                 onClick={() => { controls.setGlobalSearch(''); setDeptFilter(''); controls.handleClearAll?.(); }}
//                 sx={{ borderRadius: '10px', whiteSpace: 'nowrap', height: '38px', flexShrink: 0 }}>
//                 Clear All
//               </Button>
//             )}
//           </Box>

//           <TableContainer sx={{ overflowX: 'auto' }}>
//             <Table stickyHeader sx={{ tableLayout: 'auto' }}>
//               <TableHead>
//                 <TableRow>
//                   {visibleColumns.map((col, index) => (
//                     <SortFilterHeader key={col} label={empCols[col]} column={col} sticky={index === 0}
//                       sortColumn={controls.sortColumn} sortDirection={controls.sortDirection}
//                       filterCount={controls.filters[col]?.length || 0}
//                       onSort={controls.handleSortClick} onFilter={controls.handleFilterClick} />
//                   ))}
//                   <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Active</TableCell>
//                   <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {finalPaginated.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={visibleColumns.length + 2} align="center" sx={{ py: 8 }}>
//                       <PeopleIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
//                       <Typography variant="h6" color="text.secondary">No employees found</Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                         {hasAnyFilter ? 'Try adjusting your search or filters' : 'Add your first employee'}
//                       </Typography>
//                       {!hasAnyFilter && <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/hr/employees/create')}>New Employee</Button>}
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   finalPaginated.map(emp => {
//                     const deptStyle = HRDataService.getDepartmentStyle(emp.department);
//                     return (
//                       <TableRow key={emp.id} hover sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>
//                         {visibleColumns.map((col, idx) => (
//                           <TableCell key={col} sx={idx === 0 ? stickyBodySx : { py: 1.5, px: 2 }}>
//                             {col === 'id'        && <Chip label={`#${emp.id}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />}
//                             {col === 'full_name' && <Typography variant="body2" fontWeight={600}>{emp.full_name}</Typography>}
//                             {col === 'department' && (
//                               HRDataService.getDepartmentById(emp.department)
//                                 ? <Chip label={HRDataService.getDepartmentName(emp.department)} size="small" sx={{ fontWeight: 600, fontSize: '12px', backgroundColor: deptStyle.bg, color: deptStyle.color }} />
//                                 : <Typography variant="body2" color="text.disabled">—</Typography>
//                             )}
//                             {col === 'phone'     && <Typography variant="body2" color="text.secondary">{emp.phone || '-'}</Typography>}
//                             {col === 'status'    && <Chip label={emp.is_active ? 'Active' : 'Inactive'} size="small" sx={{ backgroundColor: emp.is_active ? '#DCFCE7' : '#FEE2E2', color: emp.is_active ? '#166534' : '#991B1B', fontWeight: 600, fontSize: '12px' }} />}
//                           </TableCell>
//                         ))}
//                         <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
//                           <Switch checked={emp.is_active} onChange={() => handleToggleActive(emp)} size="small" color="success" />
//                         </TableCell>
//                         <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
//                           <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
//                             <Tooltip title="Edit" arrow><IconButton size="small" onClick={() => navigate(`/hr/employees/edit/${emp.id}`)} sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}><EditIcon sx={{ fontSize: 20 }} /></IconButton></Tooltip>
//                             <Tooltip title="Delete" arrow><IconButton size="small" onClick={() => handleDelete(emp)} sx={{ p: 0.5, color: 'error.main', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)', transform: 'scale(1.2)' } }}><DeleteIcon sx={{ fontSize: 20 }} /></IconButton></Tooltip>
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <PaginationStrip page={controls.page} totalPages={finalTotalPages} filteredCount={finalFiltered.length} onPageChange={controls.setPage} />
//         </Card>
//       </Grow>

//       <FilterPopover
//         open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
//         title={controls.currentFilterColumn ? `${empCols[controls.currentFilterColumn]} Filter` : 'Filter'}
//         searchText={controls.searchText} onSearch={controls.setSearchText}
//         onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
//         values={controls.filteredPopoverValues} filters={controls.filters}
//         currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />
//     </Box>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // TEAMS TAB
// // ═══════════════════════════════════════════════════════════════════════════════
// function TeamsTab({ selectedTeam, onSelectTeam }) {
//   const navigate = useNavigate();
//   const [teams, setTeams] = useState([]);
//   const [viewTeam, setViewTeam] = useState(null);

//   useEffect(() => { setTeams(HRDataService.getTeams()); }, []);

//   const teamCols = { id: 'ID', name: 'Team Name', code: 'Code', members: 'Members', status: 'Status' };

//   const getTeamVal = useCallback((row, col) => {
//     switch (col) {
//       case 'id':      return `#${row.id}`;
//       case 'name':    return row.name;
//       case 'code':    return row.code || '-';
//       case 'members': return String(HRDataService.getTeamMemberCount(row.id));
//       case 'status':  return row.is_active ? 'Active' : 'Inactive';
//       default:        return '';
//     }
//   }, []);

//   const controls = useTableControls(teams, teamCols, getTeamVal);

//   const visibleDataColumns = useMemo(() => {
//     if (controls.paginated.length === 0) return Object.keys(teamCols);
//     return Object.keys(teamCols).filter(col =>
//       controls.paginated.some(row => { const val = getTeamVal(row, col); return val && val !== '-'; })
//     );
//   }, [controls.paginated, getTeamVal]);

//   const showDescriptionCol = useMemo(() => {
//     if (controls.paginated.length === 0) return true;
//     return controls.paginated.some(row => row.description && row.description.trim() !== '');
//   }, [controls.paginated]);

//   const handleToggleActive = (team) => {
//     const updated = HRDataService.updateTeam(team.id, { is_active: !team.is_active });
//     if (updated) {
//       setTeams(prev => prev.map(t => t.id === team.id ? updated : t));
//       if (selectedTeam?.id === team.id) onSelectTeam(updated);
//       showSuccessToast(`Team ${updated.is_active ? 'activated' : 'deactivated'}!`);
//     }
//   };
//   const handleDelete = async (team) => {
//     const result = await showDeleteConfirmation('Delete Team?', `Delete "${team.name}"? This will also remove all team members.`);
//     if (result.isConfirmed) {
//       if (HRDataService.deleteTeam(team.id)) {
//         setTeams(prev => prev.filter(t => t.id !== team.id));
//         if (selectedTeam?.id === team.id) onSelectTeam(null);
//         showSuccessToast('Team deleted!');
//       } else showErrorToast('Failed to delete team');
//     }
//   };

//   const handleOpenDetail  = (team) => { setViewTeam(team); onSelectTeam(team); };
//   const handleCloseDetail = () => setViewTeam(null);

//   const activeTeams  = teams.filter(t => t.is_active).length;
//   const totalMembers = teams.reduce((sum, t) => sum + HRDataService.getTeamMemberCount(t.id), 0);
//   const totalCols    = visibleDataColumns.length + (showDescriptionCol ? 1 : 0) + 2;

//   return (
//     <Box>
//       <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
//         {[
//           { label: 'Total Teams',   value: teams.length,               color: 'primary.main' },
//           { label: 'Active Teams',  value: activeTeams,                color: '#16A34A'      },
//           { label: 'Total Members', value: totalMembers,               color: '#0891B2'      },
//           { label: 'Inactive',      value: teams.length - activeTeams, color: '#DC2626'      },
//         ].map((stat, i) => (
//           <Grow in timeout={600 + i * 100} key={stat.label}>
//             <Card sx={{ p: 3, flex: 1, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
//               <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>{stat.label}</Typography>
//               <Typography variant="h2" sx={{ color: stat.color }}>{stat.value}</Typography>
//             </Card>
//           </Grow>
//         ))}
//       </Box>

//       <Grow in timeout={900}>
//         <Card>
//           <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB' }}>
//             <TextField fullWidth size="small" placeholder="Search teams by name or code..." value={controls.globalSearch} onChange={e => controls.setGlobalSearch(e.target.value)}
//               InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment> }}
//               sx={{ '& .MuiInputBase-root': { height: '38px', fontSize: '0.85rem' } }} />
//           </Box>

//           <TableContainer sx={{ overflowX: 'auto' }}>
//             <Table stickyHeader sx={{ tableLayout: 'auto' }}>
//               <TableHead>
//                 <TableRow>
//                   {visibleDataColumns.map((col, index) => (
//                     <SortFilterHeader key={col} label={teamCols[col]} column={col} sticky={index === 0}
//                       sortColumn={controls.sortColumn} sortDirection={controls.sortDirection}
//                       filterCount={controls.filters[col]?.length || 0}
//                       onSort={controls.handleSortClick} onFilter={controls.handleFilterClick} />
//                   ))}
//                   {showDescriptionCol && <TableCell sx={{ py: 1.5, px: 2 }}>Description</TableCell>}
//                   <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Active</TableCell>
//                   <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {controls.paginated.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={totalCols} align="center" sx={{ py: 8 }}>
//                       <GroupsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
//                       <Typography variant="h6" color="text.secondary">No teams found</Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                         {Object.values(controls.filters).flat().length > 0 || controls.globalSearch ? 'Try adjusting your search or filters' : 'Create your first team'}
//                       </Typography>
//                       {Object.values(controls.filters).flat().length === 0 && !controls.globalSearch && (
//                         <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/hr/teams/create')}>New Team</Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   controls.paginated.map(team => {
//                     const memberCount = HRDataService.getTeamMemberCount(team.id);
//                     const isSelected  = selectedTeam?.id === team.id;
//                     return (
//                       <TableRow key={team.id} hover sx={{ '&:last-child td': { borderBottom: 0 }, backgroundColor: isSelected ? 'rgba(59,130,246,0.06)' : 'inherit', '&:hover': { backgroundColor: isSelected ? 'rgba(59,130,246,0.09)' : 'rgba(59,130,246,0.04)' } }}>
//                         {visibleDataColumns.map((col, idx) => (
//                           <TableCell key={col} sx={idx === 0 ? stickyBodySx : { py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
//                             {col === 'id'      && <Chip label={`#${team.id}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />}
//                             {col === 'name'    && <Typography variant="body2" fontWeight={600}>{team.name}</Typography>}
//                             {col === 'code'    && <Chip label={team.code} size="small" sx={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', fontWeight: 700, fontSize: '11px', fontFamily: 'monospace' }} />}
//                             {col === 'members' && (
//                               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                 <Chip label={`${memberCount} member${memberCount !== 1 ? 's' : ''}`} size="small" sx={{ backgroundColor: memberCount > 0 ? '#F0FDF4' : '#F3F4F6', color: memberCount > 0 ? '#166534' : '#6B7280', fontWeight: 600, fontSize: '12px' }} />
//                                 <Button size="small" variant="outlined" startIcon={<ViewIcon sx={{ fontSize: 13 }} />} onClick={() => navigate(`/hr/teams/${team.id}/members`)}
//                                   sx={{ py: 0.25, px: 1, fontSize: '11px', fontWeight: 600, minHeight: '24px', borderRadius: '6px', borderColor: '#BFDBFE', color: '#1D4ED8', backgroundColor: '#EFF6FF', whiteSpace: 'nowrap', '&:hover': { backgroundColor: '#DBEAFE', borderColor: '#93C5FD', transform: 'translateY(-1px)', boxShadow: '0 2px 6px rgba(59,130,246,0.25)' }, transition: 'all 0.2s ease' }}>
//                                   View
//                                 </Button>
//                               </Box>
//                             )}
//                             {col === 'status'  && <Chip label={team.is_active ? 'Active' : 'Inactive'} size="small" sx={{ backgroundColor: team.is_active ? '#DCFCE7' : '#FEE2E2', color: team.is_active ? '#166534' : '#991B1B', fontWeight: 600, fontSize: '12px' }} />}
//                           </TableCell>
//                         ))}
//                         {showDescriptionCol && (
//                           <TableCell sx={{ py: 1.5, px: 2 }}>
//                             <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 220 }}>{team.description || '—'}</Typography>
//                           </TableCell>
//                         )}
//                         <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
//                           <Switch checked={team.is_active} onChange={() => handleToggleActive(team)} size="small" color="success" />
//                         </TableCell>
//                         <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
//                           <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
//                             <Tooltip title="View Details" arrow><IconButton size="small" onClick={() => handleOpenDetail(team)} sx={{ p: 0.5, color: 'info.main', '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)', transform: 'scale(1.2)' } }}><ViewIcon sx={{ fontSize: 20 }} /></IconButton></Tooltip>
//                             <Tooltip title="Edit" arrow><IconButton size="small" onClick={() => navigate(`/hr/teams/edit/${team.id}`)} sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}><EditIcon sx={{ fontSize: 20 }} /></IconButton></Tooltip>
//                             <Tooltip title="Delete" arrow><IconButton size="small" onClick={() => handleDelete(team)} sx={{ p: 0.5, color: 'error.main', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)', transform: 'scale(1.2)' } }}><DeleteIcon sx={{ fontSize: 20 }} /></IconButton></Tooltip>
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <PaginationStrip page={controls.page} totalPages={controls.totalPages} filteredCount={controls.filtered.length} onPageChange={controls.setPage} />
//         </Card>
//       </Grow>

//       <FilterPopover
//         open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
//         title={controls.currentFilterColumn ? `${teamCols[controls.currentFilterColumn]} Filter` : 'Filter'}
//         searchText={controls.searchText} onSearch={controls.setSearchText}
//         onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
//         values={controls.filteredPopoverValues} filters={controls.filters}
//         currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />

//       <Dialog open={Boolean(viewTeam)} onClose={handleCloseDetail} maxWidth="sm" fullWidth TransitionComponent={Grow}
//         PaperProps={{ sx: { borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' } }}>
//         {viewTeam && (
//           <>
//             <DialogTitle sx={{ pb: 1.5, borderBottom: '1px solid #E5E7EB' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                 <Box sx={{ p: 1, borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex' }}>
//                   <GroupsIcon sx={{ color: 'primary.main', fontSize: 22 }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" fontWeight={700}>{viewTeam.name}</Typography>
//                   <Typography variant="caption" color="text.secondary">Team Details</Typography>
//                 </Box>
//                 <Chip label={viewTeam.code} size="small" sx={{ ml: 'auto', backgroundColor: '#EFF6FF', color: '#1D4ED8', fontWeight: 700, fontFamily: 'monospace' }} />
//               </Box>
//             </DialogTitle>
//             <DialogContent sx={{ pt: 3, pb: 1 }}>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
//                 <Box sx={{ display: 'flex', gap: 2 }}>
//                   {[
//                     { label: 'Status',  content: <Chip label={viewTeam.is_active ? 'Active' : 'Inactive'} size="small" sx={{ backgroundColor: viewTeam.is_active ? '#DCFCE7' : '#FEE2E2', color: viewTeam.is_active ? '#166534' : '#991B1B', fontWeight: 700 }} /> },
//                     { label: 'Members', content: <Typography variant="body1" fontWeight={700} sx={{ color: 'primary.main' }}>{HRDataService.getTeamMemberCount(viewTeam.id)} member{HRDataService.getTeamMemberCount(viewTeam.id) !== 1 ? 's' : ''}</Typography> },
//                     { label: 'Created', content: <Typography variant="body2" fontWeight={600}>{viewTeam.created_at || '—'}</Typography> },
//                   ].map(({ label, content }) => (
//                     <Box key={label} sx={{ flex: 1, p: 2, borderRadius: '10px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
//                       <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>{label}</Typography>
//                       {content}
//                     </Box>
//                   ))}
//                 </Box>
//                 <Box sx={{ p: 2.5, borderRadius: '10px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
//                   <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</Typography>
//                   <Typography variant="body2" sx={{ lineHeight: 1.75, color: viewTeam.description ? 'text.primary' : 'text.disabled', fontStyle: viewTeam.description ? 'normal' : 'italic' }}>
//                     {viewTeam.description || 'No description provided for this team.'}
//                   </Typography>
//                 </Box>
//               </Box>
//             </DialogContent>
//             <DialogActions sx={{ p: 2.5, gap: 1.5, borderTop: '1px solid #E5E7EB', mt: 2 }}>
//               <Button variant="outlined" onClick={handleCloseDetail} sx={{ minWidth: 100 }}>Close</Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </Box>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // MAIN HR PAGE
// // Tab indices: 0=Employees, 1=Sales Teams, 2=Departments  ← Departments is now LAST
// // ═══════════════════════════════════════════════════════════════════════════════
// export default function HR() {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [selectedTeam, setSelectedTeam] = useState(null);

//   const [departmentVersion, setDepartmentVersion] = useState(0);
//   const [deptCreateTrigger, setDeptCreateTrigger] = useState(0);

//   const tabParam  = searchParams.get('tab');
//   // 0=Employees, 1=Teams, 2=Departments, 3=Members (dynamic)
//   const activeTab =
//     tabParam === 'teams'       ? 1 :
//     tabParam === 'departments' ? 2 :
//     tabParam === 'members'     ? 3 : 0;

//   const handleTabChange = (_, newVal) => {
//     if      (newVal === 0)               setSearchParams({ tab: 'employees' });
//     else if (newVal === 1)               setSearchParams({ tab: 'teams' });
//     else if (newVal === 2)               setSearchParams({ tab: 'departments' });
//     else if (newVal === 3 && selectedTeam) navigate(`/hr/teams/${selectedTeam.id}/members`);
//   };

//   const isTeamsTab = activeTab === 1;
//   const isDeptsTab = activeTab === 2;

//   const headerButtonLabel = isDeptsTab ? 'New Department' : isTeamsTab ? 'New Team' : 'New Employee';
//   const handleHeaderButton = () => {
//     if      (isDeptsTab)  setDeptCreateTrigger(v => v + 1);
//     else if (isTeamsTab)  navigate('/hr/teams/create');
//     else                  navigate('/hr/employees/create');
//   };

//   return (
//     <Fade in timeout={500}>
//       <Box>
//         <PageHeader
//           title="Human Resources"
//           subtitle="Manage departments, employees and sales teams"
//           breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'HR', active: true }]}
//           actions={
//             <Button variant="contained"
//               startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
//               size="large"
//               onClick={handleHeaderButton}
//               sx={{ boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)', transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.5)', transform: 'translateY(-2px)' }, minWidth: { xs: '48px', sm: 'auto' }, px: { xs: 1.5, sm: 3 } }}>
//               <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{headerButtonLabel}</Box>
//               <AddIcon sx={{ display: { xs: 'inline-flex', sm: 'none' } }} />
//             </Button>
//           }
//         />

//         <Card sx={{ mb: 3 }}>
//           <Tabs value={activeTab} onChange={handleTabChange}
//             sx={{ px: 2, '& .MuiTab-root': { fontWeight: 600, fontSize: '14px', textTransform: 'none', minHeight: 52 }, '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' } }}>
//             {/* 0 */}
//             <Tab icon={<PeopleIcon   sx={{ fontSize: 20 }} />} iconPosition="start" label="Employees"   sx={{ gap: 1 }} />
//             {/* 1 */}
//             <Tab icon={<GroupsIcon   sx={{ fontSize: 20 }} />} iconPosition="start" label="Sales Teams" sx={{ gap: 1 }} />
//             {/* 2 — Departments is now last */}
//             <Tab icon={<BusinessIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Departments" sx={{ gap: 1 }} />
//             {/* 3 — dynamic, only when a team is selected */}
//             {selectedTeam && (
//               <Tab
//                 icon={<ViewIcon sx={{ fontSize: 20 }} />} iconPosition="start"
//                 label={
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
//                     <span>View Members</span>
//                     <Chip label={selectedTeam.name} size="small" sx={{ height: 20, fontSize: '11px', fontWeight: 700, backgroundColor: '#DBEAFE', color: '#1D4ED8', cursor: 'pointer' }} />
//                     <Box component="span" onClick={(e) => { e.stopPropagation(); setSelectedTeam(null); setSearchParams({ tab: 'teams' }); }}
//                       sx={{ display: 'inline-flex', alignItems: 'center', ml: 0.25, color: 'text.secondary', '&:hover': { color: 'error.main' }, transition: 'color 0.2s ease' }}>
//                       <CloseIcon sx={{ fontSize: 14 }} />
//                     </Box>
//                   </Box>
//                 }
//                 sx={{ gap: 1 }}
//               />
//             )}
//           </Tabs>
//           <Divider />
//         </Card>

//         {activeTab === 0 && <EmployeesTab departmentVersion={departmentVersion} />}
//         {activeTab === 1 && <TeamsTab selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />}
//         {activeTab === 2 && <DepartmentsTab onDepartmentsChange={() => setDepartmentVersion(v => v + 1)} createTrigger={deptCreateTrigger} />}
//       </Box>
//     </Fade>
//   );
// }




import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box, Card, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton,
  Chip, Tooltip, Typography, Popover, TextField, Checkbox,
  FormControlLabel, Fade, Grow, Tabs, Tab, Switch, Divider,
  InputAdornment, MenuItem, Select, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions,
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
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HRDataService } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showDeleteConfirmation, showSuccessToast, showErrorToast } from '../../utils/sweetalert';

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
  const [sortColumn, setSortColumn]           = useState(null);
  const [sortDirection, setSortDirection]     = useState('asc');
  const [filterAnchorEl, setFilterAnchorEl]   = useState(null);
  const [currentFilterColumn, setCurrentFilterColumn] = useState(null);
  const [filters, setFilters] = useState(Object.fromEntries(Object.keys(columnDefs).map((k) => [k, []])));
  const [searchText, setSearchText]           = useState('');
  const [globalSearch, setGlobalSearch]       = useState('');
  const [page, setPage]                       = useState(0);
  const rowsPerPage = 5;

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
        if (sortColumn === 'id') return sortDirection === 'asc' ? parseInt(av.replace('#','')) - parseInt(bv.replace('#','')) : parseInt(bv.replace('#','')) - parseInt(av.replace('#',''));
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

  const handleSortClick   = (col) => { if (sortColumn === col) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); else { setSortColumn(col); setSortDirection('asc'); } };
  const handleFilterClick = (e, col) => { setFilterAnchorEl(e.currentTarget); setCurrentFilterColumn(col); setSearchText(''); };
  const handleFilterClose = () => { setFilterAnchorEl(null); setCurrentFilterColumn(null); setSearchText(''); };
  const handleFilterToggle = (val) => { const col = currentFilterColumn; const cur = filters[col]; setFilters({ ...filters, [col]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val] }); };
  const handleSelectAll   = () => setFilters({ ...filters, [currentFilterColumn]: getUniqueVals(currentFilterColumn) });
  const handleClearAll    = () => setFilters({ ...filters, [currentFilterColumn]: [] });

  useEffect(() => { setPage(0); }, [filters, sortColumn, sortDirection, globalSearch]);

  const paginated    = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const totalPages   = Math.ceil(filtered.length / rowsPerPage);
  const filterOpen   = Boolean(filterAnchorEl);
  const filteredPopoverValues = currentFilterColumn ? getUniqueVals(currentFilterColumn).filter((v) => String(v).toLowerCase().includes(searchText.toLowerCase())) : [];

  return { filtered, paginated, page, setPage, totalPages, sortColumn, sortDirection, handleSortClick, filterAnchorEl, filterOpen, currentFilterColumn, filters, searchText, setSearchText, globalSearch, setGlobalSearch, handleFilterClick, handleFilterClose, handleFilterToggle, handleSelectAll, handleClearAll, filteredPopoverValues };
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

// ─── Shared pagination ────────────────────────────────────────────────────────
function PaginationStrip({ page, totalPages, filteredCount, onPageChange }) {
  if (filteredCount === 0) return null;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, p: 2, borderTop: '1px solid #E5E7EB' }}>
      <IconButton size="small" onClick={() => onPageChange(page - 1)} disabled={page === 0}
        sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}>
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      {Array.from({ length: totalPages }, (_, i) => i).map((n) => (
        <IconButton key={n} size="small" onClick={() => onPageChange(n)}
          sx={{ minWidth: '36px', height: '36px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', backgroundColor: page === n ? 'primary.main' : 'transparent', color: page === n ? '#FFFFFF' : 'text.primary', border: '1px solid', borderColor: page === n ? 'primary.main' : '#E5E7EB', '&:hover': { backgroundColor: page === n ? 'primary.dark' : 'rgba(59,130,246,0.1)', transform: 'scale(1.1)' } }}>
          {n + 1}
        </IconButton>
      ))}
      <IconButton size="small" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages - 1}
        sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}>
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
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

// ─── Department Dialog (Create / Edit) ───────────────────────────────────────
function DepartmentDialog({ open, dept, onClose, onSave }) {
  const [name,    setName]   = useState('');
  const [code,    setCode]   = useState('');
  const [errors,  setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isEdit = Boolean(dept);

  useEffect(() => {
    if (open) {
      if (dept) {
        setName(dept.name);
        setCode(dept.code);
      } else {
        setName('');
        setCode('');
      }
      setErrors({});
      setTouched({});
    }
  }, [open, dept]);

  useEffect(() => {
    if (!isEdit && !touched.code) {
      setCode(name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''));
    }
  }, [name, isEdit, touched.code]);

  const validate = (n, c) => {
    const errs = {};
    if (!n.trim()) errs.name = 'Department name is required';
    if (!c.trim()) errs.code = 'Code is required';
    else if (!/^[a-z0-9_]+$/.test(c.trim())) errs.code = 'Only lowercase letters, numbers and underscores';
    return errs;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (touched.name) {
      const errs = validate(e.target.value, code);
      setErrors(prev => ({ ...prev, name: errs.name }));
    }
  };

  const handleCodeChange = (e) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setCode(val);
    setTouched(prev => ({ ...prev, code: true }));
    if (touched.code) {
      const errs = validate(name, val);
      setErrors(prev => ({ ...prev, code: errs.code }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errs = validate(name, code);
    setErrors(prev => ({ ...prev, [field]: errs[field] }));
  };

  const handleSave = () => {
    setTouched({ name: true, code: true });
    const errs = validate(name, code);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave({ name: name.trim(), code: code.trim() });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth TransitionComponent={Grow}
      TransitionProps={{ timeout: 350 }}
      PaperProps={{ sx: { borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' } }}>
      <DialogTitle sx={{ pb: 0, pt: 2.5, px: 3, borderBottom: '1px solid #E5E7EB' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box sx={{ p: 1, borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex' }}>
            <BusinessIcon sx={{ color: 'primary.main', fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
              {isEdit ? 'Edit Department' : 'New Department'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {isEdit ? `Editing "${dept.name}"` : 'Fill in the details below'}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Box sx={{ p: 2.5, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
            🏢 Department Information
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Department Name" fullWidth required
              value={name} onChange={handleNameChange} onBlur={() => handleBlur('name')}
              error={!!errors.name} helperText={errors.name || ' '}
              placeholder="e.g., Customer Success"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Code" fullWidth required
              value={code} onChange={handleCodeChange} onBlur={() => handleBlur('code')}
              error={!!errors.code} helperText={errors.code || 'Auto-generated from name · lowercase letters, numbers, underscores only'}
              placeholder="e.g., customer_success"
              InputLabelProps={{ shrink: true }}
              inputProps={{ style: { fontFamily: 'monospace', fontSize: '0.9rem' } }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2.5, gap: 1.5, borderTop: '1px solid #E5E7EB' }}>
        <Button variant="outlined" onClick={onClose} sx={{ minWidth: 100 }}>Cancel</Button>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}
          sx={{ minWidth: 140, boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)', '&:hover': { boxShadow: '0 6px 10px -2px rgba(37, 99, 235, 0.5)', transform: 'translateY(-1px)' }, transition: 'all 0.2s ease' }}>
          {isEdit ? 'Save Changes' : 'Create Department'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DEPARTMENTS TAB
// ═══════════════════════════════════════════════════════════════════════════════

// ← Moved outside component to fix react-hooks/exhaustive-deps warning
const deptCols = { id: 'ID', name: 'Name', code: 'Code', employees: 'Employees' };

function DepartmentsTab({ onDepartmentsChange, createTrigger }) {
  const [departments, setDepartments] = useState([]);
  const [dialogOpen, setDialogOpen]   = useState(false);
  const [editingDept, setEditingDept] = useState(null);

  const prevTrigger = React.useRef(createTrigger);
  useEffect(() => {
    if (createTrigger !== prevTrigger.current) {
      prevTrigger.current = createTrigger;
      setEditingDept(null);
      setDialogOpen(true);
    }
  }, [createTrigger]);

  const load = () => {
    const depts = HRDataService.getDepartments();
    setDepartments(depts);
    onDepartmentsChange?.();
  };

  useEffect(() => { load(); }, []); // eslint-disable-line

  const getDeptVal = useCallback((row, col) => {
    switch (col) {
      case 'id':        return `#${row.id}`;
      case 'name':      return row.name;
      case 'code':      return row.code;
      case 'employees': return String(HRDataService.getEmployeeCountByDepartment(row.id));
      default:          return '';
    }
  }, []);

  const controls = useTableControls(departments, deptCols, getDeptVal);

  const visibleColumns = useMemo(() => {
    if (controls.paginated.length === 0) return Object.keys(deptCols);
    return Object.keys(deptCols).filter(col =>
      controls.paginated.some(row => { const v = getDeptVal(row, col); return v && v !== '-'; })
    );
  }, [controls.paginated, getDeptVal]);

  const handleCreate = () => { setEditingDept(null); setDialogOpen(true); };
  const handleEdit   = (dept) => { setEditingDept(dept); setDialogOpen(true); };

  const handleSave = (data) => {
    if (editingDept) {
      const updated = HRDataService.updateDepartment(editingDept.id, data);
      if (updated) { showSuccessToast('Department updated successfully!'); load(); }
      else           showErrorToast('Failed to update department');
    } else {
      HRDataService.createDepartment(data);
      showSuccessToast('Department created successfully!');
      load();
    }
    setDialogOpen(false);
  };

  const handleDelete = async (dept) => {
    const empCount = HRDataService.getEmployeeCountByDepartment(dept.id);
    const extraNote = empCount > 0
      ? ` ${empCount} employee${empCount > 1 ? 's' : ''} in this department will show "—" instead.`
      : '';
    const result = await showDeleteConfirmation('Delete Department?', `Delete "${dept.name}"?${extraNote}`);
    if (result.isConfirmed) {
      if (HRDataService.deleteDepartment(dept.id)) {
        showSuccessToast('Department deleted!');
        load();
      } else showErrorToast('Failed to delete department');
    }
  };

  const totalEmployees = departments.reduce((sum, d) => sum + HRDataService.getEmployeeCountByDepartment(d.id), 0);
  const largest = departments.reduce((best, d) => {
    const c = HRDataService.getEmployeeCountByDepartment(d.id);
    return c > (best?.count || 0) ? { name: d.name, count: c } : best;
  }, null);

  return (
    <Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
        {[
          { label: 'Total Departments', value: departments.length,       color: 'primary.main' },
          { label: 'Total Employees',   value: totalEmployees,           color: '#16A34A'      },
          { label: 'Largest Dept.',     value: largest?.name || '—',    color: '#0891B2', small: true },
        ].map((stat, i) => (
          <Grow in timeout={600 + i * 100} key={stat.label}>
            <Card sx={{ p: 2.5, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
              <Typography color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem', fontWeight: 500 }}>{stat.label}</Typography>
              <Typography sx={{ color: stat.color, fontSize: stat.small ? '1.1rem' : '1.7rem', fontWeight: 700, lineHeight: 1.2 }}>{stat.value}</Typography>
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
                    <SortFilterHeader key={col} label={deptCols[col]} column={col}
                      sticky={idx === 0}
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
                          ? 'Try adjusting your search' : 'Create your first department'}
                      </Typography>
                      {!controls.globalSearch && Object.values(controls.filters).flat().length === 0 && (
                        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>New Department</Button>
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
                            {col === 'id'   && <Chip label={`#${dept.id}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />}
                            {col === 'name' && <Typography variant="body2" fontWeight={700}>{dept.name}</Typography>}
                            {col === 'code' && (
                              <Chip label={dept.code} size="small"
                                sx={{ backgroundColor: '#F1F5F9', color: '#475569', fontWeight: 700, fontSize: '11px', fontFamily: 'monospace' }} />
                            )}
                            {col === 'employees' && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip
                                  label={`${empCount} employee${empCount !== 1 ? 's' : ''}`}
                                  size="small"
                                  sx={{ backgroundColor: empCount > 0 ? '#F0FDF4' : '#F3F4F6', color: empCount > 0 ? '#166534' : '#6B7280', fontWeight: 600, fontSize: '12px' }} />
                              </Box>
                            )}
                          </TableCell>
                        ))}
                        <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="Edit" arrow>
                              <IconButton size="small" onClick={() => handleEdit(dept)}
                                sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}>
                                <EditIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={empCount > 0 ? 'Cannot delete — has employees' : 'Delete'} arrow>
                              <span>
                                <IconButton size="small" onClick={() => handleDelete(dept)}
                                  disabled={false}
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
          <PaginationStrip page={controls.page} totalPages={controls.totalPages} filteredCount={controls.filtered.length} onPageChange={controls.setPage} />
        </Card>
      </Grow>

      <FilterPopover
        open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
        title={controls.currentFilterColumn ? `${deptCols[controls.currentFilterColumn]} Filter` : 'Filter'}
        searchText={controls.searchText} onSearch={controls.setSearchText}
        onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
        values={controls.filteredPopoverValues} filters={controls.filters}
        currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />

      <DepartmentDialog
        open={dialogOpen}
        dept={editingDept}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EMPLOYEES TAB
// ═══════════════════════════════════════════════════════════════════════════════

// ← Moved outside component to fix react-hooks/exhaustive-deps warning
const empCols = { id: 'ID', full_name: 'Full Name', department: 'Department', phone: 'Phone', status: 'Status' };

function EmployeesTab({ departmentVersion }) {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [deptFilter, setDeptFilter] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => { setEmployees(HRDataService.getEmployees()); }, []);
  useEffect(() => { setDepartments(HRDataService.getDepartments()); }, [departmentVersion]);

  const getEmpVal = useCallback((row, col) => {
    switch (col) {
      case 'id':         return `#${row.id}`;
      case 'full_name':  return row.full_name;
      case 'department': return HRDataService.getDepartmentById(row.department)
        ? HRDataService.getDepartmentName(row.department)
        : '—';
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

  const rowsPerPage     = 5;
  const finalPaginated  = finalFiltered.slice(controls.page * rowsPerPage, (controls.page + 1) * rowsPerPage);
  const finalTotalPages = Math.ceil(finalFiltered.length / rowsPerPage);

  useEffect(() => { controls.setPage(0); }, [deptFilter]); // eslint-disable-line

  const visibleColumns = useMemo(() => {
    if (finalPaginated.length === 0) return Object.keys(empCols);
    return Object.keys(empCols).filter(col =>
      finalPaginated.some(row => { const val = getEmpVal(row, col); return val && val !== '-'; })
    );
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
          { label: 'Active',          value: activeEmps,                    color: '#16A34A'      },
          { label: 'Inactive',        value: employees.length - activeEmps, color: '#DC2626'      },
          { label: 'Departments',     value: departments.length,            color: '#0891B2'      },
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
            <TextField size="small" placeholder="Search employees by name or phone..." value={controls.globalSearch} onChange={e => controls.setGlobalSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment> }}
              sx={{ flex: 1, width: '100%', '& .MuiInputBase-root': { height: '38px', fontSize: '0.85rem', borderRadius: '10px' } }} />
            <FormControl size="small" sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}>
              <InputLabel>Filter by Department</InputLabel>
              <Select value={deptFilter} label="Filter by Department" onChange={e => setDeptFilter(e.target.value)} sx={{ borderRadius: '10px', height: '38px', fontSize: '0.85rem' }}>
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
                  {visibleColumns.map((col, index) => (
                    <SortFilterHeader key={col} label={empCols[col]} column={col} sticky={index === 0}
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
                      {!hasAnyFilter && <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/hr/employees/create')}>New Employee</Button>}
                    </TableCell>
                  </TableRow>
                ) : (
                  finalPaginated.map(emp => {
                    const deptStyle = HRDataService.getDepartmentStyle(emp.department);
                    return (
                      <TableRow key={emp.id} hover sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' } }}>
                        {visibleColumns.map((col, idx) => (
                          <TableCell key={col} sx={idx === 0 ? stickyBodySx : { py: 1.5, px: 2 }}>
                            {col === 'id'        && <Chip label={`#${emp.id}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />}
                            {col === 'full_name' && <Typography variant="body2" fontWeight={600}>{emp.full_name}</Typography>}
                            {col === 'department' && (
                              HRDataService.getDepartmentById(emp.department)
                                ? <Chip label={HRDataService.getDepartmentName(emp.department)} size="small" sx={{ fontWeight: 600, fontSize: '12px', backgroundColor: deptStyle.bg, color: deptStyle.color }} />
                                : <Typography variant="body2" color="text.disabled">—</Typography>
                            )}
                            {col === 'phone'     && <Typography variant="body2" color="text.secondary">{emp.phone || '-'}</Typography>}
                            {col === 'status'    && <Chip label={emp.is_active ? 'Active' : 'Inactive'} size="small" sx={{ backgroundColor: emp.is_active ? '#DCFCE7' : '#FEE2E2', color: emp.is_active ? '#166534' : '#991B1B', fontWeight: 600, fontSize: '12px' }} />}
                          </TableCell>
                        ))}
                        <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
                          <Switch checked={emp.is_active} onChange={() => handleToggleActive(emp)} size="small" color="success" />
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="Edit" arrow><IconButton size="small" onClick={() => navigate(`/hr/employees/edit/${emp.id}`)} sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}><EditIcon sx={{ fontSize: 20 }} /></IconButton></Tooltip>
                            <Tooltip title="Delete" arrow><IconButton size="small" onClick={() => handleDelete(emp)} sx={{ p: 0.5, color: 'error.main', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)', transform: 'scale(1.2)' } }}><DeleteIcon sx={{ fontSize: 20 }} /></IconButton></Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <PaginationStrip page={controls.page} totalPages={finalTotalPages} filteredCount={finalFiltered.length} onPageChange={controls.setPage} />
        </Card>
      </Grow>

      <FilterPopover
        open={controls.filterOpen} anchorEl={controls.filterAnchorEl} onClose={controls.handleFilterClose}
        title={controls.currentFilterColumn ? `${empCols[controls.currentFilterColumn]} Filter` : 'Filter'}
        searchText={controls.searchText} onSearch={controls.setSearchText}
        onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
        values={controls.filteredPopoverValues} filters={controls.filters}
        currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEAMS TAB
// ═══════════════════════════════════════════════════════════════════════════════

// ← Moved outside component to fix react-hooks/exhaustive-deps warning
const teamCols = { id: 'ID', name: 'Team Name', code: 'Code', members: 'Members', status: 'Status' };

function TeamsTab({ selectedTeam, onSelectTeam }) {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [viewTeam, setViewTeam] = useState(null);

  useEffect(() => { setTeams(HRDataService.getTeams()); }, []);

  const getTeamVal = useCallback((row, col) => {
    switch (col) {
      case 'id':      return `#${row.id}`;
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
    return Object.keys(teamCols).filter(col =>
      controls.paginated.some(row => { const val = getTeamVal(row, col); return val && val !== '-'; })
    );
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

  const handleOpenDetail  = (team) => { setViewTeam(team); onSelectTeam(team); };
  const handleCloseDetail = () => setViewTeam(null);

  const activeTeams  = teams.filter(t => t.is_active).length;
  const totalMembers = teams.reduce((sum, t) => sum + HRDataService.getTeamMemberCount(t.id), 0);
  const totalCols    = visibleDataColumns.length + (showDescriptionCol ? 1 : 0) + 2;

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
        {[
          { label: 'Total Teams',   value: teams.length,               color: 'primary.main' },
          { label: 'Active Teams',  value: activeTeams,                color: '#16A34A'      },
          { label: 'Total Members', value: totalMembers,               color: '#0891B2'      },
          { label: 'Inactive',      value: teams.length - activeTeams, color: '#DC2626'      },
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
            <TextField fullWidth size="small" placeholder="Search teams by name or code..." value={controls.globalSearch} onChange={e => controls.setGlobalSearch(e.target.value)}
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
                        {Object.values(controls.filters).flat().length > 0 || controls.globalSearch ? 'Try adjusting your search or filters' : 'Create your first team'}
                      </Typography>
                      {Object.values(controls.filters).flat().length === 0 && !controls.globalSearch && (
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/hr/teams/create')}>New Team</Button>
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
                            {col === 'id'      && <Chip label={`#${team.id}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />}
                            {col === 'name'    && <Typography variant="body2" fontWeight={600}>{team.name}</Typography>}
                            {col === 'code'    && <Chip label={team.code} size="small" sx={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', fontWeight: 700, fontSize: '11px', fontFamily: 'monospace' }} />}
                            {col === 'members' && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip label={`${memberCount} member${memberCount !== 1 ? 's' : ''}`} size="small" sx={{ backgroundColor: memberCount > 0 ? '#F0FDF4' : '#F3F4F6', color: memberCount > 0 ? '#166534' : '#6B7280', fontWeight: 600, fontSize: '12px' }} />
                                <Button size="small" variant="outlined" startIcon={<ViewIcon sx={{ fontSize: 13 }} />} onClick={() => navigate(`/hr/teams/${team.id}/members`)}
                                  sx={{ py: 0.25, px: 1, fontSize: '11px', fontWeight: 600, minHeight: '24px', borderRadius: '6px', borderColor: '#BFDBFE', color: '#1D4ED8', backgroundColor: '#EFF6FF', whiteSpace: 'nowrap', '&:hover': { backgroundColor: '#DBEAFE', borderColor: '#93C5FD', transform: 'translateY(-1px)', boxShadow: '0 2px 6px rgba(59,130,246,0.25)' }, transition: 'all 0.2s ease' }}>
                                  View
                                </Button>
                              </Box>
                            )}
                            {col === 'status'  && <Chip label={team.is_active ? 'Active' : 'Inactive'} size="small" sx={{ backgroundColor: team.is_active ? '#DCFCE7' : '#FEE2E2', color: team.is_active ? '#166534' : '#991B1B', fontWeight: 600, fontSize: '12px' }} />}
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
                            <Tooltip title="View Details" arrow><IconButton size="small" onClick={() => handleOpenDetail(team)} sx={{ p: 0.5, color: 'info.main', '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)', transform: 'scale(1.2)' } }}><ViewIcon sx={{ fontSize: 20 }} /></IconButton></Tooltip>
                            <Tooltip title="Edit" arrow><IconButton size="small" onClick={() => navigate(`/hr/teams/edit/${team.id}`)} sx={{ p: 0.5, color: 'warning.main', '&:hover': { backgroundColor: 'rgba(245,158,11,0.1)', transform: 'scale(1.2)' } }}><EditIcon sx={{ fontSize: 20 }} /></IconButton></Tooltip>
                            <Tooltip title="Delete" arrow><IconButton size="small" onClick={() => handleDelete(team)} sx={{ p: 0.5, color: 'error.main', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)', transform: 'scale(1.2)' } }}><DeleteIcon sx={{ fontSize: 20 }} /></IconButton></Tooltip>
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
        title={controls.currentFilterColumn ? `${teamCols[controls.currentFilterColumn]} Filter` : 'Filter'}
        searchText={controls.searchText} onSearch={controls.setSearchText}
        onSelectAll={controls.handleSelectAll} onClearAll={controls.handleClearAll}
        values={controls.filteredPopoverValues} filters={controls.filters}
        currentCol={controls.currentFilterColumn} onToggle={controls.handleFilterToggle} />

      <Dialog open={Boolean(viewTeam)} onClose={handleCloseDetail} maxWidth="sm" fullWidth TransitionComponent={Grow}
        PaperProps={{ sx: { borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' } }}>
        {viewTeam && (
          <>
            <DialogTitle sx={{ pb: 1.5, borderBottom: '1px solid #E5E7EB' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ p: 1, borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex' }}>
                  <GroupsIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{viewTeam.name}</Typography>
                  <Typography variant="caption" color="text.secondary">Team Details</Typography>
                </Box>
                <Chip label={viewTeam.code} size="small" sx={{ ml: 'auto', backgroundColor: '#EFF6FF', color: '#1D4ED8', fontWeight: 700, fontFamily: 'monospace' }} />
              </Box>
            </DialogTitle>
            <DialogContent sx={{ pt: 3, pb: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {[
                    { label: 'Status',  content: <Chip label={viewTeam.is_active ? 'Active' : 'Inactive'} size="small" sx={{ backgroundColor: viewTeam.is_active ? '#DCFCE7' : '#FEE2E2', color: viewTeam.is_active ? '#166534' : '#991B1B', fontWeight: 700 }} /> },
                    { label: 'Members', content: <Typography variant="body1" fontWeight={700} sx={{ color: 'primary.main' }}>{HRDataService.getTeamMemberCount(viewTeam.id)} member{HRDataService.getTeamMemberCount(viewTeam.id) !== 1 ? 's' : ''}</Typography> },
                    { label: 'Created', content: <Typography variant="body2" fontWeight={600}>{viewTeam.created_at || '—'}</Typography> },
                  ].map(({ label, content }) => (
                    <Box key={label} sx={{ flex: 1, p: 2, borderRadius: '10px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>{label}</Typography>
                      {content}
                    </Box>
                  ))}
                </Box>
                <Box sx={{ p: 2.5, borderRadius: '10px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.75, color: viewTeam.description ? 'text.primary' : 'text.disabled', fontStyle: viewTeam.description ? 'normal' : 'italic' }}>
                    {viewTeam.description || 'No description provided for this team.'}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2.5, gap: 1.5, borderTop: '1px solid #E5E7EB', mt: 2 }}>
              <Button variant="outlined" onClick={handleCloseDetail} sx={{ minWidth: 100 }}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN HR PAGE
// Tab indices: 0=Employees, 1=Sales Teams, 2=Departments  ← Departments is now LAST
// ═══════════════════════════════════════════════════════════════════════════════
export default function HR() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [departmentVersion, setDepartmentVersion] = useState(0);
  const [deptCreateTrigger, setDeptCreateTrigger] = useState(0);

  const tabParam  = searchParams.get('tab');
  // 0=Employees, 1=Teams, 2=Departments, 3=Members (dynamic)
  const activeTab =
    tabParam === 'teams'       ? 1 :
    tabParam === 'departments' ? 2 :
    tabParam === 'members'     ? 3 : 0;

  const handleTabChange = (_, newVal) => {
    if      (newVal === 0)               setSearchParams({ tab: 'employees' });
    else if (newVal === 1)               setSearchParams({ tab: 'teams' });
    else if (newVal === 2)               setSearchParams({ tab: 'departments' });
    else if (newVal === 3 && selectedTeam) navigate(`/hr/teams/${selectedTeam.id}/members`);
  };

  const isTeamsTab = activeTab === 1;
  const isDeptsTab = activeTab === 2;

  const headerButtonLabel = isDeptsTab ? 'New Department' : isTeamsTab ? 'New Team' : 'New Employee';
  const handleHeaderButton = () => {
    if      (isDeptsTab)  setDeptCreateTrigger(v => v + 1);
    else if (isTeamsTab)  navigate('/hr/teams/create');
    else                  navigate('/hr/employees/create');
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
          <Tabs value={activeTab} onChange={handleTabChange}
            sx={{ px: 2, '& .MuiTab-root': { fontWeight: 600, fontSize: '14px', textTransform: 'none', minHeight: 52 }, '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' } }}>
            {/* 0 */}
            <Tab icon={<PeopleIcon   sx={{ fontSize: 20 }} />} iconPosition="start" label="Employees"   sx={{ gap: 1 }} />
            {/* 1 */}
            <Tab icon={<GroupsIcon   sx={{ fontSize: 20 }} />} iconPosition="start" label="Sales Teams" sx={{ gap: 1 }} />
            {/* 2 — Departments is now last */}
            <Tab icon={<BusinessIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Departments" sx={{ gap: 1 }} />
            {/* 3 — dynamic, only when a team is selected */}
            {selectedTeam && (
              <Tab
                icon={<ViewIcon sx={{ fontSize: 20 }} />} iconPosition="start"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <span>View Members</span>
                    <Chip label={selectedTeam.name} size="small" sx={{ height: 20, fontSize: '11px', fontWeight: 700, backgroundColor: '#DBEAFE', color: '#1D4ED8', cursor: 'pointer' }} />
                    <Box component="span" onClick={(e) => { e.stopPropagation(); setSelectedTeam(null); setSearchParams({ tab: 'teams' }); }}
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
        {activeTab === 2 && <DepartmentsTab onDepartmentsChange={() => setDepartmentVersion(v => v + 1)} createTrigger={deptCreateTrigger} />}
      </Box>
    </Fade>
  );
}