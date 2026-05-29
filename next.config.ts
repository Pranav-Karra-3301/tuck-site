import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't get confused by lockfiles
  // higher up the tree (silences the multiple-lockfiles warning).
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/terms-of-use",
        destination: "/terms",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
