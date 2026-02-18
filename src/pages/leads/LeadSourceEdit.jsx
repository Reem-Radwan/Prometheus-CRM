import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, MenuItem,
  Button, Grid, Alert, Paper, FormControl, InputLabel,
  Select, FormHelperText,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { DataService } from '../../data/mod1dataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast, showErrorToast } from '../../utils/sweetalert';

const CATEGORIES = [
  { value: 'direct',   label: 'Direct' },
  { value: 'indirect', label: 'Indirect' },
];

export default function LeadSourceEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm]               = useState({ name: '', category: '', system_code: '' });
  const [errors, setErrors]           = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sourceData, setSourceData]   = useState(null);

  // Load existing source
  useEffect(() => {
    const source = DataService.getLeadSourceById(Number(id));
    if (!source) {
      showErrorToast('Lead source not found');
      setTimeout(() => navigate('/lead-sources'), 2000);
      return;
    }
    setSourceData(source);
    setForm({ name: source.name, category: source.category, system_code: source.system_code });
  }, [id, navigate]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name        = 'Name is required';
    if (!form.category)           e.category    = 'Category is required';
    if (!form.system_code.trim()) e.system_code = 'System code is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const updated = DataService.updateLeadSource(Number(id), {
        name:        form.name.trim(),
        category:    form.category,
        system_code: form.system_code.trim(),
      });
      if (updated) {
        showSuccessToast('Lead source updated successfully!');
        setTimeout(() => navigate('/lead-sources'), 1500);
      } else {
        setSubmitError('Failed to update lead source. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!sourceData) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Edit Lead Source"
        subtitle={`Editing: ${sourceData.name}`}
        breadcrumbs={[
          { label: 'Home',         href: '/' },
          { label: 'Leads',        href: '/leads' },
          { label: 'Lead Sources', href: '/leads/sources' },
          { label: 'Edit Source',  active: true },
        ]}
        compact
      />

      <Card sx={{ maxWidth: '700px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit}>
            <Paper
              elevation={0}
              sx={{ p: 3, mb: 4, backgroundColor: '#F0F9FF', border: '1px solid #DBEAFE', borderRadius: '12px' }}
            >
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                📡 Source Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Source Name"
                    fullWidth required
                    value={form.name}
                    onChange={handleChange('name')}
                    error={!!errors.name}
                    helperText={errors.name || 'e.g. Facebook Ads, LinkedIn, Walk-in'}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required error={!!errors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select value={form.category} label="Category" onChange={handleChange('category')}>
                      {CATEGORIES.map((c) => (
                        <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.category || 'Direct or Indirect lead source'}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="System Code"
                    fullWidth required
                    value={form.system_code}
                    onChange={handleChange('system_code')}
                    error={!!errors.system_code}
                    helperText={errors.system_code || 'e.g. social_media, walk_in, broker — used internally'}
                    inputProps={{ style: { fontFamily: 'monospace' } }}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate('/lead-sources')}
                disabled={isSubmitting} sx={{ minWidth: '120px' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
                startIcon={<SaveIcon />}
                sx={{ minWidth: '140px', boxShadow: '0 4px 6px -1px rgba(59,130,246,0.4)',
                  '&:hover': { transform: 'translateY(-1px)' }, transition: 'all 0.2s ease' }}>
                {isSubmitting ? 'Updating...' : 'Update Source'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}