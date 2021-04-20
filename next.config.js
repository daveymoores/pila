const withTM = require("next-transpile-modules")([
  "next-slicezone",
  "essential-slices",
]);

module.exports = withTM({
  future: {
    webpack5: true,
  },
  images: {
    domains: ["images.prismic.io"],
    deviceSizes: [600, 900, 1400],
  },
});
