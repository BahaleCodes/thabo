const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");
const siteUrl = resolveSiteUrl();

if (!siteUrl) {
  console.warn(
    "SEO generator skipped sitemap creation because no production site URL was found. Set REACT_APP_SITE_URL in Vercel."
  );
  writeRobotsFile("");
  process.exit(0);
}

writeSitemapFile(siteUrl);
writeRobotsFile(siteUrl);

function resolveSiteUrl() {
  const fileEnv = readEnvFile(path.join(__dirname, "..", ".env.production"));
  const explicitUrl =
    process.env.REACT_APP_SITE_URL ||
    fileEnv.REACT_APP_SITE_URL ||
    process.env.SITE_URL;
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const vercelPreviewUrl = process.env.VERCEL_URL;

  const rawUrl = explicitUrl || vercelProductionUrl || vercelPreviewUrl;
  if (!rawUrl) return "";

  const normalizedUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  return normalizedUrl.replace(/\/+$/, "");
}

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .reduce((accumulator, line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith("#")) {
        return accumulator;
      }

      const separatorIndex = trimmedLine.indexOf("=");
      if (separatorIndex === -1) {
        return accumulator;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine.slice(separatorIndex + 1).trim();

      if (key) {
        accumulator[key] = value;
      }

      return accumulator;
    }, {});
}

function writeSitemapFile(baseUrl) {
  const now = new Date().toISOString();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
}

function writeRobotsFile(baseUrl) {
  const sitemapLine = baseUrl ? `Sitemap: ${baseUrl}/sitemap.xml\n` : "";
  const robots = `User-agent: *
Allow: /

${sitemapLine}`;

  fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);
}
