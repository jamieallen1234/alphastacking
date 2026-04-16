import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/ca-etfs", destination: "/ca/etfs", permanent: true }]
  },
};

export default nextConfig;
