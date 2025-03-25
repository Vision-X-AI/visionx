import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VisionX',
  description: 'VisionX - See the Future, Shape the Web3',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  }
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
