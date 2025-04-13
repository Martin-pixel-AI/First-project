import * as React from "react"
import { format } from "date-fns"
import { ArrowUpDown, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Task } from "@/types/task"

interface TaskListProps {
  tasks: Task[]
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

type SortField = 'title' | 'dueDate' | 'priority' | 'status'
type SortOrder = 'asc' | 'desc'

export function TaskList({ tasks, onEditTask, onDeleteTask }: TaskListProps) {
  const [sortField, setSortField] = React.useState<SortField>('dueDate')
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('asc')
  const [filterStatus, setFilterStatus] = React.useState<Task['status'] | 'all'>('all')
  const [filterPriority, setFilterPriority] = React.useState<Task['priority'] | 'all'>('all')

  const sortedAndFilteredTasks = React.useMemo(() => {
    let result = [...tasks]

    // Apply filters
    if (filterStatus !== 'all') {
      result = result.filter(task => task.status === filterStatus)
    }
    if (filterPriority !== 'all') {
      result = result.filter(task => task.priority === filterPriority)
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortField === 'dueDate') {
        if (!a.dueDate) return sortOrder === 'asc' ? 1 : -1
        if (!b.dueDate) return sortOrder === 'asc' ? -1 : 1
        return sortOrder === 'asc' 
          ? a.dueDate.getTime() - b.dueDate.getTime()
          : b.dueDate.getTime() - a.dueDate.getTime()
      }

      if (sortField === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return sortOrder === 'asc'
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      }

      if (sortField === 'status') {
        const statusOrder = { 'todo': 1, 'in-progress': 2, 'done': 3 }
        return sortOrder === 'asc'
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status]
      }

      // Default sort by title
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    })

    return result
  }, [tasks, sortField, sortOrder, filterStatus, filterPriority])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
    }
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'done':
        return 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <select
            className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Task['status'] | 'all')}
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <select
            className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as Task['priority'] | 'all')}
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedAndFilteredTasks.map((task) => (
          <div
            key={task.id}
            className="rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-2 flex items-start justify-between">
              <h3 className="font-semibold">{task.title}</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditTask(task)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              {task.description}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Due Date:</span>
                <span className="text-sm">
                  {task.dueDate ? format(task.dueDate, 'PPP') : 'No due date'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Priority:</span>
                <span className={`rounded-full px-2 py-1 text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(task.status)}`}>
                  {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>

              {task.assignee && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Assignee:</span>
                  <span className="text-sm">{task.assignee}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 