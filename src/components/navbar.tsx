'use client'

import { Button } from "@/components/ui/button"
import { LogIn } from 'lucide-react'

export function NavbarComponent() {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-primary">Chatroom</h1>
          </div>
          <div className="flex items-center">
            <Button variant="outline" className="flex items-center space-x-2">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}