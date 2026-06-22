/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://pila.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/account", "/account/sessions"],
};