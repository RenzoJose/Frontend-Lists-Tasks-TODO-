import { Box, Typography, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function HeroSection() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
        py: 8,
      }}
    >
      <Typography
        variant="overline"
        sx={{ color: '#6366f1', letterSpacing: '0.15em', mb: 2 }}
      >
        Gestión de tareas sin fricción
      </Typography>

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          mb: 3,
          maxWidth: 700,
        }}
      >
        Menos ruido.{' '}
        <Box component="span" sx={{ color: '#6366f1' }}>
          Más foco.
        </Box>
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', maxWidth: 480, mb: 5, fontSize: '1.0625rem' }}
      >
        Captura todo lo que tienes en la cabeza, ordénalo y ejecútalo sin distracciones.
        Tu mente libre, tu trabajo avanzando.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        {user ? (
          <Button
            variant="contained"
            size="large"
            onClick={() => void navigate('/tasks')}
            sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 600 }}
          >
            Ir a mis tareas
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              size="large"
              onClick={() => void navigate('/register')}
              sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 600 }}
            >
              Empieza gratis
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => void navigate('/login')}
              sx={{ px: 4, py: 1.5, fontSize: '1rem', borderColor: '#333', color: 'text.secondary' }}
            >
              Iniciar sesión
            </Button>
          </>
        )}
      </Stack>
    </Box>
  )
}

export default HeroSection
