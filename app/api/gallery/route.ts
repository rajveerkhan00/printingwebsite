import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GET all gallery images
export async function GET() {
    try {
        const images = await prisma.galleryImage.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(images)
    } catch (error) {
        console.error('Error fetching gallery images:', error)
        return NextResponse.json(
            { error: 'Failed to fetch gallery images' },
            { status: 500 }
        )
    }
}

// POST create new gallery image (protected)
export async function POST(request: Request) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, description, imageUrl, order } = body

        const image = await prisma.galleryImage.create({
            data: {
                title,
                description: description || null,
                imageUrl,
                order: order || 0,
            },
        })

        return NextResponse.json(image, { status: 201 })
    } catch (error) {
        console.error('Error creating gallery image:', error)
        return NextResponse.json(
            { error: 'Failed to create gallery image' },
            { status: 500 }
        )
    }
}
