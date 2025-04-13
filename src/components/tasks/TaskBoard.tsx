'use client'

import React from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { TaskColumn } from './TaskColumn'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

// This would come from your API/database in a real app
const mockColumns = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: 'task-1',
        title: 'Design homepage',
        description: 'Create wireframes for the new homepage design',
        dueDate: new Date('2023-05-15'),
        tags: ['Design', 'Frontend'],
        commentCount: 3,
        subtaskCount: 2,
        completedSubtasks: 1
      },
      {
        id: 'task-2',
        title: 'Implement authentication',
        description: 'Set up OAuth with Google and GitHub',
        dueDate: new Date('2023-05-20'),
        tags: ['Backend', 'Security'],
        commentCount: 5
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: 'task-3',
        title: 'Database schema',
        description: 'Design and implement the database schema',
        dueDate: new Date('2023-05-10'),
        tags: ['Backend', 'Database'],
        subtaskCount: 4,
        completedSubtasks: 2
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      {
        id: 'task-4',
        title: 'API documentation',
        description: 'Write comprehensive API documentation',
        dueDate: new Date('2023-05-25'),
        tags: ['Documentation'],
        commentCount: 2
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: 'task-5',
        title: 'Project setup',
        description: 'Initialize project with Next.js and TypeScript',
        tags: ['Setup'],
        subtaskCount: 3,
        completedSubtasks: 3
      }
    ]
  }
]

export function TaskBoard() {
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    
    // Dropped outside the list
    if (!destination) {
      return
    }
    
    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    
    // In a real app, you would update the state here
    console.log('Task moved from', source.droppableId, 'to', destination.droppableId)
  }
  
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Project Tasks</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Column
        </Button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-12rem)]">
          {mockColumns.map((column) => (
            <TaskColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
} 