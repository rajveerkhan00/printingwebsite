import Image from 'next/image'
import { prisma } from '@/lib/prisma'

async function getGalleryImages() {
    const images = await prisma.galleryImage.findMany({
        orderBy: { order: 'asc' },
    })
    return images
}

export default async function GalleryPage() {
    const images = await getGalleryImages()

    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our portfolio of completed projects and see the quality that sets us apart
                    </p>
                </div>

                {/* Gallery Grid */}
                {images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="relative h-80 bg-gray-200">
                                    {image.imageUrl ? (
                                        <Image
                                            src={image.imageUrl}
                                            alt={image.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-gray-500">No image available</p>
                                        </div>
                                    )}
                                </div>

                                {/* Overlay with title and description */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <h3 className="text-white text-xl font-bold mb-2">
                                        {image.title}
                                    </h3>
                                    {image.description && (
                                        <p className="text-white/90 text-sm">
                                            {image.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No gallery images available yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
