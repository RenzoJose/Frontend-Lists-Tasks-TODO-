import { useState } from 'react'
import type { DemoTask } from '@/types/landing'

const MAX_TASKS = 5

export function useDemo() {
  const [tasks, setTasks] = useState<DemoTask[]>([])
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarShown, setSnackbarShown] = useState(false)

  const addTask = (text: string) => {
    if (!text.trim() || tasks.length >= MAX_TASKS) return
    setTasks(prev => [...prev, { id: Date.now(), text: text.trim(), done: false }])
  }

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, done: !task.done } : task))
    )
    if (!snackbarShown) {
      setShowSnackbar(true)
      setSnackbarShown(true)
    }
  }

  const dismissSnackbar = () => setShowSnackbar(false)

  return {
    tasks,
    addTask,
    toggleTask,
    showSnackbar,
    dismissSnackbar,
    isAtLimit: tasks.length >= MAX_TASKS,
  }
}
