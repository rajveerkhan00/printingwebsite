import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">PrintPro</h3>
                        <p className="text-sm mb-4">
                            Your trusted partner for professional printing services. Quality,
                            speed, and excellence in every project.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-blue-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-blue-400 transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="hover:text-blue-400 transition-colors">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-blue-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Services</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Business Cards</li>
                            <li>Flyers & Brochures</li>
                            <li>Banners & Posters</li>
                            <li>Custom Printing</li>
                            <li>Design Services</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-2">
                                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <span>123 Print Street, Design City, DC 12345</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <span>(555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <span>info@printpro.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
                    <p>&copy; {currentYear} PrintPro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
