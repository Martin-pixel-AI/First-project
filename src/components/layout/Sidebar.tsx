import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-auto p-4">
          <nav className="space-y-2">
            <Link
              href="/projects"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Projects
            </Link>
            <Link
              href="/tasks"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Tasks
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  )
} 