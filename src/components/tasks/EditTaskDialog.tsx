import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material'
import type { Priority, Status } from '@/types/task'

interface EditTaskDialogProps {
  open: boolean
  onClose: () => void
  title: string
  onTitleChange: (v: string) => void
  description: string
  onDescriptionChange: (v: string) => void
  priority: Priority
  onPriorityChange: (v: Priority) => void
  status: Status
  onStatusChange: (v: Status) => void
  onSave: () => void
  isSaving: boolean
}

export function EditTaskDialog({
  open,
  onClose,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  priority,
  onPriorityChange,
  status,
  onStatusChange,
  onSave,
  isSaving,
}: EditTaskDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 1, fontWeight: 600, fontSize: '0.9375rem' }}>
        Editar tarea
      </DialogTitle>
      <DialogContent
        sx={{ pb: 1, display: 'flex', flexDirection: 'column', gap: 2, pt: '12px !important' }}
      >
        <TextField
          label="Título"
          fullWidth
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          autoFocus
        />
        <TextField
          label="Descripción (opcional)"
          fullWidth
          multiline
          rows={2}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <TextField
            select
            label="Prioridad"
            fullWidth
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value as Priority)}
          >
            <MenuItem value="high">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#f87171' }} />
                Alta
              </Box>
            </MenuItem>
            <MenuItem value="medium">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#fb923c' }} />
                Media
              </Box>
            </MenuItem>
            <MenuItem value="low">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#4ade80' }} />
                Baja
              </Box>
            </MenuItem>
          </TextField>
          <TextField
            select
            label="Estado"
            fullWidth
            value={status}
            onChange={(e) => onStatusChange(e.target.value as Status)}
          >
            <MenuItem value="pending">Pendiente</MenuItem>
            <MenuItem value="in_progress">En progreso</MenuItem>
            <MenuItem value="done">Hecho</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={onClose}
          sx={{
            borderColor: '#262626',
            color: '#737373',
            '&:hover': { borderColor: '#404040', color: '#fafafa', bgcolor: '#1a1a1a' },
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          size="small"
          loading={isSaving}
          onClick={onSave}
          disabled={!title.trim()}
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' },
          }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
