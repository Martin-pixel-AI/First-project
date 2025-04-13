export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  dueDate: Date | null
  priority: TaskPriority
  status: 'todo' | 'in-progress' | 'done'
  assignee?: string
  createdAt: Date
  updatedAt: Date
}

export interface TaskFormData {
  title: string
  description: string
  dueDate: Date | null
  priority: TaskPriority
  status: 'todo' | 'in-progress' | 'done'
  assignee?: string
} 