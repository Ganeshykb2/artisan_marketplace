import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Artisan Marketplace</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-lg mb-4">
            Artisan Marketplace is dedicated to supporting and promoting the incredible artisans of Varanasi. We believe in the power of traditional craftsmanship and aim to provide a platform for these skilled artisans to showcase their work to a global audience.
          </p>
          <p className="text-lg mb-4">
            Our mission is to preserve and celebrate the rich cultural heritage of Varanasi while empowering artisans to thrive in the modern marketplace. By connecting artisans directly with customers, we ensure fair compensation and recognition for their exceptional skills.
          </p>
          <p className="text-lg">
            Join us in our journey to bring the beauty of Varanasi's handicrafts to the world, one artisan at a time.
          </p>
        </div>
        <Image src="/placeholder.svg?height=400&width=600" alt="Artisan at work" width={600} height={400} className="w-full rounded-lg shadow-md" />
      </div>
      
      <h2 className="text-3xl font-semibold mb-6">Our Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>500+</CardTitle>
            <CardDescription>Artisans Supported</CardDescription>
          </CardHeader>
          <CardContent>
            We've helped over 500 artisans showcase their products and reach a wider audience.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>₹10M+</CardTitle>
            <CardDescription>Revenue Generated</CardDescription>
          </CardHeader>
          <CardContent>
            Our platform has facilitated over ₹10 million in sales, directly benefiting local artisans.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>50+</CardTitle>
            <CardDescription>Events Organized</CardDescription>
          </CardHeader>
          <CardContent>
            We've organized over 50 events to promote Varanasi's handicrafts and connect artisans with customers.
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-3xl font-semibold mb-6">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <Image src={`/placeholder.svg?height=200&width=200`} alt={`Team Member ${i}`} width={200} height={200} className="w-full object-cover rounded-t-lg" />
            <CardHeader>
              <CardTitle>Team Member Name</CardTitle>
              <CardDescription>Position</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Brief description of the team member's role and passion for supporting artisans.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}