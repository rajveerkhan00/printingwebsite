import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Zap, Users, Award } from 'lucide-react'

export default function HomePage() {
    const features = [
        {
            icon: Zap,
            title: 'Fast Turnaround',
            description: 'Get your prints delivered quickly without compromising quality',
        },
        {
            icon: Award,
            title: 'Premium Quality',
            description: 'State-of-the-art printing technology for stunning results',
        },
        {
            icon: Users,
            title: 'Expert Team',
            description: 'Professional designers and printing specialists at your service',
        },
        {
            icon: CheckCircle,
            title: 'Satisfaction Guaranteed',
            description: 'We stand behind our work with a 100% satisfaction guarantee',
        },
    ]

    const services = [
        {
            title: 'Business Cards',
            description: 'Professional business cards that make a lasting impression',
            image: '/placeholder-service-1.jpg',
        },
        {
            title: 'Flyers & Brochures',
            description: 'Eye-catching marketing materials for your campaigns',
            image: '/placeholder-service-2.jpg',
        },
        {
            title: 'Banners & Posters',
            description: 'Large format printing for events and promotions',
            image: '/placeholder-service-3.jpg',
        },
    ]

    const testimonials = [
        {
            name: 'Sarah Johnson',
            company: 'Johnson Consulting',
            text: 'PrintPro delivered exceptional quality on our business cards. The turnaround was incredibly fast!',
            rating: 5,
        },
        {
            name: 'Michael Chen',
            company: 'Chen Marketing',
            text: 'Outstanding service! They helped us design and print all our marketing materials. Highly recommended.',
            rating: 5,
        },
        {
            name: 'Emily Rodriguez',
            company: 'Rodriguez Events',
            text: 'The team at PrintPro is amazing. They always meet our tight deadlines with perfect results.',
            rating: 5,
        },
    ]

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Professional Printing Services
                            </h1>
                            <p className="text-xl mb-8 text-blue-100">
                                Transform your ideas into stunning printed materials. Fast, reliable, and affordable printing solutions for businesses and individuals.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" variant="secondary" asChild>
                                    <Link href="/services">View Services</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600" asChild>
                                    <Link href="/contact">Get a Quote</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 h-96 flex items-center justify-center">
                                <p className="text-center text-2xl">Hero Image Placeholder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PrintPro?</h2>
                        <p className="text-xl text-gray-600">Excellence in every print, every time</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature) => (
                            <Card key={feature.title} className="text-center">
                                <CardHeader>
                                    <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <feature.icon className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Services */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
                        <p className="text-xl text-gray-600">Professional printing solutions for every need</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <Card key={service.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="bg-gray-200 h-48 flex items-center justify-center">
                                    <p className="text-gray-500">Image Placeholder</p>
                                </div>
                                <CardHeader>
                                    <CardTitle>{service.title}</CardTitle>
                                    <CardDescription className="text-base">{service.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Button size="lg" asChild>
                            <Link href="/services">View All Services</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
                        <p className="text-xl text-gray-600">Don't just take our word for it</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.name}>
                                <CardHeader>
                                    <div className="flex mb-2">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-400 text-xl">★</span>
                                        ))}
                                    </div>
                                    <CardDescription className="text-base italic">
                                        "{testimonial.text}"
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Bring Your Vision to Life?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Get in touch with us today for a free quote and consultation
                    </p>
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/contact">Contact Us Now</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
