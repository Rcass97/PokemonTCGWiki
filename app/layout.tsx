'use client'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from '@/components/header'
import Footer from '@/components/footer'

const nunito = Nunito({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={nunito.className}><Header />{children}<Footer /></body>
      </QueryClientProvider>
    </html>
  )
}
