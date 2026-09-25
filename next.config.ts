import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography is served from Unsplash until real venue
    // photos are dropped into /public/media (see src/content/media.ts).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    qualities: [60, 75],
  },
};

export default nextConfig;
