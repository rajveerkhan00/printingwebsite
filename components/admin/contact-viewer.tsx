'use client'

import { ContactSubmission } from '@prisma/client'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface ContactViewerProps {
    submissions: ContactSubmission[]
}

export default function ContactViewer({ submissions }: ContactViewerProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Messages</h2>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Message</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.map((submission) => (
                                <TableRow key={submission.id}>
                                    <TableCell className="whitespace-nowrap">
                                        {new Date(submission.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="font-medium">{submission.name}</TableCell>
                                    <TableCell>{submission.email}</TableCell>
                                    <TableCell>{submission.phone || '-'}</TableCell>
                                    <TableCell className="max-w-md truncate" title={submission.message}>
                                        {submission.message}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {submissions.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        No messages received yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
