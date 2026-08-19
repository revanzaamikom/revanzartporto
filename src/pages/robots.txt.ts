export const GET = () => {
  const siteUrl = (import.meta.env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
  const sitemapLine = siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml` : '';
  const body = `User-agent: *\nAllow: /${sitemapLine}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
