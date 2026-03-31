import { Box, Typography } from '@mui/material'
import type { Task } from '@/types/task'
import { TaskItem } from '@/components/tasks/TaskItem'
import type { PriorityMeta } from '@/lib/priorities'

export function PriorityColumn({
  priority,
  tasks,
}: {
  priority: PriorityMeta
  tasks: Task[]
}) {
  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      {/* Column header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 2,
          pb: '10px',
          borderBottom: '1px solid #1a1a1a',
        }}
      >
        <Box
          sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: priority.dot, flexShrink: 0 }}
        />
        <Typography
          sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#525252', letterSpacing: '0.02em', flex: 1 }}
        >
          {priority.label}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.68rem',
            color: '#333',
            fontWeight: 600,
            bgcolor: '#141414',
            border: '1px solid #1f1f1f',
            px: '6px',
            py: '2px',
            borderRadius: '4px',
            lineHeight: 1.4,
          }}
        >
          {tasks.length}
        </Typography>
      </Box>

      {/* Tasks */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {tasks.length === 0 ? (
          <Box
            sx={{
              py: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed #1a1a1a',
              borderRadius: '8px',
            }}
          >
            <Typography sx={{ fontSize: '0.75rem', color: '#2a2a2a' }}>Sin tareas</Typography>
          </Box>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </Box>
    </Box>
  )
}

export function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
      <Typography
        sx={{
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#404040',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>
      <Box sx={{ height: '1px', flex: 1, bgcolor: '#1a1a1a' }} />
      <Typography sx={{ fontSize: '0.68rem', color: '#404040', fontWeight: 600 }}>
        {count}
      </Typography>
    </Box>
  )
}
