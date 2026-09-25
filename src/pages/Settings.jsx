import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  IconButton
} from '@mui/material';
import { PhotoCamera, Save as SaveIcon } from '@mui/icons-material';

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index} style={{ paddingTop: '24px' }}>
      {value === index && children}
    </div>
  );

  return (
    <Box sx={{ maxWidth: 1000, margin: '0 auto', animation: 'fadeIn 0.5s ease-in-out', px: { xs: 0, sm: 1 } }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#1E293B' }}>
        Settings
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748B', mb: 4 }}>
        Manage your store preferences, notifications, and security settings.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabIndex} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', fontSize: { xs: '0.875rem', sm: '1rem' }, minWidth: { xs: 'auto', sm: 160 } },
            '& .Mui-selected': { color: '#6D28D9 !important' },
            '& .MuiTabs-indicator': { backgroundColor: '#6D28D9' }
          }}
        >
          <Tab label="Store Profile" />
          <Tab label="Notifications" />
          <Tab label="Security" />
        </Tabs>
      </Box>

      {/* STORE PROFILE */}
      <TabPanel value={tabIndex} index={0}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'visible' }}>
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4, gap: 3 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar sx={{ width: 100, height: 100, bgcolor: '#F1F5F9', color: '#6D28D9', fontSize: '2.5rem', fontWeight: 'bold' }}>
                  FM
                </Avatar>
                <IconButton 
                  sx={{ 
                    position: 'absolute', 
                    bottom: -10, 
                    right: -10, 
                    backgroundColor: '#6D28D9', 
                    color: 'white',
                    '&:hover': { backgroundColor: '#5B21B6' } 
                  }}
                >
                  <PhotoCamera />
                </IconButton>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Store Logo</Typography>
                <Typography variant="body2" sx={{ color: '#64748B' }}>Update your store's logo here. Recommended size: 512x512px.</Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
              <TextField fullWidth label="Store Name" defaultValue="FancyMart Official" variant="outlined" />
              <TextField fullWidth label="Contact Email" defaultValue="contact@fancymart.com" variant="outlined" />
              <TextField fullWidth label="Phone Number" defaultValue="+1 (555) 123-4567" variant="outlined" />
              <TextField fullWidth label="Currency" defaultValue="USD ($)" variant="outlined" />
              <TextField 
                fullWidth 
                label="Store Address" 
                defaultValue="123 Fancy Avenue, Commerce City, NY 10001" 
                variant="outlined" 
                inputProps={{
                  sx: {
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }
                }}
              />
              <Button 
                fullWidth
                variant="contained" 
                startIcon={<SaveIcon />} 
                sx={{ 
                  height: 56, 
                  bgcolor: '#6D28D9', 
                  '&:hover': { bgcolor: '#5B21B6' }, 
                  borderRadius: 2, 
                  fontWeight: 600, 
                  boxShadow: 'none',
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Save Changes
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* NOTIFICATIONS */}
      <TabPanel value={tabIndex} index={1}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Email Notifications</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel 
                control={<Switch defaultChecked sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6D28D9' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#6D28D9' } }} />} 
                label={<Typography sx={{ fontWeight: 500 }}>New Order Alerts</Typography>} 
              />
              <Typography variant="body2" sx={{ color: '#64748B', ml: 4, mt: -1.5 }}>Receive an email whenever a new order is placed.</Typography>

              <Divider sx={{ my: 1 }} />

              <FormControlLabel 
                control={<Switch defaultChecked sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6D28D9' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#6D28D9' } }} />} 
                label={<Typography sx={{ fontWeight: 500 }}>Low Stock Warnings</Typography>} 
              />
              <Typography variant="body2" sx={{ color: '#64748B', ml: 4, mt: -1.5 }}>Get notified when a product's stock drops below 10.</Typography>

              <Divider sx={{ my: 1 }} />

              <FormControlLabel 
                control={<Switch sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6D28D9' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#6D28D9' } }} />} 
                label={<Typography sx={{ fontWeight: 500 }}>Daily Summary Reports</Typography>} 
              />
              <Typography variant="body2" sx={{ color: '#64748B', ml: 4, mt: -1.5 }}>Receive a daily summary of sales and customer signups.</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button variant="contained" sx={{ bgcolor: '#6D28D9', '&:hover': { bgcolor: '#5B21B6' }, px: 4, py: 1.5, borderRadius: 2, fontWeight: 600, boxShadow: 'none' }}>
                Save Preferences
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* SECURITY */}
      <TabPanel value={tabIndex} index={2}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Change Password</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              <TextField fullWidth label="Current Password" type="password" variant="outlined" />
              <Box />
              <TextField fullWidth label="New Password" type="password" variant="outlined" />
              <TextField fullWidth label="Confirm New Password" type="password" variant="outlined" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, mb: 4 }}>
              <Button variant="contained" sx={{ bgcolor: '#0F172A', '&:hover': { bgcolor: '#1E293B' }, px: 4, py: 1.5, borderRadius: 2, fontWeight: 600, boxShadow: 'none' }}>
                Update Password
              </Button>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Two-Factor Authentication (2FA)</Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
              Add an extra layer of security to your account by requiring more than just a password to log in.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" sx={{ color: '#6D28D9', borderColor: '#6D28D9', '&:hover': { borderColor: '#5B21B6', bgcolor: '#F3F0FF' }, px: 3, py: 1, borderRadius: 2, fontWeight: 600 }}>
                Enable 2FA
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default Settings;
