'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShoppingCart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'


export default function Home() {

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-12">
          <section className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Artisan Marketplace</h1>
            <p className="text-xl mb-8">Discover and support the incredible artisans of Varanasi</p>
            <Button asChild>
              <Link href="/products">
                Explore Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <Image src={`/placeholder.svg?height=200&width=300`} alt={`Featured product ${i}`} width={300} height={200} className="w-full object-cover" />
                  <CardHeader>
                    <CardTitle>Beautiful Handicraft</CardTitle>
                    <CardDescription>By Artisan Name</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold mb-4">₹1,999</p>
                    <div className="flex space-x-2">
                      <Button className="flex-1">Buy Now</Button>
                      <Button variant="outline" className="flex-1">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">Artisan of the Month</h2>
            <Card>
              <div className="md:flex">
                <Image src="/placeholder.svg?height=300&width=300" alt="Artisan of the Month" width={300} height={300} className="w-full md:w-1/3 object-cover" />
                <div className="p-6">
                  <CardTitle className="text-2xl mb-2">Master Craftsman Name</CardTitle>
                  <CardDescription className="mb-4">Specializing in Banarasi Silk Sarees</CardDescription>
                  <p className="mb-4">With over 30 years of experience, Master Craftsman has been creating exquisite Banarasi silk sarees that are worn and cherished across the world.</p>
                  <Button>View Profile</Button>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>Varanasi Handicraft Exhibition</CardTitle>
                    <CardDescription>July 15-17, 2023 • Varanasi Trade Facilitation Centre</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Join us for a 3-day exhibition showcasing the finest handicrafts from Varanasi's talented artisans.</p>
                    <Button className="mt-4">Learn More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
  )
}