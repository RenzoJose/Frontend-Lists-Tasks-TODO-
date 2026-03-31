import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'

interface DeleteTaskDialogProps {
  open: boolean
  onClose: () => void
  taskTitle: string
  onConfirm: () => void
  isDeleting: boolean
}

export function DeleteTaskDialog({
  open,
  onClose,
  taskTitle,
  onConfirm,
  isDeleting,
}: DeleteTaskDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 1, fontWeight: 600, fontSize: '0.9375rem' }}>
        ¿Eliminar tarea?
      </DialogTitle>
      <DialogContent sx={{ pb: 1 }}>
        <Typography variant="body2" sx={{ color: '#737373' }}>
          Se eliminará{' '}
          <Box component="strong" sx={{ color: '#fafafa', fontWeight: 500 }}>
            "{taskTitle}"
          </Box>{' '}
          de forma permanente. Esta acción no se puede deshacer.
        </Typography>
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
          loading={isDeleting}
          onClick={onConfirm}
          sx={{
            bgcolor: '#2d1515',
            color: '#f87171',
            border: '1px solid #3d2020',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#3a1818', boxShadow: 'none' },
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
