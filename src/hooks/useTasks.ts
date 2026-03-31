import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateTaskDto, UpdateTaskDto } from '@/types/task'
import * as tasksApi from '@/api/tasks'

export const useGetTasks = () =>
  useQuery({ queryKey: ['tasks'], queryFn: tasksApi.getTasks })

export const useGetTask = (id: number) =>
  useQuery({ queryKey: ['tasks', id], queryFn: () => tasksApi.getTaskById(id) })

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateTaskDto) => tasksApi.createTask(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateTaskDto }) =>
      tasksApi.updateTask(id, dto),
    onSuccess: (_data, { id }) => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] })
      void queryClient.invalidateQueries({ queryKey: ['tasks', id] })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => tasksApi.deleteTask(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
