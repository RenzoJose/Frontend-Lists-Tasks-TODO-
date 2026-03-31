import type { Task, CreateTaskDto, UpdateTaskDto } from '@/types/task'
import api from '@/lib/axios'

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get<Task[]>('/tasks')
  return data
}

export const getTaskById = async (id: number): Promise<Task> => {
  const { data } = await api.get<Task>(`/tasks/${id}`)
  return data
}

export const createTask = async (dto: CreateTaskDto): Promise<Task> => {
  const { data } = await api.post<Task>('/tasks', dto)
  return data
}

export const updateTask = async (id: number, dto: UpdateTaskDto): Promise<Task> => {
  const { data } = await api.put<Task>(`/tasks/${id}`, dto)
  return data
}

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`)
}
