import { isIP } from 'node:net'

// Configure only a header overwritten by the deployment's trusted ingress.
export function forwardedClientChain(request, trustedHeader) {
  const client = request.ip || (trustedHeader && request.headers.get(trustedHeader))
  if (!client || !isIP(client.trim())) return ''
  const incoming = (request.headers.get('x-forwarded-for') || '').split(',').map(value => value.trim()).filter(value => isIP(value))
  return [...incoming, client.trim()].join(', ')
}
