'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GalleryImage } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'

interface GalleryManagerProps {
    initialImages: GalleryImage[]
}

export default function GalleryManager({ initialImages }: GalleryManagerProps) {
    const router = useRouter()
    const [images, setImages] = useState<GalleryImage[]>(initialImages)
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        order: 0
    })

    const resetForm = () => {
        setFormData({ title: '', description: '', imageUrl: '', order: 0 })
        setEditingImage(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (editingImage) {
                const response = await fetch(`/api/gallery/${editingImage.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
                if (!response.ok) throw new Error('Failed to update image')
                const updatedImage = await response.json()
                setImages(images.map(img => img.id === updatedImage.id ? updatedImage : img))
            } else {
                const response = await fetch('/api/gallery', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
                if (!response.ok) throw new Error('Failed to create image')
                const newImage = await response.json()
                setImages([...images, newImage])
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
        if (!confirm('Are you sure you want to delete this image?')) return

        try {
            const response = await fetch(`/api/gallery/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete image')
            setImages(images.filter(img => img.id !== id))
            router.refresh()
        } catch (error) {
            console.error(error)
            alert('Failed to delete image')
        }
    }

    const openEdit = (image: GalleryImage) => {
        setEditingImage(image)
        setFormData({
            title: image.title,
            description: image.description || '',
            imageUrl: image.imageUrl || '',
            order: image.order
        })
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Gallery</h2>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) resetForm()
                }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Image</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingImage ? 'Edit Image' : 'Add New Image'}</DialogTitle>
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
                                <label className="text-sm font-medium">Description (Optional)</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                                {editingImage ? 'Update Image' : 'Add Image'}
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
                            {images.map((image) => (
                                <TableRow key={image.id}>
                                    <TableCell className="font-medium">{image.title}</TableCell>
                                    <TableCell className="max-w-md truncate">{image.description}</TableCell>
                                    <TableCell>{image.order}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="sm" onClick={() => openEdit(image)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(image.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {images.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                        No images found. Add one to get started.
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
