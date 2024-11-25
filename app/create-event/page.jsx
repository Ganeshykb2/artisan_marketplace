'use client'

import { useState } from 'react'
import { Calendar, MapPin, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CreateEvent() {
  const [eventType, setEventType] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle event creation logic here
    console.log('Event created')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Create an Event</h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Fill in the details to create your event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="event-name">Event Name</Label>
              <Input id="event-name" placeholder="Enter event name" required />
            </div>
            <div>
              <Label htmlFor="event-type">Event Type</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exhibition">Exhibition</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="event-date">Event Date</Label>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 opacity-70" />
                <Input id="event-date" type="date" required />
              </div>
            </div>
            <div>
              <Label htmlFor="event-time">Event Time</Label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 opacity-70" />
                <Input id="event-time" type="time" required />
              </div>
            </div>
            <div>
              <Label htmlFor="event-location">Event Location</Label>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 opacity-70" />
                <Input id="event-location" placeholder="Enter event location" required />
              </div>
            </div>
            <div>
              <Label htmlFor="max-participants">Maximum Participants</Label>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 opacity-70" />
                <Input id="max-participants" type="number" placeholder="Enter maximum participants" required />
              </div>
            </div>
            <div>
              <Label htmlFor="event-description">Event Description</Label>
              <Textarea
                id="event-description"
                placeholder="Describe your event"
                className="min-h-[100px]"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Create Event</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}