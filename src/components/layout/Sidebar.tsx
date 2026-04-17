import { Box, Drawer, Typography } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import type { Priority, Status } from '@/types/task'
import type { TaskFilters, ViewMode } from '@/hooks/useTaskFilters'

// ─── NavItem ──────────────────────────────────────────────────────────────────

interface NavItemProps {
  icon: React.ReactNode
  label: string
  count?: number
  active?: boolean
  onClick: () => void
}

function NavItem({ icon, label, count, active, onClick }: NavItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 1.5,
        py: '7px',
        borderRadius: '7px',
        cursor: 'pointer',
        mb: 0.5,
        bgcolor: active ? '#1a1a2e' : 'transparent',
        color: active ? '#818cf8' : '#525252',
        transition: 'all 150ms ease',
        '&:hover': {
          bgcolor: active ? '#1a1a2e' : '#141414',
          color: active ? '#818cf8' : '#a3a3a3',
        },
      }}
    >
      {icon}
      <Typography
        sx={{ fontSize: '0.825rem', fontWeight: active ? 500 : 400, flex: 1, color: 'inherit' }}
      >
        {label}
      </Typography>
      {count !== undefined && count > 0 && (
        <Typography
          sx={{
            fontSize: '0.68rem',
            color: active ? '#818cf8' : '#404040',
            bgcolor: active ? '#252550' : '#1a1a1a',
            px: 0.75,
            py: 0.25,
            borderRadius: '4px',
            fontWeight: 600,
            minWidth: 18,
            textAlign: 'center',
            lineHeight: '16px',
          }}
        >
          {count}
        </Typography>
      )}
    </Box>
  )
}

// ─── FilterChip ───────────────────────────────────────────────────────────────

interface FilterChipProps {
  label: string
  dot?: string
  active: boolean
  onClick: () => void
}

function FilterChip({ label, dot, active, onClick }: FilterChipProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        px: '10px',
        py: '5px',
        borderRadius: '6px',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: active ? '#6366f1' : '#1f1f1f',
        bgcolor: active ? 'rgba(99,102,241,0.08)' : 'transparent',
        color: active ? '#818cf8' : '#525252',
        fontSize: '0.75rem',
        fontWeight: active ? 600 : 400,
        userSelect: 'none',
        transition: 'all 150ms ease',
        '&:hover': {
          borderColor: active ? '#6366f1' : '#333',
          color: active ? '#818cf8' : '#a3a3a3',
        },
      }}
    >
      {dot && (
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: active ? dot : '#404040',
            flexShrink: 0,
            transition: 'background-color 150ms ease',
          }}
        />
      )}
      {label}
    </Box>
  )
}

// ─── SidebarSection ───────────────────────────────────────────────────────────

function SidebarSection({ title }: { title: string }) {
  return (
    <Typography
      sx={{
        fontSize: '0.62rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#2a2a2a',
        px: 1.5,
        mb: '6px',
        mt: 2,
      }}
    >
      {title}
    </Typography>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  totalCount: number
  pendingCount: number
  completedCount: number
  filters: TaskFilters
  mobileOpen: boolean
  onClose: () => void
}

export function Sidebar({ totalCount, pendingCount, completedCount, filters, mobileOpen, onClose }: SidebarProps) {
  const {
    viewMode,
    setViewMode,
    priorityFilters,
    statusFilters,
    togglePriority,
    toggleStatus,
    clearFilters,
    activeFilterCount,
  } = filters

  const navItems: { view: ViewMode; icon: React.ReactNode; label: string; count: number }[] = [
    { view: 'all',       icon: <FormatListBulletedIcon sx={{ fontSize: 15 }} />,  label: 'Todas las tareas', count: totalCount    },
    { view: 'pending',   icon: <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} />, label: 'Pendientes',       count: pendingCount  },
    { view: 'completed', icon: <CheckCircleOutlineIcon sx={{ fontSize: 15 }} />,  label: 'Completadas',      count: completedCount },
  ]

  const priorityChips: { key: Priority; label: string; dot: string }[] = [
    { key: 'high',   label: 'Alta',  dot: '#f87171' },
    { key: 'medium', label: 'Media', dot: '#fb923c' },
    { key: 'low',    label: 'Baja',  dot: '#4ade80' },
  ]

  const statusChips: { key: Status; label: string }[] = [
    { key: 'pending',     label: 'Pendiente'   },
    { key: 'in_progress', label: 'En progreso' },
    { key: 'done',        label: 'Hecho'       },
  ]

  const drawerWidth = 240

  const paperSx = {
    width: drawerWidth,
    boxSizing: 'border-box' as const,
    borderRight: '1px solid #262626',
    bgcolor: '#0a0a0a',
    display: 'flex',
    flexDirection: 'column' as const,
    overflowY: 'auto' as const,
  }

  const content = (
    <>
      {/* Logo */}
      <Box sx={{ px: 2, py: '18px', borderBottom: '1px solid #1a1a1a', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <TaskAltIcon sx={{ fontSize: 15, color: '#fff' }} />
          </Box>
          <Typography
            sx={{ color: '#fafafa', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '-0.02em' }}
          >
            Tasks
          </Typography>
        </Box>
      </Box>

      {/* Navigation + Filters */}
      <Box sx={{ p: '12px 8px', flex: 1 }}>
        {/* View navigation */}
        {navItems.map(({ view, icon, label, count }) => (
          <NavItem
            key={view}
            icon={icon}
            label={label}
            count={count}
            active={viewMode === view}
            onClick={() => setViewMode(view)}
          />
        ))}

        <Box sx={{ height: '1px', bgcolor: '#141414', mx: 1.5, my: '10px' }} />

        {/* Priority filters */}
        <SidebarSection title="Prioridad" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', px: 1 }}>
          {priorityChips.map(({ key, label, dot }) => (
            <FilterChip
              key={key}
              label={label}
              dot={dot}
              active={priorityFilters.includes(key)}
              onClick={() => togglePriority(key)}
            />
          ))}
        </Box>

        {/* Status filters */}
        <SidebarSection title="Estado" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', px: 1 }}>
          {statusChips.map(({ key, label }) => (
            <FilterChip
              key={key}
              label={label}
              active={statusFilters.includes(key)}
              onClick={() => toggleStatus(key)}
            />
          ))}
        </Box>

        {/* Clear filters */}
        {activeFilterCount > 0 && (
          <Box
            onClick={clearFilters}
            sx={{
              mx: 1,
              mt: '10px',
              px: '10px',
              py: '5px',
              borderRadius: '6px',
              cursor: 'pointer',
              border: '1px dashed #333',
              color: '#525252',
              fontSize: '0.75rem',
              textAlign: 'center',
              transition: 'all 150ms ease',
              '&:hover': { borderColor: '#f87171', color: '#f87171' },
            }}
          >
            Limpiar filtros ({activeFilterCount})
          </Box>
        )}
      </Box>

      {/* Footer date */}
      <Box sx={{ px: 2.5, py: 2, borderTop: '1px solid #141414', flexShrink: 0 }}>
        <Typography sx={{ fontSize: '0.7rem', color: '#333', fontWeight: 500 }}>
          {new Date().toLocaleDateString('es', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
      </Box>
    </>
  )

  return (
    <>
      {/* Mobile — temporary Drawer, visible below md */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': paperSx }}
      >
        {content}
      </Drawer>

      {/* Desktop — permanent Drawer, visible md+ */}
      <Drawer
        variant="permanent"
        open
        sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': paperSx }}
      >
        {content}
      </Drawer>
    </>
  )
}
