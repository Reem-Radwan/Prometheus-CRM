import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Alert, Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HRDataService } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast } from '../../utils/sweetalert';

export default function DepartmentCreate() {
  const navigate = useNavigate();
  const [name, setName]               = useState('');
  const [code, setCode]               = useState('');
  const [errors, setErrors]           = useState({});
  const [touched, setTouched]         = useState({});
  const [submitError, setSubmitError] = useState('');

  // Auto-generate code from name unless the user has manually edited the code field
  useEffect(() => {
    if (!touched.code) {
      setCode(name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''));
    }
  }, [name, touched.code]);

  const validate = (n, c) => {
    const errs = {};
    if (!n.trim()) errs.name = 'Department name is required';
    if (!c.trim()) errs.code = 'Code is required';
    else if (!/^[a-z0-9_]+$/.test(c.trim())) errs.code = 'Only lowercase letters, numbers and underscores';
    return errs;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (touched.name) setErrors(prev => ({ ...prev, name: validate(e.target.value, code).name }));
  };

  const handleCodeChange = (e) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setCode(val);
    setTouched(prev => ({ ...prev, code: true }));
    if (touched.code) setErrors(prev => ({ ...prev, code: validate(name, val).code }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errs = validate(name, code);
    setErrors(prev => ({ ...prev, [field]: errs[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    setTouched({ name: true, code: true });
    const errs = validate(name, code);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      HRDataService.createDepartment({ name: name.trim(), code: code.trim() });
      showSuccessToast('Department created successfully!');
      setTimeout(() => navigate('/hr?tab=departments'), 1500);
    } catch (err) {
      setSubmitError('Failed to create department. Please try again.');
    }
  };

  return (
    <Box>
      <PageHeader
        title="New Department"
        subtitle="Create a new department in the organization"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'HR', href: '/hr' },
          { label: 'New Department', active: true },
        ]}
        compact
        maxWidth="720px"
      />

      <Card sx={{ maxWidth: '720px', mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

          <form onSubmit={handleSubmit}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                🏢 Department Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  label="Department Name"
                  fullWidth
                  required
                  value={name}
                  onChange={handleNameChange}
                  onBlur={() => handleBlur('name')}
                  error={!!errors.name}
                  helperText={errors.name || ' '}
                  placeholder="e.g., Customer Success"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Code"
                  fullWidth
                  required
                  value={code}
                  onChange={handleCodeChange}
                  onBlur={() => handleBlur('code')}
                  error={!!errors.code}
                  helperText={errors.code || 'Auto-generated from name · lowercase letters, numbers, underscores only'}
                  placeholder="e.g., customer_success"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { fontFamily: 'monospace', fontSize: '0.9rem' } }}
                />
              </Box>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="large" onClick={() => navigate('/hr?tab=departments')}
                sx={{ minWidth: '120px' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="large"
                sx={{ minWidth: '170px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                Create Department
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}