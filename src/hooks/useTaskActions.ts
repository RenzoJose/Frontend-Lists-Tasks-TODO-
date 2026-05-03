import { useState, useCallback } from 'react'
import type { Priority, Status, Task } from '@/types/task'
import { useUpdateTask, useDeleteTask } from '@/hooks/useTasks'

export interface TaskActions {
  isUpdating: boolean
  isDeleting: boolean
  // Edit dialog
  editOpen: boolean
  openEdit: () => void
  closeEdit: () => void
  editTitle: string
  setEditTitle: (v: string) => void
  editDescription: string
  setEditDescription: (v: string) => void
  editPriority: Priority
  setEditPriority: (v: Priority) => void
  editStatus: Status
  setEditStatus: (v: Status) => void
  handleEditSave: () => void
  // Delete dialog
  confirmOpen: boolean
  openConfirm: () => void
  closeConfirm: () => void
  handleDeleteConfirm: () => void
  // Toggle
  handleToggle: () => void
}

export function useTaskActions(task: Task): TaskActions {
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask()
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description ?? '')
  const [editPriority, setEditPriority] = useState<Priority>(task.priority)
  const [editStatus, setEditStatus] = useState<Status>(task.status)

  const handleToggle = useCallback(() =>
    updateTask({ id: task.id, dto: { completed: !task.completed } })
  , [task.id, task.completed, updateTask])

  const openEdit = useCallback(() => {
    setEditTitle(task.title)
    setEditDescription(task.description ?? '')
    setEditPriority(task.priority)
    setEditStatus(task.status)
    setEditOpen(true)
  }, [task.title, task.description, task.priority, task.status])

  const handleEditSave = useCallback(() =>
    updateTask(
      {
        id: task.id,
        dto: {
          title: editTitle.trim() || task.title,
          description: editDescription.trim() || undefined,
          priority: editPriority,
          status: editStatus,
        },
      },
      { onSuccess: () => setEditOpen(false) },
    )
  , [task.id, task.title, editTitle, editDescription, editPriority, editStatus, updateTask])

  const handleDeleteConfirm = useCallback(() =>
    deleteTask(task.id, { onSuccess: () => setConfirmOpen(false) })
  , [task.id, deleteTask])

  return {
    isUpdating,
    isDeleting,
    editOpen,
    openEdit,
    closeEdit: () => setEditOpen(false),
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    editPriority,
    setEditPriority,
    editStatus,
    setEditStatus,
    handleEditSave,
    confirmOpen,
    openConfirm: () => setConfirmOpen(true),
    closeConfirm: () => setConfirmOpen(false),
    handleDeleteConfirm,
    handleToggle,
  }
}
