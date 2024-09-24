/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/...",
      },
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flexible.img.hani.co.kr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "store.ardanlabs.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.hanatour.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cafe24.poxo.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
