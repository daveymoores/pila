const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "next-slicezone",
  "essential-slices",
])({
  future: {
    webpack5: true,
  },
  images: {
    domains: ["images.prismic.io"],
    deviceSizes: [600, 900, 1400],
  },
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([[withTM], [withBundleAnalyzer]]);
