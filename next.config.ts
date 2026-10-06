import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 构建时生成纯静态文件（out/ 文件夹），可直接上传到虚拟主机
  output: "export",

  // 静态导出不支持 Next.js 的图片优化服务，需要关闭
  images: {
    unoptimized: true,
  },

  // 生成 /fr/index.html 这种结构，虚拟主机（Apache）兼容性更好
  trailingSlash: true,
};

export default nextConfig;