import { useState, type KeyboardEvent } from 'react'
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Snackbar,
  Alert,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link as RouterLink } from 'react-router-dom'
import { useDemo } from '@/hooks/useDemo'

export function InteractiveDemo() {
  const { tasks, addTask, toggleTask, showSnackbar, dismissSnackbar, isAtLimit } = useDemo()
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    addTask(inputValue)
    setInputValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <Box sx={{ py: 10, px: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        variant="overline"
        sx={{ color: '#6366f1', letterSpacing: '0.15em', mb: 1 }}
      >
        Pruébalo ahora
      </Typography>

      <Typography
        variant="h4"
        sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 1, textAlign: 'center' }}
      >
        Sin registro. Sin esperas.
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}
      >
        Escribe una tarea y márcala como hecha.
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          bgcolor: '#141414',
          border: '1px solid #262626',
          borderRadius: 3,
          p: 3,
        }}
      >
        <TextField
          fullWidth
          placeholder={isAtLimit ? 'Regístrate para añadir más tareas' : 'Añade una tarea...'}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isAtLimit}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleAdd}
                  disabled={isAtLimit || !inputValue.trim()}
                  sx={{ color: '#6366f1' }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {tasks.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'text.disabled', textAlign: 'center', py: 3 }}>
            Tu lista está vacía — añade algo arriba
          </Typography>
        ) : (
          <List disablePadding>
            {tasks.map(task => (
              <ListItem
                key={task.id}
                disablePadding
                sx={{
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#1a1a1a' },
                  transition: 'background 0.15s',
                }}
              >
                <Checkbox
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  size="small"
                  sx={{ color: '#444', '&.Mui-checked': { color: '#6366f1' } }}
                />
                <ListItemText
                  primary={task.text}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: {
                      textDecoration: task.done ? 'line-through' : 'none',
                      color: task.done ? 'text.disabled' : 'text.primary',
                      transition: 'all 0.15s',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={dismissSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="info"
          onClose={dismissSnackbar}
          icon={false}
          action={
            <Button
              component={RouterLink}
              to="/register"
              size="small"
              sx={{ color: '#6366f1', fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              Regístrate gratis →
            </Button>
          }
          sx={{ bgcolor: '#1e1e2e', border: '1px solid #6366f1', color: 'text.primary' }}
        >
          ¿Quieres guardar esto?
        </Alert>
      </Snackbar>
    </Box>
  )
}
