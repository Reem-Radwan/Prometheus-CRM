
import React from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  MenuItem, Button, Grid, Alert, Paper, FormControlLabel, Switch,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { HRDataService, TEAM_MEMBER_ROLES } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast } from '../../utils/sweetalert';

export default function TeamMemberAssign() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = React.useState('');

  const team = HRDataService.getTeamById(Number(teamId));
  const employees = HRDataService.getEmployees().filter((e) => e.is_active);

  const {
    control, handleSubmit, setError, clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      employee_id: '',
      role: 'sales_rep',
      is_team_leader: false,
      is_active: true,
    },
  });

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

    // Check duplicate
    if (HRDataService.isEmployeeInTeam(data.employee_id, teamId)) {
      setError('employee_id', { type: 'manual', message: 'This employee is already an active member of this team' });
      return;
    }

    try {
      const payload = {
        team_id:        Number(teamId),
        employee_id:    Number(data.employee_id),
        role:           data.role,
        is_team_leader: data.is_team_leader, // ✅ API field: id, team, employee, role, is_team_leader, is_active
        is_active:      data.is_active,
      };
      console.log('Team Member Payload:', payload);
      HRDataService.createTeamMember(payload);
      showSuccessToast('Member assigned to team successfully!');
      setTimeout(() => navigate(`/hr/teams/${teamId}/members`), 1500);
    } catch (err) {
      setSubmitError('Failed to assign member. Please try again.');
    }
  };

  return (
    <Box>
      <PageHeader
        title="Assign Member"
        subtitle={`Add a member to ${team.name}`}
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
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                ➕ Assign to Team
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller name="employee_id" control={control} render={({ field }) => (
                    <TextField {...field} select label="Employee" fullWidth required
                      error={!!errors.employee_id} helperText={errors.employee_id?.message}>
                      <MenuItem value="">Select an employee</MenuItem>
                      {employees.map((e) => (
                        <MenuItem key={e.id} value={e.id}>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>{e.full_name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {HRDataService.getDepartmentName(e.department)} · {e.username}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  )} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller name="role" control={control} render={({ field }) => (
                    <TextField {...field} select label="Role in Team" fullWidth required
                      error={!!errors.role} helperText={errors.role?.message}>
                      {TEAM_MEMBER_ROLES.map((r) => (
                        <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                      ))}
                    </TextField>
                  )} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller name="is_team_leader" control={control} render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 1 }}>
                      <Typography variant="body2" fontWeight={500}>Team Leader</Typography>
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} color="warning" />}
                        label={<Typography variant="body2" fontWeight={600}
                          sx={{ color: field.value ? '#D97706' : '#6B7280' }}>
                          {field.value ? 'Yes' : 'No'}
                        </Typography>} />
                    </Box>
                  )} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller name="is_active" control={control} render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 1 }}>
                      <Typography variant="body2" fontWeight={500}>Status</Typography>
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} color="success" />}
                        label={<Typography variant="body2" fontWeight={600}
                          sx={{ color: field.value ? '#16A34A' : '#DC2626' }}>
                          {field.value ? 'Active' : 'Inactive'}
                        </Typography>} />
                    </Box>
                  )} />
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={0} sx={{ p: 2.5, mb: 4, backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: '12px' }}>
              <Typography variant="body2" sx={{ color: '#1D4ED8' }}>
                💡 <strong>Note:</strong> Toggle <strong>Team Leader</strong> to mark this member as a team leader independently of their role. A team can have multiple leaders.
              </Typography>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate(`/hr/teams/${teamId}/members`)} disabled={isSubmitting} sx={{ minWidth: '120px' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
                sx={{ minWidth: '160px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                {isSubmitting ? 'Assigning...' : 'Assign Member'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}