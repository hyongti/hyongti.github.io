const { withContentlayer } = require("next-contentlayer");
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = withContentlayer({
  //   basePath: "/gh-pages-test",
  images: {
    unoptimized: true,
  },
  output: "export",
});

module.exports = nextConfig;
