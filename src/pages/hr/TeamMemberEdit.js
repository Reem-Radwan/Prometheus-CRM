import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  MenuItem, Button, Alert, Paper, FormControlLabel, Switch,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { HRDataService, TEAM_MEMBER_ROLES } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast, showErrorToast } from '../../utils/sweetalert';

export default function TeamMemberEdit() {
  const { teamId, memberId } = useParams();
  const navigate = useNavigate();

  const [memberData, setMemberData]   = useState(null);
  const [employee,   setEmployee]     = useState(null);
  const [team,       setTeam]         = useState(null);
  const [role,       setRole]         = useState('');
  const [isActive,   setIsActive]     = useState(true);
  const [roleError,  setRoleError]    = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const t = HRDataService.getTeamById(Number(teamId));
    if (!t) {
      showErrorToast('Team not found');
      setTimeout(() => navigate('/hr?tab=teams'), 2000);
      return;
    }
    setTeam(t);

    // Try global lookup first, fall back to searching within team members
    let m = HRDataService.getTeamMemberById(Number(memberId));
    if (!m) {
      // fallback: find within the team's member list
      m = HRDataService.getTeamMembersByTeam(Number(teamId))
            .find(tm => tm.id === Number(memberId));
    }

    if (!m) {
      showErrorToast('Member not found');
      setTimeout(() => navigate(`/hr/teams/${teamId}/members`), 2000);
      return;
    }
    setMemberData(m);
    setRole(m.role || '');
    setIsActive(m.is_active ?? true);

    const emp = HRDataService.getEmployeeById(m.employee_id);
    setEmployee(emp);
  }, [teamId, memberId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    setRoleError('');

    if (!role) { setRoleError('Role is required'); return; }

    try {
      const updated = HRDataService.updateTeamMember(Number(memberId), {
        role,
        is_active: isActive,
      });
      if (updated) {
        showSuccessToast('Member updated successfully!');
        setTimeout(() => navigate(`/hr/teams/${teamId}/members`), 1500);
      } else {
        setSubmitError('Failed to update member. Please try again.');
      }
    } catch (err) {
      setSubmitError('Failed to update member. Please try again.');
    }
  };

  if (!memberData || !team) return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography>Loading...</Typography>
    </Box>
  );

  return (
    <Box>
      <PageHeader
        title="Edit Team Member"
        subtitle={`Update role and status for this member in ${team.name}`}
        breadcrumbs={[
          { label: 'Home',         href: '/' },
          { label: 'HR',           href: '/hr' },
          { label: 'Teams',        href: '/hr?tab=teams' },
          { label: team.name,      href: `/hr/teams/${teamId}/members` },
          { label: 'Edit Member',  active: true },
        ]}
        compact
        maxWidth="720px"
      />

      <Card sx={{ maxWidth: '720px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit}>
            {/* ── Employee Info (read-only) ── */}
            <Paper elevation={0} sx={{ p: 3, mb: 3, backgroundColor: '#F0F9FF', border: '1px solid #BFDBFE', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 2.5, color: 'primary.main', fontWeight: 700 }}>
                👤 Employee
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</Typography>
                  <Typography variant="body1" fontWeight={700} sx={{ mt: 0.5 }}>{employee?.full_name || `Employee #${memberData.employee_id}`}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Username</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, fontFamily: 'monospace', color: 'text.secondary' }}>{employee?.username || '—'}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Team</Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5, color: 'primary.main' }}>{team.name}</Typography>
                </Box>
              </Box>
            </Paper>

            {/* ── Editable Fields ── */}
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                ✏️ Member Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

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
                  <MenuItem value="">Select role</MenuItem>
                  {TEAM_MEMBER_ROLES.map((r) => (
                    <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                  ))}
                </TextField>

                {/* Active Status */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 0.5 }}>
                  <Typography variant="body2" fontWeight={500}>Status</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        color="success"
                      />
                    }
                    label={
                      <Typography variant="body2" fontWeight={600} sx={{ color: isActive ? '#16A34A' : '#DC2626' }}>
                        {isActive ? 'Active' : 'Inactive'}
                      </Typography>
                    }
                  />
                </Box>
              </Box>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate(`/hr/teams/${teamId}/members`)}
                sx={{ minWidth: '120px' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="large"
                sx={{ minWidth: '160px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                Update Member
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}