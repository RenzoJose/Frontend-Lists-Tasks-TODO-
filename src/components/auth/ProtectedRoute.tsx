import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Box, CircularProgress } from '@mui/material'

export function ProtectedRoute() {
  const { token, isLoading } = useAuth()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#0a0a0a' }}>
        <CircularProgress size={24} thickness={4} sx={{ color: '#6366f1' }} />
      </Box>
    )
  }

  return token ? <Outlet /> : <Navigate to="/" replace />
}
