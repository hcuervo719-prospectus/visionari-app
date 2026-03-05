// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PaddleScript from '@/components/PaddleScript'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Visionari - Build the vision that will transform your business',
  description: 'Learn from companies like Amazon, Tesla, and Apple how to build a clear vision that guides every decision for decades.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <PaddleScript />
      </body>
    </html>
  )
}
