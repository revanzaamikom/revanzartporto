export const GET = () => {
  const siteUrl = (import.meta.env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
  const hasSite = Boolean(siteUrl);
  const urlEntry = hasSite
    ? `\n  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`
    : '';
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntry}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
