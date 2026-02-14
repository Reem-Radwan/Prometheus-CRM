import React, { useState, useEffect } from 'react';
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
  DialogContentText,
  DialogActions,
  Alert,
  Snackbar,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../../data/dataService';
import PageHeader from '../../components/shared/PageHeader';

export default function LeadsList() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    const loadedLeads = DataService.getLeads();
    setLeads(loadedLeads);
  };

  const getLeadSource = (sourceId) => {
    const source = DataService.getLeadSourceById(sourceId);
    return source ? source.name : '-';
  };

  const getPartnerName = (lead) => {
    if (!lead.partner_id) return '-';
    const partner = DataService.getPartnerById(lead.partner_id);
    return partner ? partner.name : '-';
  };

  const handleView = (lead) => {
    setSelectedLead(lead);
    setViewDialogOpen(true);
  };

 const handleEdit = (lead) => {
    navigate(`/leads/edit/${lead.id}`);
  };

  const handleDeleteClick = (lead) => {
    setLeadToDelete(lead);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (leadToDelete) {
      DataService.deleteLead(leadToDelete.id);
      loadLeads();
      setSnackbar({
        open: true,
        message: `Lead "${leadToDelete.first_name} ${leadToDelete.last_name}" deleted successfully`,
        severity: 'success'
      });
    }
    setDeleteDialogOpen(false);
    setLeadToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setLeadToDelete(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ mt: { xs: 4, sm: 5, md: 0 } }}>
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
              '&:hover': {
                boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.5)',
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
        <Card sx={{ p: 3, flex: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Total Leads
          </Typography>
          <Typography variant="h2" color="primary">
            {leads.length}
          </Typography>
        </Card>
        <Card sx={{ p: 3, flex: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            This Month
          </Typography>
          <Typography variant="h2" color="success.main">
            {leads.filter(l => {
              const today = new Date();
              const leadDate = new Date(l.created_at);
              return leadDate.getMonth() === today.getMonth() && 
                     leadDate.getFullYear() === today.getFullYear();
            }).length}
          </Typography>
        </Card>
        <Card sx={{ p: 3, flex: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Active Sources
          </Typography>
          <Typography variant="h2" color="info.main">
            {new Set(leads.map(l => l.source_id)).size}
          </Typography>
        </Card>
      </Box>

      {/* Table */}
      <Card>
        <TableContainer sx={{ maxHeight: { xs: 'calc(100vh - 400px)', md: 'none' } }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    position: { xs: 'sticky', md: 'relative' },
                    left: { xs: 0, md: 'auto' },
                    backgroundColor: { xs: 'background.paper', md: 'transparent' },
                    zIndex: { xs: 3, md: 'auto' },
                    boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
                  }}
                >
                  ID
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>National ID</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Partner</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                    <Box>
                      <PeopleIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        No leads found
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Create your first lead to get started
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/leads/create')}
                      >
                        Create Lead
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow 
                    key={lead.id}
                    hover
                    sx={{ 
                      '&:last-child td': { borderBottom: 0 },
                      '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.04)',
                      }
                    }}
                  >
                    <TableCell
                      sx={{ 
                        position: { xs: 'sticky', md: 'relative' },
                        left: { xs: 0, md: 'auto' },
                        backgroundColor: { xs: 'background.paper', md: 'transparent' },
                        zIndex: { xs: 2, md: 'auto' },
                        boxShadow: { xs: '2px 0 4px rgba(0,0,0,0.1)', md: 'none' },
                      }}
                    >
                      <Chip 
                        label={`#${lead.id}`} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} noWrap>
                        {lead.first_name} {lead.last_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }} noWrap>
                        {lead.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
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
                    <TableCell>
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
                    <TableCell>
                      <Typography variant="body2" noWrap>
                        {getPartnerName(lead)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {lead.created_at || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <Tooltip title="View Details">
                          <IconButton 
                            size="small" 
                            onClick={() => handleView(lead)}
                            sx={{ 
                              color: 'info.main',
                              '&:hover': { 
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              }
                            }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            onClick={() => handleEdit(lead)}
                            sx={{ 
                              color: 'warning.main',
                              p: 0.75,
                              '&:hover': { 
                                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                              }
                            }}
                          >
                            <EditIcon fontSize="small" />
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
      </Card>

      {/* View Lead Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '12px' }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, borderBottom: '1px solid #E5E7EB' }}>
          Lead Details
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
                  <Typography variant="body1">
                    {selectedLead.email}
                  </Typography>
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
                  <Typography variant="body1">
                    {getPartnerName(selectedLead)}
                  </Typography>
                </Box>
              )}
              
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Created Date
                </Typography>
                <Typography variant="body1">
                  {selectedLead.created_at || '-'}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={() => setViewDialogOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}