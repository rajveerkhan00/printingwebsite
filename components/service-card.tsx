interface ServiceCardProps {
    title: string
    description: string
    imageUrl: string
}

export default function ServiceCard({ title, description, imageUrl }: ServiceCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    )
}
