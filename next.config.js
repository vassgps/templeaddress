/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["typeorm"],
  },
  images: {
    domains: ["antiquebetabucket.s3.ap-south-1.amazonaws.com","templesaddress.s3.amazonaws.com"],
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET,
 },
 
  async headers() {
    return [
      {
        source: "/about",
        headers: [
          {
            key: "x-custom-header",
            value: "my custom header value",
          },
          {
            key: "x-another-custom-header",
            value: "my other custom header value",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
