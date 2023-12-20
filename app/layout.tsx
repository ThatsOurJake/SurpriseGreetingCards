import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client';

import './globals.css'

const font = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Surprise Greeting Cards - Home',
  description: 'Have a card id, visit here to enter it!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={font.className}>{children}</body>
      </UserProvider>
    </html>
  )
}
