import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "100.107.109.43",
    "100.107.109.43:3001",
    "192.168.88.34",
    "192.168.88.34:3001",
  ],
};

export default nextConfig;