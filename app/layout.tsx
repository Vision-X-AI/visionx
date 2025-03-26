import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VisionX',
  description: 'VisionX - See the Future, Shape the Web3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
