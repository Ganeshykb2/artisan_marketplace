'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('consumer')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log(`${activeTab} login submitted`)
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to Artisan Marketplace</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
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
                    <Label htmlFor="consumer-email">Email</Label>
                    <Input id="consumer-email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div>
                    <Label htmlFor="consumer-password">Password</Label>
                    <Input id="consumer-password" type="password" placeholder="Enter your password" required />
                  </div>
                  <Button type="submit" className="w-full">Login as Consumer</Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="seller">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="seller-email">Email</Label>
                    <Input id="seller-email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div>
                    <Label htmlFor="seller-password">Password</Label>
                    <Input id="seller-password" type="password" placeholder="Enter your password" required />
                  </div>
                  <Button type="submit" className="w-full">Login as Seller</Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign up</a></p>
        </CardFooter>
      </Card>
    </div>
  )
}
















