import { TaskBoard } from '@/components/tasks/TaskBoard'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // In a real app, you would fetch the project data based on the ID
  const projectId = params.id
  
  return (
    <div className="h-full">
      <div className="border-b">
        <div className="container flex h-14 items-center">
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-lg font-medium">Project {projectId}</h1>
        </div>
      </div>
      
      <div className="container py-6 h-[calc(100vh-3.5rem)]">
        <TaskBoard />
      </div>
    </div>
  )
} 