import type { Metadata } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Junaid Burke — AI Builder & Systems Engineer',
    template: '%s | Junaid Burke',
  },
  description:
    'Solo founder building AI-powered tools for service businesses. Next.js, TypeScript, Supabase, Claude API.',
  metadataBase: new URL('https://junaidburke.com'),
  openGraph: {
    title: 'Junaid Burke — AI Builder & Systems Engineer',
    description: 'Solo founder building AI-powered tools for service businesses.',
    url: 'https://junaidburke.com',
    siteName: 'Junaid Burke',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Junaid Burke — AI Builder & Systems Engineer',
    description: 'Solo founder building AI-powered tools for service businesses.',
    creator: '@JunaidBurke',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text font-sans antialiased">
        <ThemeProvider>
          {/* Gradient blobs */}
          <div
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-green/5 blur-[120px]" />
            <div className="absolute top-[40%] right-[-300px] w-[500px] h-[500px] rounded-full bg-purple/5 blur-[120px]" />
            <div className="absolute bottom-[-200px] left-[20%] w-[400px] h-[400px] rounded-full bg-orange/[0.03] blur-[100px]" />
          </div>
          <Navbar />
          <main className="relative z-10 pt-16">{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
