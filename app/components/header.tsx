"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Phone, Menu, X, Sparkles, ChevronDown, 
  MessageCircle, ShoppingCart, Search, Sun, Moon,
  User
} from "lucide-react"
import { useTheme } from "@/app/theme-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState(3)
  const { theme, toggleTheme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  const phoneNumbers = [
    { number: "+92 322 4432533", label: "Primary" },
  ]

  // Theme-based styles
  const headerBg = theme === "dark" 
    ? scrolled 
      ? "bg-gray-900/95 backdrop-blur-lg" 
      : "bg-gray-900"
    : scrolled 
      ? "bg-white/95 backdrop-blur-lg" 
      : "bg-white"

  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900"
  const textSecondaryColor = theme === "dark" ? "text-gray-400" : "text-gray-600"
  const hoverBg = theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-200"

  return (
    <>
      {/* Top Announcement Bar - Uncomment if needed */}
      {/* <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-2 px-4">
        <p className="text-sm font-medium">🎉 Special Offer: Get 20% off on all business cards this month!</p>
      </div> */}

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${headerBg} border-b ${borderColor}`}
      >
        
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group relative"
              onMouseEnter={() => setHoveredNav("logo")}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-black to-gray-900 shadow-2xl">
                  <div className="relative h-12 w-12">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">A</span>
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="h-3 w-3 text-yellow-400 animate-spin-slow" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold uppercase leading-tight ${textColor} group-hover:text-red-600 transition-colors`}>
                  Awais Printers
                </span>
                <span className={`text-[10px] uppercase leading-tight ${textSecondaryColor} group-hover:text-gray-700 transition-colors`}>
                  Where Ideas Become Reality
                </span>
                {hoveredNav === "logo" && (
                  <div className="absolute -bottom-1 left-0 h-0.5 w-24 bg-gradient-to-r from-red-600 to-red-500 animate-expand-width" />
                )}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative" onMouseEnter={() => setHoveredNav(item.label)} onMouseLeave={() => setHoveredNav(null)}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${textSecondaryColor} hover:${textColor} transition-colors group`}
                  >
                    {item.label}
                  </Link>
                  
                  {/* Hover Indicator */}
                  {hoveredNav === item.label && (
                    <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-red-600 to-red-500 animate-expand-width" />
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Admin Login Icon */}
              <Link
                href="/admin"
                className="group relative p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label="Admin Login"
                title="Admin Dashboard"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-blue-500/20 to-indigo-500/20" 
                    : "bg-gradient-to-r from-blue-400/20 to-indigo-400/20"
                }`} />
                
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-blue-600/30 to-indigo-600/30" 
                    : "bg-gradient-to-r from-blue-500/30 to-indigo-500/30"
                }`} />
                
                {/* Main button content */}
                <div className={`relative flex items-center justify-center h-9 w-9 rounded-full border transition-all duration-300 ${
                  theme === "dark" 
                    ? "border-blue-500/30 bg-gradient-to-br from-gray-800 to-gray-900 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
                    : "border-blue-400/30 bg-gradient-to-br from-blue-50 to-white text-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                } group-hover:scale-110 group-active:scale-95`}>
                  <User className="h-5 w-5 transition-transform duration-500 group-hover:rotate-12" />
                  
                  {/* Admin indicator dot */}
                  <div className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full ${
                    theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                  } border-2 ${theme === "dark" ? "border-gray-900" : "border-white"}`} />
                </div>
                
                {/* Tooltip */}
                <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                  theme === "dark" 
                    ? "bg-gray-800 text-blue-200 border border-blue-500/30" 
                    : "bg-white text-gray-800 border border-gray-200 shadow-lg"
                }`}>
                  Admin Login
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent ${
                    theme === "dark" 
                      ? "border-t-blue-500/30" 
                      : "border-t-white"
                  }`} />
                </div>
              </Link>

              {/* Enhanced Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className="group relative p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-amber-200/20 to-yellow-100/20" 
                    : "bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
                }`} />
                
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-amber-400/30 to-yellow-300/30" 
                    : "bg-gradient-to-r from-indigo-600/30 to-purple-600/30"
                }`} />
                
                {/* Main button content */}
                <div className={`relative flex items-center justify-center h-9 w-9 rounded-full border transition-all duration-300 ${
                  theme === "dark" 
                    ? "border-amber-500/30 bg-gradient-to-br from-gray-800 to-gray-900 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.2)]" 
                    : "border-blue-400/30 bg-gradient-to-br from-blue-50 to-white text-amber-600 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                } group-hover:scale-110 group-active:scale-95`}>
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
                  ) : (
                    <Moon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                  )}
                  
                  {/* Floating particles */}
                  {theme === "dark" && (
                    <>
                      <div className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-yellow-400/60 animate-pulse" />
                      <div className="absolute -bottom-1 -right-1 h-1.5 w-1.5 rounded-full bg-amber-300/50 animate-pulse delay-150" />
                    </>
                  )}
                </div>
                
                {/* Tooltip */}
                <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                  theme === "dark" 
                    ? "bg-gray-800 text-amber-200 border border-amber-500/30" 
                    : "bg-white text-gray-800 border border-gray-200 shadow-lg"
                }`}>
                  Switch to {theme === "dark" ? "light" : "dark"} mode
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent ${
                    theme === "dark" 
                      ? "border-t-amber-500/30" 
                      : "border-t-white"
                  }`} />
                </div>
              </button>

              {/* WhatsApp Chat */}
              <a
                href="https://wa.me/923224432533"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <MessageCircle className="h-4 w-4 relative z-10" />
                <span className="relative z-10 hidden md:inline">Chat Now</span>
              </a>

              {/* Phone Numbers */}
              <div className="hidden lg:block relative group">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} border ${borderColor} group-hover:border-red-500 transition-all`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 shadow-lg">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xs ${textSecondaryColor}`}>Call Us</span>
                    <span className={`text-sm font-bold ${textColor}`}>+92 322 4432533</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 ${textSecondaryColor} group-hover:rotate-180 transition-transform`} />
                </div>

                {/* Dropdown */}
                <div className={`absolute top-full right-0 mt-2 w-64 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-2xl border ${borderColor} backdrop-blur-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}>
                  <div className="p-4">
                    <h4 className={`text-sm font-semibold ${textColor} mb-3`}>Contact Numbers</h4>
                    {phoneNumbers.map((phone) => (
                      <a
                        key={phone.number}
                        href={`tel:${phone.number}`}
                        className={`flex items-center justify-between p-3 rounded-lg ${hoverBg} transition-colors group`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                            <Phone className="h-3 w-3 text-red-600" />
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${textColor}`}>{phone.number}</div>
                            <div className={`text-xs ${textSecondaryColor}`}>{phone.label} Line</div>
                          </div>
                        </div>
                        <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                          Available
                        </div>
                      </a>
                    ))}
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <div className={`flex items-center justify-between text-xs ${textSecondaryColor}`}>
                        <span>📅 Mon-Sat: 9AM-7PM</span>
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-2 rounded-lg ${hoverBg} transition-colors`}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className={`h-6 w-6 ${textSecondaryColor}`} />
                ) : (
                  <Menu className={`h-6 w-6 ${textSecondaryColor}`} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed inset-x-0 top-24 ${theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-t ${borderColor} shadow-2xl transition-all duration-300 ease-out ${
            isMenuOpen 
              ? "opacity-100 visible translate-y-0" 
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 py-6">
            {/* Mobile Admin Login */}
            <Link
              href="/admin"
              className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} border ${borderColor} mb-6 group`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={`h-12 w-12 rounded-full flex items-center justify-center border ${
                theme === "dark" 
                  ? "border-blue-500/30 bg-gradient-to-br from-gray-800 to-gray-900 text-blue-300" 
                  : "border-blue-400/30 bg-gradient-to-br from-blue-50 to-white text-blue-600"
              }`}>
                <User className="h-6 w-6" />
                <div className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${
                  theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                } border-2 ${theme === "dark" ? "border-gray-800" : "border-white"}`} />
              </div>
              <div>
                <div className={`font-semibold ${textColor}`}>Admin Dashboard</div>
                <div className={`text-xs ${textSecondaryColor}`}>Manage your printing business</div>
              </div>
            </Link>

            {/* Mobile Theme Toggle */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${textColor}`}>Theme</span>
                <button 
                  onClick={toggleTheme}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600 hover:border-amber-500/50 transition-all group"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                >
                  <div className="relative">
                    {theme === "dark" ? (
                      <>
                        <Sun className="h-5 w-5 text-amber-300" />
                        <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                      </>
                    ) : (
                      <Moon className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${textColor}`}>
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                  <ChevronDown className={`h-4 w-4 ${textSecondaryColor} group-hover:rotate-180 transition-transform`} />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-lg font-medium ${textColor} ${hoverBg} rounded-xl transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="space-y-4">
                {phoneNumbers.map((phone) => (
                  <a
                    key={phone.number}
                    href={`tel:${phone.number}`}
                    className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} border ${borderColor}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${textColor}`}>{phone.number}</div>
                      <div className={`text-xs ${textSecondaryColor}`}>{phone.label} Line • Tap to call</div>
                    </div>
                  </a>
                ))}
                
                <a
                  href="https://wa.me/923224432533"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold hover:shadow-lg transition-shadow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle className="h-5 w-5" />
                  Start WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Mobile Business Info */}
            <div className={`mt-6 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} border ${borderColor}`}>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className={textSecondaryColor}>Open Now</span>
                </div>
                <span className={`font-medium ${textColor}`}>9:00 AM - 7:00 PM</span>
              </div>
              <p className={`mt-2 text-xs ${textSecondaryColor}`}>Mon-Sat • Sunday Closed</p>
            </div>
          </div>
        </div>

        {/* Scrolling Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-30">
          {isClient && (
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300"
              style={{
                width: `${Math.min((window.scrollY / 500) * 100, 100)}%`
              }}
            />
          )}
        </div>
      </header>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="tel:+923224432533"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 transition-all hover:scale-110 active:scale-95"
          aria-label="Call us"
        >
          <Phone className="h-6 w-6" />
        </a>
        <a
          href="https://wa.me/923224432533"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-110 active:scale-95"
          aria-label="WhatsApp chat"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>
    </>
  )
}