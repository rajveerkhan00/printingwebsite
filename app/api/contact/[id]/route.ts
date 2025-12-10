import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// PATCH - update contact submission status
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { handled } = body

        const submission = await prisma.contactSubmission.update({
            where: { id: params.id },
            data: { handled },
        })

        return NextResponse.json(submission)
    } catch (error) {
        console.error('Error updating contact submission:', error)
        return NextResponse.json(
            { error: 'Failed to update contact submission' },
            { status: 500 }
        )
    }
}

// DELETE - delete contact submission
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await prisma.contactSubmission.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: 'Contact submission deleted successfully' })
    } catch (error) {
        console.error('Error deleting contact submission:', error)
        return NextResponse.json(
            { error: 'Failed to delete contact submission' },
            { status: 500 }
        )
    }
}
