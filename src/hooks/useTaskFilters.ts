import { useState } from 'react'
import type { Priority, Status } from '@/types/task'

export type ViewMode = 'all' | 'pending' | 'completed'

export interface TaskFilters {
  viewMode: ViewMode
  setViewMode: (v: ViewMode) => void
  priorityFilters: Priority[]
  statusFilters: Status[]
  togglePriority: (p: Priority) => void
  toggleStatus: (s: Status) => void
  clearFilters: () => void
  activeFilterCount: number
}

export function useTaskFilters(): TaskFilters {
  const [viewMode, setViewMode] = useState<ViewMode>('all')
  const [priorityFilters, setPriorityFilters] = useState<Priority[]>([])
  const [statusFilters, setStatusFilters] = useState<Status[]>([])

  const togglePriority = (p: Priority) =>
    setPriorityFilters((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    )

  const toggleStatus = (s: Status) =>
    setStatusFilters((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    )

  const clearFilters = () => {
    setPriorityFilters([])
    setStatusFilters([])
  }

  return {
    viewMode,
    setViewMode,
    priorityFilters,
    statusFilters,
    togglePriority,
    toggleStatus,
    clearFilters,
    activeFilterCount: priorityFilters.length + statusFilters.length,
  }
}
