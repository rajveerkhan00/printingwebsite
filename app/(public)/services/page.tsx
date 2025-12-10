import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'

async function getServices() {
    const services = await prisma.service.findMany({
        orderBy: { order: 'asc' },
    })
    return services
}

export default async function ServicesPage() {
    const services = await getServices()

    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From business cards to large format banners, we offer comprehensive printing solutions to meet all your needs
                    </p>
                </div>

                {/* Services Grid */}
                {services.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className="relative h-64 bg-gray-200">
                                    {service.imageUrl ? (
                                        <Image
                                            src={service.imageUrl}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-gray-500">No image available</p>
                                        </div>
                                    )}
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base mb-4">
                                        {service.description}
                                    </CardDescription>
                                    <Button asChild className="w-full">
                                        <Link href="/contact">Get a Quote</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No services available at the moment.</p>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-20 bg-blue-50 rounded-lg p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Need Something Custom?</h2>
                    <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                        We specialize in custom printing solutions. Contact us to discuss your unique requirements.
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
