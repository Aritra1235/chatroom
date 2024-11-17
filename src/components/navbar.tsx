'use client'

import { Button } from "@/components/ui/button"
import { LogIn } from 'lucide-react'
import { ModeToggle } from "./ui/mode-toggle"
import { useRouter } from "next/navigation"
import React from 'react';
import { useAuth } from "./auth-context"


const Navbar: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleClick = () => {
      if (isAuthenticated) {
          logout();
          router.push('/login');
      } else {
          router.push('/login');
      }
  };




    return (
        <nav className="bg-background border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <h1 className="text-2xl font-bold text-primary" >Chatroom</h1>
                    </div>
                    <div className="flex items-center gap-5">
                        <ModeToggle />
                        <Button variant="link" className="flex items-center space-x-2" onClick={() => router.push('/login')}>
                            <LogIn className="h-4 w-4" />
                            <span onClick={handleClick}>{isAuthenticated ? 'Logout' : 'Login'}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;