import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: [
    "*.run.app",
    "ais-dev-sr2l3wv3r54k4dknpdn2qy-708234144551.europe-west2.run.app",
  ],
};

export default nextConfig;
