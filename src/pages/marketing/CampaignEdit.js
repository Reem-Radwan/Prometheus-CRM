import React from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  MenuItem, Button, Grid, Alert, Paper, FormControlLabel, Switch,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { MarketingDataService, getPlatformStyle } from '../../data/marketingDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast, showErrorToast } from '../../utils/sweetalert';

export default function CampaignEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const platforms = MarketingDataService.getPlatforms();
  const [campaignData, setCampaignData] = React.useState(null);
  const [submitError, setSubmitError] = React.useState('');

  const {
    control, handleSubmit, watch, setError, clearErrors, reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', platform_id: '', budget: '', start_date: '', end_date: '', is_active: true },
  });

  const watchedPlatformId = watch('platform_id');

  React.useEffect(() => {
    const campaign = MarketingDataService.getCampaignById(Number(id));
    if (!campaign) {
      showErrorToast('Campaign not found');
      setTimeout(() => navigate('/marketing?tab=campaigns'), 2000);
      return;
    }
    setCampaignData(campaign);
    reset({
      name: campaign.name || '', platform_id: campaign.platform_id || '',
      budget: campaign.budget !== null && campaign.budget !== undefined ? String(campaign.budget) : '',
      start_date: campaign.start_date || '', end_date: campaign.end_date || '', is_active: campaign.is_active ?? true,
    });
  }, [id, navigate, reset]);

  const onSubmit = async (data) => {
    setSubmitError('');
    clearErrors();
    let hasErrors = false;
    if (!data.name?.trim()) { setError('name', { type: 'manual', message: 'Campaign name is required' }); hasErrors = true; }
    if (!data.platform_id) { setError('platform_id', { type: 'manual', message: 'Platform is required' }); hasErrors = true; }
    if (data.start_date && data.end_date && data.end_date < data.start_date) { setError('end_date', { type: 'manual', message: 'End date must be after start date' }); hasErrors = true; }
    if (hasErrors) return;
    try {
      MarketingDataService.updateCampaign(Number(id), {
        name: data.name.trim(), platform_id: Number(data.platform_id),
        budget: data.budget ? Number(data.budget) : null,
        start_date: data.start_date || null, end_date: data.end_date || null, is_active: data.is_active,
      });
      showSuccessToast('Campaign updated successfully!');
      setTimeout(() => navigate('/marketing?tab=campaigns'), 1500);
    } catch (err) {
      setSubmitError('Failed to update campaign. Please try again.');
    }
  };

  if (!campaignData) return <Box sx={{ p: 4, textAlign: 'center' }}><Typography>Loading...</Typography></Box>;

  const platformStyle = watchedPlatformId ? getPlatformStyle(Number(watchedPlatformId)) : null;

  return (
    <Box>
      <PageHeader
        title="Edit Campaign"
        subtitle="Update campaign details"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Marketing', href: '/marketing' },
          { label: 'Edit Campaign', active: true },
        ]}
        compact
        maxWidth="800px"
      />
      <Card sx={{ maxWidth: '800px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>📣 Campaign Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Controller name="name" control={control} render={({ field }) => (
                    <TextField {...field} label="Campaign Name" fullWidth required error={!!errors.name} helperText={errors.name?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller name="platform_id" control={control} render={({ field }) => (
                    <TextField {...field} select label="Platform" fullWidth required error={!!errors.platform_id} helperText={errors.platform_id?.message} onChange={(e) => field.onChange(e.target.value)}>
                      <MenuItem value="">Select platform</MenuItem>
                      {platforms.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: getPlatformStyle(p.id).color }} />
                            {p.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  )} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller name="budget" control={control} render={({ field }) => (
                    <TextField {...field} label="Budget (EGP)" type="number" fullWidth placeholder="e.g., 50000 (optional)" inputProps={{ min: 0, step: 1000 }} error={!!errors.budget} helperText={errors.budget?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller name="start_date" control={control} render={({ field }) => (
                    <TextField {...field} label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} error={!!errors.start_date} helperText={errors.start_date?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller name="end_date" control={control} render={({ field }) => (
                    <TextField {...field} label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} error={!!errors.end_date} helperText={errors.end_date?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller name="is_active" control={control} render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 1 }}>
                      <Typography variant="body2" fontWeight={500}>Status</Typography>
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} color="success" />}
                        label={<Typography variant="body2" fontWeight={600} sx={{ color: field.value ? '#16A34A' : '#DC2626' }}>{field.value ? 'Active' : 'Inactive'}</Typography>} />
                    </Box>
                  )} />
                </Grid>
              </Grid>
            </Paper>
            {platformStyle && (
              <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: platformStyle.bg, border: `1px solid ${platformStyle.color}30`, borderRadius: '12px' }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: platformStyle.color }}>
                  🎯 Platform: <strong>{platformStyle.label}</strong>
                </Typography>
              </Paper>
            )}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate('/marketing?tab=campaigns')} disabled={isSubmitting} sx={{ minWidth: '120px' }}>Cancel</Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ minWidth: '160px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                {isSubmitting ? 'Updating...' : 'Update Campaign'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}