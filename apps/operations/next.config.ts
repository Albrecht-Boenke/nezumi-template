import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  logging: {
    browserToTerminal: true,
    // 'error' — errors only (default)
    // 'warn'  — warnings and errors
    // true    — all console output
    // false   — disabled
  },

  /** Source-only workspace package (`tsc --noEmit` only). Next transpiles + bundles TS/TSX/CSS here via the compiler — not a `@packages/ui` npm build script. See nextjs.org transpilePackages. */
  transpilePackages: ["@packages/ui"],
}

export default nextConfig
