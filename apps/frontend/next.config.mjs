const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";
const repoName = "ABDULLAH_PROTFOLIO";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPagesBuild ? `/${repoName}` : ""
  },
  ...(isGithubPagesBuild
    ? {
        output: "export",
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        images: { unoptimized: true }
      }
    : {
        output: "standalone",
        images: {
          remotePatterns: [
            {
              protocol: "http",
              hostname: "localhost"
            },
            {
              protocol: "https",
              hostname: "**"
            }
          ]
        },
        async rewrites() {
          const backendBase = (process.env.NEXT_INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

          return [
            {
              source: "/api/:path*",
              destination: `${backendBase}/api/:path*`
            }
          ];
        }
      }),
  allowedDevOrigins: [
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://localhost:3000",
    "http://localhost:3001"
  ],
  webpack: (config) => {
    // face-api.js (dynamically imported, only used when GridScan's opt-in
    // enableWebcam is turned on) probes for Node's fs/encoding modules at
    // bundle time even though they're never reached in the browser.
    config.resolve.fallback = { ...config.resolve.fallback, fs: false, encoding: false };
    return config;
  }
};

export default nextConfig;
