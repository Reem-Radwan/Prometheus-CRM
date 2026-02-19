import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Alert, Paper,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { HRDataService } from '../../data/hrDataService';
import PageHeader from '../../components/shared/PageHeader';
import { showSuccessToast, showErrorToast } from '../../utils/sweetalert';

export default function DepartmentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState(null);
  const [name, setName]               = useState('');
  const [code, setCode]               = useState('');
  const [errors, setErrors]           = useState({});
  const [touched, setTouched]         = useState({});
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const dept = HRDataService.getDepartmentById(Number(id));
    if (!dept) {
      showErrorToast('Department not found');
      setTimeout(() => navigate('/hr?tab=departments'), 2000);
      return;
    }
    setDepartmentData(dept);
    setName(dept.name || '');
    setCode(dept.code || '');
  }, [id, navigate]);

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
      const updated = HRDataService.updateDepartment(Number(id), { name: name.trim(), code: code.trim() });
      if (updated) {
        showSuccessToast('Department updated successfully!');
        setTimeout(() => navigate('/hr?tab=departments'), 1500);
      } else {
        setSubmitError('Failed to update department. Please try again.');
      }
    } catch (err) {
      setSubmitError('Failed to update department. Please try again.');
    }
  };

  if (!departmentData) return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography>Loading...</Typography>
    </Box>
  );

  return (
    <Box>
      <PageHeader
        title="Edit Department"
        subtitle="Update department details"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'HR', href: '/hr' },
          { label: 'Edit Department', active: true },
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
                  helperText={errors.code || 'Lowercase letters, numbers, underscores only'}
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
                sx={{ minWidth: '180px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' }}>
                Update Department
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}