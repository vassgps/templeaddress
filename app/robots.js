/** @returns {import('next').MetadataRoute.Robots} */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/vendor/', '/festival-admin/', '/service-admin/', '/partner/', '/dealer/', '/staff/', '/account/'],
      },
    ],
    sitemap: 'https://templeaddress.com/sitemap.xml',
  }
}
