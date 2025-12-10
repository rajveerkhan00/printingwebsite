import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import { Briefcase, Image, Mail, Clock } from 'lucide-react'

async function getDashboardStats() {
    const [servicesCount, galleryCount, newContactsCount, totalContactsCount] = await Promise.all([
        prisma.service.count(),
        prisma.galleryImage.count(),
        prisma.contactSubmission.count({ where: { handled: false } }),
        prisma.contactSubmission.count(),
    ])

    const recentContacts = await prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            handled: true,
        },
    })

    return {
        servicesCount,
        galleryCount,
        newContactsCount,
        totalContactsCount,
        recentContacts,
    }
}

export default async function AdminDashboard() {
    const stats = await getDashboardStats()

    const statCards = [
        {
            title: 'Total Services',
            value: stats.servicesCount,
            icon: Briefcase,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Gallery Images',
            value: stats.galleryCount,
            icon: Image,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            title: 'New Messages',
            value: stats.newContactsCount,
            icon: Mail,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
        {
            title: 'Total Messages',
            value: stats.totalContactsCount,
            icon: Clock,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
    ]

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your website.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                {stat.title}
                            </CardTitle>
                            <div className={`${stat.bgColor} p-2 rounded-lg`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Contacts */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Contact Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                    {stats.recentContacts.length > 0 ? (
                        <div className="space-y-4">
                            {stats.recentContacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <p className="font-semibold">{contact.name}</p>
                                        <p className="text-sm text-gray-600">{contact.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">
                                            {new Date(contact.createdAt).toLocaleDateString()}
                                        </p>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${contact.handled
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-orange-100 text-orange-800'
                                                }`}
                                        >
                                            {contact.handled ? 'Handled' : 'New'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center py-4">No contact submissions yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
