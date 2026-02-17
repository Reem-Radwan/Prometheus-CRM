import React, { useState } from 'react';
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
  Paper,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PartnersDataService } from '../../data/partnersDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast } from '../../utils/sweetalert';

// Egypt phone regex: 01XXXXXXXXX
const EGYPT_PHONE_REGEX = /^01[0-9]{9}$/;

export default function PartnerCreate() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      type: '',
      phone: '',
      company_name: '',
      commission: '',
      contract_active: true,
    },
  });

  const watchedType = watch('type');

  const validatePhoneUnique = (phone) => {
    if (!phone) return true;
    const isUnique = PartnersDataService.isPhoneUnique(phone);
    if (!isUnique) {
      setError('phone', { type: 'manual', message: 'This phone number already exists' });
      return false;
    }
    clearErrors('phone');
    return true;
  };

  const onSubmit = async (data) => {
    setSubmitError('');
    clearErrors();
    let hasErrors = false;

    if (!data.name?.trim()) {
      setError('name', { type: 'manual', message: 'Name is required' });
      hasErrors = true;
    }
    if (!data.type) {
      setError('type', { type: 'manual', message: 'Type is required' });
      hasErrors = true;
    }
    if (!data.phone) {
      setError('phone', { type: 'manual', message: 'Phone is required' });
      hasErrors = true;
    } else if (!EGYPT_PHONE_REGEX.test(data.phone)) {
      setError('phone', { type: 'manual', message: 'Phone must be a valid Egyptian number (01XXXXXXXXX)' });
      hasErrors = true;
    } else {
      if (!validatePhoneUnique(data.phone)) hasErrors = true;
    }
    if (data.type === 'broker' && !data.company_name?.trim()) {
      setError('company_name', { type: 'manual', message: 'Company name is required for brokers' });
      hasErrors = true;
    }
    if (hasErrors) return;

    try {
      const payload = {
        name: data.name.trim(),
        type: data.type,
        phone: data.phone.startsWith('01') ? '+20' + data.phone.substring(1) : data.phone,
        company_name: data.type === 'broker' && data.company_name?.trim() ? data.company_name.trim() : null,
        commission: data.commission ? parseFloat(data.commission) : null,
        contract_active: data.contract_active,
      };

      console.log('Partner Payload:', payload);
      PartnersDataService.createPartner(payload);
      showSuccessToast('Partner created successfully!');
      setTimeout(() => navigate('/partners'), 1500);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to create partner. Please try again.');
    }
  };

  return (
    <Box>
      <PageHeader
        title="Add New Partner"
        subtitle="Register a new broker or ambassador in your partner network"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Partners', href: '/partners' },
          { label: 'Create', active: true },
        ]}
        compact={true}
      />

      <Card sx={{ maxWidth: '800px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Information */}
            <Paper
              elevation={0}
              sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}
            >
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                🤝 Partner Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Partner Name"
                        fullWidth
                        required
                        placeholder="e.g., Coldwell Banker Egypt"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Partner Type"
                        fullWidth
                        required
                        error={!!errors.type}
                        helperText={errors.type?.message}
                      >
                        <MenuItem value="">Select type</MenuItem>
                        <MenuItem value="broker">Broker</MenuItem>
                        <MenuItem value="ambassador">Ambassador</MenuItem>
                      </TextField>
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
                        helperText={errors.phone?.message || 'Egyptian mobile number (e.g., 01012345678)'}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="commission"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Commission %"
                        type="number"
                        fullWidth
                        placeholder="e.g., 2.5 (optional)"
                        inputProps={{ min: 0, max: 100, step: 0.1 }}
                        error={!!errors.commission}
                        helperText={errors.commission?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Company Name - only for brokers */}
                {watchedType === 'broker' && (
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="company_name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Company Name"
                          fullWidth
                          required
                          placeholder="e.g., Coldwell Banker Real Estate LLC"
                          error={!!errors.company_name}
                          helperText={errors.company_name?.message}
                        />
                      )}
                    />
                  </Grid>
                )}

                <Grid item xs={12} md={6}>
                  <Controller
                    name="contract_active"
                    control={control}
                    render={({ field }) => (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 1 }}>
                        <Typography variant="body2" fontWeight={500}>Contract Status</Typography>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              color="success"
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              sx={{ color: field.value ? '#16A34A' : '#DC2626' }}
                            >
                              {field.value ? 'Active' : 'Inactive'}
                            </Typography>
                          }
                        />
                      </Box>
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Conditional info box */}
            {watchedType && (
              <Paper
                elevation={0}
                sx={{ p: 3, mb: 4, backgroundColor: watchedType === 'broker' ? '#EDE9FE' : '#E0F2FE', border: `1px solid ${watchedType === 'broker' ? '#C4B5FD' : '#BAE6FD'}`, borderRadius: '12px' }}
              >
                <Typography variant="body2" fontWeight={600} sx={{ color: watchedType === 'broker' ? '#5B21B6' : '#0369A1' }}>
                  {watchedType === 'broker'
                    ? '🏢 Broker: Company name is required. Brokers refer clients from real estate agencies.'
                    : '🌟 Ambassador: Individual promoters who refer clients. No company name required.'}
                </Typography>
              </Paper>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/partners')}
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
                sx={{ minWidth: '140px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}
              >
                {isSubmitting ? 'Saving...' : 'Add Partner'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}