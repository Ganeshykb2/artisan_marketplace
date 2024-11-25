'use client'

import { useState } from 'react'
import { Calendar, MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const events = [
  {
    id: 1,
    name: 'Varanasi Handicraft Exhibition',
    type: 'Exhibition',
    date: '2023-07-15',
    location: 'Varanasi Trade Facilitation Centre',
    description: 'A 3-day exhibition showcasing the finest handicrafts from Varanasi\'s talented artisans.',
  },
  {
    id: 2,
    name: 'Traditional Weaving Workshop',
    type: 'Workshop',
    date: '2023-08-05',
    location: 'Craft Village, Varanasi',
    description: 'Learn the art of traditional weaving from master craftsmen in this hands-on workshop.',
  },
  {
    id: 3,
    name: 'Artisan Fair 2023',
    type: 'Fair',
    date: '2023-09-10',
    location: 'City Center Mall, Varanasi',
    description: 'Annual fair bringing together artisans from all over Uttar Pradesh to showcase their work.',
  },
]

export default function EventsAndExhibitions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [eventType, setEventType] = useState('')

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (eventType === '' || event.type === eventType)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Events and Exhibitions</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Exhibition">Exhibition</SelectItem>
            <SelectItem value="Workshop">Workshop</SelectItem>
            <SelectItem value="Fair">Fair</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
              <CardDescription>{event.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2 flex items-center">
                <Calendar className="mr-2 h-4 w-4 opacity-70" /> {event.date}
              </p>
              <p className="mb-4 flex items-center">
                <MapPin className="mr-2 h-4 w-4 opacity-70" /> {event.location}
              </p>
              <p>{event.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Register for Event</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}