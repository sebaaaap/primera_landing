import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ← Esto desactiva ESLint durante el build
  },
};

export default nextConfig;
