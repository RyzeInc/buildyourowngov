import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/buildyourowngov",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
