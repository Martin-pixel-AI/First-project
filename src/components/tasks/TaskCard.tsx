'use client'

import React from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Tag, Calendar, MessageSquare, CheckSquare } from 'lucide-react'

interface TaskCardProps {
  id: string
  title: string
  description?: string
  dueDate?: Date
  tags?: string[]
  commentCount?: number
  subtaskCount?: number
  completedSubtasks?: number
  isDragging?: boolean
}

export function TaskCard({
  id,
  title,
  description,
  dueDate,
  tags = [],
  commentCount = 0,
  subtaskCount = 0,
  completedSubtasks = 0,
  isDragging = false
}: TaskCardProps) {
  return (
    <div 
      className={cn(
        "p-3 rounded-md border bg-card text-card-foreground shadow-sm transition-all",
        isDragging && "shadow-lg border-primary"
      )}
    >
      <h3 className="font-medium">{title}</h3>
      
      {description && (
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
      )}
      
      <div className="flex flex-wrap gap-1 mt-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        {dueDate && (
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {format(dueDate, 'MMM d')}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          {commentCount > 0 && (
            <div className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              {commentCount}
            </div>
          )}
          
          {subtaskCount > 0 && (
            <div className="flex items-center">
              <CheckSquare className="h-3 w-3 mr-1" />
              {completedSubtasks}/{subtaskCount}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 