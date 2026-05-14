import { lazy, Suspense } from 'react'
import { CssBaseline, ThemeProvider, createTheme, CircularProgress } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Lazy loading para reducir el bundle inicial
const LandingPage = lazy(() => import('./pages/LandingPage'))
const TasksPage = lazy(() => import('./pages/TasksPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))

// Fallback de carga
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
    <CircularProgress size={24} thickness={4} sx={{ color: '#6366f1' }} />
  </div>
)

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
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
