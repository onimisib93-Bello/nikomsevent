import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // A few remaining placeholder photos come from Unsplash (see
    // src/content/media.ts); the venue's own photos are in /public/media.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    qualities: [60, 75],
  },
};

export default nextConfig;
