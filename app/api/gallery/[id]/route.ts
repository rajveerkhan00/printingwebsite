import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// PUT update gallery image (protected)
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, description, imageUrl, order } = body

        const image = await prisma.galleryImage.update({
            where: { id: params.id },
            data: {
                title,
                description,
                imageUrl,
                order,
            },
        })

        return NextResponse.json(image)
    } catch (error) {
        console.error('Error updating gallery image:', error)
        return NextResponse.json(
            { error: 'Failed to update gallery image' },
            { status: 500 }
        )
    }
}

// DELETE gallery image (protected)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await prisma.galleryImage.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: 'Gallery image deleted successfully' })
    } catch (error) {
        console.error('Error deleting gallery image:', error)
        return NextResponse.json(
            { error: 'Failed to delete gallery image' },
            { status: 500 }
        )
    }
}
