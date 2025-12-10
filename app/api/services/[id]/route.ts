import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GET single service
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const service = await prisma.service.findUnique({
            where: { id: params.id },
        })

        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 })
        }

        return NextResponse.json(service)
    } catch (error) {
        console.error('Error fetching service:', error)
        return NextResponse.json(
            { error: 'Failed to fetch service' },
            { status: 500 }
        )
    }
}

// PUT update service (protected)
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

        const service = await prisma.service.update({
            where: { id: params.id },
            data: {
                title,
                description,
                imageUrl,
                order,
            },
        })

        return NextResponse.json(service)
    } catch (error) {
        console.error('Error updating service:', error)
        return NextResponse.json(
            { error: 'Failed to update service' },
            { status: 500 }
        )
    }
}

// DELETE service (protected)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await prisma.service.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: 'Service deleted successfully' })
    } catch (error) {
        console.error('Error deleting service:', error)
        return NextResponse.json(
            { error: 'Failed to delete service' },
            { status: 500 }
        )
    }
}
