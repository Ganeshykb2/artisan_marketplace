'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target)
    const productData = Object.fromEntries(formData.entries())

    // For this example, we're using a placeholder for the artisanId and imageUrl
    productData.artisanId = 'placeholder-artisan-id'
    productData.imageUrl = '/placeholder.svg?height=200&width=200'

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        toast({
          title: "Product added",
          description: "Your product has been added successfully.",
        })
        router.push('/products')
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
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Enter the details of your new product</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" name="name" placeholder="Enter product name" required />
              </div>
              <div>
                <Label htmlFor="product-description">Description</Label>
                <Textarea id="product-description" name="description" placeholder="Describe your product" required />
              </div>
              <div>
                <Label htmlFor="product-price">Price (₹)</Label>
                <Input id="product-price" name="price" type="number" step="0.01" placeholder="Enter price" required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Adding Product...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}