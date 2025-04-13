'use client'

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TaskList } from "@/components/task-list"
import { TaskModal } from "@/components/task-modal"
import { Task, TaskFormData } from "@/types/task"

const STORAGE_KEY = 'task-management-tasks'

export default function Home() {
  const [tasks, setTasks] = React.useState<Task[]>(() => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [editingTask, setEditingTask] = React.useState<Task | undefined>()

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const handleCreateTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTasks((prev) => [...prev, newTask])
    setIsModalOpen(false)
  }

  const handleEditTask = (data: TaskFormData) => {
    if (!editingTask) return

    const updatedTask: Task = {
      ...editingTask,
      ...data,
      updatedAt: new Date(),
    }

    setTasks((prev) =>
      prev.map((task) => (task.id === editingTask.id ? updatedTask : task))
    )
    setIsModalOpen(false)
    setEditingTask(undefined)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const openEditModal = (task: Task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  return (
    <main className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <TaskList
        tasks={tasks}
        onEditTask={openEditModal}
        onDeleteTask={handleDeleteTask}
      />

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSubmit={editingTask ? handleEditTask : handleCreateTask}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTask(undefined)
          }}
        />
      )}
    </main>
  )
} 