/**
 * /book/[slug] — Pooja booking flow
 * Rendering: Client Component (uses sessionStorage, OTP, payment state)
 * SEO: noindex (transactional page, no duplicate content benefit)
 * Note: data-driven metadata still set for tab title.
 */
import { temples } from '@/lib/data'
import { Booking } from '@/components/pages/booking'

export async function generateStaticParams() {
  // Pre-render the booking shell for all temples (faster TTFB on first visit)
  return temples.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const temple = temples.find(t => t.slug === slug)
  const name = temple?.name ?? 'Temple'
  return {
    title: `Book vazhipadu — ${name}`,
    description: `Book a pooja at ${name} on TempleAddress. Instant receipt, 80G where eligible.`,
    robots: { index: false, follow: false },  // transactional — don't index
  }
}

export default function BookingPage() {
  return <Booking />
}
