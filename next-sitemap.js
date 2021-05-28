module.exports = {
  siteUrl:
    process.env.NODE_ENV !== "development"
      ? process.env.SITE_URL
      : process.env.NEXT_PUBLIC_VERCEL_URL,
  generateRobotsTxt: true,
  exclude: ["/account", "/account/sessions"],
};
