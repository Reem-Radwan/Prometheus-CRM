import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon,
  LockReset as LockResetIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthService } from '../data/authService';

/**
 * Password strength checker
 * Returns { score: 0-4, label: string, color: string }
 */
function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '#E5E7EB' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Too short',  color: '#EF4444' },
    { label: 'Weak',       color: '#F97316' },
    { label: 'Fair',       color: '#EAB308' },
    { label: 'Good',       color: '#22C55E' },
    { label: 'Strong',     color: '#10B981' },
  ];
  return { score, ...levels[score] };
}

export default function ChangePassword() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword]   = useState('');
  const [newPassword, setNewPassword]             = useState('');
  const [confirmPassword, setConfirmPassword]     = useState('');

  const [showCurrent, setShowCurrent]   = useState(false);
  const [showNew, setShowNew]           = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);

  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const strength = getPasswordStrength(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // — Validation —
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword === currentPassword) {
      setError('New password must be different from your current password.');
      return;
    }

    setIsLoading(true);

    try {
      // Verify current password by re-authenticating against the mock service
      await AuthService.login(user?.username, currentPassword);

      /**
       * In a real app you would call something like:
       *   await AuthService.changePassword(currentPassword, newPassword);
       * 
       * For this mock we just simulate a brief delay and show success.
       */
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSuccess(true);
    } catch (err) {
      setError('Current password is incorrect.');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Success Screen ───────────────────────────────────────────────────────
  if (success) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F8FAFC',
          p: 2,
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 460,
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            background: 'rgba(255,255,255,0.98)',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 70,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              boxShadow: '0 8px 24px rgba(34,197,94,0.35)',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 44, color: '#fff' }} />
          </Box>

          <Typography variant="h5" fontWeight={700} gutterBottom>
            Password Changed!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Your password has been updated successfully. You can now use your new password to sign in.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              py: 1.7,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: 16,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
              boxShadow: '0 10px 25px rgba(37,99,235,0.4)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 15px 35px rgba(37,99,235,0.5)',
              },
            }}
          >
            Back to Dashboard
          </Button>
        </Card>
      </Box>
    );
  }

  // ─── Main Form ────────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        p: 3,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 460 }}>
        <Card
          sx={{
            width: '100%',
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            background: 'rgba(255,255,255,0.98)',
          }}
        >
          {/* Back Button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            size="small"
            sx={{
              textTransform: 'none',
              color: '#6B7280',
              fontWeight: 600,
              mb: 1,
              px: 1,
              '&:hover': { color: '#2563EB', backgroundColor: 'transparent' },
            }}
          >
            Back
          </Button>

          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
              }}
            >
              <LockResetIcon sx={{ fontSize: 32, color: '#fff' }} />
            </Box>

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Change Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Update your password to keep your account secure
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>

              {/* CURRENT PASSWORD */}
              <TextField
                fullWidth
                label="Current Password"
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowCurrent(!showCurrent)}>
                        {showCurrent ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />

              {/* NEW PASSWORD */}
              <Box>
                <TextField
                  fullWidth
                  label="New Password"
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNew(!showNew)}>
                          {showNew ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />

                {/* Password Strength Bar */}
                {newPassword.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>
                      {[1, 2, 3, 4].map((level) => (
                        <Box
                          key={level}
                          sx={{
                            flex: 1,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor:
                              strength.score >= level ? strength.color : '#E5E7EB',
                            transition: 'background-color 0.3s ease',
                          }}
                        />
                      ))}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: strength.color, fontWeight: 600 }}
                    >
                      {strength.label}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* CONFIRM NEW PASSWORD */}
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your new password"
                error={confirmPassword.length > 0 && confirmPassword !== newPassword}
                helperText={
                  confirmPassword.length > 0 && confirmPassword !== newPassword
                    ? 'Passwords do not match'
                    : ''
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon
                        color={
                          confirmPassword.length > 0 && confirmPassword !== newPassword
                            ? 'error'
                            : 'primary'
                        }
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  fontSize: 16,
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                  boxShadow: '0 10px 25px rgba(37,99,235,0.4)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 35px rgba(37,99,235,0.5)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #93C5FD 0%, #7DD3FC 100%)',
                  },
                }}
              >
                {isLoading ? 'Updating Password...' : 'Update Password'}
              </Button>
            </Box>
          </form>

          {/* Loading Bar */}
          {isLoading && (
            <LinearProgress
              sx={{
                mt: 1.5,
                borderRadius: 2,
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                },
              }}
            />
          )}
        </Card>
      </Box>
    </Box>
  );
}