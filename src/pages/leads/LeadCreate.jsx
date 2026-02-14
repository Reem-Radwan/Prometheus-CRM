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
  Divider,
  Paper,
  Snackbar,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../../data/dataService';
import { createLeadValidationSchema, buildLeadPayload } from '../../utils/validation';
import PageHeader from '../../components/shared/PageHeader';

export default function LeadCreate() {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState(null);
  const [validationSchema, setValidationSchema] = useState(createLeadValidationSchema(''));
  const [submitError, setSubmitError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
        site_id: '',
        attendees_count: '',
      },
    },
  });

  const watchedSourceId = watch('source_id');
  const watchedLocationType = watch('visit_details.location_type');

  useEffect(() => {
    if (watchedSourceId) {
      const source = DataService.getLeadSourceById(watchedSourceId);
      setSelectedSource(source);
      
      if (source) {
        const newSchema = createLeadValidationSchema(source.system_code);
        setValidationSchema(newSchema);
      }
    } else {
      setSelectedSource(null);
      setValidationSchema(createLeadValidationSchema(''));
    }
  }, [watchedSourceId]);

  const validatePhoneUnique = async (phone) => {
    if (!phone) return true;
    const isUnique = DataService.isPhoneUnique(phone);
    if (!isUnique) {
      setError('phone', {
        type: 'manual',
        message: 'This phone number already exists',
      });
      return false;
    }
    clearErrors('phone');
    return true;
  };

  const validateNationalIdUnique = async (nationalId) => {
    if (!nationalId) return true;
    const isUnique = DataService.isNationalIdUnique(nationalId);
    if (!isUnique) {
      setError('national_id', {
        type: 'manual',
        message: 'This National ID already exists',
      });
      return false;
    }
    clearErrors('national_id');
    return true;
  };

  const onSubmit = async (data) => {
    setSubmitError('');

    const phoneValid = await validatePhoneUnique(data.phone);
    const nationalIdValid = await validateNationalIdUnique(data.national_id);

    if (!phoneValid || !nationalIdValid) {
      return;
    }

    try {
      const payload = buildLeadPayload(data, selectedSource.system_code);
      console.log('Lead Payload:', payload);

      const newLead = DataService.createLead(payload);
      console.log('Created Lead:', newLead);

      setSnackbar({
        open: true,
        message: 'Lead created successfully!',
        severity: 'success'
      });
      
      setTimeout(() => {
        navigate('/leads');
      }, 1500);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to create lead. Please try again.');
    }
  };

  const getFilteredPartners = () => {
    if (!selectedSource) return [];
    
    if (selectedSource.system_code === 'broker') {
      return DataService.getPartnersByType('broker');
    } else if (selectedSource.system_code === 'ambassador') {
      return DataService.getPartnersByType('ambassador');
    } else if (selectedSource.system_code === 'visit') {
      return allPartners;
    }
    return [];
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ mt: { xs: 4, sm: 5, md: 0 } }}>
      <PageHeader
        title="Create New Lead"
        subtitle="Add a new potential customer to your CRM system"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Leads', href: '/leads' },
          { label: 'Create', active: true },
        ]}
      />

      <Card sx={{ maxWidth: '1000px', mx: 'auto', position: 'relative' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Information Section */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 4, 
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
              }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  mb: 3, 
                  color: 'primary.main',
                  fontWeight: 700,
                }}
              >
                📋 Basic Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        fullWidth
                        required
                        error={!!errors.first_name}
                        helperText={errors.first_name?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="last_name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Last Name"
                        fullWidth
                        required
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Phone"
                        fullWidth
                        required
                        placeholder="01XXXXXXXXX"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        onBlur={(e) => {
                          field.onBlur();
                          validatePhoneUnique(e.target.value);
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="national_id"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="National ID"
                        fullWidth
                        placeholder="14 digits (optional)"
                        error={!!errors.national_id}
                        helperText={errors.national_id?.message}
                        onBlur={(e) => {
                          field.onBlur();
                          if (e.target.value) {
                            validateNationalIdUnique(e.target.value);
                          }
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        type="email"
                        fullWidth
                        placeholder="email@example.com (optional)"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>
                 {/* Job Title */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="job_title"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Job Title"
                        fullWidth
                        placeholder="e.g., Manager, Engineer (optional)"
                        error={!!errors.job_title}
                        helperText={errors.job_title?.message}
                      />
                    )}
                  />
                </Grid>
                                          {/* Notes */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Notes"
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Any additional information (optional)"
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="source_id"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Lead Source"
                        fullWidth
                        required
                        error={!!errors.source_id}
                        helperText={errors.source_id?.message}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      >
                        <MenuItem value="">Select a source</MenuItem>
                        {leadSources.map((source) => (
                          <MenuItem key={source.id} value={source.id}>
                            {source.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Dynamic Fields Section */}
            {selectedSource && (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  mb: 4,
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #DBEAFE',
                  borderRadius: '12px',
                }}
              >
                <Typography 
                  variant="h3" 
                  sx={{ 
                    mb: 3, 
                    color: 'primary.main',
                    fontWeight: 700,
                  }}
                >
                  🎯 {selectedSource.name} - Additional Details
                </Typography>

                <Grid container spacing={3}>
                  {/* Social Media → Campaign */}
                  {selectedSource.system_code === 'social_media' && (
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="campaign_id"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Campaign"
                            fullWidth
                            required
                            error={!!errors.campaign_id}
                            helperText={errors.campaign_id?.message}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          >
                            <MenuItem value="">Select a campaign</MenuItem>
                            {campaigns.map((campaign) => (
                              <MenuItem key={campaign.id} value={campaign.id}>
                                {campaign.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                  )}

                  {/* Events → Event */}
                  {selectedSource.system_code === 'events' && (
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="event_id"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Event"
                            fullWidth
                            required
                            error={!!errors.event_id}
                            helperText={errors.event_id?.message}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          >
                            <MenuItem value="">Select an event</MenuItem>
                            {events.map((event) => (
                              <MenuItem key={event.id} value={event.id}>
                                {event.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                  )}

                  {/* Walk-in → Branch */}
                  {selectedSource.system_code === 'walk_in' && (
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="walk_in_branch_id"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Branch"
                            fullWidth
                            required
                            error={!!errors.walk_in_branch_id}
                            helperText={errors.walk_in_branch_id?.message}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          >
                            <MenuItem value="">Select a branch</MenuItem>
                            {branches.map((branch) => (
                              <MenuItem key={branch.id} value={branch.id}>
                                {branch.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                  )}

                  {/* Broker / Ambassador / Visit → Partner */}
                  {(selectedSource.system_code === 'broker' || 
                    selectedSource.system_code === 'ambassador' ||
                    selectedSource.system_code === 'visit') && (
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="partner_id"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Partner"
                            fullWidth
                            required
                            error={!!errors.partner_id}
                            helperText={errors.partner_id?.message}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          >
                            <MenuItem value="">Select a partner</MenuItem>
                            {getFilteredPartners().map((partner) => (
                              <MenuItem key={partner.id} value={partner.id}>
                                {partner.name} ({partner.type})
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                  )}

                  {/* Visit → Visit Details */}
                  {selectedSource.system_code === 'visit' && (
                    <>
                      <Grid item xs={12} md={6}>
                        <Controller
                          name="visit_details.visit_date"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Visit Date"
                              type="datetime-local"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={!!errors.visit_details?.visit_date}
                              helperText={errors.visit_details?.visit_date?.message}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Controller
                          name="visit_details.location_type"
                          control={control}
                          render={({ field }) => (
                            <FormControl 
                              component="fieldset" 
                              error={!!errors.visit_details?.location_type}
                            >
                              <FormLabel component="legend" required>
                                Location Type
                              </FormLabel>
                              <RadioGroup {...field} row>
                                <FormControlLabel
                                  value="branch"
                                  control={<Radio />}
                                  label="Branch"
                                />
                                <FormControlLabel
                                  value="site"
                                  control={<Radio />}
                                  label="Project Site"
                                />
                              </RadioGroup>
                              {errors.visit_details?.location_type && (
                                <FormHelperText>
                                  {errors.visit_details.location_type.message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          )}
                        />
                      </Grid>

                      {watchedLocationType === 'branch' && (
                        <Grid item xs={12} md={6}>
                          <Controller
                            name="visit_details.branch_id"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                select
                                label="Branch"
                                fullWidth
                                required
                                error={!!errors.visit_details?.branch_id}
                                helperText={errors.visit_details?.branch_id?.message}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              >
                                <MenuItem value="">Select a branch</MenuItem>
                                {branches.map((branch) => (
                                  <MenuItem key={branch.id} value={branch.id}>
                                    {branch.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          />
                        </Grid>
                      )}

                      {watchedLocationType === 'site' && (
                        <Grid item xs={12} md={6}>
                          <Controller
                            name="visit_details.site_id"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                select
                                label="Project Site"
                                fullWidth
                                required
                                error={!!errors.visit_details?.site_id}
                                helperText={errors.visit_details?.site_id?.message}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              >
                                <MenuItem value="">Select a site</MenuItem>
                                {projectSites.map((site) => (
                                  <MenuItem key={site.id} value={site.id}>
                                    {site.name} ({site.code})
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          />
                        </Grid>
                      )}

                      <Grid item xs={12} md={6}>
                        <Controller
                          name="visit_details.attendees_count"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Attendees Count"
                              type="number"
                              fullWidth
                              placeholder="Number of attendees (optional)"
                              onChange={(e) => field.onChange(Number(e.target.value) || '')}
                            />
                          )}
                        />
                      </Grid>
                      
                    </>
                    
                  )}
                  
                </Grid>
                
              </Paper>
              
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginTop : 2 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/leads')}
                disabled={isSubmitting}
                sx={{ minWidth: '120px' }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{ 
                  minWidth: '120px',
                  boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)',
                }}
              >
                {isSubmitting ? 'Creating...' : 'Create Lead'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

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