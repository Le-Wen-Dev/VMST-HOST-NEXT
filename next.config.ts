import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Transpile CKEditor packages
  transpilePackages: ['@ckeditor/ckeditor5-react', '@ckeditor/ckeditor5-build-classic'],
};

export default nextConfig;
