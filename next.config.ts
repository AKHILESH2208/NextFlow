import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors. This also prevents Vercel out-of-memory freezing.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
