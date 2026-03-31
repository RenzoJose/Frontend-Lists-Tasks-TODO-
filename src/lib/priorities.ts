import type { Priority } from '@/types/task'

export interface PriorityMeta {
  key: Priority
  label: string
  dot: string
}

export const priorityColumns: PriorityMeta[] = [
  { key: 'high',   label: 'Alta',  dot: '#f87171' },
  { key: 'medium', label: 'Media', dot: '#fb923c' },
  { key: 'low',    label: 'Baja',  dot: '#4ade80' },
]
