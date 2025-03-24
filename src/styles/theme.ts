import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0ea5e9', // primary-500
      light: '#38bdf8', // primary-400
      dark: '#0284c7', // primary-600
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d946ef', // secondary-500
      light: '#e879f9', // secondary-400
      dark: '#c026d3', // secondary-600
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f97316', // accent-500
    },
    info: {
      main: '#3b82f6',
    },
    success: {
      main: '#22c55e',
    },
    background: {
      default: '#111111', // dark-800
      paper: '#1a1a1a', // dark-700
    },
    text: {
      primary: '#ffffff',
      secondary: '#d1d5db',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 16px',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #0284c7, #0ea5e9)',
          '&:hover': {
            background: 'linear-gradient(45deg, #0369a1, #0284c7)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #c026d3, #d946ef)',
          '&:hover': {
            background: 'linear-gradient(45deg, #a21caf, #c026d3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: 16,
          backgroundColor: '#1a1a1a', // dark-700
          border: '1px solid #222222', // dark-600
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#222222', // dark-600
            },
            '&:hover fieldset': {
              borderColor: '#565656', // dark-400
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0ea5e9', // primary-500
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a', // dark-700
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme; 