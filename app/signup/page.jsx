'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState('consumer')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())
    userData.userType = activeTab

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
        })
        router.push('/login')
      } else {
        const data = await response.json()
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up for Artisan Marketplace</CardTitle>
          <CardDescription>Create your account to start exploring or selling artisan products</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="consumer">Consumer</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
            </TabsList>
            <TabsContent value="consumer">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="consumer-name">Full Name</Label>
                    <Input id="consumer-name" name="name" placeholder="Enter your full name" required />
                  </div>
                  <div>
                    <Label htmlFor="consumer-email">Email</Label>
                    <Input id="consumer-email" name="email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div>
                    <Label htmlFor="consumer-password">Password</Label>
                    <Input id="consumer-password" name="password" type="password" placeholder="Create a password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'Sign Up as Consumer'}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="seller">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="seller-name">Full Name</Label>
                    <Input id="seller-name" name="name" placeholder="Enter your full name" required />
                  </div>
                  <div>
                    <Label htmlFor="seller-email">Email</Label>
                    <Input id="seller-email" name="email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div>
                    <Label htmlFor="seller-password">Password</Label>
                    <Input id="seller-password" name="password" type="password" placeholder="Create a password" required />
                  </div>
                  <div>
                    <Label htmlFor="seller-business-name">Business Name</Label>
                    <Input id="seller-business-name" name="businessName" placeholder="Enter your business name" required />
                  </div>
                  <div>
                    <Label htmlFor="seller-specialization">Specialization</Label>
                    <Input id="seller-specialization" name="specialization" placeholder="Enter your craft specialization" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'Sign Up as Seller'}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>Already have an account? <a href="/login" className="text-primary hover:underline">Log in</a></p>
        </CardFooter>
      </Card>
    </div>
  )
}