import { UserNav } from './UserNav'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSelector } from './LanguageSelector'

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">Task Board</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  )
} 