// next.config.mjs
/** @type {import('next').NextConfig} */
// Use require for CommonJS compatibility in Next.js config

const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  
  // Turbopack configuration for Next.js 16+
  turbopack: {},
  
  // Image optimization configuration
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
        hostname: 'shreedhargroup.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sweekarme.in',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  // Webpack configuration for bundle optimization
 webpack(config, { dev, isServer }) {
  if (!dev && !isServer && process.env.ANALYZE === 'true') {
    try {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
    } catch (error) {
      console.error('webpack-bundle-analyzer not found. Skipping plugin.');
    }
  }

  // Optimize SVGs
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });

  return config;
},

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Preserve SEO equity and bookmarks from the previous WordPress site.
  // These are deliberately exact-path redirects so current application routes
  // and dynamic product/news URLs are not affected.
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/about',
        statusCode: 301,
      },
      {
        source: '/glove-integrity-test/glove-integrity-tester',
        destination: '/products/wireless-glove-integrity-tester-git-wlan',
        statusCode: 301,
      },
      {
        source: '/industry/pharmaceutical-sterile-manufacturing',
        destination: '/products?category=Pharmaceutical',
        statusCode: 301,
      },
      {
        source: '/uncategorized/fully-robotic-glove-less-isolator-based-filling-machine',
        destination: '/products/single-head-filling-machine',
        statusCode: 301,
      },
    ];
  },

  // Rewrites (if needed)
  async rewrites() {
    return [
      // Add any rewrites here
      // {
      //   source: '/api/:path*',
      //   destination: 'https://sweekarme.in/shree/api/:path*',
      // },
    ];
  }
};

export default nextConfig;
