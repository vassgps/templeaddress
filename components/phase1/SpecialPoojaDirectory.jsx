'use client'

import Link from 'next/link'
import { DIRECTORY_PAGE_SIZE } from '@/lib/listing-directory'
import { CatalogueLoadMore, useCataloguePages } from './useCataloguePages'

export default function SpecialPoojaDirectory({ initialPage, initialPageNumber }) {
  const pagination = useCataloguePages(`events?kind=special_pooja&page_size=${DIRECTORY_PAGE_SIZE}`, initialPage, initialPageNumber)
  return <>
    <div className="mt-6 grid gap-4 md:grid-cols-3" aria-busy={pagination.loading}>{pagination.results.map(row => <Link key={row.uuid} href={`/special/${row.slug}`} className="card p-5"><h2 className="text-xl font-semibold">{row.name_en}</h2><p>{row.host_listing?.name_en}</p></Link>)}</div>
    {!pagination.loading && !pagination.error && !pagination.count && <p className="mt-5">No special poojas are currently published.</p>}
    <CatalogueLoadMore pagination={pagination} href={`/special?page=${pagination.nextPage}`}/>
  </>
}
