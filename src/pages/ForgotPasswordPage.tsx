import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { z } from 'zod'
import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import * as authApi from '@/api/auth'

const schema = z.object({
  email: z.string().email('Email inválido'),
})

type FormData = z.infer<typeof schema>

export function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: standardSchemaResolver(schema) })

  const onSubmit = async (data: FormData) => {
    await authApi.forgotPassword(data.email).catch(() => {
      // siempre mostramos el mensaje genérico, incluso si falla
    })
    setSubmitted(true)
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
          {submitted ? (
            <Box sx={{ textAlign: 'center', py: 1 }}>
              <MailOutlineIcon sx={{ fontSize: 52, color: '#6366f1', mb: 2 }} />
              <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fafafa', mb: 1, letterSpacing: '-0.02em' }}>
                Revisa tu bandeja
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: '#525252', lineHeight: 1.7 }}>
                Si el email existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña.
              </Typography>
            </Box>
          ) : (
            <>
              <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fafafa', mb: 0.5, letterSpacing: '-0.02em' }}>
                Recuperar contraseña
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: '#525252', mb: 3 }}>
                Ingresa tu email y te enviaremos instrucciones.
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
                  Enviar instrucciones
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  )
}

export default ForgotPasswordPage