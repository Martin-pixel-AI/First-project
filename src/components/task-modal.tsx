import * as React from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Task, TaskFormData, TaskPriority } from "@/types/task"

interface TaskModalProps {
  task?: Task
  onSubmit: (data: TaskFormData) => void
  onClose: () => void
}

export function TaskModal({ task, onSubmit, onClose }: TaskModalProps) {
  const [date, setDate] = React.useState<Date | null>(task?.dueDate || null)
  const [priority, setPriority] = React.useState<TaskPriority>(task?.priority || 'medium')
  const [status, setStatus] = React.useState<'todo' | 'in-progress' | 'done'>(task?.status || 'todo')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      dueDate: task?.dueDate || null,
      priority: task?.priority || 'medium',
      status: task?.status || 'todo',
      assignee: task?.assignee || '',
    },
  })

  const onSubmitForm = (data: TaskFormData) => {
    onSubmit({
      ...data,
      dueDate: date,
      priority,
      status,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">
          {task ? 'Edit Task' : 'Create Task'}
        </h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              className={cn(errors.title && 'border-destructive')}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              className={cn(errors.description && 'border-destructive')}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date || undefined}
                  onSelect={(value) => setDate(value || null)}
                  initialFocus
                  required={false}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => (
                <Button
                  key={p}
                  type="button"
                  variant={priority === p ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setPriority(p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex gap-2">
              {(['todo', 'in-progress', 'done'] as const).map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={status === s ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setStatus(s)}
                >
                  {s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              {...register('assignee')}
              className={cn(errors.assignee && 'border-destructive')}
            />
            {errors.assignee && (
              <p className="text-sm text-destructive">{errors.assignee.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {task ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 