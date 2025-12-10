'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CheckCircle, Trash2, Mail, Phone } from 'lucide-react'

type ContactSubmission = {
    id: string
    name: string
    email: string
    phone: string | null
    message: string
    handled: boolean
    createdAt: string
}

export default function AdminContactsPage() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        fetchSubmissions()
    }, [])

    async function fetchSubmissions() {
        try {
            const response = await fetch('/api/contact')
            const data = await response.json()
            setSubmissions(data)
        } catch (error) {
            console.error('Error fetching submissions:', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function toggleHandled(id: string, currentStatus: boolean) {
        try {
            const response = await fetch(`/api/contact/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ handled: !currentStatus }),
            })

            if (response.ok) {
                await fetchSubmissions()
            }
        } catch (error) {
            console.error('Error updating submission:', error)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this submission?')) return

        try {
            const response = await fetch(`/api/contact/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                await fetchSubmissions()
                if (selectedSubmission?.id === id) {
                    setDialogOpen(false)
                }
            }
        } catch (error) {
            console.error('Error deleting submission:', error)
        }
    }

    function viewDetails(submission: ContactSubmission) {
        setSelectedSubmission(submission)
        setDialogOpen(true)
    }

    const newCount = submissions.filter(s => !s.handled).length

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
                <p className="text-gray-600 mt-2">View and manage contact form submissions</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Total Submissions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{submissions.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">
                            New Messages
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-600">{newCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Handled
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600">
                            {submissions.length - newCount}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.map((submission) => (
                                <TableRow key={submission.id}>
                                    <TableCell className="font-medium">{submission.name}</TableCell>
                                    <TableCell>{submission.email}</TableCell>
                                    <TableCell>
                                        {new Date(submission.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={submission.handled ? 'default' : 'secondary'}>
                                            {submission.handled ? 'Handled' : 'New'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => viewDetails(submission)}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={submission.handled ? 'outline' : 'default'}
                                                onClick={() => toggleHandled(submission.id, submission.handled)}
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(submission.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Details Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Contact Submission Details</DialogTitle>
                    </DialogHeader>
                    {selectedSubmission && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700">Name</label>
                                <p className="text-lg">{selectedSubmission.name}</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                                        <Mail className="h-4 w-4 mr-1" />
                                        Email
                                    </label>
                                    <p>{selectedSubmission.email}</p>
                                </div>
                                {selectedSubmission.phone && (
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                                            <Phone className="h-4 w-4 mr-1" />
                                            Phone
                                        </label>
                                        <p>{selectedSubmission.phone}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700">Message</label>
                                <p className="mt-2 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                                    {selectedSubmission.message}
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Received: {new Date(selectedSubmission.createdAt).toLocaleString()}
                                    </p>
                                    <Badge variant={selectedSubmission.handled ? 'default' : 'secondary'} className="mt-1">
                                        {selectedSubmission.handled ? 'Handled' : 'New'}
                                    </Badge>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant={selectedSubmission.handled ? 'outline' : 'default'}
                                        onClick={() => {
                                            toggleHandled(selectedSubmission.id, selectedSubmission.handled)
                                            setDialogOpen(false)
                                        }}
                                    >
                                        Mark as {selectedSubmission.handled ? 'Unhandled' : 'Handled'}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(selectedSubmission.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
