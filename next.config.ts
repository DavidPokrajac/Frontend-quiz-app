import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
        search: ""
      }
    ]
  }
}

export default nextConfig
