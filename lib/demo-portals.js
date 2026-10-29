const demoRoots = ['/vendor', '/festival-admin', '/service-admin', '/partner', '/dealer']
const liveStaffPages = new Set(['/staff', '/staff/charts', '/staff/payouts', '/staff/listing', '/staff/directory/bookings', '/staff/directory/users', '/staff/directory/transactions'])

export const demoPortalsEnabled = flags => flags?.demo_portals === true

export function isDemoPortal(pathname) {
  const path = pathname?.replace(/\/$/, '') || '/'
  return demoRoots.some(root => path === root || path.startsWith(`${root}/`)) ||
    ((path === '/staff' || path.startsWith('/staff/')) && !liveStaffPages.has(path))
}
