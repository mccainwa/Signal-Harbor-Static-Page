/** @type {import('next').NextConfig} */

// --- GitHub Pages configuration ---------------------------------------------
// If you deploy to a PROJECT site (https://<user>.github.io/<repo>/), set the
// repo name below so assets and links resolve correctly. Example: '/signal-harbor'.
// If you deploy to a USER/ORG site (https://<user>.github.io/) OR use a custom
// domain (signalharborconsulting.com), leave basePath as '' (empty).
const repoBasePath = ''; // e.g. '/signal-harbor' for a project page

const nextConfig = {
  // Produces a fully static site in the ./out folder (no Node server needed).
  output: 'export',

  // next/image optimization needs a server; disable it for static hosting.
  images: {
    unoptimized: true,
  },

  // Emits /about/index.html instead of /about.html so GitHub Pages serves
  // clean URLs without a server.
  trailingSlash: true,

  // Apply the base path only when one is set (keeps custom-domain builds clean).
  basePath: repoBasePath || undefined,
  assetPrefix: repoBasePath || undefined,
};

export default nextConfig;
