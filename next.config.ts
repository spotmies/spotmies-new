import type { NextConfig } from "next";
import path from "path";

// Images formerly on Azure Blob are served from NEXT_PUBLIC_CDN_URL (see src/lib/cdn.ts).
// When it points at a remote host (Cloudflare R2), next/image has to allow that host.
const cdnHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_CDN_URL ?? "").hostname;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  // Pin the workspace root so a stray lockfile in a parent dir (e.g. ~/package-lock.json)
  // doesn't make Turbopack resolve modules like `tailwindcss` from the wrong directory.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      ...(cdnHost
        ? [{ protocol: 'https' as const, hostname: cdnHost, port: '', pathname: '/**' }]
        : []),
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.thiings.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;