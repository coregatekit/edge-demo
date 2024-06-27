/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/regional',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=60, stale-while-revalidate=59',
          },
        ],
      },
      {
        source: '/edge-regional',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=60, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
