// import React, { useEffect } from 'react';
// import {
//   Box, Card, CardContent, Typography, TextField,
//   MenuItem, Button, Grid, Alert, Paper, FormControlLabel, Switch,
// } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigate, useParams } from 'react-router-dom';
// import { LocationsDataService, CITY_OPTIONS } from '../../data/locationsDataService';
// import PageHeader from '../../components/shared/PageHeader';
// import { showSuccessToast, showErrorToast } from '../../utils/sweetalert';

// export default function BranchEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [branchData, setBranchData] = React.useState(null);
//   const [submitError, setSubmitError] = React.useState('');

//   const {
//     control, handleSubmit, setError, clearErrors, reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: { name: '', address: '', city: '', phone: '', google_maps_url: '', is_active: true },
//   });

//   useEffect(() => {
//     const branch = LocationsDataService.getBranchById(Number(id));
//     if (!branch) {
//       showErrorToast('Branch not found');
//       setTimeout(() => navigate('/locations?tab=branches'), 2000);
//       return;
//     }
//     setBranchData(branch);
//     reset({
//       name: branch.name || '',
//       address: branch.address || '',
//       city: branch.city || '',
//       phone: branch.phone || '',
//       google_maps_url: branch.google_maps_url || '',
//       is_active: branch.is_active ?? true,
//     });
//   }, [id, navigate, reset]);

//   const onSubmit = async (data) => {
//     setSubmitError('');
//     clearErrors();
//     let hasErrors = false;
//     if (!data.name?.trim()) {
//       setError('name', { type: 'manual', message: 'Branch name is required' });
//       hasErrors = true;
//     }
//     if (!data.address?.trim()) {
//       setError('address', { type: 'manual', message: 'Address is required' });
//       hasErrors = true;
//     }
//     if (hasErrors) return;

//     try {
//       const payload = {
//         name: data.name.trim(),
//         address: data.address.trim(),
//         city: data.city || null,
//         phone: data.phone?.trim() || null,
//         google_maps_url: data.google_maps_url?.trim() || null,
//         is_active: data.is_active,
//       };
//       console.log('Update Branch Payload:', payload);
//       LocationsDataService.updateBranch(Number(id), payload);
//       showSuccessToast('Branch updated successfully!');
//       setTimeout(() => navigate('/locations?tab=branches'), 1500);
//     } catch (err) {
//       setSubmitError('Failed to update branch. Please try again.');
//     }
//   };

//   if (!branchData) return <Box sx={{ p: 4, textAlign: 'center' }}><Typography>Loading...</Typography></Box>;

//   return (
//     <Box>
//       <PageHeader
//         title="Edit Branch"
//         subtitle="Update branch details"
//         breadcrumbs={[
//           { label: 'Home', href: '/' },
//           { label: 'Locations', href: '/locations' },
//           { label: 'Edit Branch', active: true },
//         ]}
//         compact={true}
//       />

//       <Card sx={{ maxWidth: '720px', mx: 'auto' }}>
//         <CardContent sx={{ p: 4 }}>
//           {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
//               <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>🏢 Branch Details</Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={8}>
//                   <Controller name="name" control={control} render={({ field }) => (
//                     <TextField {...field} label="Branch Name" fullWidth required
//                       error={!!errors.name} helperText={errors.name?.message} />
//                   )} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <Controller name="city" control={control} render={({ field }) => (
//                     <TextField {...field} select label="City" fullWidth
//                       error={!!errors.city} helperText={errors.city?.message}>
//                       <MenuItem value="">Select city (optional)</MenuItem>
//                       {CITY_OPTIONS.map((c) => (
//                         <MenuItem key={c} value={c}>{c}</MenuItem>
//                       ))}
//                     </TextField>
//                   )} />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Controller name="address" control={control} render={({ field }) => (
//                     <TextField {...field} label="Full Address" fullWidth required
//                       error={!!errors.address} helperText={errors.address?.message} />
//                   )} />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Controller name="phone" control={control} render={({ field }) => (
//                     <TextField {...field} label="Phone Number" fullWidth
//                       error={!!errors.phone} helperText={errors.phone?.message} />
//                   )} />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Controller name="google_maps_url" control={control} render={({ field }) => (
//                     <TextField {...field} label="Google Maps URL" fullWidth
//                       placeholder="https://maps.google.com/?q=... (optional)"
//                       error={!!errors.google_maps_url} helperText={errors.google_maps_url?.message} />
//                   )} />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Controller name="is_active" control={control} render={({ field }) => (
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 1 }}>
//                       <Typography variant="body2" fontWeight={500}>Status</Typography>
//                       <FormControlLabel
//                         control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} color="success" />}
//                         label={<Typography variant="body2" fontWeight={600}
//                           sx={{ color: field.value ? '#16A34A' : '#DC2626' }}>
//                           {field.value ? 'Active' : 'Inactive'}
//                         </Typography>} />
//                     </Box>
//                   )} />
//                 </Grid>
//               </Grid>
//             </Paper>

//             <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
//               <Button variant="outlined" size="large" onClick={() => navigate('/locations?tab=branches')} disabled={isSubmitting} sx={{ minWidth: '120px' }}>Cancel</Button>
//               <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
//                 sx={{ minWidth: '160px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
//                 {isSubmitting ? 'Updating...' : 'Update Branch'}
//               </Button>
//             </Box>
//           </form>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }


import React, { useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Grid, Alert, Paper, FormControlLabel, Switch,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { LocationsDataService } from '../../data/locationsDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast, showErrorToast } from '../../utils/sweetalert';

export default function BranchEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [branchData, setBranchData] = React.useState(null);
  const [submitError, setSubmitError] = React.useState('');

  const {
    control, handleSubmit, setError, clearErrors, reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', address: '', google_maps_url: '', is_active: true },
  });

  useEffect(() => {
    const branch = LocationsDataService.getBranchById(Number(id));
    if (!branch) {
      showErrorToast('Branch not found');
      setTimeout(() => navigate('/locations?tab=branches'), 2000);
      return;
    }
    setBranchData(branch);
    reset({
      name: branch.name || '',
      address: branch.address || '',
      google_maps_url: branch.google_maps_url || '',
      is_active: branch.is_active ?? true,
    });
  }, [id, navigate, reset]);

  const onSubmit = async (data) => {
    setSubmitError('');
    clearErrors();
    let hasErrors = false;
    if (!data.name?.trim()) {
      setError('name', { type: 'manual', message: 'Branch name is required' });
      hasErrors = true;
    }
    if (!data.address?.trim()) {
      setError('address', { type: 'manual', message: 'Address is required' });
      hasErrors = true;
    }
    if (hasErrors) return;

    try {
      const payload = {
        name: data.name.trim(),
        address: data.address.trim(),
        google_maps_url: data.google_maps_url?.trim() || null,
        is_active: data.is_active,
      };
      console.log('Update Branch Payload:', payload);
      LocationsDataService.updateBranch(Number(id), payload);
      showSuccessToast('Branch updated successfully!');
      setTimeout(() => navigate('/locations?tab=branches'), 1500);
    } catch (err) {
      setSubmitError('Failed to update branch. Please try again.');
    }
  };

  if (!branchData) return <Box sx={{ p: 4, textAlign: 'center' }}><Typography>Loading...</Typography></Box>;

  return (
    <Box>
      <PageHeader
        title="Edit Branch"
        subtitle="Update branch details"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Edit Branch', active: true },
        ]}
        compact={true}
      />

      <Card sx={{ maxWidth: '720px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>🏢 Branch Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller name="name" control={control} render={({ field }) => (
                    <TextField {...field} label="Branch Name" fullWidth required
                      error={!!errors.name} helperText={errors.name?.message} />
                  )} />
                </Grid>
                <Grid item xs={12}>
                  <Controller name="address" control={control} render={({ field }) => (
                    <TextField {...field} label="Address" fullWidth required
                      error={!!errors.address} helperText={errors.address?.message} />
                  )} />
                </Grid>
                <Grid item xs={12}>
                  <Controller name="google_maps_url" control={control} render={({ field }) => (
                    <TextField {...field} label="Google Maps URL" fullWidth
                      placeholder="https://maps.google.com/?q=... (optional)"
                      error={!!errors.google_maps_url} helperText={errors.google_maps_url?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller name="is_active" control={control} render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 1 }}>
                      <Typography variant="body2" fontWeight={500}>Status</Typography>
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} color="success" />}
                        label={
                          <Typography variant="body2" fontWeight={600} sx={{ color: field.value ? '#16A34A' : '#DC2626' }}>
                            {field.value ? 'Active' : 'Inactive'}
                          </Typography>
                        } />
                    </Box>
                  )} />
                </Grid>
              </Grid>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate('/locations?tab=branches')} disabled={isSubmitting} sx={{ minWidth: '120px' }}>Cancel</Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
                sx={{ minWidth: '160px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                {isSubmitting ? 'Updating...' : 'Update Branch'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}