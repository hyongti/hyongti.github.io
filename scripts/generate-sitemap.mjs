import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://hyongti.github.io";
const OUT_DIR = path.join(__dirname, "..", "out");

// Read blog slugs from out/blog directory
const blogDir = path.join(OUT_DIR, "blog");
const blogSlugs = fs
  .readdirSync(blogDir)
  .filter((f) => f.endsWith(".html") && f !== "index.html")
  .map((f) => f.replace(".html", ""));

const staticPages = ["/blog", "/about", "/projects"];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map((p) => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n  </url>`).join("\n")}
${blogSlugs.map((s) => `  <url>\n    <loc>${SITE_URL}/blog/${s}</loc>\n  </url>`).join("\n")}
</urlset>`;

fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), sitemap);
console.log("Generated sitemap.xml");

const robots = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(OUT_DIR, "robots.txt"), robots);
console.log("Generated robots.txt");
