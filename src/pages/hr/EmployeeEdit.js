import React, { useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  MenuItem, Button, Grid, Alert, Paper, FormControlLabel, Switch,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { HRDataService } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast, showErrorToast } from '../../utils/sweetalert';

const EGYPT_PHONE_REGEX = /^01[0-9]{9}$/;

export default function EmployeeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const departments = HRDataService.getDepartments();
  const [employeeData, setEmployeeData] = React.useState(null);
  const [submitError, setSubmitError] = React.useState('');

  const {
    control, handleSubmit, setError, clearErrors, reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      full_name:  '',
      department: '',
      phone:      '',
      is_active:  true,
    },
  });

  useEffect(() => {
    const emp = HRDataService.getEmployeeById(Number(id));
    if (!emp) {
      showErrorToast('Employee not found');
      setTimeout(() => navigate('/hr?tab=employees'), 2000);
      return;
    }
    setEmployeeData(emp);
    reset({
      full_name:  emp.full_name  || '',
      department: emp.department || '',
      phone:      emp.phone      || '',
      is_active:  emp.is_active  ?? true,
    });
  }, [id, navigate, reset]);

  const onSubmit = async (data) => {
    setSubmitError('');
    clearErrors();
    let hasErrors = false;

    if (!data.full_name?.trim()) {
      setError('full_name', { type: 'manual', message: 'Full name is required' });
      hasErrors = true;
    }
    if (!data.department) {
      setError('department', { type: 'manual', message: 'Department is required' });
      hasErrors = true;
    }
    if (!data.phone?.trim()) {
      setError('phone', { type: 'manual', message: 'Phone is required' });
      hasErrors = true;
    } else if (!EGYPT_PHONE_REGEX.test(data.phone.trim())) {
      setError('phone', { type: 'manual', message: 'Must be a valid Egyptian number (01XXXXXXXXX)' });
      hasErrors = true;
    }
    if (hasErrors) return;

    try {
      const payload = {
        full_name:  data.full_name.trim(),
        department: Number(data.department),
        phone:      data.phone.trim(),
        is_active:  data.is_active,
      };
      console.log('Employee Update Payload:', payload);
      HRDataService.updateEmployee(Number(id), payload);
      showSuccessToast('Employee updated successfully!');
      setTimeout(() => navigate('/hr?tab=employees'), 1500);
    } catch (err) {
      setSubmitError('Failed to update employee. Please try again.');
    }
  };

  if (!employeeData) return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography>Loading...</Typography>
    </Box>
  );

  return (
    <Box>
      <PageHeader
        title="Edit Employee"
        subtitle="Update employee information"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'HR', href: '/hr' },
          { label: 'Edit Employee', active: true },
        ]}
        compact
        maxWidth="720px"
      />

      <Card sx={{ maxWidth: '720px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                👤 Employee Information
              </Typography>
              <Grid container spacing={3}>

                {/* Full Name */}
                <Grid item xs={12} md={6}>
                  <Controller name="full_name" control={control} render={({ field }) => (
                    <TextField {...field} label="Full Name" fullWidth required
                      error={!!errors.full_name} helperText={errors.full_name?.message} />
                  )} />
                </Grid>

                {/* Department */}
                <Grid item xs={12} md={6}>
                  <Controller name="department" control={control} render={({ field }) => (
                    <TextField {...field} select label="Department" fullWidth required
                      error={!!errors.department} helperText={errors.department?.message}>
                      <MenuItem value="">Select department</MenuItem>
                      {departments.map((d) => (
                        <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                      ))}
                    </TextField>
                  )} />
                </Grid>

                {/* Phone */}
                <Grid item xs={12} md={6}>
                  <Controller name="phone" control={control} render={({ field }) => (
                    <TextField {...field} label="Phone Number" fullWidth required
                      placeholder="01XXXXXXXXX"
                      error={!!errors.phone} helperText={errors.phone?.message} />
                  )} />
                </Grid>

                {/* Active Status */}
                <Grid item xs={12} md={6}>
                  <Controller name="is_active" control={control} render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 1 }}>
                      <Typography variant="body2" fontWeight={500}>Status</Typography>
                      <FormControlLabel
                        control={
                          <Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} color="success" />
                        }
                        label={
                          <Typography variant="body2" fontWeight={600}
                            sx={{ color: field.value ? '#16A34A' : '#DC2626' }}>
                            {field.value ? 'Active' : 'Inactive'}
                          </Typography>
                        }
                      />
                    </Box>
                  )} />
                </Grid>
              </Grid>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate('/hr?tab=employees')}
                disabled={isSubmitting} sx={{ minWidth: '120px' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
                sx={{ minWidth: '160px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                {isSubmitting ? 'Updating...' : 'Update Employee'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}