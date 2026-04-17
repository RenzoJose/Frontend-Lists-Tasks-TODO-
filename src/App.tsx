import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { TasksPage } from './pages/TasksPage'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0a0a',
      paper: '#141414',
    },
    text: {
      primary: '#fafafa',
      secondary: '#737373',
      disabled: '#525252',
    },
    divider: '#262626',
    error: { main: '#f87171' },
    warning: { main: '#fb923c' },
    success: { main: '#4ade80' },
    info: { main: '#60a5fa' },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h6: { fontWeight: 700, letterSpacing: '-0.01em' },
    body1: { fontSize: '0.9375rem' },
    body2: { fontSize: '0.875rem' },
    overline: { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em' },
    subtitle1: { fontWeight: 600, letterSpacing: '-0.005em' },
  },
  shape: { borderRadius: 10 },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 840, lg: 1280, xl: 1920 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#0a0a0a', margin: 0 },
        '#root': { width: '100%', maxWidth: '100%', margin: 0, textAlign: 'left' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none', backgroundColor: '#141414' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: 'none', backgroundColor: '#141414' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#1a1a1a',
            '& fieldset': { borderColor: '#333' },
            '&:hover fieldset': { borderColor: '#444' },
            '&.Mui-focused fieldset': { borderColor: '#6366f1' },
          },
          '& .MuiInputLabel-root': { color: '#525252' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: '#1f1f1f' },
          '&.Mui-selected': { backgroundColor: '#1a1a2e', '&:hover': { backgroundColor: '#232345' } },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 500, fontSize: '0.72rem' },
        sizeSmall: { height: 20 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
          backgroundColor: '#141414',
          border: '1px solid #262626',
        },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: '#262626' } },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TasksPage />
    </ThemeProvider>
  )
}

export default App
