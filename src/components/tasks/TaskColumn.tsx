'use client'

import React from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import { TaskCard } from './TaskCard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Task {
  id: string
  title: string
  description?: string
  dueDate?: Date
  tags?: string[]
  commentCount?: number
  subtaskCount?: number
  completedSubtasks?: number
}

interface TaskColumnProps {
  id: string
  title: string
  tasks: Task[]
  isDraggingOver?: boolean
}

export function TaskColumn({ id, title, tasks, isDraggingOver = false }: TaskColumnProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-muted-foreground">{tasks.length}</span>
      </div>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 p-2 rounded-md bg-muted/20 min-h-[200px] transition-colors",
              snapshot.isDraggingOver && "bg-muted/40"
            )}
          >
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        dueDate={task.dueDate}
                        tags={task.tags}
                        commentCount={task.commentCount}
                        subtaskCount={task.subtaskCount}
                        completedSubtasks={task.completedSubtasks}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      <Button variant="ghost" size="sm" className="mt-2 justify-start">
        <Plus className="h-4 w-4 mr-2" />
        Add Task
      </Button>
    </div>
  )
} 