import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    // Add CSS and PostCSS handling for ES module compatibility
    if (!isServer) {
      config.resolve.extensions.push(".css", ".scss");
    }
    return config;
  },
  transpilePackages: ["next-auth"], // Add other packages as needed
  reactStrictMode: true, // Optional: Enables React's strict mode
  //swcMinify: true, // Optional: Uses SWC for minification
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    CLOUDINARY_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  images: {
    //loader: "cloudinary",
    //path: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`,
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "media.licdn.com",
      "assets.aceternity.com",
      "asset.cloudinary.com",
      "assets-global.website-files.com",
      "www.swinglifestyle.com",
      "aviationmaintenance.edu",
      "www.aviationmaintenance.edu",
      "b3314629.smushcdn.com",
      "pbs.twimg.com",
    ],
  },
};

export default nextConfig;
