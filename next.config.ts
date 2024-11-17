import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/api/socket',
        headers: [
          {
            key: 'Connection',
            value: 'Upgrade',
          },
          {
            key: 'Upgrade',
            value: 'websocket',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
