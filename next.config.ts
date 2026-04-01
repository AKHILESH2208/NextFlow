import type { NextConfig } from "next";

const nextConfig: any = {
  /* config options here */
  serverExternalPackages: [],
  experimental: { 
    serverActions: { bodySizeLimit: "200mb" }, 
    proxyClientMaxBodySize: 1024 * 1024 * 200 
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors. This also prevents Vercel out-of-memory freezing.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
