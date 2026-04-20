import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ca-etfs", destination: "/ca/etfs", permanent: true },
      { source: "/strategies", destination: "/portfolios", permanent: true },
      { source: "/ca/strategies", destination: "/ca/portfolios", permanent: true },
      { source: "/comparison", destination: "/portfolios", permanent: true },
      { source: "/ca/comparison", destination: "/ca/portfolios", permanent: true },
    ]
  },
};

export default nextConfig;
