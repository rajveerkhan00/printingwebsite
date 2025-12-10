import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GET all services
export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(services)
    } catch (error) {
        console.error('Error fetching services:', error)
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        )
    }
}

// POST create new service (protected)
export async function POST(request: Request) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, description, imageUrl, order } = body

        const service = await prisma.service.create({
            data: {
                title,
                description,
                imageUrl,
                order: order || 0,
            },
        })

        return NextResponse.json(service, { status: 201 })
    } catch (error) {
        console.error('Error creating service:', error)
        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        )
    }
}
