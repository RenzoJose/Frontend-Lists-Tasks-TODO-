import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { z } from 'zod'
import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { useAuth } from '@/contexts/AuthContext'
import type { RegisterDto } from '@/types/auth'

const schema = z
  .object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

export function RegisterPage() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: standardSchemaResolver(schema) })

  const onSubmit = async (data: RegisterDto) => {
    setServerError(null)
    try {
      await registerUser(data)
      void navigate('/tasks')
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status
      if (status === 409) {
        setServerError('Este email ya está registrado.')
      } else {
        setServerError('No se pudo crear la cuenta. Intenta de nuevo.')
      }
    }
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
        <Link
          component={RouterLink}
          to="/"
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
          Inicio
        </Link>

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

        <Paper
          sx={{
            p: 4,
            border: '1px solid #262626',
            borderRadius: '14px',
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fafafa', mb: 0.5, letterSpacing: '-0.02em' }}>
            Crear cuenta
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#525252', mb: 3 }}>
            Empieza a organizar tus tareas
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              autoComplete="email"
              autoFocus
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              autoComplete="new-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
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

            {serverError && (
              <Typography sx={{ fontSize: '0.8125rem', color: '#f87171', bgcolor: '#2d1515', px: 2, py: 1.5, borderRadius: '8px', border: '1px solid #3d2020' }}>
                {serverError}
              </Typography>
            )}

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
              Crear cuenta
            </Button>
          </Box>
        </Paper>

        <Typography sx={{ textAlign: 'center', mt: 3, fontSize: '0.8125rem', color: '#525252' }}>
          ¿Ya tienes cuenta?{' '}
          <Link component={RouterLink} to="/login" sx={{ color: '#818cf8', textDecorationColor: '#818cf8' }}>
            Inicia sesión
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
