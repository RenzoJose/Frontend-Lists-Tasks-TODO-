export type Priority = 'low' | 'medium' | 'high'

export type Status = 'pending' | 'in_progress' | 'done'

export interface Task {
  id: number
  title: string
  description: string | null
  completed: boolean
  createdAt: string
  priority: Priority
  status: Status
  dueDate: string | null
  updatedAt: string
  category: string | null
  order: number
}

export interface CreateTaskDto {
  title: string
  description?: string
  priority?: Priority
  status?: Status
  dueDate?: string
  category?: string
}

export interface UpdateTaskDto {
  title?: string
  description?: string
  completed?: boolean
  priority?: Priority
  status?: Status
  dueDate?: string
  category?: string
  order?: number
}
