/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  trailingSlash: false,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', 
      },
    ],
  },
  
  async redirects() {
    const LW_DOMAIN = 'https://learn.studybuddy.live';
    return [
      // Force HTTPS (CRITICAL FOR INDEXING!)
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://studybuddy.live/:path*',
        permanent: true,
      },
      
      // Auth redirects
      {
        source: '/login',
        destination: `${LW_DOMAIN}/sign-in`, 
        permanent: true,
      },
      {
        source: '/signup',
        destination: `${LW_DOMAIN}/sign-up`, 
        permanent: true,
      },
      {
        source: '/register',
        destination: `${LW_DOMAIN}/sign-up`, 
        permanent: true,
      },
      
      // Product redirects
      {
        source: '/go/teas-pro',
        destination: `${LW_DOMAIN}/checkout?product_id=TEAS_PRO`,
        permanent: false,
      },
      {
        source: '/go/teas-core',
        destination: `${LW_DOMAIN}/checkout?product_id=TEAS_CORE`,
        permanent: false,
      },
      
      // Legal redirects
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/terms-and-conditions',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
      
      // Common typos
      {
        source: '/guarantee',
        destination: '/pass-guarantee',
        permanent: true,
      },
      {
        source: '/course',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/courses',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/buy',
        destination: '/pricing',
        permanent: true,
      },
    ];
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
