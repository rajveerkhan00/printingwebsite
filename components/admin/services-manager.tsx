'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Service } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'

interface ServicesManagerProps {
    initialServices: Service[]
}

export default function ServicesManager({ initialServices }: ServicesManagerProps) {
    const router = useRouter()
    const [services, setServices] = useState<Service[]>(initialServices)
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingService, setEditingService] = useState<Service | null>(null)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        order: 0
    })

    const resetForm = () => {
        setFormData({ title: '', description: '', imageUrl: '', order: 0 })
        setEditingService(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (editingService) {
                const response = await fetch(`/api/services/${editingService.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
                if (!response.ok) throw new Error('Failed to update service')
                const updatedService = await response.json()
                setServices(services.map(s => s.id === updatedService.id ? updatedService : s))
            } else {
                const response = await fetch('/api/services', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
                if (!response.ok) throw new Error('Failed to create service')
                const newService = await response.json()
                setServices([...services, newService])
            }
            setIsDialogOpen(false)
            resetForm()
            router.refresh()
        } catch (error) {
            console.error(error)
            alert('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return

        try {
            const response = await fetch(`/api/services/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete service')
            setServices(services.filter(s => s.id !== id))
            router.refresh()
        } catch (error) {
            console.error(error)
            alert('Failed to delete service')
        }
    }

    const openEdit = (service: Service) => {
        setEditingService(service)
        setFormData({
            title: service.title,
            description: service.description,
            imageUrl: service.imageUrl || '',
            order: service.order
        })
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Services</h2>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) resetForm()
                }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Image URL</label>
                                <Input
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="/placeholder.jpg"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Order</label>
                                <Input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingService ? 'Update Service' : 'Create Service'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Order</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell className="font-medium">{service.title}</TableCell>
                                    <TableCell className="max-w-md truncate">{service.description}</TableCell>
                                    <TableCell>{service.order}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="sm" onClick={() => openEdit(service)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(service.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {services.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                        No services found. Add one to get started.
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
