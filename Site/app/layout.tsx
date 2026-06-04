import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FTM Nobreaks — Assistência Técnica Especializada',
  description: 'Venda, Locação e Manutenção de Nobreaks em Recife-PE. Trabalhamos com as principais marcas: SMS, NHS, APC, Schneider Electric, Eaton e mais.',
  keywords: ['nobreak', 'UPS', 'assistência técnica', 'Recife', 'manutenção', 'venda', 'locação', 'FTM'],
  icons: {
    icon: [
      { url: '/favicon.png?v=ftm-logo-4', type: 'image/png', sizes: '64x64' },
      { url: '/icon-dark-32x32.png?v=ftm-logo-4', type: 'image/png', sizes: '32x32' },
      { url: '/icon-light-32x32.png?v=ftm-logo-4', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.png?v=ftm-logo-4',
    apple: '/apple-touch-icon.png?v=ftm-logo-4',
  },
  openGraph: {
    title: 'FTM Nobreaks — Energia Ininterrupta para o que Realmente Importa',
    description: 'Assistência técnica especializada em nobreaks em Recife-PE. Venda, locação e manutenção.',
    type: 'website',
  },
  themeColor: '#0E0E0E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
