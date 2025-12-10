'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, Pencil, Trash2 } from 'lucide-react'

type GalleryImage = {
    id: string
    title: string
    description: string | null
    imageUrl: string
    order: number
}

export default function AdminGalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        order: 0,
    })

    useEffect(() => {
        fetchImages()
    }, [])

    async function fetchImages() {
        try {
            const response = await fetch('/api/gallery')
            const data = await response.json()
            setImages(data)
        } catch (error) {
            console.error('Error fetching images:', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            const url = editingImage
                ? `/api/gallery/${editingImage.id}`
                : '/api/gallery'

            const method = editingImage ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                await fetchImages()
                setDialogOpen(false)
                resetForm()
            }
        } catch (error) {
            console.error('Error saving image:', error)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this image?')) return

        try {
            const response = await fetch(`/api/gallery/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                await fetchImages()
            }
        } catch (error) {
            console.error('Error deleting image:', error)
        }
    }

    function openEditDialog(image: GalleryImage) {
        setEditingImage(image)
        setFormData({
            title: image.title,
            description: image.description || '',
            imageUrl: image.imageUrl,
            order: image.order,
        })
        setDialogOpen(true)
    }

    function resetForm() {
        setEditingImage(null)
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
                    <h1 className="text-3xl font-bold text-gray-900">Manage Gallery</h1>
                    <p className="text-gray-600 mt-2">Upload and manage gallery images</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={(open) => {
                    setDialogOpen(open)
                    if (!open) resetForm()
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Image
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                {editingImage ? 'Edit Image' : 'Add New Image'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
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
                                    {editingImage ? 'Update' : 'Add'} Image
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image) => (
                    <Card key={image.id} className="overflow-hidden">
                        <div className="aspect-square bg-gray-200 relative">
                            {image.imageUrl && (
                                <img
                                    src={image.imageUrl}
                                    alt={image.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-semibold mb-1">{image.title}</h3>
                            {image.description && (
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {image.description}
                                </p>
                            )}
                            <div className="flex space-x-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openEditDialog(image)}
                                    className="flex-1"
                                >
                                    <Pencil className="h-3 w-3 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(image.id)}
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
