'use client'

import { useState } from 'react'
import { Project } from '@/components/Project'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Home() {
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([])
  const [newProjectName, setNewProjectName] = useState('')
  const { theme, setTheme } = useTheme()

  const addProject = () => {
    if (newProjectName.trim()) {
      setProjects([...projects, { id: Date.now().toString(), name: newProjectName }])
      setNewProjectName('')
    }
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Task Board</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex space-x-4">
          <Input
            placeholder="New project name..."
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addProject()}
          />
          <Button onClick={addProject}>Add Project</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Project
              key={project.id}
              id={project.id}
              name={project.name}
              onDelete={deleteProject}
            />
          ))}
        </div>
      </div>
    </main>
  )
} 