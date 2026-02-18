// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Box,
//   Card,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Chip,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   Popover,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Fade,
//   Grow,
//   InputAdornment,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Collapse,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Visibility as ViewIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   People as PeopleIcon,
//   FilterList as FilterListIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
//   Search as SearchIcon,
//   Close as CloseIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { DataService } from '../../data/mod1dataService';
// import { useAuth } from '../../contexts/AuthContext';
// import PageHeader from '../../components/shared/PageHeader';
// import { showDeleteConfirmation, showSuccessToast, showErrorToast } from '../../utils/sweetalert';

// const DialogTransition = React.forwardRef(function Transition(props, ref) {
//   return <Grow ref={ref} {...props} />;
// });

// // ── Search match types for the hierarchy indicator ─────────────────────────
// const MATCH_TYPE_LABEL = {
//   name:        { label: 'Name',        color: '#16A34A', bg: '#DCFCE7' },
//   phone:       { label: 'Phone',       color: '#1D4ED8', bg: '#DBEAFE' },
//   email:       { label: 'Email',       color: '#7C3AED', bg: '#EDE9FE' },
//   national_id: { label: 'National ID', color: '#B45309', bg: '#FEF3C7' },
// };

// const MONTH_NAMES = [
//   'January','February','March','April','May','June',
//   'July','August','September','October','November','December',
// ];

// // ── Date Filter Component ──────────────────────────────────────────────────
// function DateFilterContent({ leads, filters, setFilters }) {
//   const [expandedYears, setExpandedYears] = useState({});

//   // Build { year: Set<monthIndex> } from lead data
//   const yearMonthMap = useMemo(() => {
//     const map = {};
//     leads.forEach(lead => {
//       if (!lead.created_at) return;
//       // Parse "DD-MM-YYYY" or "YYYY-MM-DD" or any reasonable date string
//       const d = new Date(lead.created_at.includes('-') && lead.created_at.split('-')[0].length === 2
//         ? lead.created_at.split('-').reverse().join('-')
//         : lead.created_at);
//       if (isNaN(d)) return;
//       const y = d.getFullYear();
//       const m = d.getMonth(); // 0-based
//       if (!map[y]) map[y] = new Set();
//       map[y].add(m);
//     });
//     return map;
//   }, [leads]);

//   const sortedYears = Object.keys(yearMonthMap).map(Number).sort((a, b) => b - a);

//   const toggleYear = (year) => {
//     setExpandedYears(prev => ({ ...prev, [year]: !prev[year] }));
//   };

//   // Selected dates stored as "YYYY-M" strings
//   const selectedDates = filters.created_at || [];

//   const isYearChecked = (year) => {
//     const months = Array.from(yearMonthMap[year] || []);
//     return months.length > 0 && months.every(m => selectedDates.includes(`${year}-${m}`));
//   };

//   const isYearIndeterminate = (year) => {
//     const months = Array.from(yearMonthMap[year] || []);
//     const selected = months.filter(m => selectedDates.includes(`${year}-${m}`));
//     return selected.length > 0 && selected.length < months.length;
//   };

//   const handleYearToggle = (year) => {
//     const months = Array.from(yearMonthMap[year] || []);
//     const yearKeys = months.map(m => `${year}-${m}`);
//     const allSelected = yearKeys.every(k => selectedDates.includes(k));
//     let newSelected;
//     if (allSelected) {
//       newSelected = selectedDates.filter(d => !yearKeys.includes(d));
//     } else {
//       newSelected = [...new Set([...selectedDates, ...yearKeys])];
//     }
//     setFilters(prev => ({ ...prev, created_at: newSelected }));
//   };

//   const handleMonthToggle = (year, month) => {
//     const key = `${year}-${month}`;
//     const newSelected = selectedDates.includes(key)
//       ? selectedDates.filter(d => d !== key)
//       : [...selectedDates, key];
//     setFilters(prev => ({ ...prev, created_at: newSelected }));
//   };

//   if (sortedYears.length === 0) {
//     return (
//       <Typography variant="caption" color="text.secondary" sx={{ display: 'block', py: 1 }}>
//         No date data available
//       </Typography>
//     );
//   }

//   return (
//     <Box>
//       {sortedYears.map(year => {
//         const months = Array.from(yearMonthMap[year]).sort((a, b) => a - b);
//         const isExpanded = expandedYears[year] ?? false;

//         return (
//           <Box key={year} sx={{ mb: 0.5 }}>
//             {/* Year row */}
//             <Box
//               sx={{
//                 display: 'flex', alignItems: 'center',
//                 borderRadius: '8px',
//                 '&:hover': { backgroundColor: 'rgba(59,130,246,0.06)' },
//                 cursor: 'pointer',
//                 pr: 0.5,
//               }}
//             >
//               <Checkbox
//                 size="small"
//                 checked={isYearChecked(year)}
//                 indeterminate={isYearIndeterminate(year)}
//                 onChange={() => handleYearToggle(year)}
//                 sx={{ py: 0.5, '& .MuiSvgIcon-root': { fontSize: 18 } }}
//               />
//               <Typography
//                 variant="body2"
//                 fontWeight={600}
//                 sx={{ flex: 1, fontSize: '0.8125rem', userSelect: 'none' }}
//                 onClick={() => toggleYear(year)}
//               >
//                 {year}
//               </Typography>
//               <IconButton
//                 size="small"
//                 onClick={() => toggleYear(year)}
//                 sx={{ p: 0.25 }}
//               >
//                 {isExpanded
//                   ? <ExpandLessIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
//                   : <ExpandMoreIcon sx={{ fontSize: 18, color: 'text.secondary' }} />}
//               </IconButton>
//             </Box>

//             {/* Month rows */}
//             <Collapse in={isExpanded}>
//               <Box sx={{ pl: 3 }}>
//                 {months.map(monthIdx => {
//                   const key = `${year}-${monthIdx}`;
//                   return (
//                     <FormControlLabel
//                       key={key}
//                       control={
//                         <Checkbox
//                           size="small"
//                           checked={selectedDates.includes(key)}
//                           onChange={() => handleMonthToggle(year, monthIdx)}
//                           sx={{ py: 0.25, '& .MuiSvgIcon-root': { fontSize: 17 } }}
//                         />
//                       }
//                       label={MONTH_NAMES[monthIdx]}
//                       sx={{
//                         display: 'block', ml: 0, mr: 0,
//                         '& .MuiFormControlLabel-label': { fontSize: '0.8rem', color: 'text.secondary' },
//                         '& .MuiCheckbox-root': { py: 0.5 },
//                         borderRadius: '6px',
//                         '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' },
//                       }}
//                     />
//                   );
//                 })}
//               </Box>
//             </Collapse>
//           </Box>
//         );
//       })}
//     </Box>
//   );
// }

// export default function LeadsList() {
//   const navigate = useNavigate();
//   const { access } = useAuth();
//   const canDeleteLeads = !!access.canDeleteLeads;

//   const [leads, setLeads] = useState([]);
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);
//   const [selectedLead, setSelectedLead] = useState(null);

//   // ── Search & source filter ─────────────────────────────────────────────────
//   const [globalSearch, setGlobalSearch] = useState('');
//   const [sourceFilter, setSourceFilter] = useState('');

//   // Pagination
//   const [page, setPage] = useState(0);
//   const rowsPerPage = 5;

//   // Sorting
//   const [sortColumn, setSortColumn] = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc');

//   // Column filter popover
//   const [filterAnchorEl, setFilterAnchorEl] = useState(null);
//   const [currentFilterColumn, setCurrentFilterColumn] = useState(null);
//   const [filters, setFilters] = useState({
//     name: [], phone: [], email: [], national_id: [],
//     source: [], created_at: [],
//   });
//   const [searchText, setSearchText] = useState('');

//   // ── NEW column order (no id, no partner) ──────────────────────────────────
//   const columnLabels = {
//     name:        'Name',
//     phone:       'Phone',
//     email:       'Email',
//     national_id: 'National ID',
//     source:      'Source Name',
//     created_at:  'Created Date',
//   };

//   useEffect(() => { loadLeads(); }, []);
//   const loadLeads = () => setLeads(DataService.getLeads());

//   const getLeadSource = useCallback((sourceId) => {
//     const source = DataService.getLeadSourceById(sourceId);
//     return source ? source.name : '-';
//   }, []);

//   const getPartnerName = useCallback((lead) => {
//     if (!lead.partner_id) return '-';
//     const partner = DataService.getPartnerById(lead.partner_id);
//     return partner ? partner.name : '-';
//   }, []);

//   const getColumnValue = useCallback((lead, column) => {
//     switch (column) {
//       case 'name':       return `${lead.first_name} ${lead.last_name}`;
//       case 'phone':      return lead.phone || '-';
//       case 'email':      return lead.email || '-';
//       case 'national_id':return lead.national_id ? String(lead.national_id) : '-';
//       case 'source':     return getLeadSource(lead.source_id);
//       case 'created_at': return lead.created_at || '-';
//       default:           return '';
//     }
//   }, [getLeadSource]);

//   const allSources = useMemo(() => {
//     const sources = DataService.getLeadSources();
//     return sources.map(s => ({ id: s.id, name: s.name }));
//   }, []);

//   const normalizePhone = (phone = '') => {
//     if (phone.startsWith('01')) return '+20' + phone.substring(1);
//     return phone;
//   };

//   const activeMatchType = useMemo(() => {
//     if (!globalSearch.trim()) return null;
//     const q = globalSearch.trim().toLowerCase();
//     if (leads.some(l => `${l.first_name} ${l.last_name}`.toLowerCase().includes(q))) return 'name';
//     const normalizedQ = normalizePhone(globalSearch.trim());
//     if (leads.some(l =>
//       (l.phone || '').toLowerCase().includes(q) ||
//       normalizePhone(l.phone || '').includes(normalizedQ)
//     )) return 'phone';
//     if (leads.some(l => (l.email || '').toLowerCase().includes(q))) return 'email';
//     if (leads.some(l => String(l.national_id || '').includes(q))) return 'national_id';
//     return null;
//   }, [globalSearch, leads]);

//   // ── Helper: parse created_at to "YEAR-MONTHIDX" key ──────────────────────
//   const getDateKey = (created_at) => {
//     if (!created_at) return null;
//     const d = new Date(created_at.includes('-') && created_at.split('-')[0].length === 2
//       ? created_at.split('-').reverse().join('-')
//       : created_at);
//     if (isNaN(d)) return null;
//     return `${d.getFullYear()}-${d.getMonth()}`;
//   };

//   const filteredLeads = useMemo(() => {
//     let result = [...leads];

//     // 1. Column filters
//     Object.keys(filters).forEach((column) => {
//       if (column === 'created_at') {
//         if (filters.created_at.length > 0) {
//           result = result.filter(lead => {
//             const key = getDateKey(lead.created_at);
//             return key && filters.created_at.includes(key);
//           });
//         }
//       } else if (filters[column].length > 0) {
//         result = result.filter(lead => filters[column].includes(getColumnValue(lead, column)));
//       }
//     });

//     // 2. Source dropdown filter
//     if (sourceFilter) {
//       result = result.filter(l => l.source_id === sourceFilter);
//     }

//     // 3. Global search with hierarchy
//     if (globalSearch.trim()) {
//       result = result.filter((lead) => {
//         if (!activeMatchType) return false;
//         const q = globalSearch.trim().toLowerCase();
//         const normalizedQ = normalizePhone(globalSearch.trim());
//         switch (activeMatchType) {
//           case 'name':
//             return `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(q);
//           case 'phone':
//             return (
//               (lead.phone || '').toLowerCase().includes(q) ||
//               normalizePhone(lead.phone || '').includes(normalizedQ)
//             );
//           case 'email':
//             return (lead.email || '').toLowerCase().includes(q);
//           case 'national_id':
//             return String(lead.national_id || '').includes(q);
//           default:
//             return false;
//         }
//       });
//     }

//     // 4. Sort
//     if (sortColumn) {
//       result.sort((a, b) => {
//         const aVal = getColumnValue(a, sortColumn);
//         const bVal = getColumnValue(b, sortColumn);
//         const cmp = aVal.localeCompare(bVal, undefined, { sensitivity: 'base' });
//         return sortDirection === 'asc' ? cmp : -cmp;
//       });
//     }

//     return result;
//   }, [leads, filters, sourceFilter, globalSearch, activeMatchType, sortColumn, sortDirection, getColumnValue]);

//   const getUniqueColumnValues = useCallback((column) => {
//     if (column === 'created_at') return []; // handled by DateFilterContent
//     let data = [...leads];
//     Object.keys(filters).forEach((col) => {
//       if (col !== column && col !== 'created_at' && filters[col].length > 0) {
//         data = data.filter(lead => filters[col].includes(getColumnValue(lead, col)));
//       }
//     });
//     const values = new Set();
//     data.forEach(lead => values.add(getColumnValue(lead, column)));
//     return Array.from(values).sort();
//   }, [leads, filters, getColumnValue]);

//   const handleSortClick = (column) => {
//     if (sortColumn === column) setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
//     else { setSortColumn(column); setSortDirection('asc'); }
//   };

//   const handleFilterClick = (event, column) => {
//     setFilterAnchorEl(event.currentTarget);
//     setCurrentFilterColumn(column);
//     setSearchText('');
//   };
//   const handleFilterClose = () => { setFilterAnchorEl(null); setCurrentFilterColumn(null); setSearchText(''); };
//   const handleFilterToggle = (value) => {
//     const col = currentFilterColumn;
//     const cur = filters[col];
//     setFilters({ ...filters, [col]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] });
//   };
//   const handleSelectAll = () => setFilters({ ...filters, [currentFilterColumn]: getUniqueColumnValues(currentFilterColumn) });
//   const handleClearAll  = () => setFilters({ ...filters, [currentFilterColumn]: [] });

//   const handleView   = (lead) => { setSelectedLead(lead); setViewDialogOpen(true); };
//   const handleEdit   = (lead) => navigate(`/leads/edit/${lead.id}`);
//   const handleDeleteClick = async (lead) => {
//     const result = await showDeleteConfirmation('Delete Lead?', `Are you sure you want to delete ${lead.first_name} ${lead.last_name}?`);
//     if (result.isConfirmed) {
//       if (DataService.deleteLead(lead.id)) {
//         setLeads(prev => prev.filter(l => l.id !== lead.id));
//         showSuccessToast('Lead deleted successfully!');
//       } else showErrorToast('Failed to delete lead');
//     }
//   };

//   const handlePageChange = (newPage) => setPage(newPage);

//   const paginatedLeads = filteredLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);

//   // Hide columns where every row on the current page is empty / '-'
//   const visibleColumns = useMemo(() => {
//     if (paginatedLeads.length === 0) return Object.keys(columnLabels);
//     return Object.keys(columnLabels).filter(col =>
//       paginatedLeads.some(lead => {
//         const val = getColumnValue(lead, col);
//         return val && val !== '-';
//       })
//     );
//   }, [paginatedLeads, getColumnValue]);

//   useEffect(() => { setPage(0); }, [filters, sortColumn, sortDirection, globalSearch, sourceFilter]);

//   const filterOpen = Boolean(filterAnchorEl);
//   const filteredColumnValues = currentFilterColumn && currentFilterColumn !== 'created_at'
//     ? getUniqueColumnValues(currentFilterColumn).filter(v => String(v).toLowerCase().includes(searchText.toLowerCase()))
//     : [];

//   const matchInfo = activeMatchType ? MATCH_TYPE_LABEL[activeMatchType] : null;

//   // Active filter count (created_at counts as 1 if any selected)
//   const activeFilterCount =
//     Object.entries(filters).reduce((acc, [key, val]) => acc + (val.length > 0 ? 1 : 0), 0) +
//     (sourceFilter ? 1 : 0);

//   return (
//     <Fade in timeout={500}>
//       <Box>
//         <PageHeader
//           title="Leads Management"
//           subtitle="Track and manage all your potential customers in one place"
//           breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Leads', active: true }]}
//           actions={
//             <Button
//               variant="contained"
//               startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
//               size="large"
//               onClick={() => navigate('/leads/create')}
//               sx={{
//                 boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)',
//                 transition: 'all 0.3s ease',
//                 '&:hover': { boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.5)', transform: 'translateY(-2px)' },
//                 minWidth: { xs: '48px', sm: 'auto' },
//                 px: { xs: 1.5, sm: 3 },
//               }}
//             >
//               <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Create Lead</Box>
//               <AddIcon sx={{ display: { xs: 'inline-flex', sm: 'none' } }} />
//             </Button>
//           }
//         />

//         {/* Stats Cards */}
//         <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
//           {[
//             { label: 'Total Leads',      value: leads.length,          color: 'primary' },
//             { label: 'Filtered Results', value: filteredLeads.length,   color: 'success.main' },
//             { label: 'Active Filters',   value: activeFilterCount,      color: 'info.main' },
//           ].map((stat, i) => (
//             <Grow in timeout={600 + i * 100} key={stat.label}>
//               <Card sx={{ p: 3, flex: 1, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
//                 <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>{stat.label}</Typography>
//                 <Typography variant="h2" color={stat.color}>{stat.value}</Typography>
//               </Card>
//             </Grow>
//           ))}
//         </Box>

//         {/* Search & Source Filter Bar */}
//         <Grow in timeout={850}>
//           <Card sx={{ mb: 3, p: 2.5 }}>
//             <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' } }}>
//               {/* Global Search */}
//               <Box sx={{ flex: 1, width: '100%' }}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   placeholder="Search by name or contact (phone → email → national ID)…"
//                   value={globalSearch}
//                   onChange={e => setGlobalSearch(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
//                       </InputAdornment>
//                     ),
//                     endAdornment: globalSearch && (
//                       <InputAdornment position="end">
//                         <IconButton size="small" onClick={() => setGlobalSearch('')}>
//                           <CloseIcon sx={{ fontSize: 18 }} />
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
//                 />
//                 {globalSearch.trim() && activeMatchType !== 'name' && (
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
//                     {['phone', 'email', 'national_id'].map((type, idx) => {
//                       const info = MATCH_TYPE_LABEL[type];
//                       const isActive = activeMatchType === type;
//                       const isPassed = (
//                         (type === 'email'  && activeMatchType === 'national_id') ||
//                         (type === 'phone'  && ['email', 'national_id'].includes(activeMatchType))
//                       );
//                       return (
//                         <React.Fragment key={type}>
//                           <Chip
//                             label={info.label}
//                             size="small"
//                             sx={{
//                               fontSize: '11px', height: 22, fontWeight: 600,
//                               backgroundColor: isActive ? info.bg : isPassed ? '#F3F4F6' : '#F9FAFB',
//                               color: isActive ? info.color : isPassed ? '#9CA3AF' : '#D1D5DB',
//                               border: `1px solid ${isActive ? info.color : '#E5E7EB'}`,
//                               textDecoration: isPassed ? 'line-through' : 'none',
//                             }}
//                           />
//                           {idx < 2 && (
//                             <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '11px' }}>→</Typography>
//                           )}
//                         </React.Fragment>
//                       );
//                     })}
//                     {matchInfo && activeMatchType !== 'name' && (
//                       <Typography variant="caption" sx={{ color: matchInfo.color, fontWeight: 600, fontSize: '11px', ml: 0.5 }}>
//                         Matching by {matchInfo.label}
//                       </Typography>
//                     )}
//                     {!activeMatchType && (
//                       <Typography variant="caption" sx={{ color: '#EF4444', fontSize: '11px' }}>No results found</Typography>
//                     )}
//                   </Box>
//                 )}
//               </Box>

//               {/* Source Filter Dropdown */}
//               <FormControl size="small" sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}>
//                 <InputLabel>Filter by Source</InputLabel>
//                 <Select
//                   value={sourceFilter}
//                   label="Filter by Source"
//                   onChange={e => setSourceFilter(e.target.value)}
//                   sx={{ borderRadius: '10px' }}
//                 >
//                   <MenuItem value=""><em>All Sources</em></MenuItem>
//                   {allSources.map(source => (
//                     <MenuItem key={source.id} value={source.id}>{source.name}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               {/* Clear all filters */}
//               {(globalSearch || sourceFilter || Object.values(filters).flat().length > 0) && (
//                 <Button
//                   size="small"
//                   variant="outlined"
//                   color="error"
//                   startIcon={<CloseIcon fontSize="small" />}
//                   onClick={() => {
//                     setGlobalSearch('');
//                     setSourceFilter('');
//                     setFilters({ name: [], phone: [], email: [], national_id: [], source: [], created_at: [] });
//                   }}
//                   sx={{ borderRadius: '10px', whiteSpace: 'nowrap', height: 40 }}
//                 >
//                   Clear All
//                 </Button>
//               )}
//             </Box>
//           </Card>
//         </Grow>

//         {/* Table */}
//         <Grow in timeout={900}>
//           <Card>
//             <TableContainer sx={{ overflowX: 'auto' }}>
//               <Table stickyHeader sx={{ tableLayout: 'auto' }}>
//                 <TableHead>
//                   <TableRow>
//                     {visibleColumns.map((column) => (
//                       <TableCell
//                         key={column}
//                         sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}
//                       >
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                           {columnLabels[column]}
//                           <Tooltip title={`Sort by ${columnLabels[column]}`} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
//                             <IconButton size="small" onClick={() => handleSortClick(column)}
//                               sx={{ p: 0.5, color: sortColumn === column ? 'primary.main' : 'inherit', transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59, 130, 246, 0.1)' } }}
//                             >
//                               {sortColumn === column && sortDirection === 'asc'
//                                 ? <ArrowUpwardIcon sx={{ fontSize: 18 }} />
//                                 : <ArrowDownwardIcon sx={{ fontSize: 18 }} />}
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title={`Filter ${columnLabels[column]}`} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
//                             <IconButton size="small" onClick={(e) => handleFilterClick(e, column)}
//                               sx={{
//                                 p: 0.5,
//                                 color: (column === 'created_at' ? filters.created_at.length > 0 : filters[column]?.length > 0) ? 'primary.main' : 'inherit',
//                                 transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59, 130, 246, 0.1)' },
//                               }}
//                             >
//                               <FilterListIcon sx={{ fontSize: 18 }} />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     ))}
//                     <TableCell align="center" sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedLeads.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 8 }}>
//                         <Box>
//                           <PeopleIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
//                           <Typography variant="h6" color="text.secondary" gutterBottom>No leads found</Typography>
//                           <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                             {(globalSearch || sourceFilter || Object.values(filters).flat().length > 0)
//                               ? 'Try adjusting your search or filters'
//                               : 'Create your first lead to get started'}
//                           </Typography>
//                           {!globalSearch && !sourceFilter && Object.values(filters).flat().length === 0 && (
//                             <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/leads/create')}>
//                               Create Lead
//                             </Button>
//                           )}
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     paginatedLeads.map((lead) => (
//                       <TableRow
//                         key={lead.id}
//                         hover
//                         sx={{
//                           '&:last-child td': { borderBottom: 0 },
//                           transition: 'background-color 0.2s ease',
//                           '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.04)' },
//                         }}
//                       >
//                         {visibleColumns.map(col => (
//                           <TableCell key={col} sx={{ py: 1.5, px: 2 }}>
//                             {col === 'name' && (
//                               <Typography variant="body2" fontWeight={600} noWrap>
//                                 {lead.first_name} {lead.last_name}
//                               </Typography>
//                             )}
//                             {col === 'phone' && (
//                               <Typography variant="body2" sx={{ fontFamily: 'monospace' }} noWrap>
//                                 {lead.phone || '-'}
//                               </Typography>
//                             )}
//                             {col === 'email' && (
//                               lead.email
//                                 ? <Typography variant="body2" noWrap>{lead.email}</Typography>
//                                 : <Typography variant="body2" color="text.disabled">-</Typography>
//                             )}
//                             {col === 'national_id' && (
//                               lead.national_id
//                                 ? <Typography variant="body2" sx={{ fontFamily: 'monospace' }} noWrap>{lead.national_id}</Typography>
//                                 : <Typography variant="body2" color="text.disabled">-</Typography>
//                             )}
//                             {col === 'source' && (
//                               <Chip label={getLeadSource(lead.source_id)} size="small" sx={{ backgroundColor: '#E0E7FF', color: '#3730A3', fontWeight: 600, fontSize: '12px' }} />
//                             )}
//                             {col === 'created_at' && (
//                               <Typography variant="body2" color="text.secondary" noWrap>{lead.created_at || '-'}</Typography>
//                             )}
//                           </TableCell>
//                         ))}
//                         <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
//                           <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
//                             <Tooltip title="View Details" arrow TransitionComponent={Fade}>
//                               <IconButton size="small" onClick={() => handleView(lead)}
//                                 sx={{ p: 0.5, color: 'info.main', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)', transform: 'scale(1.2)' } }}>
//                                 <ViewIcon sx={{ fontSize: 20 }} />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Edit" arrow TransitionComponent={Fade}>
//                               <IconButton size="small" onClick={() => handleEdit(lead)}
//                                 sx={{ p: 0.5, color: 'warning.main', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(245, 158, 11, 0.1)', transform: 'scale(1.2)' } }}>
//                                 <EditIcon sx={{ fontSize: 20 }} />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Delete" arrow TransitionComponent={Fade}>
//                               <span>
//                                 <IconButton size="small" onClick={() => handleDeleteClick(lead)} disabled={!canDeleteLeads}
//                                   sx={{ p: 0.5, color: canDeleteLeads ? 'error.main' : 'text.disabled', transition: 'all 0.2s ease',
//                                     '&:hover': { backgroundColor: canDeleteLeads ? 'rgba(239, 68, 68, 0.1)' : 'transparent', transform: canDeleteLeads ? 'scale(1.2)' : 'none' } }}>
//                                   <DeleteIcon sx={{ fontSize: 20 }} />
//                                 </IconButton>
//                               </span>
//                             </Tooltip>
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* Pagination */}
//             {filteredLeads.length > 0 && (
//               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, p: 2, borderTop: '1px solid #E5E7EB' }}>
//                 <IconButton size="small" onClick={() => handlePageChange(page - 1)} disabled={page === 0}
//                   sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}>
//                   <ChevronLeftIcon fontSize="small" />
//                 </IconButton>
//                 {Array.from({ length: totalPages }, (_, i) => i).map((pageNum) => (
//                   <IconButton key={pageNum} size="small" onClick={() => handlePageChange(pageNum)}
//                     sx={{ minWidth: '36px', height: '36px', borderRadius: '8px', fontWeight: 600, fontSize: '14px',
//                       backgroundColor: page === pageNum ? 'primary.main' : 'transparent',
//                       color: page === pageNum ? '#FFFFFF' : 'text.primary',
//                       border: '1px solid', borderColor: page === pageNum ? 'primary.main' : '#E5E7EB',
//                       transition: 'all 0.3s ease', '&:hover': { backgroundColor: page === pageNum ? 'primary.dark' : 'rgba(59, 130, 246, 0.1)', transform: 'scale(1.1)' } }}>
//                     {pageNum + 1}
//                   </IconButton>
//                 ))}
//                 <IconButton size="small" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}
//                   sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)', transform: 'scale(1.1)' }, '&:disabled': { opacity: 0.3 } }}>
//                   <ChevronRightIcon fontSize="small" />
//                 </IconButton>
//               </Box>
//             )}
//           </Card>
//         </Grow>

//         {/* Column Filter Popover */}
//         <Popover
//           open={filterOpen}
//           anchorEl={filterAnchorEl}
//           onClose={handleFilterClose}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//           TransitionComponent={Grow}
//           TransitionProps={{ timeout: 300 }}
//           PaperProps={{ sx: { p: 1.5, minWidth: 260, maxHeight: 400, borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}
//         >
//           <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.95rem' }}>
//             {currentFilterColumn ? `${columnLabels[currentFilterColumn]} Filter` : 'Filter Options'}
//           </Typography>

//           {/* Date column: custom year/month tree */}
//           {currentFilterColumn === 'created_at' ? (
//             <>
//               <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
//                 <Button size="small" variant="outlined" fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}
//                   onClick={() => setFilters(prev => ({ ...prev, created_at: [] }))}>
//                   Clear All
//                 </Button>
//               </Box>
//               <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
//                 <DateFilterContent
//                   leads={leads}
//                   filters={filters}
//                   setFilters={setFilters}
//                 />
//               </Box>
//             </>
//           ) : (
//             <>
//               <TextField fullWidth size="small" placeholder="Search..." value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 sx={{ mb: 1.5, '& .MuiInputBase-root': { height: '32px', fontSize: '0.875rem' } }} />
//               <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
//                 <Button size="small" variant="outlined" onClick={handleSelectAll} fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Select All</Button>
//                 <Button size="small" variant="outlined" onClick={handleClearAll} fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}>Clear All</Button>
//               </Box>
//               <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
//                 {filteredColumnValues.map((value) => (
//                   <FormControlLabel
//                     key={value}
//                     control={
//                       <Checkbox
//                         checked={currentFilterColumn ? filters[currentFilterColumn]?.includes(value) : false}
//                         onChange={() => handleFilterToggle(value)} size="small"
//                         sx={{ py: 0.25, '& .MuiSvgIcon-root': { fontSize: 18 } }}
//                       />
//                     }
//                     label={value}
//                     sx={{ display: 'block', mb: 0, ml: 0, mr: 0, '& .MuiFormControlLabel-label': { fontSize: '0.8125rem', lineHeight: 1.4 }, '& .MuiCheckbox-root': { py: 0.5 } }}
//                   />
//                 ))}
//               </Box>
//             </>
//           )}
//         </Popover>

//         {/* View Lead Dialog — now includes ID and Partner */}
//         <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="sm" fullWidth
//           TransitionComponent={DialogTransition} TransitionProps={{ timeout: 400 }}
//           PaperProps={{ sx: { borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' } }}>
//           <DialogTitle sx={{ fontWeight: 600, borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 1 }}>
//             Lead Details
//             {selectedLead && <Chip label={`#${selectedLead.id}`} size="small" color="primary" sx={{ fontWeight: 600 }} />}
//           </DialogTitle>
//           <DialogContent sx={{ pt: 3 }}>
//             {selectedLead && (
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                 {[
//                   { label: 'Name',        value: `${selectedLead.first_name} ${selectedLead.last_name}` },
//                   { label: 'Phone',       value: selectedLead.phone,        mono: true },
//                   { label: 'Email',       value: selectedLead.email || '-' },
//                   { label: 'National ID', value: selectedLead.national_id,  mono: true, hide: !selectedLead.national_id },
//                   { label: 'Source',      value: getLeadSource(selectedLead.source_id) },
//                   { label: 'Partner',     value: getPartnerName(selectedLead) },
//                   { label: 'Created Date',value: selectedLead.created_at || '-' },
//                 ].filter(f => !f.hide).map(field => (
//                   <Box key={field.label}>
//                     <Typography variant="caption" color="text.secondary">{field.label}</Typography>
//                     <Typography
//                       variant="body1"
//                       fontWeight={field.label === 'Name' ? 600 : 400}
//                       sx={field.mono ? { fontFamily: 'monospace' } : {}}
//                     >
//                       {field.value}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions sx={{ p: 2.5, pt: 0 }}>
//             <Button onClick={() => setViewDialogOpen(false)} variant="contained"
//               sx={{ transition: 'all 0.2s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' } }}>
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Fade>
//   );
// }




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
  Collapse,
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
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
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

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

// ← Moved outside component to fix react-hooks/exhaustive-deps warning
const columnLabels = {
  name:        'Name',
  phone:       'Phone',
  email:       'Email',
  national_id: 'National ID',
  source:      'Source Name',
  created_at:  'Created Date',
};

// ── Date Filter Component ──────────────────────────────────────────────────
function DateFilterContent({ leads, filters, setFilters }) {
  const [expandedYears, setExpandedYears] = useState({});

  // Build { year: Set<monthIndex> } from lead data
  const yearMonthMap = useMemo(() => {
    const map = {};
    leads.forEach(lead => {
      if (!lead.created_at) return;
      // Parse "DD-MM-YYYY" or "YYYY-MM-DD" or any reasonable date string
      const d = new Date(lead.created_at.includes('-') && lead.created_at.split('-')[0].length === 2
        ? lead.created_at.split('-').reverse().join('-')
        : lead.created_at);
      if (isNaN(d)) return;
      const y = d.getFullYear();
      const m = d.getMonth(); // 0-based
      if (!map[y]) map[y] = new Set();
      map[y].add(m);
    });
    return map;
  }, [leads]);

  const sortedYears = Object.keys(yearMonthMap).map(Number).sort((a, b) => b - a);

  const toggleYear = (year) => {
    setExpandedYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  // Selected dates stored as "YYYY-M" strings
  const selectedDates = filters.created_at || [];

  const isYearChecked = (year) => {
    const months = Array.from(yearMonthMap[year] || []);
    return months.length > 0 && months.every(m => selectedDates.includes(`${year}-${m}`));
  };

  const isYearIndeterminate = (year) => {
    const months = Array.from(yearMonthMap[year] || []);
    const selected = months.filter(m => selectedDates.includes(`${year}-${m}`));
    return selected.length > 0 && selected.length < months.length;
  };

  const handleYearToggle = (year) => {
    const months = Array.from(yearMonthMap[year] || []);
    const yearKeys = months.map(m => `${year}-${m}`);
    const allSelected = yearKeys.every(k => selectedDates.includes(k));
    let newSelected;
    if (allSelected) {
      newSelected = selectedDates.filter(d => !yearKeys.includes(d));
    } else {
      newSelected = [...new Set([...selectedDates, ...yearKeys])];
    }
    setFilters(prev => ({ ...prev, created_at: newSelected }));
  };

  const handleMonthToggle = (year, month) => {
    const key = `${year}-${month}`;
    const newSelected = selectedDates.includes(key)
      ? selectedDates.filter(d => d !== key)
      : [...selectedDates, key];
    setFilters(prev => ({ ...prev, created_at: newSelected }));
  };

  if (sortedYears.length === 0) {
    return (
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', py: 1 }}>
        No date data available
      </Typography>
    );
  }

  return (
    <Box>
      {sortedYears.map(year => {
        const months = Array.from(yearMonthMap[year]).sort((a, b) => a - b);
        const isExpanded = expandedYears[year] ?? false;

        return (
          <Box key={year} sx={{ mb: 0.5 }}>
            {/* Year row */}
            <Box
              sx={{
                display: 'flex', alignItems: 'center',
                borderRadius: '8px',
                '&:hover': { backgroundColor: 'rgba(59,130,246,0.06)' },
                cursor: 'pointer',
                pr: 0.5,
              }}
            >
              <Checkbox
                size="small"
                checked={isYearChecked(year)}
                indeterminate={isYearIndeterminate(year)}
                onChange={() => handleYearToggle(year)}
                sx={{ py: 0.5, '& .MuiSvgIcon-root': { fontSize: 18 } }}
              />
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ flex: 1, fontSize: '0.8125rem', userSelect: 'none' }}
                onClick={() => toggleYear(year)}
              >
                {year}
              </Typography>
              <IconButton
                size="small"
                onClick={() => toggleYear(year)}
                sx={{ p: 0.25 }}
              >
                {isExpanded
                  ? <ExpandLessIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  : <ExpandMoreIcon sx={{ fontSize: 18, color: 'text.secondary' }} />}
              </IconButton>
            </Box>

            {/* Month rows */}
            <Collapse in={isExpanded}>
              <Box sx={{ pl: 3 }}>
                {months.map(monthIdx => {
                  const key = `${year}-${monthIdx}`;
                  return (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          size="small"
                          checked={selectedDates.includes(key)}
                          onChange={() => handleMonthToggle(year, monthIdx)}
                          sx={{ py: 0.25, '& .MuiSvgIcon-root': { fontSize: 17 } }}
                        />
                      }
                      label={MONTH_NAMES[monthIdx]}
                      sx={{
                        display: 'block', ml: 0, mr: 0,
                        '& .MuiFormControlLabel-label': { fontSize: '0.8rem', color: 'text.secondary' },
                        '& .MuiCheckbox-root': { py: 0.5 },
                        borderRadius: '6px',
                        '&:hover': { backgroundColor: 'rgba(59,130,246,0.04)' },
                      }}
                    />
                  );
                })}
              </Box>
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );
}

export default function LeadsList() {
  const navigate = useNavigate();
  const { access } = useAuth();
  const canDeleteLeads = !!access.canDeleteLeads;

  const [leads, setLeads] = useState([]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // ── Search & source filter ─────────────────────────────────────────────────
  const [globalSearch, setGlobalSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  // Pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Sorting
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Column filter popover
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [currentFilterColumn, setCurrentFilterColumn] = useState(null);
  const [filters, setFilters] = useState({
    name: [], phone: [], email: [], national_id: [],
    source: [], created_at: [],
  });
  const [searchText, setSearchText] = useState('');

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
      case 'name':       return `${lead.first_name} ${lead.last_name}`;
      case 'phone':      return lead.phone || '-';
      case 'email':      return lead.email || '-';
      case 'national_id':return lead.national_id ? String(lead.national_id) : '-';
      case 'source':     return getLeadSource(lead.source_id);
      case 'created_at': return lead.created_at || '-';
      default:           return '';
    }
  }, [getLeadSource]);

  const allSources = useMemo(() => {
    const sources = DataService.getLeadSources();
    return sources.map(s => ({ id: s.id, name: s.name }));
  }, []);

  const normalizePhone = (phone = '') => {
    if (phone.startsWith('01')) return '+20' + phone.substring(1);
    return phone;
  };

  const activeMatchType = useMemo(() => {
    if (!globalSearch.trim()) return null;
    const q = globalSearch.trim().toLowerCase();
    if (leads.some(l => `${l.first_name} ${l.last_name}`.toLowerCase().includes(q))) return 'name';
    const normalizedQ = normalizePhone(globalSearch.trim());
    if (leads.some(l =>
      (l.phone || '').toLowerCase().includes(q) ||
      normalizePhone(l.phone || '').includes(normalizedQ)
    )) return 'phone';
    if (leads.some(l => (l.email || '').toLowerCase().includes(q))) return 'email';
    if (leads.some(l => String(l.national_id || '').includes(q))) return 'national_id';
    return null;
  }, [globalSearch, leads]);

  // ── Helper: parse created_at to "YEAR-MONTHIDX" key ──────────────────────
  const getDateKey = (created_at) => {
    if (!created_at) return null;
    const d = new Date(created_at.includes('-') && created_at.split('-')[0].length === 2
      ? created_at.split('-').reverse().join('-')
      : created_at);
    if (isNaN(d)) return null;
    return `${d.getFullYear()}-${d.getMonth()}`;
  };

  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // 1. Column filters
    Object.keys(filters).forEach((column) => {
      if (column === 'created_at') {
        if (filters.created_at.length > 0) {
          result = result.filter(lead => {
            const key = getDateKey(lead.created_at);
            return key && filters.created_at.includes(key);
          });
        }
      } else if (filters[column].length > 0) {
        result = result.filter(lead => filters[column].includes(getColumnValue(lead, column)));
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
        const cmp = aVal.localeCompare(bVal, undefined, { sensitivity: 'base' });
        return sortDirection === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [leads, filters, sourceFilter, globalSearch, activeMatchType, sortColumn, sortDirection, getColumnValue]);

  const getUniqueColumnValues = useCallback((column) => {
    if (column === 'created_at') return []; // handled by DateFilterContent
    let data = [...leads];
    Object.keys(filters).forEach((col) => {
      if (col !== column && col !== 'created_at' && filters[col].length > 0) {
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

  // Hide columns where every row on the current page is empty / '-'
  const visibleColumns = useMemo(() => {
    if (paginatedLeads.length === 0) return Object.keys(columnLabels);
    return Object.keys(columnLabels).filter(col =>
      paginatedLeads.some(lead => {
        const val = getColumnValue(lead, col);
        return val && val !== '-';
      })
    );
  }, [paginatedLeads, getColumnValue]);

  useEffect(() => { setPage(0); }, [filters, sortColumn, sortDirection, globalSearch, sourceFilter]);

  const filterOpen = Boolean(filterAnchorEl);
  const filteredColumnValues = currentFilterColumn && currentFilterColumn !== 'created_at'
    ? getUniqueColumnValues(currentFilterColumn).filter(v => String(v).toLowerCase().includes(searchText.toLowerCase()))
    : [];

  const matchInfo = activeMatchType ? MATCH_TYPE_LABEL[activeMatchType] : null;

  // Active filter count (created_at counts as 1 if any selected)
  const activeFilterCount =
    Object.entries(filters).reduce((acc, [key, val]) => acc + (val.length > 0 ? 1 : 0), 0) +
    (sourceFilter ? 1 : 0);

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
            { label: 'Active Filters',   value: activeFilterCount,      color: 'info.main' },
          ].map((stat, i) => (
            <Grow in timeout={600 + i * 100} key={stat.label}>
              <Card sx={{ p: 3, flex: 1, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' } }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>{stat.label}</Typography>
                <Typography variant="h2" color={stat.color}>{stat.value}</Typography>
              </Card>
            </Grow>
          ))}
        </Box>

        {/* Search & Source Filter Bar */}
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
                {globalSearch.trim() && activeMatchType !== 'name' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                    {['phone', 'email', 'national_id'].map((type, idx) => {
                      const info = MATCH_TYPE_LABEL[type];
                      const isActive = activeMatchType === type;
                      const isPassed = (
                        (type === 'email'  && activeMatchType === 'national_id') ||
                        (type === 'phone'  && ['email', 'national_id'].includes(activeMatchType))
                      );
                      return (
                        <React.Fragment key={type}>
                          <Chip
                            label={info.label}
                            size="small"
                            sx={{
                              fontSize: '11px', height: 22, fontWeight: 600,
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
                      <Typography variant="caption" sx={{ color: '#EF4444', fontSize: '11px' }}>No results found</Typography>
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
                  <MenuItem value=""><em>All Sources</em></MenuItem>
                  {allSources.map(source => (
                    <MenuItem key={source.id} value={source.id}>{source.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Clear all filters */}
              {(globalSearch || sourceFilter || Object.values(filters).flat().length > 0) && (
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<CloseIcon fontSize="small" />}
                  onClick={() => {
                    setGlobalSearch('');
                    setSourceFilter('');
                    setFilters({ name: [], phone: [], email: [], national_id: [], source: [], created_at: [] });
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
                    {visibleColumns.map((column) => (
                      <TableCell
                        key={column}
                        sx={{ py: 1.5, px: 2, whiteSpace: 'nowrap' }}
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
                              sx={{
                                p: 0.5,
                                color: (column === 'created_at' ? filters.created_at.length > 0 : filters[column]?.length > 0) ? 'primary.main' : 'inherit',
                                transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(59, 130, 246, 0.1)' },
                              }}
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
                      <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 8 }}>
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
                    paginatedLeads.map((lead) => (
                      <TableRow
                        key={lead.id}
                        hover
                        sx={{
                          '&:last-child td': { borderBottom: 0 },
                          transition: 'background-color 0.2s ease',
                          '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.04)' },
                        }}
                      >
                        {visibleColumns.map(col => (
                          <TableCell key={col} sx={{ py: 1.5, px: 2 }}>
                            {col === 'name' && (
                              <Typography variant="body2" fontWeight={600} noWrap>
                                {lead.first_name} {lead.last_name}
                              </Typography>
                            )}
                            {col === 'phone' && (
                              <Typography variant="body2" sx={{ fontFamily: 'monospace' }} noWrap>
                                {lead.phone || '-'}
                              </Typography>
                            )}
                            {col === 'email' && (
                              lead.email
                                ? <Typography variant="body2" noWrap>{lead.email}</Typography>
                                : <Typography variant="body2" color="text.disabled">-</Typography>
                            )}
                            {col === 'national_id' && (
                              lead.national_id
                                ? <Typography variant="body2" sx={{ fontFamily: 'monospace' }} noWrap>{lead.national_id}</Typography>
                                : <Typography variant="body2" color="text.disabled">-</Typography>
                            )}
                            {col === 'source' && (
                              <Chip label={getLeadSource(lead.source_id)} size="small" sx={{ backgroundColor: '#E0E7FF', color: '#3730A3', fontWeight: 600, fontSize: '12px' }} />
                            )}
                            {col === 'created_at' && (
                              <Typography variant="body2" color="text.secondary" noWrap>{lead.created_at || '-'}</Typography>
                            )}
                          </TableCell>
                        ))}
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
                    ))
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
          PaperProps={{ sx: { p: 1.5, minWidth: 260, maxHeight: 400, borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.95rem' }}>
            {currentFilterColumn ? `${columnLabels[currentFilterColumn]} Filter` : 'Filter Options'}
          </Typography>

          {/* Date column: custom year/month tree */}
          {currentFilterColumn === 'created_at' ? (
            <>
              <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
                <Button size="small" variant="outlined" fullWidth sx={{ py: 0.5, fontSize: '0.75rem', minHeight: '28px' }}
                  onClick={() => setFilters(prev => ({ ...prev, created_at: [] }))}>
                  Clear All
                </Button>
              </Box>
              <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                <DateFilterContent
                  leads={leads}
                  filters={filters}
                  setFilters={setFilters}
                />
              </Box>
            </>
          ) : (
            <>
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
                      <Checkbox
                        checked={currentFilterColumn ? filters[currentFilterColumn]?.includes(value) : false}
                        onChange={() => handleFilterToggle(value)} size="small"
                        sx={{ py: 0.25, '& .MuiSvgIcon-root': { fontSize: 18 } }}
                      />
                    }
                    label={value}
                    sx={{ display: 'block', mb: 0, ml: 0, mr: 0, '& .MuiFormControlLabel-label': { fontSize: '0.8125rem', lineHeight: 1.4 }, '& .MuiCheckbox-root': { py: 0.5 } }}
                  />
                ))}
              </Box>
            </>
          )}
        </Popover>

        {/* View Lead Dialog — now includes ID and Partner */}
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
                  { label: 'Phone',       value: selectedLead.phone,        mono: true },
                  { label: 'Email',       value: selectedLead.email || '-' },
                  { label: 'National ID', value: selectedLead.national_id,  mono: true, hide: !selectedLead.national_id },
                  { label: 'Source',      value: getLeadSource(selectedLead.source_id) },
                  { label: 'Partner',     value: getPartnerName(selectedLead) },
                  { label: 'Created Date',value: selectedLead.created_at || '-' },
                ].filter(f => !f.hide).map(field => (
                  <Box key={field.label}>
                    <Typography variant="caption" color="text.secondary">{field.label}</Typography>
                    <Typography
                      variant="body1"
                      fontWeight={field.label === 'Name' ? 600 : 400}
                      sx={field.mono ? { fontFamily: 'monospace' } : {}}
                    >
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