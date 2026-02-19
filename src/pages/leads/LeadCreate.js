import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../../data/mod1dataService';
import { buildLeadPayload } from '../../utils/validation';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast } from '../../utils/sweetalert';
import { useForm, Controller } from 'react-hook-form';

export default function LeadCreate() {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const leadSources   = DataService.getLeadSources();
  const campaigns     = DataService.getCampaigns();
  const events        = DataService.getEvents();
  const branches      = DataService.getBranches();
  const projectSites  = DataService.getProjectSites();
  const allPartners   = DataService.getPartners();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      first_name:           '',
      last_name:            '',
      phone:                '',
      national_id:          '',
      email:                '',
      source_id:            '',
      job_title:            '',
      notes:                '',
      campaign_id:          '',
      event_id:             '',
      walk_in_branch_id:    '',
      partner_id:           '',
      visit_details: {
        visit_date:          '',
        location_type:       '',
        branch_id:           '',
        project_site_id:     '',
        attendees_count:     '',
      },
    },
  });

  const watchedSourceId    = watch('source_id');
  const watchedLocationType = watch('visit_details.location_type');
  const watchedPhone       = watch('phone');
  const watchedEmail       = watch('email');

  useEffect(() => {
    if (watchedSourceId) {
      const source = DataService.getLeadSourceById(watchedSourceId);
      setSelectedSource(source || null);
    } else {
      setSelectedSource(null);
    }
  }, [watchedSourceId]);

  const validatePhoneUnique = (phone) => {
    if (!phone) return;
    if (!DataService.isPhoneUnique(phone)) setError('phone', { type: 'manual', message: 'This phone number already exists' });
    else clearErrors('phone');
  };

  const validateNationalIdUnique = (nationalId) => {
    if (!nationalId) return;
    if (!DataService.isNationalIdUnique(nationalId)) setError('national_id', { type: 'manual', message: 'This National ID already exists' });
    else clearErrors('national_id');
  };

  const onSubmit = async (data) => {
    setSubmitError('');
    if (!data.source_id) { setError('source_id', { type: 'manual', message: 'Lead source is required' }); return; }
    if (!data.phone?.trim() && !data.email?.trim()) {
      setError('phone', { type: 'manual', message: 'Provide at least a phone number or email' });
      setError('email', { type: 'manual', message: 'Provide at least a phone number or email' });
      return;
    }
    if (data.phone?.trim() && !DataService.isPhoneUnique(data.phone)) { setError('phone', { type: 'manual', message: 'This phone number already exists' }); return; }
    if (data.national_id?.trim() && !DataService.isNationalIdUnique(data.national_id)) { setError('national_id', { type: 'manual', message: 'This National ID already exists' }); return; }
    try {
      const payload = buildLeadPayload(data, selectedSource?.system_code || '');
      const newLead = DataService.createLead(payload);
      console.log('Created Lead:', newLead);
      showSuccessToast('Lead created successfully!');
      setTimeout(() => navigate('/leads'), 1500);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to create lead. Please try again.');
    }
  };

  const getFilteredPartners = () => {
    if (!selectedSource) return [];
    if (selectedSource.system_code === 'broker')     return DataService.getPartnersByType('broker');
    if (selectedSource.system_code === 'ambassador') return DataService.getPartnersByType('ambassador');
    if (selectedSource.system_code === 'visit')      return allPartners;
    return [];
  };

  const handlePhoneChange = (field, value) => { field.onChange(value); if (value?.trim()) { clearErrors('email'); clearErrors('phone'); } };
  const handleEmailChange = (field, value) => { field.onChange(value); if (value?.trim()) { clearErrors('phone'); clearErrors('email'); } };

  return (
    <Box>
      <PageHeader
        title="Create New Lead"
        subtitle="Add a new potential customer to your CRM system"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Leads', href: '/leads' },
          { label: 'Create', active: true },
        ]}
        compact
        maxWidth="1000px"
      />

      <Card sx={{ maxWidth: '1000px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>📋 Basic Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller name="first_name" control={control} render={({ field }) => (
                    <TextField {...field} label="First Name" fullWidth error={!!errors.first_name} helperText={errors.first_name?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="last_name" control={control} render={({ field }) => (
                    <TextField {...field} label="Last Name" fullWidth error={!!errors.last_name} helperText={errors.last_name?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="phone" control={control} render={({ field }) => (
                    <TextField {...field} label="Phone" fullWidth placeholder="01XXXXXXXXX" error={!!errors.phone}
                      helperText={errors.phone?.message || 'Egyptian mobile number (e.g. 01012345678)'}
                      onChange={(e) => handlePhoneChange(field, e.target.value)}
                      onBlur={(e) => { field.onBlur(); validatePhoneUnique(e.target.value); }} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="national_id" control={control} render={({ field }) => (
                    <TextField {...field} label="National ID" fullWidth placeholder="14 digits (optional)" error={!!errors.national_id} helperText={errors.national_id?.message}
                      onBlur={(e) => { field.onBlur(); validateNationalIdUnique(e.target.value); }} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="email" control={control} render={({ field }) => (
                    <TextField {...field} label="Email" type="email" fullWidth placeholder="email@example.com" error={!!errors.email} helperText={errors.email?.message}
                      onChange={(e) => handleEmailChange(field, e.target.value)} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="job_title" control={control} render={({ field }) => (
                    <TextField {...field} label="Job Title" fullWidth placeholder="e.g., Manager, Engineer (optional)" error={!!errors.job_title} helperText={errors.job_title?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="notes" control={control} render={({ field }) => (
                    <TextField {...field} label="Notes" fullWidth multiline rows={3} placeholder="Any additional information (optional)" error={!!errors.notes} helperText={errors.notes?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="source_id" control={control} render={({ field }) => (
                    <TextField {...field} select label="Lead Source" fullWidth required error={!!errors.source_id} helperText={errors.source_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                      <MenuItem value="">Select a source</MenuItem>
                      {leadSources.map((source) => <MenuItem key={source.id} value={source.id}>{source.name}</MenuItem>)}
                    </TextField>
                  )} />
                </Grid>
                {!watchedPhone?.trim() && !watchedEmail?.trim() && (
                  <Grid item xs={12}>
                    <Alert severity="info" sx={{ py: 0.5 }}>
                      At least one contact method is required — phone <strong>or</strong> email.
                    </Alert>
                  </Grid>
                )}
              </Grid>
            </Paper>

            {selectedSource && (
              <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: '12px' }}>
                <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                  🎯 {selectedSource.name} - Additional Details
                </Typography>
                <Grid container spacing={3}>
                  {selectedSource.system_code === 'social_media' && (
                    <Grid item xs={12} md={6}>
                      <Controller name="campaign_id" control={control} render={({ field }) => (
                        <TextField {...field} select label="Campaign" fullWidth error={!!errors.campaign_id} helperText={errors.campaign_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                          <MenuItem value="">Select a campaign</MenuItem>
                          {campaigns.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                        </TextField>
                      )} />
                    </Grid>
                  )}
                  {selectedSource.system_code === 'events' && (
                    <Grid item xs={12} md={6}>
                      <Controller name="event_id" control={control} render={({ field }) => (
                        <TextField {...field} select label="Event" fullWidth error={!!errors.event_id} helperText={errors.event_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                          <MenuItem value="">Select an event</MenuItem>
                          {events.map((e) => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
                        </TextField>
                      )} />
                    </Grid>
                  )}
                  {selectedSource.system_code === 'walk_in' && (
                    <Grid item xs={12} md={6}>
                      <Controller name="walk_in_branch_id" control={control} render={({ field }) => (
                        <TextField {...field} select label="Branch" fullWidth error={!!errors.walk_in_branch_id} helperText={errors.walk_in_branch_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                          <MenuItem value="">Select a branch</MenuItem>
                          {branches.map((b) => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>)}
                        </TextField>
                      )} />
                    </Grid>
                  )}
                  {(selectedSource.system_code === 'broker' || selectedSource.system_code === 'ambassador' || selectedSource.system_code === 'visit') && (
                    <Grid item xs={12} md={6}>
                      <Controller name="partner_id" control={control} render={({ field }) => (
                        <TextField {...field} select label="Partner" fullWidth error={!!errors.partner_id} helperText={errors.partner_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                          <MenuItem value="">Select a partner</MenuItem>
                          {getFilteredPartners().map((p) => <MenuItem key={p.id} value={p.id}>{p.name} ({p.type})</MenuItem>)}
                        </TextField>
                      )} />
                    </Grid>
                  )}
                  {selectedSource.system_code === 'visit' && (
                    <>
                      <Grid item xs={12} md={6}>
                        <Controller name="visit_details.visit_date" control={control} render={({ field }) => (
                          <TextField {...field} label="Visit Date" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} error={!!errors.visit_details?.visit_date} helperText={errors.visit_details?.visit_date?.message} />
                        )} />
                      </Grid>
                      <Grid item xs={12}>
                        <Controller name="visit_details.location_type" control={control} render={({ field }) => (
                          <FormControl component="fieldset" error={!!errors.visit_details?.location_type}>
                            <FormLabel component="legend">Location Type</FormLabel>
                            <RadioGroup {...field} row>
                              <FormControlLabel value="branch" control={<Radio />} label="Branch" />
                              <FormControlLabel value="site"   control={<Radio />} label="Project Site" />
                            </RadioGroup>
                            {errors.visit_details?.location_type && <FormHelperText>{errors.visit_details.location_type.message}</FormHelperText>}
                          </FormControl>
                        )} />
                      </Grid>
                      {watchedLocationType === 'branch' && (
                        <Grid item xs={12} md={6}>
                          <Controller name="visit_details.branch_id" control={control} render={({ field }) => (
                            <TextField {...field} select label="Branch" fullWidth error={!!errors.visit_details?.branch_id} helperText={errors.visit_details?.branch_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                              <MenuItem value="">Select a branch</MenuItem>
                              {branches.map((b) => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>)}
                            </TextField>
                          )} />
                        </Grid>
                      )}
                      {watchedLocationType === 'site' && (
                        <Grid item xs={12} md={6}>
                          <Controller name="visit_details.project_site_id" control={control} render={({ field }) => (
                            <TextField {...field} select label="Project Site" fullWidth error={!!errors.visit_details?.project_site_id} helperText={errors.visit_details?.project_site_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                              <MenuItem value="">Select a site</MenuItem>
                              {projectSites.map((s) => <MenuItem key={s.id} value={s.id}>{s.name} ({s.code})</MenuItem>)}
                            </TextField>
                          )} />
                        </Grid>
                      )}
                      <Grid item xs={12} md={6}>
                        <Controller name="visit_details.attendees_count" control={control} render={({ field }) => (
                          <TextField {...field} label="Attendees Count" type="number" fullWidth placeholder="Number of attendees (optional)" onChange={(e) => field.onChange(Number(e.target.value) || '')} />
                        )} />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Paper>
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="outlined" size="large" onClick={() => navigate('/leads')} disabled={isSubmitting} sx={{ minWidth: '120px' }}>Cancel</Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ minWidth: '120px', boxShadow: '0 4px 6px -1px rgba(59,130,246,0.4)' }}>
                {isSubmitting ? 'Creating...' : 'Create Lead'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}