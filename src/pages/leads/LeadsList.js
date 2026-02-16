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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../../data/mod1dataService';
import PageHeader from '../../components/shared/PageHeader';
import { showDeleteConfirmation, showSuccessToast, showErrorToast } from '../../utils/sweetalert';

// Transition component for dialogs - Zoom effect
const DialogTransition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

export default function LeadsList() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Sorting
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Filter states
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [currentFilterColumn, setCurrentFilterColumn] = useState(null);
  const [filters, setFilters] = useState({
    id: [],
    name: [],
    phone: [],
    national_id: [],
    source: [],
    partner: [],
    created_at: [],
  });
  const [searchText, setSearchText] = useState('');

  const columnLabels = {
    id: 'ID',
    name: 'Name',
    phone: 'Phone',
    national_id: 'National ID',
    source: 'Source Name',
    partner: 'Partner',
    created_at: 'Created Date',
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    const loadedLeads = DataService.getLeads();
    setLeads(loadedLeads);
  };

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
      case 'id':
        return `#${lead.id}`;
      case 'name':
        return `${lead.first_name} ${lead.last_name}`;
      case 'phone':
        return lead.phone;
      case 'national_id':
        return lead.national_id ? String(lead.national_id) : '-';
      case 'source':
        return getLeadSource(lead.source_id);
      case 'partner':
        return getPartnerName(lead);
      case 'created_at':
        return lead.created_at || '-';
      default:
        return '';
    }
  }, [getLeadSource, getPartnerName]);

  // Use useMemo to compute filtered and sorted leads
  const filteredLeads = useMemo(() => {
    let filtered = [...leads];

    // Apply filters
    Object.keys(filters).forEach((column) => {
      if (filters[column].length > 0) {
        filtered = filtered.filter((lead) => {
          const value = getColumnValue(lead, column);
          return filters[column].includes(value);
        });
      }
    });

    // Apply sorting
    if (sortColumn) {
      filtered.sort((a, b) => {
        const aValue = getColumnValue(a, sortColumn);
        const bValue = getColumnValue(b, sortColumn);
        
        // Handle numeric sorting for ID
        if (sortColumn === 'id') {
          const aNum = parseInt(aValue.replace('#', ''));
          const bNum = parseInt(bValue.replace('#', ''));
          return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        // String sorting - FIXED: Use localeCompare for proper alphabetical sorting
        const comparison = aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [leads, filters, sortColumn, sortDirection, getColumnValue]);

  const getUniqueColumnValues = useCallback((column) => {
    let dataToFilter = [...leads];
    
    Object.keys(filters).forEach((col) => {
      if (col !== column && filters[col].length > 0) {
        dataToFilter = dataToFilter.filter((lead) => {
          const value = getColumnValue(lead, col);
          return filters[col].includes(value);
        });
      }
    });

    const values = new Set();
    dataToFilter.forEach((lead) => {
      const value = getColumnValue(lead, column);
      values.add(value);
    });
    return Array.from(values).sort();
  }, [leads, filters, getColumnValue]);

  const handleSortClick = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleFilterClick = (event, column) => {
    setFilterAnchorEl(event.currentTarget);
    setCurrentFilterColumn(column);
    setSearchText('');
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
    setCurrentFilterColumn(null);
    setSearchText('');
  };

  const handleFilterToggle = (value) => {
    const column = currentFilterColumn;
    const currentFilters = filters[column];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((v) => v !== value)
      : [...currentFilters, value];

    setFilters({
      ...filters,
      [column]: newFilters,
    });
  };

  const handleSelectAll = () => {
    const column = currentFilterColumn;
    const allValues = getUniqueColumnValues(column);
    setFilters({
      ...filters,
      [column]: allValues,
    });
  };

  const handleClearAll = () => {
    const column = currentFilterColumn;
    setFilters({
      ...filters,
      [column]: [],
    });
  };

  const handleView = (lead) => {
    setSelectedLead(lead);
    setViewDialogOpen(true);
  };

  const handleEdit = (lead) => {
    navigate(`/leads/edit/${lead.id}`);
  };

  const handleDeleteClick = async (lead) => {
    const result = await showDeleteConfirmation(
      'Delete Lead?',
      `Are you sure you want to delete ${lead.first_name} ${lead.last_name}?`
    );
    
    if (result.isConfirmed) {
      const success = DataService.deleteLead(lead.id);
      if (success) {
        // Immediately update local state
        setLeads(prevLeads => prevLeads.filter(l => l.id !== lead.id));
        showSuccessToast('Lead deleted successfully!');
      } else {
        showErrorToast('Failed to delete lead');
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Get paginated data
  const paginatedLeads = filteredLeads.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);

  // Reset to page 0 when filters change
  useEffect(() => {
    setPage(0);
  }, [filters, sortColumn, sortDirection]);

  const filterOpen = Boolean(filterAnchorEl);
  const filteredColumnValues = currentFilterColumn
    ? getUniqueColumnValues(currentFilterColumn).filter((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <Fade in timeout={500}>
      <Box>
        {/* Page Header */}
        <PageHeader
          title="Leads Management"
          subtitle="Track and manage all your potential customers in one place"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Leads', active: true },
          ]}
          actions={
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
              size="large"
              onClick={() => navigate('/leads/create')}
              sx={{
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.5)',
                  transform: 'translateY(-2px)',
                },
                minWidth: { xs: '48px', sm: 'auto' },
                px: { xs: 1.5, sm: 3 },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Create Lead
              </Box>
              <AddIcon sx={{ display: { xs: 'inline-flex', sm: 'none' } }} />
            </Button>
          }
        />

        {/* Stats Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Grow in timeout={600}>
            <Card sx={{ 
              p: 3, 
              flex: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              }
            }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Total Leads
              </Typography>
              <Typography variant="h2" color="primary">
                {leads.length}
              </Typography>
            </Card>
          </Grow>
          <Grow in timeout={700}>
            <Card sx={{ 
              p: 3, 
              flex: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              }
            }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Filtered Results
              </Typography>
              <Typography variant="h2" color="success.main">
                {filteredLeads.length}
              </Typography>
            </Card>
          </Grow>
          <Grow in timeout={800}>
            <Card sx={{ 
              p: 3, 
              flex: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              }
            }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Active Filters
              </Typography>
              <Typography variant="h2" color="info.main">
                {Object.values(filters).flat().length}
              </Typography>
            </Card>
          </Grow>
        </Box>

        {/* Table - BIGGER with compact spacing */}
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
                          py: 1.5,
                          px: 2,
                          whiteSpace: 'nowrap',
                          // Sticky first column (ID) on mobile only
                          ...(index === 0 && {
                            position: { xs: 'sticky', md: 'static' },
                            left: { xs: 0, md: 'auto' },
                            zIndex: { xs: 3, md: 'auto' },
                            backgroundColor: { xs: '#ffffff', md: 'transparent' },  // Solid white on mobile
                            boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
                          }),
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {columnLabels[column]}
                          <Tooltip 
                            title={`Sort by ${columnLabels[column]}`} 
                            arrow
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 300 }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleSortClick(column)}
                              sx={{
                                p: 0.5,
                                color: sortColumn === column ? 'primary.main' : 'inherit',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  transform: 'scale(1.15)',
                                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                }
                              }}
                            >
                              {sortColumn === column && sortDirection === 'asc' ? (
                                <ArrowUpwardIcon sx={{ fontSize: 18 }} />
                              ) : (
                                <ArrowDownwardIcon sx={{ fontSize: 18 }} />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip 
                            title={`Filter ${columnLabels[column]}`} 
                            arrow
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 300 }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => handleFilterClick(e, column)}
                              sx={{
                                p: 0.5,
                                color: filters[column].length > 0 ? 'primary.main' : 'inherit',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  transform: 'scale(1.15)',
                                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                }
                              }}
                            >
                              <FilterListIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    ))}
                    <TableCell 
                      align="center"
                      sx={{
                        py: 1.5,
                        px: 2,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                        <Box>
                          <PeopleIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                          <Typography variant="h6" color="text.secondary" gutterBottom>
                            No leads found
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {Object.values(filters).flat().length > 0
                              ? 'Try adjusting your filters'
                              : 'Create your first lead to get started'}
                          </Typography>
                          {Object.values(filters).flat().length === 0 && (
                            <Button
                              variant="contained"
                              startIcon={<AddIcon />}
                              onClick={() => navigate('/leads/create')}
                            >
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
                          '&:hover': {
                            backgroundColor: 'rgba(59, 130, 246, 0.04)',
                          },
                        }}
                      >
                        <TableCell sx={{ 
                          py: 1.5, 
                          px: 2,
                          // Sticky first column (ID) on mobile only
                          position: { xs: 'sticky', md: 'static' },
                          left: { xs: 0, md: 'auto' },
                          zIndex: { xs: 2, md: 'auto' },
                          backgroundColor: { xs: '#ffffff', md: 'transparent' },  // Solid white on mobile
                          boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
                          // Solid background on hover too
                          'tr:hover &': {
                            backgroundColor: { xs: '#f0f9ff', md: 'transparent' },  // Light blue solid on hover
                          },
                        }}>
                          <Chip
                            label={`#${lead.id}`}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          <Typography variant="body2" fontWeight={600} noWrap>
                            {lead.first_name} {lead.last_name}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }} noWrap>
                            {lead.phone}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          {lead.national_id ? (
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }} noWrap>
                              {lead.national_id}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="text.disabled">
                              -
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          <Chip
                            label={getLeadSource(lead.source_id)}
                            size="small"
                            sx={{
                              backgroundColor: '#E0E7FF',
                              color: '#3730A3',
                              fontWeight: 600,
                              fontSize: '12px',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          <Typography variant="body2" noWrap>
                            {getPartnerName(lead)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {lead.created_at || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1.5, px: 2 }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="View Details" arrow TransitionComponent={Fade}>
                              <IconButton
                                size="small"
                                onClick={() => handleView(lead)}
                                sx={{
                                  p: 0.5,
                                  color: 'info.main',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    transform: 'scale(1.2)',
                                  },
                                }}
                              >
                                <ViewIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Edit" arrow TransitionComponent={Fade}>
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(lead)}
                                sx={{
                                  p: 0.5,
                                  color: 'warning.main',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                    transform: 'scale(1.2)',
                                  },
                                }}
                              >
                                <EditIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete" arrow TransitionComponent={Fade}>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteClick(lead)}
                                sx={{
                                  p: 0.5,
                                  color: 'error.main',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    transform: 'scale(1.2)',
                                  },
                                }}
                              >
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

            {/* Custom Pagination */}
            {filteredLeads.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  p: 2,
                  borderTop: '1px solid #E5E7EB',
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 0}
                  sx={{
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      transform: 'scale(1.1)',
                    },
                    '&:disabled': {
                      opacity: 0.3,
                    },
                  }}
                >
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>

                {Array.from({ length: totalPages }, (_, i) => i).map((pageNum) => (
                  <IconButton
                    key={pageNum}
                    size="small"
                    onClick={() => handlePageChange(pageNum)}
                    sx={{
                      minWidth: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '14px',
                      backgroundColor: page === pageNum ? 'primary.main' : 'transparent',
                      color: page === pageNum ? '#FFFFFF' : 'text.primary',
                      border: '1px solid',
                      borderColor: page === pageNum ? 'primary.main' : '#E5E7EB',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: page === pageNum ? 'primary.dark' : 'rgba(59, 130, 246, 0.1)',
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    {pageNum + 1}
                  </IconButton>
                ))}

                <IconButton
                  size="small"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages - 1}
                  sx={{
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      transform: 'scale(1.1)',
                    },
                    '&:disabled': {
                      opacity: 0.3,
                    },
                  }}
                >
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Card>
        </Grow>

        {/* Filter Popover - COMPACT VERSION */}
        <Popover
          open={filterOpen}
          anchorEl={filterAnchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          TransitionComponent={Grow}
          TransitionProps={{ timeout: 300 }}
          PaperProps={{
            sx: {
              p: 1.5,
              minWidth: 260,
              maxHeight: 360,
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            },
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.95rem' }}>
            {currentFilterColumn ? `${columnLabels[currentFilterColumn]} Filter` : 'Filter Options'}
          </Typography>

          {/* Compact Search */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ 
              mb: 1.5,
              '& .MuiInputBase-root': {
                height: '32px',
                fontSize: '0.875rem',
              }
            }}
          />

          {/* Compact Buttons */}
          <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleSelectAll} 
              fullWidth
              sx={{ 
                py: 0.5,
                fontSize: '0.75rem',
                minHeight: '28px',
              }}
            >
              Select All
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleClearAll} 
              fullWidth
              sx={{ 
                py: 0.5,
                fontSize: '0.75rem',
                minHeight: '28px',
              }}
            >
              Clear All
            </Button>
          </Box>

          {/* Compact Checkbox List */}
          <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
            {filteredColumnValues.map((value) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    checked={
                      currentFilterColumn
                        ? filters[currentFilterColumn].includes(value)
                        : false
                    }
                    onChange={() => handleFilterToggle(value)}
                    size="small"
                    sx={{
                      py: 0.25,
                      '& .MuiSvgIcon-root': { fontSize: 18 }
                    }}
                  />
                }
                label={value}
                sx={{
                  display: 'block',
                  mb: 0,
                  ml: 0,
                  mr: 0,
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.8125rem',
                    lineHeight: 1.4,
                  },
                  '& .MuiCheckbox-root': {
                    py: 0.5,
                  }
                }}
              />
            ))}
          </Box>
        </Popover>

        {/* View Lead Dialog with Smooth Animation */}
        <Dialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          TransitionComponent={DialogTransition}
          TransitionProps={{ timeout: 400 }}
          PaperProps={{
            sx: { 
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            },
          }}
        >
          <DialogTitle sx={{ 
            fontWeight: 600, 
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
            Lead Details
            {selectedLead && (
              <Chip
                label={`#${selectedLead.id}`}
                size="small"
                color="primary"
                sx={{ fontWeight: 600 }}
              />
            )}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            {selectedLead && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedLead.first_name} {selectedLead.last_name}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {selectedLead.phone}
                  </Typography>
                </Box>

                {selectedLead.national_id && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      National ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                      {selectedLead.national_id}
                    </Typography>
                  </Box>
                )}

                {selectedLead.email && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">{selectedLead.email}</Typography>
                  </Box>
                )}

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Source
                  </Typography>
                  <Typography variant="body1">
                    {getLeadSource(selectedLead.source_id)}
                  </Typography>
                </Box>

                {selectedLead.partner_id && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Partner
                    </Typography>
                    <Typography variant="body1">{getPartnerName(selectedLead)}</Typography>
                  </Box>
                )}

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Created Date
                  </Typography>
                  <Typography variant="body1">{selectedLead.created_at || '-'}</Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 0 }}>
            <Button 
              onClick={() => setViewDialogOpen(false)} 
              variant="contained"
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                }
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
}