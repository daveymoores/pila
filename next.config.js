const withTM = require("next-transpile-modules")([
  "next-slicezone",
  "essential-prismic",
]);

module.exports = withTM({
  future: {
    webpack5: true,
  },
});
