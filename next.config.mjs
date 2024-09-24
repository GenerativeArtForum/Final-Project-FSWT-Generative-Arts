/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['img.clerk.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-fb56cc9e59d048879f4855df96eea1fe.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
