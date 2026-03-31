import { useState } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { z } from 'zod'
import { Box, Button, Collapse, MenuItem, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import type { CreateTaskDto } from '@/types/task'
import { useCreateTask } from '@/hooks/useTasks'

const schema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100, 'Máximo 100 caracteres'),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
})

type FormData = z.infer<typeof schema>

export function TaskForm() {
  const [open, setOpen] = useState(false)
  const { mutate: createTask, isPending } = useCreateTask()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: standardSchemaResolver(schema),
    defaultValues: { title: '', description: '', priority: 'medium' },
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const dto: CreateTaskDto = {
      title: data.title,
      ...(data.description ? { description: data.description } : {}),
      ...(data.priority ? { priority: data.priority } : {}),
    }
    createTask(dto, {
      onSuccess: () => {
        reset()
        setOpen(false)
      },
    })
  }

  const handleCancel = () => {
    reset()
    setOpen(false)
  }

  return (
    <Box sx={{ mb: 5, maxWidth: 480 }}>
      {/* Trigger button */}
      {!open && (
        <Box
          onClick={() => setOpen(true)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 3,
            py: '11px',
            borderRadius: '10px',
            border: '1px dashed #262626',
            cursor: 'pointer',
            color: '#404040',
            transition: 'all 150ms ease',
            userSelect: 'none',
            '&:hover': {
              borderColor: '#6366f1',
              color: '#6366f1',
              bgcolor: 'rgba(99, 102, 241, 0.04)',
            },
          }}
        >
          <AddIcon sx={{ fontSize: 16 }} />
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 400, color: 'inherit' }}>
            Nueva tarea
          </Typography>
        </Box>
      )}

      {/* Expanded form */}
      <Collapse in={open} unmountOnExit>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            bgcolor: '#141414',
            border: '1px solid #262626',
            borderRadius: '12px',
            p: 3,
          }}
        >
          <Typography
            sx={{
              color: '#fafafa',
              fontWeight: 600,
              fontSize: '0.875rem',
              mb: 2.5,
              letterSpacing: '-0.01em',
            }}
          >
            Nueva tarea
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Título"
              fullWidth
              placeholder="¿Qué necesitas hacer?"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              autoFocus
            />
            <TextField
              label="Descripción (opcional)"
              fullWidth
              multiline
              rows={2}
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    label="Prioridad"
                    sx={{ minWidth: 140 }}
                    {...field}
                    error={!!errors.priority}
                    helperText={errors.priority?.message}
                  >
                    <MenuItem value="high">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#f87171', flexShrink: 0 }} />
                        Alta
                      </Box>
                    </MenuItem>
                    <MenuItem value="medium">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#fb923c', flexShrink: 0 }} />
                        Media
                      </Box>
                    </MenuItem>
                    <MenuItem value="low">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#4ade80', flexShrink: 0 }} />
                        Baja
                      </Box>
                    </MenuItem>
                  </TextField>
                )}
              />
              <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleCancel}
                  startIcon={<CloseIcon sx={{ fontSize: '15px !important' }} />}
                  sx={{
                    color: '#525252',
                    fontSize: '0.8125rem',
                    height: 36,
                    px: 2,
                    '&:hover': { color: '#fafafa', bgcolor: '#1a1a1a' },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  loading={isPending}
                  sx={{
                    height: 36,
                    px: 2.5,
                    fontSize: '0.8125rem',
                    background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                    },
                  }}
                >
                  Crear tarea
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

