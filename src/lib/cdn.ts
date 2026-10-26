// Base URL for the images that used to live on Azure Blob Storage, keeping the old
// container layout (media/, old-data/, spotmiespublic/). Set NEXT_PUBLIC_CDN_URL to the
// Cloudflare R2 public domain in production; without it, files are served from public/cdn.
export const CDN_URL = (process.env.NEXT_PUBLIC_CDN_URL || "/cdn").replace(/\/+$/, "");

export function cdn(path: string) {
    return `${CDN_URL}/${path}`;
}
