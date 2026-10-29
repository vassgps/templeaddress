import { Fraunces, Manrope, Anek_Malayalam } from 'next/font/google'
import './globals.css'
import DemoPortalGate from '@/components/DemoPortalGate'

/* ── Google Fonts via next/font (zero layout shift, self-hosted at build time) ── */
const fraunces = Fraunces({
  subsets: ['latin'],
  // variable weight enables optical-size axis (opsz) and lets CSS pick 500/600/700
  weight: 'variable',
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
})
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})
const anekMalayalam = Anek_Malayalam({
  subsets: ['malayalam', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-anek',
  display: 'swap',
})

/* ── Site-wide default metadata (pages override with their own generateMetadata) ── */
export const metadata = {
  metadataBase: new URL('https://templeaddress.com'),
  title: {
    template: '%s | TempleAddress',
    default: 'TempleAddress — Digital address for every temple',
  },
  description:
    'Discover verified temples, book vazhipadu, donate and follow festivals — from anywhere in the world. Zero platform fee on bookings and donations.',
  keywords: ['temple', 'vazhipadu', 'pooja booking', 'Kerala temple', 'festival', 'temple donation', 'templeaddress'],
  authors: [{ name: 'TempleAddress', url: 'https://templeaddress.com' }],
  openGraph: {
    title: 'TempleAddress — Digital address for every temple',
    description: 'Verified temples · Book vazhipadu · Donations · Festivals',
    url: 'https://templeaddress.com',
    siteName: 'TempleAddress',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', site: '@templeaddress' },
  alternates: { canonical: 'https://templeaddress.com' },
  robots: { index: true, follow: true },
  category: 'travel',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${manrope.variable} ${anekMalayalam.variable}`}
    >
      <body className="bg-brown-50 text-brown-900 antialiased">
        <DemoPortalGate>{children}</DemoPortalGate>
      </body>
    </html>
  )
}
