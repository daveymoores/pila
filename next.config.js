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
  },
});
