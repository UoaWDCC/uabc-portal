/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sessions", // Matched parameters can be used in the destination
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
