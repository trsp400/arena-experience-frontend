/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: 'http://localhost:3001',
    NEXT_AUTH_SECRET: 'dc17bfefb5372ab6ca85c6e11e2259f8',
    NEXTAUTH_URL: 'http://localhost:3000',
    JWT_SECRET: 'ece925e1d660dd5f33f88e894c82fad5'
  }
};

export default nextConfig;
