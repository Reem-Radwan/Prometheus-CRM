// import React from 'react';
// import {
//   Box, Card, CardContent, Typography, TextField,
//   MenuItem, Button, Grid, Alert, Paper, FormControlLabel, Switch,
// } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { LocationsDataService, CITY_OPTIONS } from '../../data/locationsDataService';
// import PageHeader from '../../components/shared/PageHeader';
// import { showSuccessToast } from '../../utils/sweetalert';

// export default function BranchCreate() {
//   const navigate = useNavigate();
//   const [submitError, setSubmitError] = React.useState('');

//   const {
//     control, handleSubmit, setError, clearErrors,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: {
//       name: '',
//       address: '',
//       city: '',
//       phone: '',
//       google_maps_url: '',
//       is_active: true,
//     },
//   });

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
//       console.log('Branch Payload:', payload);
//       LocationsDataService.createBranch(payload);
//       showSuccessToast('Branch created successfully!');
//       setTimeout(() => navigate('/locations?tab=branches'), 1500);
//     } catch (err) {
//       setSubmitError('Failed to create branch. Please try again.');
//     }
//   };

//   return (
//     <Box>
//       <PageHeader
//         title="New Branch"
//         subtitle="Add a new office or sales branch"
//         breadcrumbs={[
//           { label: 'Home', href: '/' },
//           { label: 'Locations', href: '/locations' },
//           { label: 'New Branch', active: true },
//         ]}
//         compact={true}
//       />

//       <Card sx={{ maxWidth: '720px', mx: 'auto' }}>
//         <CardContent sx={{ p: 4 }}>
//           {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
//               <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
//                 🏢 Branch Details
//               </Typography>

//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={8}>
//                   <Controller name="name" control={control} render={({ field }) => (
//                     <TextField {...field} label="Branch Name" fullWidth required
//                       placeholder="e.g., New Cairo Sales Center"
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
//                       placeholder="e.g., 5th Settlement, New Cairo, Cairo"
//                       error={!!errors.address} helperText={errors.address?.message} />
//                   )} />
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Controller name="phone" control={control} render={({ field }) => (
//                     <TextField {...field} label="Phone Number" fullWidth
//                       placeholder="e.g., 0238001234 (optional)"
//                       error={!!errors.phone} helperText={errors.phone?.message} />
//                   )} />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Controller name="google_maps_url" control={control} render={({ field }) => (
//                     <TextField {...field} label="Google Maps URL" fullWidth
//                       placeholder="e.g., https://maps.google.com/?q=... (optional)"
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

//             <Paper elevation={0} sx={{ p: 2.5, mb: 4, backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: '12px' }}>
//               <Typography variant="body2" sx={{ color: '#1D4ED8' }}>
//                 💡 <strong>Tip:</strong> Branches are used as walk-in locations for leads. Once created, this branch will appear as an option when logging walk-in leads.
//               </Typography>
//             </Paper>

//             <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
//               <Button variant="outlined" size="large" onClick={() => navigate('/locations?tab=branches')} disabled={isSubmitting} sx={{ minWidth: '120px' }}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
//                 sx={{ minWidth: '150px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
//                 {isSubmitting ? 'Creating...' : 'Create Branch'}
//               </Button>
//             </Box>
//           </form>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }


import React from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Grid, Alert, Paper, FormControlLabel, Switch,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LocationsDataService } from '../../data/locationsDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast } from '../../utils/sweetalert';

export default function BranchCreate() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = React.useState('');

  const {
    control, handleSubmit, setError, clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      google_maps_url: '',
      is_active: true,
    },
  });

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
      console.log('Branch Payload:', payload);
      LocationsDataService.createBranch(payload);
      showSuccessToast('Branch created successfully!');
      setTimeout(() => navigate('/locations?tab=branches'), 1500);
    } catch (err) {
      setSubmitError('Failed to create branch. Please try again.');
    }
  };

  return (
    <Box>
      <PageHeader
        title="New Branch"
        subtitle="Add a new office or sales branch"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'New Branch', active: true },
        ]}
        compact={true}
      />

      <Card sx={{ maxWidth: '720px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                🏢 Branch Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller name="name" control={control} render={({ field }) => (
                    <TextField {...field} label="Branch Name" fullWidth required
                      placeholder="e.g., New Cairo Sales Center"
                      error={!!errors.name} helperText={errors.name?.message} />
                  )} />
                </Grid>

                <Grid item xs={12}>
                  <Controller name="address" control={control} render={({ field }) => (
                    <TextField {...field} label="Address" fullWidth required
                      placeholder="e.g., 5th Settlement, New Cairo, Cairo"
                      error={!!errors.address} helperText={errors.address?.message} />
                  )} />
                </Grid>

                <Grid item xs={12}>
                  <Controller name="google_maps_url" control={control} render={({ field }) => (
                    <TextField {...field} label="Google Maps URL" fullWidth
                      placeholder="e.g., https://maps.google.com/?q=... (optional)"
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

            <Paper elevation={0} sx={{ p: 2.5, mb: 4, backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: '12px' }}>
              <Typography variant="body2" sx={{ color: '#1D4ED8' }}>
                💡 <strong>Tip:</strong> Branches are used as walk-in locations for leads. Once created, this branch will appear as an option when logging walk-in leads.
              </Typography>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate('/locations?tab=branches')} disabled={isSubmitting} sx={{ minWidth: '120px' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
                sx={{ minWidth: '150px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                {isSubmitting ? 'Creating...' : 'Create Branch'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}