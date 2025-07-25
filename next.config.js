/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 25/07/2025 - 09:09:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  // Disable favicon.ico automatic handling to avoid build error
  // You can add a custom favicon link in your _document.js or _app.js
  // or place a favicon.ico manually in the public folder if possible
  // Here we disable the default favicon handling to avoid the error
  experimental: {
    disableOptimizedLoading: true,
  },
};

module.exports = nextConfig;
