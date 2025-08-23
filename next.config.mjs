/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sweekarme.in',
        port: '',
        pathname: '/shree/**',
      },
      {
        protocol: 'https',
        hostname: 'sweekarme.in',
        port: '',
        pathname: '/media/**', // Add this for media files
      },
      {
        protocol: 'https',
        hostname: 'shreedhargroup.com',
        port: '',
        pathname: '/**',
      },
      // Add any other domains you're loading images from
    ],
    // Alternative: Use domains (deprecated but still works)
    // domains: [
    //   'images.unsplash.com',
    //   'sweekarme.in',
    //   'shreedhargroup.com'
    // ],
    
    // Optional: Add image optimization settings
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Optional: Add other optimizations
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;