import { Card, CardContent } from '@/components/ui/card'
import { Target, Eye, Heart, Users } from 'lucide-react'

export default function AboutPage() {
    const values = [
        {
            icon: Target,
            title: 'Quality First',
            description: 'We never compromise on quality, ensuring every print meets the highest standards.',
        },
        {
            icon: Eye,
            title: 'Attention to Detail',
            description: 'Every project receives meticulous attention from our expert team.',
        },
        {
            icon: Heart,
            title: 'Customer Satisfaction',
            description: 'Your satisfaction is our top priority. We go above and beyond for every client.',
        },
        {
            icon: Users,
            title: 'Collaborative Approach',
            description: 'We work closely with you to bring your vision to life.',
        },
    ]

    const team = [
        {
            name: 'John Doe',
            role: 'Founder & CEO',
            bio: '20+ years in the printing industry',
        },
        {
            name: 'Jane Smith',
            role: 'Creative Director',
            bio: 'Award-winning designer with 15 years experience',
        },
        {
            name: 'Mike Johnson',
            role: 'Production Manager',
            bio: 'Expert in large-format and specialty printing',
        },
        {
            name: 'Sarah Williams',
            role: 'Customer Relations',
            bio: 'Dedicated to ensuring customer satisfaction',
        },
    ]

    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About PrintPro</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Your trusted partner in professional printing for over two decades
                    </p>
                </div>

                {/* Company Story */}
                <div className="mb-20">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    Founded in 2003, PrintPro began with a simple mission: to provide businesses and individuals with the highest quality printing services at affordable prices.
                                </p>
                                <p>
                                    Over the past 20 years, we've grown from a small local print shop to a full-service printing company serving clients nationwide. Our commitment to quality, innovation, and customer service has remained constant throughout our journey.
                                </p>
                                <p>
                                    Today, we combine traditional craftsmanship with cutting-edge technology to deliver exceptional results for every project, no matter how large or small.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                            <p className="text-gray-500 text-center">Company Image Placeholder</p>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="mb-20 bg-blue-50 rounded-lg p-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-blue-900">Our Mission</h2>
                            <p className="text-gray-700">
                                To empower businesses and individuals by transforming their ideas into stunning printed materials that make a lasting impact. We strive to exceed expectations through quality, innovation, and exceptional service.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-blue-900">Our Vision</h2>
                            <p className="text-gray-700">
                                To be the most trusted name in printing services, known for our commitment to quality, sustainability, and customer satisfaction. We aim to continuously innovate and adapt to meet the evolving needs of our clients.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value) => (
                            <Card key={value.title} className="text-center">
                                <CardContent className="pt-6">
                                    <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <value.icon className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div>
                    <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <Card key={member.name} className="text-center">
                                <CardContent className="pt-6">
                                    <div className="mx-auto bg-gray-200 w-32 h-32 rounded-full flex items-center justify-center mb-4">
                                        <p className="text-gray-500 text-sm">Photo</p>
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                                    <p className="text-gray-600 text-sm">{member.bio}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
