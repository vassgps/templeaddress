import { NextResponse } from 'next/server'
import { apiUrl } from '@/lib/api-url'

const backend = process.env.TEMPLEADDRESS_API_URL || 'http://127.0.0.1:8000'

async function proxy(request, { params }) {
  const { path } = await params
  const incoming = new URL(request.url)
  const trailingSlash = incoming.pathname.endsWith('/') ? '/' : ''
  const target = new URL(`${apiUrl(backend, `${path.join('/')}${trailingSlash}`)}${incoming.search}`)
  const headers = new Headers()
  for (const name of ['accept', 'authorization', 'content-type', 'idempotency-key', 'x-client']) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }
  const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer()
  try {
    const response = await fetch(target, { method: request.method, headers, body, cache: 'no-store' })
    const outgoing = new Headers()
    for (const name of ['content-type', 'content-disposition']) {
      const value = response.headers.get(name)
      if (value) outgoing.set(name, value)
    }
    return new NextResponse(response.body, { status: response.status, headers: outgoing })
  } catch {
    return NextResponse.json({ success: false, error: { message: 'The Django API is unavailable.' } }, { status: 502 })
  }
}

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const PATCH = proxy
export const DELETE = proxy
