import React, { useState, useMemo } from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  MenuItem, Button, Alert, Paper, FormControlLabel,
  Switch, Avatar, Chip, InputAdornment, Autocomplete,
} from '@mui/material';
import {
  Search as SearchIcon,
  SwapHoriz as SwapHorizIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { HRDataService, TEAM_MEMBER_ROLES } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast } from '../../utils/sweetalert';
import Swal from 'sweetalert2';

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
}

export default function TeamMemberAssign() {
  const { teamId } = useParams();
  const navigate   = useNavigate();

  const team = HRDataService.getTeamById(Number(teamId));

  // All active sales employees
  const salesEmployees = useMemo(() => HRDataService.getSalesEmployees(), []);

  // Current members of THIS team (by employee_id)
  const currentMemberIds = useMemo(() => {
    return new Set(
      HRDataService.getTeamMembersByTeam(Number(teamId)).map(m => m.employee_id)
    );
  }, [teamId]);

  // Employees eligible to show in dropdown (exclude already in THIS team)
  const dropdownEmployees = useMemo(() => {
    return salesEmployees.filter(e => !currentMemberIds.has(e.id));
  }, [salesEmployees, currentMemberIds]);

  const [selectedEmp, setSelectedEmp] = useState(null);
  const [role,        setRole]        = useState('sales_rep');
  const [isActive,    setIsActive]    = useState(true);
  const [roleError,   setRoleError]   = useState('');
  const [empError,    setEmpError]    = useState('');
  const [submitError, setSubmitError] = useState('');

  if (!team) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">Team not found.</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Go Back</Button>
      </Box>
    );
  }

  // For each employee in dropdown, check if they're in another team
  const getEmployeeCurrentTeam = (empId) => {
    return HRDataService.getEmployeeTeam(empId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setEmpError('');
    setRoleError('');

    if (!selectedEmp) { setEmpError('Please select an employee'); return; }
    if (!role)        { setRoleError('Role is required'); return; }

    const existingTeam = getEmployeeCurrentTeam(selectedEmp.id);

    // If already in another team — ask to move
    if (existingTeam) {
      const result = await Swal.fire({
        title:              'Move Member?',
        html:               `<b>${selectedEmp.full_name}</b> is currently in <b>${existingTeam.name}</b>.<br/>Move them to <b>${team.name}</b>?`,
        icon:               'warning',
        showCancelButton:   true,
        confirmButtonText:  'Yes, Move',
        cancelButtonText:   'Cancel',
        confirmButtonColor: '#2563EB',
        cancelButtonColor:  '#6B7280',
        reverseButtons:     true,
      });
      if (!result.isConfirmed) return;

      const moved = HRDataService.moveTeamMember(selectedEmp.id, Number(teamId), role, isActive);
      if (moved) {
        showSuccessToast(`${selectedEmp.full_name} moved to ${team.name}!`);
        navigate(-1);
      } else {
        setSubmitError('Failed to move member. Please try again.');
      }
      return;
    }

    // Normal assign — not in any team
    const result = HRDataService.addTeamMember({
      team_id:        Number(teamId),
      employee_id:    selectedEmp.id,
      role,
      is_team_leader: role === 'team_leader',
      is_active:      isActive,
    });

    if (result) {
      showSuccessToast('Member assigned successfully!');
      navigate(-1);
    } else {
      setSubmitError('Failed to assign member. Please try again.');
    }
  };

  return (
    <Box>
      <PageHeader
        title="Assign Sales Team Member"
        subtitle={`Adding a member to ${team.name}`}
        breadcrumbs={[
          { label: 'Home',          href: '/' },
          { label: 'HR',            href: '/hr' },
          { label: 'Sales Teams',         href: '/hr?tab=teams' },
          { label: team.name,       href: `/hr/teams/${teamId}/members` },
          { label: 'Assign Sales Member', active: true },
        ]}
        compact
        maxWidth="720px"
      />

      <Card sx={{ maxWidth: '720px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                👤 Member Details
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                {/* ── Searchable employee dropdown ── */}
                <Autocomplete
                  options={dropdownEmployees}
                  value={selectedEmp}
                  onChange={(_, val) => { setSelectedEmp(val); if (empError) setEmpError(''); }}
                  getOptionLabel={(emp) => `${emp.full_name} — ${emp.email}`}
                  filterOptions={(options, { inputValue }) => {
                    const q = inputValue.toLowerCase();
                    return options.filter(e =>
                      e.full_name.toLowerCase().includes(q) ||
                      e.email.toLowerCase().includes(q)
                    );
                  }}
                  noOptionsText="No sales employees found"
                  renderOption={(props, emp) => {
                    const assignedTeam = getEmployeeCurrentTeam(emp.id);
                    return (
                      <Box component="li" {...props} key={emp.id}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, px: 2 }}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: 11, fontWeight: 700, flexShrink: 0, background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)' }}>
                          {getInitials(emp.full_name)}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" fontWeight={600} noWrap>{emp.full_name}</Typography>
                          <Typography variant="caption" color="text.secondary" noWrap>{emp.email}</Typography>
                        </Box>
                        {assignedTeam && (
                          <Chip
                            icon={<SwapHorizIcon sx={{ fontSize: 13 }} />}
                            label={`In ${assignedTeam.name}`}
                            size="small"
                            sx={{ fontSize: '10px', fontWeight: 600, backgroundColor: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D', flexShrink: 0 }}
                          />
                        )}
                      </Box>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Employee"
                      placeholder="Search by name or email…"
                      error={!!empError}
                      helperText={empError || 'Only active sales employees · excludes current team members'}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                            </InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />

                {/* Selected employee info strip */}
                {selectedEmp && (() => {
                  const assignedTeam = getEmployeeCurrentTeam(selectedEmp.id);
                  return (
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: '#F0F9FF', border: '1px solid #BFDBFE', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, fontSize: 13, fontWeight: 700, background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)', flexShrink: 0 }}>
                        {getInitials(selectedEmp.full_name)}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={700}>{selectedEmp.full_name}</Typography>
                        <Typography variant="caption" color="text.secondary">{selectedEmp.email}</Typography>
                      </Box>
                      {assignedTeam ? (
                        <Chip
                          icon={<SwapHorizIcon sx={{ fontSize: 13 }} />}
                          label={`Currently in ${assignedTeam.name} — will be moved`}
                          size="small"
                          sx={{ fontSize: '11px', fontWeight: 600, backgroundColor: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' }}
                        />
                      ) : (
                        <Chip label="Not in any team" size="small" sx={{ fontSize: '11px', fontWeight: 600, backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' }} />
                      )}
                    </Paper>
                  );
                })()}

                {/* Role */}
                <TextField
                  select
                  label="Role"
                  fullWidth
                  required
                  value={role}
                  onChange={(e) => { setRole(e.target.value); if (roleError) setRoleError(''); }}
                  error={!!roleError}
                  helperText={roleError || 'Select the member\'s role in this team'}
                >
                  {TEAM_MEMBER_ROLES.map(r => (
                    <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                  ))}
                </TextField>

                {/* Active */}
                <FormControlLabel
                  control={<Switch checked={isActive} onChange={e => setIsActive(e.target.checked)} color="success" />}
                  label={
                    <Typography variant="body2" fontWeight={500}>
                      Active Member
                    </Typography>
                  }
                />
              </Box>
            </Paper>


            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate(-1)} sx={{ minWidth: '120px' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="large"
                sx={{ minWidth: '170px', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.4)' }}>
                Assign Member
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}