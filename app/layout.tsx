import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "./theme-provider"
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Awais Printers",
  description: "Professional printing services with precision and creativity",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}