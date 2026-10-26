This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Images and videos

Site images and videos are served from Cloudflare R2, not from `public/`. Code refers to them with the `cdn()` helper in `src/lib/cdn.ts`:

```tsx
<img src={cdn("media/reaidy.webp")} alt="Reaidy" />
```

`cdn()` prefixes the path with `NEXT_PUBLIC_CDN_URL` (set in `.env`, and in the Vercel project settings for deployments). `next.config.ts` allows that host for `next/image`.

To add or replace a file, upload it to the R2 bucket `spotmiesassets` at the same path the code uses, for example with [rclone](https://rclone.org/s3/#cloudflare-r2):

```bash
rclone copy ./hero-6.mp4 r2:spotmiesassets/videos/ --header-upload "Cache-Control: public, max-age=604800"
```

Images are stored as WebP, resized to the largest size the site shows, and videos as 1080p H.264. Browsers cache files for 7 days, so give a changed file a new name rather than overwriting it.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
