import type { NextConfig } from "next";

// When deploying to GitHub Pages we build a fully static site served from a
// repo subpath (e.g. /meditation-site). The base path is supplied at build time
// via NEXT_PUBLIC_BASE_PATH; locally it is empty so dev runs at the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    // next/image optimization needs a server; static export serves raw files.
    unoptimized: true,
  },
};

export default nextConfig;
