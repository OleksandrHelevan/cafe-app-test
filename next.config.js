import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cafe-app-nerdy-bucket.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default config;
