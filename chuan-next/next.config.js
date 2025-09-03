/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig = {
  // ✅ 启用静态导出（Cloudflare Pages 需要）
  ...(isExport && {
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
  }),

  // ✅ 编译器配置：生产环境去除 console.log
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn', 'info'],
    } : false,
  },

  // ✅ 环境变量配置
  env: {
    GO_BACKEND_URL: process.env.GO_BACKEND_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  },

  // ✅ 公共运行时配置（前端可访问）
  publicRuntimeConfig: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    wsUrl: process.env.NEXT_PUBLIC_WS_URL,
  },

  // ✅ 服务器端运行时配置（仅后端可访问）
  serverRuntimeConfig: {
    goBackendUrl: process.env.GO_BACKEND_URL,
  },

  // ✅ 重写规则（仅在非导出模式下启用）
  ...(!isExport && {
    async rewrites() {
      return [
        {
          source: '/api/proxy/:path*',
          destination: `${process.env.GO_BACKEND_URL}/api/:path*`,
        },
      ];
    },
  }),

  // ✅ 图片优化配置（导出模式下禁用）
  images: {
    unoptimized: isExport,
  },

  // ✅ 其他优化
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
