'use client'

import { useState, useEffect } from 'react'
import { Project } from '@/components/Project'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const STORAGE_KEY = 'task-board-projects'

export default function Home() {
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([])
  const [newProjectName, setNewProjectName] = useState('')
  const { theme, setTheme } = useTheme()
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const [filterImportance, setFilterImportance] = useState<'all' | 'low' | 'medium' | 'high'>('all')

  // Загрузка проектов из localStorage при инициализации
  useEffect(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEY)
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  // Сохранение проектов в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  const addProject = () => {
    if (newProjectName.trim()) {
      setProjects([...projects, { id: Date.now().toString(), name: newProjectName }])
      setNewProjectName('')
    }
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  const editProject = (id: string, newName: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, name: newName } : project
    ))
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

        <div className="flex space-x-4">
          <Select value={filterPriority} onValueChange={(value: 'all' | 'low' | 'medium' | 'high') => setFilterPriority(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterImportance} onValueChange={(value: 'all' | 'low' | 'medium' | 'high') => setFilterImportance(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Importance</SelectItem>
              <SelectItem value="low">Low Importance</SelectItem>
              <SelectItem value="medium">Medium Importance</SelectItem>
              <SelectItem value="high">High Importance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <Project
              key={project.id}
              id={project.id}
              name={project.name}
              onDelete={deleteProject}
              onEdit={editProject}
              filterPriority={filterPriority}
              filterImportance={filterImportance}
            />
          ))}
        </div>
      </div>
    </main>
  )
} 