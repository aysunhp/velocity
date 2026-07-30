// Canonical origin for sitemap.xml, robots.txt and metadataBase.
// `URL` is injected by Netlify at build time with the site's primary URL, so a
// deploy gets real absolute URLs without anyone having to set a variable —
// forgetting to is what silently published a sitemap full of localhost links.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'http://localhost:3000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Inlined at build time, so it reaches both server and client code.
  env: { NEXT_PUBLIC_SITE_URL: siteUrl },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
};

module.exports = nextConfig;
