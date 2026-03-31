import { Box, CircularProgress, Typography } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import { useGetTasks } from '@/hooks/useTasks'
import { TaskItem } from '@/components/tasks/TaskItem'
import { PriorityColumn, SectionHeader } from '@/components/tasks/PriorityColumn'
import { priorityColumns } from '@/lib/priorities'
import type { Priority, Status, Task } from '@/types/task'

interface TaskListProps {
  viewMode?: 'all' | 'pending' | 'completed'
  priorityFilters?: Priority[]
  statusFilters?: Status[]
}

export function TaskList({ viewMode = 'all', priorityFilters = [], statusFilters = [] }: TaskListProps) {
  const { data: tasks, isLoading, isError, error } = useGetTasks()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={22} thickness={4} sx={{ color: '#6366f1' }} />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box
        sx={{
          px: 3,
          py: 2.5,
          borderRadius: '10px',
          bgcolor: '#2d1515',
          border: '1px solid #3d2020',
        }}
      >
        <Typography sx={{ fontSize: '0.875rem', color: '#f87171' }}>
          Error al cargar las tareas:{' '}
          {error instanceof Error ? error.message : 'Error desconocido'}
        </Typography>
      </Box>
    )
  }

  // Apply view + filters
  const applyFilters = (list: Task[]) => {
    let result = list
    if (priorityFilters.length > 0) result = result.filter((t) => priorityFilters.includes(t.priority))
    if (statusFilters.length > 0) result = result.filter((t) => statusFilters.includes(t.status))
    return result
  }

  const allPending = (tasks ?? []).filter((t) => !t.completed)
  const allCompleted = (tasks ?? []).filter((t) => t.completed)

  const pending = applyFilters(allPending)
  const completed = applyFilters(allCompleted)

  const showPending = viewMode === 'all' || viewMode === 'pending'
  const showCompleted = viewMode === 'all' || viewMode === 'completed'

  const totalVisible = (showPending ? pending.length : 0) + (showCompleted ? completed.length : 0)

  if (totalVisible === 0) {
    return (
      <Box
        sx={{
          py: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          userSelect: 'none',
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '14px',
            bgcolor: '#141414',
            border: '1px solid #1f1f1f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <InboxIcon sx={{ fontSize: 22, color: '#333' }} />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#fafafa', mb: '4px' }}>
            Sin resultados
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', color: '#404040' }}>
            Prueba ajustando los filtros del sidebar
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      {/* Priority grid — pending tasks */}
      {showPending && (
        <Box sx={{ mb: 5 }}>
          <SectionHeader label="Pendientes" count={pending.length} />
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {priorityColumns
              .filter((col) => priorityFilters.length === 0 || priorityFilters.includes(col.key))
              .map((col) => (
                <PriorityColumn
                  key={col.key}
                  priority={col}
                  tasks={pending.filter((t) => t.priority === col.key)}
                />
              ))}
          </Box>
        </Box>
      )}

      {/* Completed list */}
      {showCompleted && completed.length > 0 && (
        <Box>
          <SectionHeader label="Completadas" count={completed.length} />
          {completed.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Box>
      )}
    </Box>
  )
}


