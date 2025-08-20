/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'backend.steinmarine.de'], // ✅ fixed
  },
};

export default nextConfig;
