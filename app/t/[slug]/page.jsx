/**
 * /t/[slug] — Temple page
 * Rendering: SSG via generateStaticParams, with a partially prerendered client UI.
 * SEO: generateMetadata with OpenGraph, JSON-LD structured data
 * Note: Next.js 16 — params is a Promise, must await.
 */
import { notFound } from 'next/navigation'
import { temples } from '@/lib/data'
import { TemplePage } from '@/components/pages/public'

// ── Build-time: generate all temple pages statically ─────────────────────────
export async function generateStaticParams() {
  return temples.map(t => ({ slug: t.slug }))
}
// ── Per-page SEO metadata ─────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params          // Next.js 16: params is a Promise
  const temple = temples.find(t => t.slug === slug)
  if (!temple) return { title: 'Temple not found' }

  const title       = temple.name
  const description = `Book vazhipadu at ${temple.name} in ${temple.place}, ${temple.district}. ${temple.deity ? `Main deity: ${temple.deity}.` : ''} Verified listing on TempleAddress.`

  return {
    title,
    description,
    keywords:  [temple.name, temple.place, temple.district, temple.deity, 'temple', 'pooja booking'].filter(Boolean),
    alternates: { canonical: `https://templeaddress.com/t/${slug}` },
    openGraph: {
      title:       `${temple.name} — TempleAddress`,
      description,
      url:         `https://templeaddress.com/t/${slug}`,
      type:        'website',
      locale:      'en_IN',
    },
    twitter: { card: 'summary_large_image', title: `${temple.name} — Book vazhipadu`, description },
  }
}
// ── JSON-LD structured data (improves Google rich results) ───────────────────
function JsonLd({ temple }) {
  const schema = {
    '@context':    'https://schema.org',
    '@type':       'PlaceOfWorship',
    name:          temple.name,
    description:   `Temple in ${temple.place}, ${temple.district}, Kerala`,
    address: {
      '@type':          'PostalAddress',
      streetAddress:    temple.address || temple.place,
      addressLocality:  temple.place,
      addressRegion:    temple.district,
      addressCountry:   'IN',
    },
    ...(temple.lat && temple.lng && {
      geo: { '@type': 'GeoCoordinates', latitude: temple.lat, longitude: temple.lng },
    }),
    ...(temple.publicPhone && { telephone: temple.publicPhone }),
    url: `https://templeaddress.com/t/${temple.slug}`,
    potentialAction: {
      '@type':  'ReserveAction',
      name:     'Book Vazhipadu',
      target:   `https://templeaddress.com/book/${temple.slug}`,
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function TemplePageRoute({ params }) {
  const { slug } = await params
  const temple = temples.find(t => t.slug === slug)
  if (!temple) notFound()
  return (
    <>
      <JsonLd temple={temple} />
      {/* TemplePage is a client component; it receives the temple via context/search */}
      <TemplePage />
    </>
  )
}
