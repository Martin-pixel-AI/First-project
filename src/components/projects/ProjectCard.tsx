import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  id: string
  name: string
  description?: string
  taskCount: number
  isActive?: boolean
}

export function ProjectCard({ id, name, description, taskCount, isActive = false }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`}>
      <div 
        className={cn(
          "p-4 rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
          isActive && "border-primary"
        )}
      >
        <h3 className="font-medium text-lg">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
        <div className="flex items-center mt-3 text-sm text-muted-foreground">
          <span>{taskCount} tasks</span>
        </div>
      </div>
    </Link>
  )
} 