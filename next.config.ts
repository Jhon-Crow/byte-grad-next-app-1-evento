import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // output: 'export',
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "bytegrad.com",
            },
        ],
    },
};

export default nextConfig;
