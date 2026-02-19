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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { DataService } from '../../data/mod1dataService';
import { buildLeadPayload, createLeadValidationSchema } from '../../utils/validation';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast, showErrorToast } from '../../utils/sweetalert';

export default function LeadEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState(null);
  const [validationSchema, setValidationSchema] = useState(createLeadValidationSchema(''));
  const [submitError, setSubmitError] = useState('');
  const [leadData, setLeadData] = useState(null);

  const leadSources = DataService.getLeadSources();
  const campaigns = DataService.getCampaigns();
  const events = DataService.getEvents();
  const branches = DataService.getBranches();
  const projectSites = DataService.getProjectSites();
  const allPartners = DataService.getPartners();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      national_id: '',
      email: '',
      source_id: '',
      job_title: '',
      notes: '',
      campaign_id: '',
      event_id: '',
      walk_in_branch_id: '',
      partner_id: '',
      visit_details: {
        visit_date: '',
        location_type: '',
        branch_id: '',
        project_site_id: '',
        attendees_count: '',
      },
    },
  });

  const watchedSourceId = watch('source_id');
  const watchedLocationType = watch('visit_details.location_type');

  const phoneToDisplay = (phone) => {
    if (!phone) return '';
    if (phone.startsWith('+20')) return '0' + phone.substring(3);
    return phone;
  };

  const normalizePhone = (phone) => {
    if (!phone) return '';
    if (phone.startsWith('+20')) return '0' + phone.substring(3);
    return phone;
  };

  useEffect(() => {
    const lead = DataService.getLeadById(Number(id));
    if (!lead) {
      showErrorToast('Lead not found');
      setTimeout(() => navigate('/leads'), 2000);
      return;
    }
    setLeadData(lead);
    const source = DataService.getLeadSourceById(lead.source_id);
    setSelectedSource(source);
    reset({
      first_name: lead.first_name || '',
      last_name: lead.last_name || '',
      phone: phoneToDisplay(lead.phone),
      national_id: lead.national_id ? String(lead.national_id) : '',
      email: lead.email || '',
      source_id: lead.source_id || '',
      job_title: lead.job_title || '',
      notes: lead.notes || '',
      campaign_id: lead.campaign_id || '',
      event_id: lead.event_id || '',
      walk_in_branch_id: lead.walk_in_branch_id || '',
      partner_id: lead.partner_id || '',
      visit_details: {
        visit_date: lead.visit_details?.visit_date || '',
        location_type: lead.visit_details?.location_type || '',
        branch_id: lead.visit_details?.branch_id || '',
        project_site_id: lead.visit_details?.project_site_id || '',
        attendees_count: lead.visit_details?.attendees_count || '',
      },
    });
  }, [id, navigate, reset]);

  useEffect(() => {
    if (watchedSourceId && leadData) {
      const source = DataService.getLeadSourceById(watchedSourceId);
      setSelectedSource(source);
      if (source) setValidationSchema(createLeadValidationSchema(source.system_code));
    }
  }, [watchedSourceId, leadData]);

  const validatePhoneUnique = async (phone) => {
    if (!phone) return true;
    const normalizedInput = normalizePhone(phone);
    const normalizedLeadPhone = normalizePhone(leadData?.phone);
    if (leadData && normalizedLeadPhone === normalizedInput) { clearErrors('phone'); return true; }
    const isUnique = DataService.isPhoneUnique(phone, leadData?.id);
    if (!isUnique) { setError('phone', { type: 'manual', message: 'This phone number already exists' }); return false; }
    clearErrors('phone');
    return true;
  };

  const validateNationalIdUnique = async (nationalId) => {
    if (!nationalId) return true;
    if (leadData && String(leadData.national_id) === String(nationalId)) { clearErrors('national_id'); return true; }
    const isUnique = DataService.isNationalIdUnique(nationalId, leadData?.id);
    if (!isUnique) { setError('national_id', { type: 'manual', message: 'This National ID already exists' }); return false; }
    clearErrors('national_id');
    return true;
  };

  const onSubmit = async (data) => {
    setSubmitError('');
    clearErrors();
    let hasErrors = false;
    if (!data.first_name || !data.first_name.trim()) { setError('first_name', { type: 'manual', message: 'First name is required' }); hasErrors = true; }
    if (!data.last_name || !data.last_name.trim()) { setError('last_name', { type: 'manual', message: 'Last name is required' }); hasErrors = true; }
    if (!data.phone) { setError('phone', { type: 'manual', message: 'Phone is required' }); hasErrors = true; }
    else if (!/^01[0-9]{9}$/.test(data.phone)) { setError('phone', { type: 'manual', message: 'Phone must be a valid Egyptian number (01XXXXXXXXX)' }); hasErrors = true; }
    else { const phoneValid = await validatePhoneUnique(data.phone); if (!phoneValid) hasErrors = true; }
    if (data.national_id && data.national_id.trim()) {
      if (!/^[0-9]{14}$/.test(data.national_id)) { setError('national_id', { type: 'manual', message: 'National ID must be exactly 14 digits' }); hasErrors = true; }
      else { const nationalIdValid = await validateNationalIdUnique(data.national_id); if (!nationalIdValid) hasErrors = true; }
    }
    if (data.email && data.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { setError('email', { type: 'manual', message: 'Invalid email address' }); hasErrors = true; }
    }
    if (!data.source_id) { setError('source_id', { type: 'manual', message: 'Source is required' }); hasErrors = true; }
    if (selectedSource) {
      switch (selectedSource.system_code) {
        case 'social_media': if (!data.campaign_id) { setError('campaign_id', { type: 'manual', message: 'Campaign is required' }); hasErrors = true; } break;
        case 'events': if (!data.event_id) { setError('event_id', { type: 'manual', message: 'Event is required' }); hasErrors = true; } break;
        case 'walk_in': if (!data.walk_in_branch_id) { setError('walk_in_branch_id', { type: 'manual', message: 'Branch is required' }); hasErrors = true; } break;
        case 'broker': case 'ambassador': if (!data.partner_id) { setError('partner_id', { type: 'manual', message: 'Partner is required' }); hasErrors = true; } break;
        case 'visit':
          if (!data.partner_id) { setError('partner_id', { type: 'manual', message: 'Partner is required' }); hasErrors = true; }
          if (!data.visit_details.visit_date) { setError('visit_details.visit_date', { type: 'manual', message: 'Visit date is required' }); hasErrors = true; }
          if (!data.visit_details.location_type) { setError('visit_details.location_type', { type: 'manual', message: 'Location type is required' }); hasErrors = true; }
          if (data.visit_details.location_type === 'branch' && !data.visit_details.branch_id) { setError('visit_details.branch_id', { type: 'manual', message: 'Branch is required' }); hasErrors = true; }
          if (data.visit_details.location_type === 'site' && !data.visit_details.project_site_id) { setError('visit_details.project_site_id', { type: 'manual', message: 'Project site is required' }); hasErrors = true; }
          break;
        default: break;
      }
    }
    if (hasErrors) return;
    try {
      const payload = buildLeadPayload(data, selectedSource.system_code);
      console.log('Update Payload:', payload);
      DataService.updateLead(Number(id), payload);
      showSuccessToast('Lead updated successfully!');
      setTimeout(() => navigate('/leads'), 1500);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to update lead. Please try again.');
    }
  };

  const getFilteredPartners = () => {
    if (!selectedSource) return [];
    if (selectedSource.system_code === 'broker') return DataService.getPartnersByType('broker');
    else if (selectedSource.system_code === 'ambassador') return DataService.getPartnersByType('ambassador');
    else if (selectedSource.system_code === 'visit') return allPartners;
    return [];
  };

  if (!leadData) return <Box sx={{ p: 4, textAlign: 'center' }}><Typography>Loading...</Typography></Box>;

  return (
    <Box>
      <PageHeader
        title="Edit Lead"
        subtitle="Update lead information"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Leads', href: '/leads' },
          { label: 'Edit', active: true },
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
                    <TextField {...field} label="First Name" fullWidth required error={!!errors.first_name} helperText={errors.first_name?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="last_name" control={control} render={({ field }) => (
                    <TextField {...field} label="Last Name" fullWidth required error={!!errors.last_name} helperText={errors.last_name?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="phone" control={control} render={({ field }) => (
                    <TextField {...field} label="Phone" fullWidth required placeholder="01XXXXXXXXX"
                      helperText={errors.phone?.message || "Egyptian mobile number (e.g., 01012345678)"}
                      error={!!errors.phone} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="national_id" control={control} render={({ field }) => (
                    <TextField {...field} label="National ID" fullWidth placeholder="14 digits (optional)" error={!!errors.national_id} helperText={errors.national_id?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="email" control={control} render={({ field }) => (
                    <TextField {...field} label="Email" type="email" fullWidth placeholder="email@example.com (optional)" error={!!errors.email} helperText={errors.email?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="job_title" control={control} render={({ field }) => (
                    <TextField {...field} label="Job Title" fullWidth placeholder="e.g., Engineer, Manager (optional)" error={!!errors.job_title} helperText={errors.job_title?.message} />
                  )} />
                </Grid>
                <Grid item xs={12}>
                  <Controller name="notes" control={control} render={({ field }) => (
                    <TextField {...field} label="Notes" fullWidth multiline rows={3} placeholder="Additional information about this lead (optional)" error={!!errors.notes} helperText={errors.notes?.message} />
                  )} />
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F0F9FF', border: '1px solid #DBEAFE', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>🎯 Source Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller name="source_id" control={control} render={({ field }) => (
                    <TextField {...field} select label="Lead Source" fullWidth required error={!!errors.source_id} helperText={errors.source_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                      <MenuItem value="">Select a source</MenuItem>
                      {leadSources.map((source) => <MenuItem key={source.id} value={source.id}>{source.name}</MenuItem>)}
                    </TextField>
                  )} />
                </Grid>
                {selectedSource && (
                  <>
                    {selectedSource.system_code === 'social_media' && (
                      <Grid item xs={12} md={6}>
                        <Controller name="campaign_id" control={control} render={({ field }) => (
                          <TextField {...field} select label="Campaign" fullWidth required error={!!errors.campaign_id} helperText={errors.campaign_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                            <MenuItem value="">Select a campaign</MenuItem>
                            {campaigns.map((campaign) => <MenuItem key={campaign.id} value={campaign.id}>{campaign.name}</MenuItem>)}
                          </TextField>
                        )} />
                      </Grid>
                    )}
                    {selectedSource.system_code === 'events' && (
                      <Grid item xs={12} md={6}>
                        <Controller name="event_id" control={control} render={({ field }) => (
                          <TextField {...field} select label="Event" fullWidth required error={!!errors.event_id} helperText={errors.event_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                            <MenuItem value="">Select an event</MenuItem>
                            {events.map((event) => <MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>)}
                          </TextField>
                        )} />
                      </Grid>
                    )}
                    {selectedSource.system_code === 'walk_in' && (
                      <Grid item xs={12} md={6}>
                        <Controller name="walk_in_branch_id" control={control} render={({ field }) => (
                          <TextField {...field} select label="Branch" fullWidth required error={!!errors.walk_in_branch_id} helperText={errors.walk_in_branch_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                            <MenuItem value="">Select a branch</MenuItem>
                            {branches.map((branch) => <MenuItem key={branch.id} value={branch.id}>{branch.name}</MenuItem>)}
                          </TextField>
                        )} />
                      </Grid>
                    )}
                    {(selectedSource.system_code === 'broker' || selectedSource.system_code === 'ambassador' || selectedSource.system_code === 'visit') && (
                      <Grid item xs={12} md={6}>
                        <Controller name="partner_id" control={control} render={({ field }) => (
                          <TextField {...field} select label="Partner" fullWidth required error={!!errors.partner_id} helperText={errors.partner_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                            <MenuItem value="">Select a partner</MenuItem>
                            {getFilteredPartners().map((partner) => <MenuItem key={partner.id} value={partner.id}>{partner.name} ({partner.type})</MenuItem>)}
                          </TextField>
                        )} />
                      </Grid>
                    )}
                    {selectedSource.system_code === 'visit' && (
                      <>
                        <Grid item xs={12} md={6}>
                          <Controller name="visit_details.visit_date" control={control} render={({ field }) => (
                            <TextField {...field} label="Visit Date" type="datetime-local" fullWidth required InputLabelProps={{ shrink: true }} error={!!errors.visit_details?.visit_date} helperText={errors.visit_details?.visit_date?.message} />
                          )} />
                        </Grid>
                        <Grid item xs={12}>
                          <Controller name="visit_details.location_type" control={control} render={({ field }) => (
                            <FormControl component="fieldset" error={!!errors.visit_details?.location_type}>
                              <FormLabel component="legend" required>Location Type</FormLabel>
                              <RadioGroup {...field} row>
                                <FormControlLabel value="branch" control={<Radio />} label="Branch" />
                                <FormControlLabel value="site" control={<Radio />} label="Project Site" />
                              </RadioGroup>
                              {errors.visit_details?.location_type && <FormHelperText>{errors.visit_details.location_type.message}</FormHelperText>}
                            </FormControl>
                          )} />
                        </Grid>
                        {watchedLocationType === 'branch' && (
                          <Grid item xs={12} md={6}>
                            <Controller name="visit_details.branch_id" control={control} render={({ field }) => (
                              <TextField {...field} select label="Branch" fullWidth required error={!!errors.visit_details?.branch_id} helperText={errors.visit_details?.branch_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                                <MenuItem value="">Select a branch</MenuItem>
                                {branches.map((branch) => <MenuItem key={branch.id} value={branch.id}>{branch.name}</MenuItem>)}
                              </TextField>
                            )} />
                          </Grid>
                        )}
                        {watchedLocationType === 'site' && (
                          <Grid item xs={12} md={6}>
                            <Controller name="visit_details.project_site_id" control={control} render={({ field }) => (
                              <TextField {...field} select label="Project Site" fullWidth required error={!!errors.visit_details?.project_site_id} helperText={errors.visit_details?.project_site_id?.message} onChange={(e) => field.onChange(Number(e.target.value))}>
                                <MenuItem value="">Select a site</MenuItem>
                                {projectSites.map((site) => <MenuItem key={site.id} value={site.id}>{site.name} ({site.code})</MenuItem>)}
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
                  </>
                )}
              </Grid>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate('/leads')} disabled={isSubmitting} sx={{ minWidth: '120px' }}>Cancel</Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ minWidth: '120px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                {isSubmitting ? 'Updating...' : 'Update Lead'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}