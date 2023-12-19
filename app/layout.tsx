import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client';

import './globals.css'

const font = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Virtual Card',
  description: 'Jake has sent you a virtual card',
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
