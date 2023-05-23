/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "tailwindui.com",
    ],
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
    typedRoutes: true,
    serverComponentsExternalPackages: ["mysql2"],
    // runtime: "edge",
    serverActions: true,
  },
}

module.exports = nextConfig
