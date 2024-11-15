'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useAuth } from '@/components/auth-context'


export function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
  const router = useRouter()
  const { login } = useAuth()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
  
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  
    if (response.ok) {
      const result = await response.json()
      localStorage.setItem('jsonwebtoken', result.token)
      login()
      router.push('/') // Redirect to home page
    } else {
      // Handle login error
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      // Handle successful signup
      setActiveTab('login')
    } else {
      // Handle signup error
    }
  }

  return (
    <div className="h-full flex items-center justify-center p-4">
      <Card className=" h-full w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
          <CardDescription className="text-center">Login or create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <div className="mt-4 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeTab === 'login' ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="login" className="mt-0">
                    <form onSubmit={handleLoginSubmit}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                          </div>
                        </div>
                        <Button type="submit" className="w-full">Login</Button>
                      </div>
                    </form>
                  </TabsContent>
                  <TabsContent value="signup" className="mt-0">
                    <form onSubmit={handleSignupSubmit}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-name">Full Name</Label>
                          <Input id="signup-name" name="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <Input id="signup-email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Input id="signup-password" name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                          </div>
                        </div>
                        <Button type="submit" className="w-full">Sign Up</Button>
                      </div>
                    </form>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}