import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function CTASection() {
  const { user } = useAuth()

  if (user) return null

  return (
    <Box
      sx={{
        py: 12,
        px: 3,
        textAlign: 'center',
        bgcolor: '#0d0d1a',
        borderTop: '1px solid #1a1a2e',
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 2 }}
      >
        Empieza hoy. Es gratis.
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', mb: 5, maxWidth: 400, mx: 'auto' }}
      >
        Sin tarjeta de crédito. Sin compromisos. Solo tú y tus tareas.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Button
          component={RouterLink}
          to="/register"
          variant="contained"
          size="large"
          sx={{ px: 5, py: 1.5, fontSize: '1rem', fontWeight: 600, minWidth: 220 }}
        >
          Crear cuenta gratis
        </Button>

        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          ¿Ya tienes una cuenta?{' '}
          <Box
            component={RouterLink}
            to="/login"
            sx={{ color: 'text.secondary', textDecoration: 'underline', '&:hover': { color: '#6366f1' } }}
          >
            Inicia sesión
          </Box>
        </Typography>
      </Box>
    </Box>
  )
}
