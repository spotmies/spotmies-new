import type { NextConfig } from "next";
import path from "path";

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
      {
        protocol: 'https',
        hostname: 'spotmiesstorage.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
      // --- FIX: Added the new storage domain here ---
      {
        protocol: 'https',
        hostname: 'reaidystorage.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
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