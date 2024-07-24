/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net","images.contentstack.io"],
    remotePatterns :[
      {
        protocol: "https",
        hostname : "images.contentstack.io"
      }
    ]
  },
};

export default nextConfig;
