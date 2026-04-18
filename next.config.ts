import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ca-etfs", destination: "/ca/etfs", permanent: true },
      { source: "/strategies", destination: "/comparison", permanent: true },
      { source: "/ca/strategies", destination: "/ca/comparison", permanent: true },
    ]
  },
};

export default nextConfig;
