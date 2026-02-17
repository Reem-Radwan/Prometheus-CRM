// import React, { useEffect } from 'react';
// import {
//   Box, Card, CardContent, Typography, TextField,
//   Button, Grid, Alert, Paper, FormControlLabel, Switch,
// } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigate, useParams } from 'react-router-dom';
// import { LocationsDataService } from '../../data/locationsDataService';
// import PageHeader from '../../components/shared/PageHeader';
// import { showSuccessToast, showErrorToast } from '../../utils/sweetalert';

// export default function ProjectSiteEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [siteData, setSiteData] = React.useState(null);
//   const [submitError, setSubmitError] = React.useState('');

//   const {
//     control, handleSubmit, setError, clearErrors, reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: { name: '', code: '', location: '', developer: '', total_units: '', is_active: true },
//   });

//   useEffect(() => {
//     const site = LocationsDataService.getProjectSiteById(Number(id));
//     if (!site) {
//       showErrorToast('Project site not found');
//       setTimeout(() => navigate('/locations?tab=sites'), 2000);
//       return;
//     }
//     setSiteData(site);
//     reset({
//       name: site.name || '',
//       code: site.code || '',
//       location: site.location || '',
//       developer: site.developer || '',
//       total_units: site.total_units !== null && site.total_units !== undefined ? String(site.total_units) : '',
//       is_active: site.is_active ?? true,
//     });
//   }, [id, navigate, reset]);

//   const onSubmit = async (data) => {
//     setSubmitError('');
//     clearErrors();
//     let hasErrors = false;
//     if (!data.name?.trim()) {
//       setError('name', { type: 'manual', message: 'Project name is required' });
//       hasErrors = true;
//     }
//     if (!data.code?.trim()) {
//       setError('code', { type: 'manual', message: 'Project code is required' });
//       hasErrors = true;
//     }
//     if (!data.location?.trim()) {
//       setError('location', { type: 'manual', message: 'Location is required' });
//       hasErrors = true;
//     }
//     if (data.total_units && isNaN(Number(data.total_units))) {
//       setError('total_units', { type: 'manual', message: 'Must be a valid number' });
//       hasErrors = true;
//     }
//     if (hasErrors) return;

//     try {
//       const payload = {
//         name: data.name.trim(),
//         code: data.code.trim().toUpperCase(),
//         location: data.location.trim(),
//         developer: data.developer?.trim() || null,
//         total_units: data.total_units ? Number(data.total_units) : null,
//         is_active: data.is_active,
//       };
//       console.log('Update Project Site Payload:', payload);
//       LocationsDataService.updateProjectSite(Number(id), payload);
//       showSuccessToast('Project site updated successfully!');
//       setTimeout(() => navigate('/locations?tab=sites'), 1500);
//     } catch (err) {
//       setSubmitError('Failed to update project site. Please try again.');
//     }
//   };

//   if (!siteData) return <Box sx={{ p: 4, textAlign: 'center' }}><Typography>Loading...</Typography></Box>;

//   return (
//     <Box>
//       <PageHeader
//         title="Edit Project Site"
//         subtitle="Update project site details"
//         breadcrumbs={[
//           { label: 'Home', href: '/' },
//           { label: 'Locations', href: '/locations' },
//           { label: 'Edit Project Site', active: true },
//         ]}
//         compact={true}
//       />

//       <Card sx={{ maxWidth: '720px', mx: 'auto' }}>
//         <CardContent sx={{ p: 4 }}>
//           {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
//               <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>🏗️ Project Site Details</Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={8}>
//                   <Controller name="name" control={control} render={({ field }) => (
//                     <TextField {...field} label="Project Name" fullWidth required
//                       error={!!errors.name} helperText={errors.name?.message} />
//                   )} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <Controller name="code" control={control} render={({ field }) => (
//                     <TextField {...field} label="Project Code" fullWidth required
//                       inputProps={{ style: { textTransform: 'uppercase' } }}
//                       error={!!errors.code} helperText={errors.code?.message || 'Unique identifier'} />
//                   )} />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Controller name="location" control={control} render={({ field }) => (
//                     <TextField {...field} label="Location / Address" fullWidth required
//                       error={!!errors.location} helperText={errors.location?.message} />
//                   )} />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Controller name="developer" control={control} render={({ field }) => (
//                     <TextField {...field} label="Developer / Company" fullWidth
//                       error={!!errors.developer} helperText={errors.developer?.message} />
//                   )} />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Controller name="total_units" control={control} render={({ field }) => (
//                     <TextField {...field} label="Total Units" type="number" fullWidth
//                       inputProps={{ min: 1, step: 1 }}
//                       error={!!errors.total_units} helperText={errors.total_units?.message} />
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
//               <Button variant="outlined" size="large" onClick={() => navigate('/locations?tab=sites')} disabled={isSubmitting} sx={{ minWidth: '120px' }}>Cancel</Button>
//               <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
//                 sx={{ minWidth: '160px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
//                 {isSubmitting ? 'Updating...' : 'Update Site'}
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

export default function ProjectSiteEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [siteData, setSiteData] = React.useState(null);
  const [submitError, setSubmitError] = React.useState('');

  const {
    control, handleSubmit, setError, clearErrors, reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', code: '', is_active: true },
  });

  useEffect(() => {
    const site = LocationsDataService.getProjectSiteById(Number(id));
    if (!site) {
      showErrorToast('Project site not found');
      setTimeout(() => navigate('/locations?tab=sites'), 2000);
      return;
    }
    setSiteData(site);
    reset({
      name: site.name || '',
      code: site.code || '',
      is_active: site.is_active ?? true,
    });
  }, [id, navigate, reset]);

  const onSubmit = async (data) => {
    setSubmitError('');
    clearErrors();
    let hasErrors = false;
    if (!data.name?.trim()) {
      setError('name', { type: 'manual', message: 'Project name is required' });
      hasErrors = true;
    }
    if (!data.code?.trim()) {
      setError('code', { type: 'manual', message: 'Location code is required' });
      hasErrors = true;
    }
    if (hasErrors) return;

    try {
      const payload = {
        name: data.name.trim(),
        code: data.code.trim().toUpperCase(),
        is_active: data.is_active,
      };
      console.log('Update Project Site Payload:', payload);
      LocationsDataService.updateProjectSite(Number(id), payload);
      showSuccessToast('Project site updated successfully!');
      setTimeout(() => navigate('/locations?tab=sites'), 1500);
    } catch (err) {
      setSubmitError('Failed to update project site. Please try again.');
    }
  };

  if (!siteData) return <Box sx={{ p: 4, textAlign: 'center' }}><Typography>Loading...</Typography></Box>;

  return (
    <Box>
      <PageHeader
        title="Edit Project Site"
        subtitle="Update project site details"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Edit Project Site', active: true },
        ]}
        compact={true}
      />

      <Card sx={{ maxWidth: '720px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>🏗️ Project Site Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Controller name="name" control={control} render={({ field }) => (
                    <TextField {...field} label="Project Name" fullWidth required
                      error={!!errors.name} helperText={errors.name?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller name="code" control={control} render={({ field }) => (
                    <TextField {...field} label="Location Code" fullWidth required
                      inputProps={{ style: { textTransform: 'uppercase' } }}
                      error={!!errors.code} helperText={errors.code?.message || 'Unique identifier'} />
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
              <Button variant="outlined" size="large" onClick={() => navigate('/locations?tab=sites')} disabled={isSubmitting} sx={{ minWidth: '120px' }}>Cancel</Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
                sx={{ minWidth: '160px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                {isSubmitting ? 'Updating...' : 'Update Site'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}