import React, { useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Grid, Alert, Paper, FormControlLabel, Switch,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { MarketingDataService } from '../../data/marketingDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast, showErrorToast } from '../../utils/sweetalert';

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = React.useState(null);
  const [submitError, setSubmitError] = React.useState('');

  const {
    control, handleSubmit, setError, clearErrors, reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', start_date: '', end_date: '', is_active: true },
  });

  useEffect(() => {
    const event = MarketingDataService.getEventById(Number(id));
    if (!event) {
      showErrorToast('Event not found');
      setTimeout(() => navigate('/marketing?tab=events'), 2000);
      return;
    }
    setEventData(event);
    reset({
      name: event.name || '',
      start_date: event.start_date || '',
      end_date: event.end_date || '',
      is_active: event.is_active ?? true,
    });
  }, [id, navigate, reset]);

  const onSubmit = async (data) => {
    setSubmitError('');
    clearErrors();
    let hasErrors = false;
    if (!data.name?.trim()) {
      setError('name', { type: 'manual', message: 'Event name is required' });
      hasErrors = true;
    }
    if (!data.start_date) {
      setError('start_date', { type: 'manual', message: 'Start date is required' });
      hasErrors = true;
    }
    if (data.start_date && data.end_date && data.end_date < data.start_date) {
      setError('end_date', { type: 'manual', message: 'End date must be on or after start date' });
      hasErrors = true;
    }
    if (hasErrors) return;

    try {
      const payload = {
        name: data.name.trim(),
        start_date: data.start_date,
        end_date: data.end_date || null,
        is_active: data.is_active,
      };
      console.log('Update Event Payload:', payload);
      MarketingDataService.updateEvent(Number(id), payload);
      showSuccessToast('Event updated successfully!');
      setTimeout(() => navigate('/marketing?tab=events'), 1500);
    } catch (err) {
      setSubmitError('Failed to update event. Please try again.');
    }
  };

  if (!eventData) return <Box sx={{ p: 4, textAlign: 'center' }}><Typography>Loading...</Typography></Box>;

  return (
    <Box>
      <PageHeader
        title="Edit Event"
        subtitle="Update event details"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Marketing', href: '/marketing' },
          { label: 'Edit Event', active: true },
        ]}
        compact={true}
      />

      <Card sx={{ maxWidth: '700px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>🎪 Event Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller name="name" control={control} render={({ field }) => (
                    <TextField {...field} label="Event Name" fullWidth required
                      error={!!errors.name} helperText={errors.name?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="start_date" control={control} render={({ field }) => (
                    <TextField {...field} label="Start Date" type="date" fullWidth required
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.start_date} helperText={errors.start_date?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="end_date" control={control} render={({ field }) => (
                    <TextField {...field} label="End Date" type="date" fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.end_date} helperText={errors.end_date?.message || 'Optional – leave blank for single-day events'} />
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
              <Button variant="outlined" size="large" onClick={() => navigate('/marketing?tab=events')} disabled={isSubmitting} sx={{ minWidth: '120px' }}>Cancel</Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
                sx={{ minWidth: '150px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                {isSubmitting ? 'Updating...' : 'Update Event'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}