import React, { useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Grid, Alert, Paper, FormControlLabel, Switch,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { HRDataService } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast, showErrorToast } from '../../utils/sweetalert';

export default function TeamEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teamData, setTeamData] = React.useState(null);
  const [submitError, setSubmitError] = React.useState('');

  const {
    control, handleSubmit, setError, clearErrors, reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', code: '', description: '', is_active: true },
  });

  useEffect(() => {
    const team = HRDataService.getTeamById(Number(id));
    if (!team) {
      showErrorToast('Team not found');
      setTimeout(() => navigate('/hr?tab=teams'), 2000);
      return;
    }
    setTeamData(team);
    reset({
      name:        team.name || '',
      code:        team.code || '',
      description: team.description || '',
      is_active:   team.is_active ?? true,
    });
  }, [id, navigate, reset]);

  const onSubmit = async (data) => {
    setSubmitError('');
    clearErrors();
    let hasErrors = false;
    if (!data.name?.trim()) { setError('name', { type: 'manual', message: 'Team name is required' }); hasErrors = true; }
    if (!data.code?.trim()) { setError('code', { type: 'manual', message: 'Team code is required' }); hasErrors = true; }
    if (hasErrors) return;

    try {
      const payload = {
        name:        data.name.trim(),
        code:        data.code.trim().toUpperCase(),
        description: data.description?.trim() || null,
        is_active:   data.is_active,
      };
      HRDataService.updateTeam(Number(id), payload);
      showSuccessToast('Team updated successfully!');
      setTimeout(() => navigate('/hr?tab=teams'), 1500);
    } catch (err) {
      setSubmitError('Failed to update team. Please try again.');
    }
  };

  if (!teamData) return <Box sx={{ p: 4, textAlign: 'center' }}><Typography>Loading...</Typography></Box>;

  return (
    <Box>
      <PageHeader
        title="Edit Team"
        subtitle="Update team details"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'HR', href: '/hr' },
          { label: 'Edit Team', active: true },
        ]}
        compact={true}
      />

      <Card sx={{ maxWidth: '720px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>👥 Team Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Controller name="name" control={control} render={({ field }) => (
                    <TextField {...field} label="Team Name" fullWidth required
                      error={!!errors.name} helperText={errors.name?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller name="code" control={control} render={({ field }) => (
                    <TextField {...field} label="Team Code" fullWidth required
                      inputProps={{ style: { textTransform: 'uppercase' } }}
                      error={!!errors.code} helperText={errors.code?.message || 'Short unique code'} />
                  )} />
                </Grid>
                <Grid item xs={12}>
                  <Controller name="description" control={control} render={({ field }) => (
                    <TextField {...field} label="Description" fullWidth multiline rows={3}
                      error={!!errors.description} helperText={errors.description?.message} />
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

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate('/hr?tab=teams')} disabled={isSubmitting} sx={{ minWidth: '120px' }}>Cancel</Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
                sx={{ minWidth: '150px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                {isSubmitting ? 'Updating...' : 'Update Team'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}