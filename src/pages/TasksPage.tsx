import { Box, Typography } from '@mui/material'
import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskList } from '@/components/tasks/TaskList'
import { Sidebar } from '@/components/layout/Sidebar'
import { useGetTasks } from '@/hooks/useTasks'
import { useTaskFilters } from '@/hooks/useTaskFilters'

export function TasksPage() {
  const { data: tasks } = useGetTasks()
  const filters = useTaskFilters()

  const allTasks     = tasks ?? []
  const pendingCount   = allTasks.filter((t) => !t.completed).length
  const completedCount = allTasks.filter((t) => t.completed).length

  const headerLabels: Record<string, string> = {
    all:       'Todas las tareas',
    pending:   'Pendientes',
    completed: 'Completadas',
  }
  const headerCount =
    filters.viewMode === 'pending'   ? pendingCount   :
    filters.viewMode === 'completed' ? completedCount :
    allTasks.length

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0a0a0a' }}>
      <Sidebar
        totalCount={allTasks.length}
        pendingCount={pendingCount}
        completedCount={completedCount}
        filters={filters}
      />

      {/* Main content — offset by sidebar width */}
      <Box sx={{ flex: 1, ml: '240px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Sticky header */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            bgcolor: 'rgba(10,10,10,0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #1a1a1a',
            px: { xs: 3, sm: 4 },
            py: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#e5e5e5', letterSpacing: '-0.02em' }}>
            {headerLabels[filters.viewMode]}
          </Typography>
          <Box
            sx={{
              px: 1.25,
              py: 0.5,
              borderRadius: 100,
              bgcolor: '#141414',
              border: '1px solid #262626',
            }}
          >
            <Typography sx={{ fontSize: '0.68rem', color: '#525252', fontWeight: 600 }}>
              {headerCount} {headerCount === 1 ? 'tarea' : 'tareas'}
            </Typography>
          </Box>
        </Box>

        {/* Content area */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 1100,
            width: '100%',
            mx: 'auto',
            px: { xs: 3, sm: 4 },
            py: '36px',
          }}
        >
          <TaskForm />
          <TaskList
            viewMode={filters.viewMode}
            priorityFilters={filters.priorityFilters}
            statusFilters={filters.statusFilters}
          />
        </Box>
      </Box>
    </Box>
  )
}

