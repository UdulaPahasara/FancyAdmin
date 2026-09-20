import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6D28D9', // Royal Purple
      dark: '#5B21B6', // Deep Purple
    },
    secondary: {
      main: '#0F172A', // Deep Navy (Sidebar)
      dark: '#1E293B', // Slate Navy (Sidebar Hover)
    },
    background: {
      default: '#F8FAFC', // Soft Gray
      paper: '#FFFFFF', // Card White
    },
    text: {
      primary: '#0F172A', // Dark Navy
      secondary: '#64748B', // Slate
    },
    error: {
      main: '#EF4444', // Red
    },
    warning: {
      main: '#F59E0B', // Amber
    },
    success: {
      main: '#10B981', // Emerald
    },
    divider: '#E2E8F0', // Light Slate (Border)
    // Custom colors not standard in MUI palette can be added here or mapped to specific components
    accent: {
      main: '#F97316', // Orange
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      color: '#0F172A',
      fontWeight: 700,
    },
    h2: {
      color: '#0F172A',
      fontWeight: 600,
    },
    h3: {
      color: '#0F172A',
      fontWeight: 600,
    },
    h4: {
      color: '#0F172A',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

export default theme;
