import React from 'react'
import { ProjectCard } from './ProjectCard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

// This would come from your API/database in a real app
const mockProjects = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign the company website with modern UI',
    taskCount: 12,
    isActive: true
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Develop a mobile app for iOS and Android',
    taskCount: 8
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Launch Q2 marketing campaign',
    taskCount: 5
  }
]

export function ProjectList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProjects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            taskCount={project.taskCount}
            isActive={project.isActive}
          />
        ))}
      </div>
    </div>
  )
} 