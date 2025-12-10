import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate the data
        const validatedData = contactSchema.parse(body)

        // Save to database
        const submission = await prisma.contactSubmission.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone || null,
                message: validatedData.message,
            },
        })

        return NextResponse.json(
            { message: 'Contact form submitted successfully', id: submission.id },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error submitting contact form:', error)
        return NextResponse.json(
            { error: 'Failed to submit contact form' },
            { status: 500 }
        )
    }
}

// GET all contact submissions (protected - used by admin)
export async function GET() {
    try {
        const submissions = await prisma.contactSubmission.findMany({
            orderBy: { createdAt: 'desc' },
        })
        return NextResponse.json(submissions)
    } catch (error) {
        console.error('Error fetching contact submissions:', error)
        return NextResponse.json(
            { error: 'Failed to fetch contact submissions' },
            { status: 500 }
        )
    }
}
