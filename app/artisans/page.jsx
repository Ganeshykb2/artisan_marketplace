import Image from 'next/image'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Artisans() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Artisans</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search artisans" className="pl-8" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              <SelectItem value="weaving">Weaving</SelectItem>
              <SelectItem value="embroidery">Embroidery</SelectItem>
              <SelectItem value="woodwork">Woodwork</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="flex flex-col md:flex-row">
                <Image src={`/placeholder.svg?height=200&width=200`} alt={`Artisan ${i}`} width={200} height={200} className="w-full md:w-1/3 object-cover" />
                <div className="p-6 flex-grow">
                  <CardHeader>
                    <CardTitle>Artisan Name</CardTitle>
                    <CardDescription>Specialization: Banarasi Silk Weaving</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">With over 20 years of experience, this artisan creates beautiful Banarasi silk sarees using traditional techniques.</p>
                    <Button>View Profile</Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}