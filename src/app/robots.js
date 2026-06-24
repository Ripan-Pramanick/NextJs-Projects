/**
 * robots metadata for Next.js (MetadataRoute.Robots)
 *
 * Next will use this default export to generate /robots.txt
 */

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: ['https://minervasutra.com/sitemap.xml'],
    host: 'https://minervasutra.com',
  };
}
