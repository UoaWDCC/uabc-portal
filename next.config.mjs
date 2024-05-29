/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
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
