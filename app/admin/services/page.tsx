'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, Pencil, Trash2 } from 'lucide-react'

type Service = {
    id: string
    title: string
    description: string
    imageUrl: string
    order: number
}

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingService, setEditingService] = useState<Service | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        order: 0,
    })

    useEffect(() => {
        fetchServices()
    }, [])

    async function fetchServices() {
        try {
            const response = await fetch('/api/services')
            const data = await response.json()
            setServices(data)
        } catch (error) {
            console.error('Error fetching services:', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            const url = editingService
                ? `/api/services/${editingService.id}`
                : '/api/services'

            const method = editingService ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                await fetchServices()
                setDialogOpen(false)
                resetForm()
            }
        } catch (error) {
            console.error('Error saving service:', error)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this service?')) return

        try {
            const response = await fetch(`/api/services/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                await fetchServices()
            }
        } catch (error) {
            console.error('Error deleting service:', error)
        }
    }

    function openEditDialog(service: Service) {
        setEditingService(service)
        setFormData({
            title: service.title,
            description: service.description,
            imageUrl: service.imageUrl,
            order: service.order,
        })
        setDialogOpen(true)
    }

    function resetForm() {
        setEditingService(null)
        setFormData({
            title: '',
            description: '',
            imageUrl: '',
            order: 0,
        })
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
                    <p className="text-gray-600 mt-2">Add, edit, or delete printing services</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={(open) => {
                    setDialogOpen(open)
                    if (!open) resetForm()
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                {editingService ? 'Edit Service' : 'Add New Service'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Service Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="imageUrl">Image URL</Label>
                                <Input
                                    id="imageUrl"
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="order">Display Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {editingService ? 'Update' : 'Create'} Service
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <Card key={service.id}>
                        <CardHeader>
                            <div className="aspect-video bg-gray-200 rounded-md mb-4 overflow-hidden">
                                {service.imageUrl && (
                                    <img
                                        src={service.imageUrl}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <CardTitle>{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                            <div className="flex space-x-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openEditDialog(service)}
                                >
                                    <Pencil className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(service.id)}
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
