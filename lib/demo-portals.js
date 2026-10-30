const demoRoots = ['/vendor', '/festival-admin', '/service-admin', '/partner', '/dealer']
const deferredPublicRoots = ['/claim', '/sponsor']
const liveStaffPages = new Set(['/staff', '/staff/charts', '/staff/payouts', '/staff/listing', '/staff/directory/bookings', '/staff/directory/users', '/staff/directory/transactions'])

// Build-time switch shared by the server middleware and the client footer.
export const demoPortalsEnabled = value => value === 'true'

export function isDemoPortal(pathname) {
  const path = pathname?.replace(/\/$/, '') || '/'
  return demoRoots.some(root => path === root || path.startsWith(`${root}/`)) ||
    deferredPublicRoots.some(root => path === root || path.startsWith(`${root}/`)) ||
    ((path === '/staff' || path.startsWith('/staff/')) && !liveStaffPages.has(path))
}
