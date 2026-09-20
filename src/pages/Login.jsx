import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (email === 'admin@fancymart.com' && password === 'admin123') {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    // Root: full viewport, flex row, no scroll ever
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* ── LEFT PANEL: Hidden on mobile (xs), visible on tablet+ (sm+) ── */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },  // tablet = sm (600px+)
          flex: { sm: '0 0 45%', md: '0 0 50%' }, // 45% on tablet, 50% on desktop
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6D28D9 0%, #0F172A 100%)',
          position: 'relative',
          overflow: 'hidden',
          p: { sm: 4, md: 6 },
        }}
      >
        {/* Brand Text */}
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 360 }}>
          <Typography
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 700,
              letterSpacing: '-1px',
              fontSize: { sm: '2.2rem', md: '3rem' },
              mb: 2,
            }}
          >
            FancyAdmin
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 400,
              lineHeight: 1.7,
              fontSize: { sm: '0.9rem', md: '1rem' },
            }}
          >
            Manage your entire FancyMart empire from one beautiful dashboard.
          </Typography>
        </Box>

        {/* Decorative circle — top left */}
        <Box sx={{
          position: 'absolute', zIndex: 1,
          width: { sm: 260, md: 400 }, height: { sm: 260, md: 400 },
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          top: { sm: -80, md: -100 }, left: { sm: -80, md: -100 },
        }} />
        {/* Decorative circle — bottom right */}
        <Box sx={{
          position: 'absolute', zIndex: 1,
          width: { sm: 340, md: 500 }, height: { sm: 340, md: 500 },
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          bottom: { sm: -140, md: -180 }, right: { sm: -140, md: -180 },
        }} />
      </Box>

      {/* ── RIGHT PANEL: Full width on mobile, remainder on tablet+ ── */}
      <Box
        sx={{
          flex: 1,                    // Takes all remaining space
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          p: { xs: 2.5, sm: 3, md: 4 },
          overflowY: 'auto',          // Safety: scroll only if form is taller than viewport
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: 400, md: 440 },
            p: { xs: 3, sm: 3.5, md: 5 },
            borderRadius: 3,
            border: { xs: 'none', sm: '1px solid' },
            borderColor: 'divider',
            boxShadow: { xs: 'none', sm: '0 4px 24px rgba(0,0,0,0.08)' },
            bgcolor: { xs: 'transparent', sm: 'background.paper' },
          }}
        >
          {/* Mobile-only brand header */}
          <Box sx={{ display: { xs: 'block', sm: 'none' }, textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" color="primary" fontWeight={700}>
              FancyAdmin
            </Typography>
          </Box>

          {/* Heading */}
          <Box sx={{ mb: { xs: 2.5, sm: 3 }, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please sign in to your account
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@fancymart.com"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />

            <TextField
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 1.5 }}
            />

            {/* Remember me + Forgot password */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: { xs: 'center', sm: 'space-between' },
                alignItems: 'center',
                gap: { xs: 1, sm: 0 },
                mb: { xs: 2.5, sm: 3 },
              }}
            >
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" size="small" />}
                label={
                  <Typography variant="body2" color="text.secondary">
                    Remember me
                  </Typography>
                }
                sx={{ m: 0 }}
              />
              <Link href="#" variant="body2" underline="hover" fontWeight={500}>
                Forgot Password?
              </Link>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: { xs: 1.3, sm: 1.5 },
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 4px 16px rgba(109, 40, 217, 0.3)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.25s ease',
              }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
