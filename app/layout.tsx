'use client'
import type { Metadata } from 'next'
import { GeistSans, GeistMono } from 'geist/font'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from '@/components/header'

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={GeistSans.className}><Header />{children}</body>
      </QueryClientProvider>
    </html>
  )
}
