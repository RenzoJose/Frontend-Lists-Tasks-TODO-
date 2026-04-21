import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CheckIcon from '@mui/icons-material/Check'
import type { Priority, Status, Task } from '@/types/task'
import { useTaskActions } from '@/hooks/useTaskActions'
import { EditTaskDialog } from './EditTaskDialog'
import { DeleteTaskDialog } from './DeleteTaskDialog'


const priorityConfig: Record<Priority, { label: string; dot: string; bg: string; color: string }> = {
  high:   { label: 'Alta',   dot: '#f87171', bg: '#2d1515', color: '#f87171' },
  medium: { label: 'Media',  dot: '#fb923c', bg: '#2d2415', color: '#fb923c' },
  low:    { label: 'Baja',   dot: '#4ade80', bg: '#152d1d', color: '#4ade80' },
}

const statusConfig: Record<Status, { label: string; bg: string; color: string }> = {
  pending:     { label: 'Pendiente',   bg: '#1a1a1a', color: '#737373' },
  in_progress: { label: 'En progreso', bg: '#151f2d', color: '#60a5fa' },
  done:        { label: 'Hecho',       bg: '#152d1d', color: '#4ade80' },
}

export function TaskItem({ task }: { task: Task }) {
  const actions = useTaskActions(task)
  const priority = priorityConfig[task.priority as Priority] ?? priorityConfig.medium
  const status = statusConfig[task.status as Status] ?? statusConfig.pending

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
          px: 3,
          py: '14px',
          mb: '6px',
          bgcolor: '#141414',
          border: '1px solid #262626',
          borderRadius: '10px',
          opacity: task.completed ? 0.4 : 1,
          transition: 'border-color 200ms ease, opacity 200ms ease',
          '&:hover': {
            borderColor: '#6366f1',
            '& .task-delete-btn': { opacity: 1 },
          },
        }}
      >
        {/* Custom circular checkbox */}
        <Tooltip title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}>
          <Box
            role="checkbox"
            aria-checked={task.completed}
            aria-label={`Marcar "${task.title}" como ${task.completed ? 'pendiente' : 'completada'}`}
            onClick={!actions.isUpdating ? actions.handleToggle : undefined}
            sx={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              border: task.completed ? 'none' : '1.5px solid #383838',
              bgcolor: task.completed ? '#6366f1' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              mt: '1px',
              cursor: actions.isUpdating ? 'wait' : 'pointer',
              transition: 'all 150ms ease',
              '&:hover': {
                borderColor: '#6366f1',
                bgcolor: task.completed ? '#4f46e5' : 'rgba(99, 102, 241, 0.12)',
              },
            }}
          >
            {task.completed && (
              <CheckIcon sx={{ fontSize: 11, color: '#fff' }} />
            )}
          </Box>
        </Tooltip>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '0.875rem',
              textDecoration: task.completed ? 'line-through' : 'none',
              color: '#fafafa',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
              mb: (task.description || task.priority) ? '6px' : 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: { xs: 'normal', sm: 'nowrap' } as const,
            }}
          >
            {task.title}
          </Typography>

          {task.description && (
            <Typography
              sx={{
                fontSize: '0.8125rem',
                color: '#525252',
                mb: '8px',
                lineHeight: 1.55,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {task.description}
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Priority badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                px: '8px',
                py: '3px',
                borderRadius: '5px',
                fontSize: '0.7rem',
                fontWeight: 500,
                bgcolor: priority.bg,
                color: priority.color,
                lineHeight: 1,
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: priority.dot,
                  flexShrink: 0,
                }}
              />
              {priority.label}
            </Box>

            {/* Status badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: '8px',
                py: '3px',
                borderRadius: '5px',
                fontSize: '0.7rem',
                fontWeight: 500,
                bgcolor: status.bg,
                color: status.color,
                lineHeight: 1,
              }}
            >
              {status.label}
            </Box>
          </Box>
        </Box>

        {/* Actions */}
        <Box
          className="task-delete-btn"
          sx={{
            opacity: 0,
            transition: 'opacity 150ms ease',
            flexShrink: 0,
            display: 'flex',
            gap: '2px',
            '@media (hover: none)': { opacity: 1 },
          }}
        >
          <Tooltip title="Editar tarea">
            <IconButton
              size="small"
              onClick={actions.openEdit}
              sx={{
                color: '#404040',
                width: 28,
                height: 28,
                '&:hover': { color: '#818cf8', bgcolor: '#1a1a2e' },
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar tarea">
            <span>
              <IconButton
                size="small"
                onClick={actions.openConfirm}
                disabled={actions.isDeleting}
                sx={{
                  color: '#404040',
                  width: 28,
                  height: 28,
                  '&:hover': { color: '#f87171', bgcolor: '#2d1515' },
                }}
              >
                <DeleteOutlineIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* Edit dialog */}
      <EditTaskDialog
        open={actions.editOpen}
        onClose={actions.closeEdit}
        title={actions.editTitle}
        onTitleChange={actions.setEditTitle}
        description={actions.editDescription}
        onDescriptionChange={actions.setEditDescription}
        priority={actions.editPriority}
        onPriorityChange={actions.setEditPriority}
        status={actions.editStatus}
        onStatusChange={actions.setEditStatus}
        onSave={actions.handleEditSave}
        isSaving={actions.isUpdating}
      />

      {/* Confirm delete dialog */}
      <DeleteTaskDialog
        open={actions.confirmOpen}
        onClose={actions.closeConfirm}
        taskTitle={task.title}
        onConfirm={actions.handleDeleteConfirm}
        isDeleting={actions.isDeleting}
      />
    </>
  )
}

