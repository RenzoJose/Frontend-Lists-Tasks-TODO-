import { useState } from 'react'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { z } from 'zod'
import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import HomeIcon from '@mui/icons-material/Home'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import * as authApi from '@/api/auth'

const schema = z
  .object({
    newPassword: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>
type ResetState = 'form' | 'success' | 'invalid' | 'expired'

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [resetState, setResetState] = useState<ResetState>(token ? 'form' : 'invalid')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: standardSchemaResolver(schema) })

  const onSubmit = async (data: FormData) => {
    if (!token) return
    try {
      await authApi.resetPassword(token, data.newPassword)
      setResetState('success')
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status
      setResetState(status === 410 ? 'expired' : 'invalid')
    }
  }

  const renderContent = () => {
    if (resetState === 'success') {
      return (
        <Box sx={{ textAlign: 'center', py: 1 }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 52, color: '#4ade80', mb: 2 }} />
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fafafa', mb: 1, letterSpacing: '-0.02em' }}>
            ¡Contraseña actualizada!
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#525252', mb: 3 }}>
            Ya puedes iniciar sesión con tu nueva contraseña.
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
        </Box>
      )
    }

    if (resetState === 'expired') {
      return (
        <Box sx={{ textAlign: 'center', py: 1 }}>
          <HourglassEmptyIcon sx={{ fontSize: 52, color: '#fb923c', mb: 2 }} />
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fafafa', mb: 1, letterSpacing: '-0.02em' }}>
            El enlace expiró
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#525252', mb: 3, lineHeight: 1.7 }}>
            Los enlaces de recuperación son válidos por 1 hora.
            <br />
            Solicita uno nuevo desde la página de recuperación.
          </Typography>
          <Button
            component={RouterLink}
            to="/forgot-password"
            variant="contained"
            sx={{
              px: 4,
              py: 1.25,
              fontSize: '0.875rem',
              background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' },
            }}
          >
            Solicitar nuevo enlace
          </Button>
        </Box>
      )
    }

    if (resetState === 'invalid') {
      return (
        <Box sx={{ textAlign: 'center', py: 1 }}>
          <ErrorOutlineIcon sx={{ fontSize: 52, color: '#f87171', mb: 2 }} />
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fafafa', mb: 1, letterSpacing: '-0.02em' }}>
            Enlace inválido
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#525252', mb: 3, lineHeight: 1.7 }}>
            El enlace ya fue usado o no existe.
          </Typography>
          <Button component={RouterLink} to="/forgot-password" variant="outlined" sx={{ borderColor: '#333', color: 'text.secondary' }}>
            Solicitar nuevo enlace
          </Button>
        </Box>
      )
    }

    return (
      <>
        <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fafafa', mb: 0.5, letterSpacing: '-0.02em' }}>
          Nueva contraseña
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: '#525252', mb: 3 }}>
          Elige una contraseña segura para tu cuenta.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nueva contraseña"
            type="password"
            fullWidth
            autoComplete="new-password"
            autoFocus
            {...register('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
          <TextField
            label="Confirmar contraseña"
            type="password"
            fullWidth
            autoComplete="new-password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            loading={isSubmitting}
            sx={{
              mt: 0.5,
              py: 1.25,
              fontSize: '0.875rem',
              background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' },
            }}
          >
            Restablecer contraseña
          </Button>
        </Box>
      </>
    )
  }

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
        {resetState === 'form' && (
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.8125rem',
              color: '#525252',
              textDecoration: 'none',
              mb: 3,
              '&:hover': { color: '#818cf8' },
              transition: 'color 0.15s',
            }}
          >
            <HomeIcon sx={{ fontSize: 14 }} />
            Volver al login
          </Link>
        )}

        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, justifyContent: 'center' }}>
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

        <Paper sx={{ p: 4, border: '1px solid #262626', borderRadius: '14px' }}>
          {renderContent()}
        </Paper>
      </Box>
    </Box>
  )
}

export default ResetPasswordPage