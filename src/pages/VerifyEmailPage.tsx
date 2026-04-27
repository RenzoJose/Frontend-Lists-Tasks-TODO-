import { useSearchParams, Link as RouterLink } from 'react-router-dom'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { useVerifyEmail } from '@/hooks/useVerifyEmail'

function VerifyContent({ state }: { state: ReturnType<typeof useVerifyEmail>['state'] }) {
  if (state === 'loading') {
    return (
      <>
        <CircularProgress size={48} thickness={3} sx={{ color: '#6366f1', mb: 3 }} />
        <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fafafa', mb: 1 }}>
          Verificando tu email...
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: '#525252' }}>
          Un momento, por favor.
        </Typography>
      </>
    )
  }

  if (state === 'success') {
    return (
      <>
        <CheckCircleOutlineIcon sx={{ fontSize: 52, color: '#4ade80', mb: 2 }} />
        <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fafafa', mb: 1 }}>
          ¡Email verificado!
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: '#525252', mb: 3 }}>
          Tu cuenta está activa. Ya puedes iniciar sesión.
        </Typography>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          sx={{
            px: 4,
            py: 1.25,
            fontSize: '0.875rem',
            background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' },
          }}
        >
          Ir al login
        </Button>
      </>
    )
  }

  if (state === 'expired') {
    return (
      <>
        <HourglassEmptyIcon sx={{ fontSize: 52, color: '#fb923c', mb: 2 }} />
        <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fafafa', mb: 1 }}>
          El enlace expiró
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: '#525252', mb: 3, lineHeight: 1.7 }}>
          Los enlaces de verificación son válidos por 24 horas.
          <br />
          Regístrate de nuevo para recibir un email actualizado.
        </Typography>
        <Button component={RouterLink} to="/" variant="outlined" sx={{ borderColor: '#333', color: 'text.secondary' }}>
          Volver al inicio
        </Button>
      </>
    )
  }

  return (
    <>
      <ErrorOutlineIcon sx={{ fontSize: 52, color: '#f87171', mb: 2 }} />
      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fafafa', mb: 1 }}>
        Token inválido
      </Typography>
      <Typography sx={{ fontSize: '0.85rem', color: '#525252', mb: 3, lineHeight: 1.7 }}>
        El enlace ya fue usado o no existe.
        <br />
        Si el problema persiste, intenta registrarte de nuevo.
      </Typography>
      <Button component={RouterLink} to="/" variant="outlined" sx={{ borderColor: '#333', color: 'text.secondary' }}>
        Volver al inicio
      </Button>
    </>
  )
}

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { state } = useVerifyEmail(token)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 5, justifyContent: 'center' }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TaskAltIcon sx={{ fontSize: 17, color: '#fff' }} />
          </Box>
          <Typography sx={{ color: '#fafafa', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>
            Tasks
          </Typography>
        </Box>

        <Box
          sx={{
            p: 4,
            border: '1px solid #262626',
            borderRadius: '14px',
            bgcolor: '#141414',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <VerifyContent state={state} />
        </Box>
      </Box>
    </Box>
  )
}
