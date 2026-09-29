import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  allowedDevOrigins: [
    "**.run.app",
    "*.run.app",
    "*.europe-west2.run.app",
    "ais-dev-7ymgys3dkujgf6hrsx72bk-708234144551.europe-west2.run.app",
    "ais-pre-7ymgys3dkujgf6hrsx72bk-708234144551.europe-west2.run.app",
  ],
};

export default nextConfig;
