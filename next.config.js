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
});

module.exports = nextConfig;
