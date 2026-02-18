import React from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  MenuItem, Button, Grid, Alert, Paper, FormControlLabel, Switch, Avatar, Chip,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { HRDataService, TEAM_MEMBER_ROLES } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast } from '../../utils/sweetalert';

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
}

export default function TeamMemberAssign() {
  const { teamId } = useParams();
  const navigate   = useNavigate();
  const [submitError, setSubmitError] = React.useState('');

  const team = HRDataService.getTeamById(Number(teamId));

  // Only active employees in the Sales department (id: 1)
  const salesDept  = HRDataService.getDepartments().find(d => d.code === 'sales' || d.name.toLowerCase() === 'sales');
  const salesDeptId = salesDept?.id ?? 1;
  const employees  = HRDataService.getEmployees().filter(e => e.is_active && e.department === salesDeptId);

  const {
    control, handleSubmit, setError, clearErrors, watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      employee_id: '',
      role:        'sales_rep',
      is_active:   true,
    },
  });

  const selectedEmpId = watch('employee_id');
  const selectedEmp   = selectedEmpId ? HRDataService.getEmployeeById(Number(selectedEmpId)) : null;

  if (!team) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">Team not found.</Typography>
        <Button onClick={() => navigate('/hr?tab=teams')} sx={{ mt: 2 }}>Back to Teams</Button>
      </Box>
    );
  }

  const onSubmit = async (data) => {
    setSubmitError('');
    clearErrors();
    let hasErrors = false;

    if (!data.employee_id) {
      setError('employee_id', { type: 'manual', message: 'Please select an employee' });
      hasErrors = true;
    }
    if (!data.role) {
      setError('role', { type: 'manual', message: 'Role is required' });
      hasErrors = true;
    }
    if (hasErrors) return;

    if (HRDataService.isEmployeeInTeam(data.employee_id, teamId)) {
      setError('employee_id', { type: 'manual', message: 'This employee is already an active member of this team' });
      return;
    }

    try {
      HRDataService.createTeamMember({
        team_id:        Number(teamId),
        employee_id:    Number(data.employee_id),
        role:           data.role,
        is_team_leader: data.role === 'team_leader',
        is_active:      data.is_active,
      });
      showSuccessToast('Member assigned to team successfully!');
      setTimeout(() => navigate(`/hr/teams/${teamId}/members`), 1500);
    } catch {
      setSubmitError('Failed to assign member. Please try again.');
    }
  };

  return (
    <Box>
      <PageHeader
        title="Assign Member"
        subtitle={`Add a sales employee to ${team.name}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'HR', href: '/hr' },
          { label: 'Teams', href: '/hr?tab=teams' },
          { label: team.name, href: `/hr/teams/${teamId}/members` },
          { label: 'Assign Member', active: true },
        ]}
        compact={true}
      />

      <Card sx={{ maxWidth: '640px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={0} sx={{ p: 3, mb: 3, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                ➕ Assign to Team
              </Typography>

              <Grid container spacing={3}>
                {/* Employee select — Sales only */}
                <Grid item xs={12}>
                  <Controller name="employee_id" control={control} render={({ field }) => (
                    <TextField {...field} select label="Sales Employee" fullWidth required
                      error={!!errors.employee_id} helperText={errors.employee_id?.message || `${employees.length} active sales employee${employees.length !== 1 ? 's' : ''} available`}>
                      <MenuItem value="" disabled>Select a sales employee</MenuItem>
                      {employees.length === 0 && (
                        <MenuItem disabled>No active sales employees available</MenuItem>
                      )}
                      {employees.map(e => (
                        <MenuItem key={e.id} value={e.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.25 }}>
                            <Avatar sx={{ width: 28, height: 28, fontSize: 11, fontWeight: 700, background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)', flexShrink: 0 }}>
                              {getInitials(e.full_name)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600}>{e.full_name}</Typography>
                              <Typography variant="caption" color="text.secondary">{e.username}</Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  )} />
                </Grid>

                {/* Selected employee preview */}
                {selectedEmp && (
                  <Grid item xs={12}>
                    <Box sx={{ p: 2, backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)' }}>
                        {getInitials(selectedEmp.full_name)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={700}>{selectedEmp.full_name}</Typography>
                        <Typography variant="caption" color="text.secondary">{selectedEmp.email}</Typography>
                      </Box>
                      <Chip label="Sales" size="small" sx={{ backgroundColor: '#DBEAFE', color: '#1D4ED8', fontWeight: 700, fontSize: '11px' }} />
                    </Box>
                  </Grid>
                )}

                {/* Role */}
                <Grid item xs={12} md={6}>
                  <Controller name="role" control={control} render={({ field }) => (
                    <TextField {...field} select label="Role in Team" fullWidth required
                      error={!!errors.role} helperText={errors.role?.message}>
                      {TEAM_MEMBER_ROLES.map(r => (
                        <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                      ))}
                    </TextField>
                  )} />
                </Grid>

                {/* Status toggle */}
                <Grid item xs={12} md={6}>
                  <Controller name="is_active" control={control} render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 1 }}>
                      <Typography variant="body2" fontWeight={500}>Status</Typography>
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={e => field.onChange(e.target.checked)} color="success" />}
                        label={
                          <Typography variant="body2" fontWeight={600} sx={{ color: field.value ? '#16A34A' : '#DC2626' }}>
                            {field.value ? 'Active' : 'Inactive'}
                          </Typography>
                        } />
                    </Box>
                  )} />
                </Grid>
              </Grid>
            </Paper>


            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate(`/hr/teams/${teamId}/members`)} disabled={isSubmitting} sx={{ minWidth: '120px' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
                sx={{ minWidth: '160px', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.4)', '&:hover': { boxShadow: '0 6px 10px -2px rgba(37,99,235,0.5)', transform: 'translateY(-1px)' } }}>
                {isSubmitting ? 'Assigning...' : 'Assign Member'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}