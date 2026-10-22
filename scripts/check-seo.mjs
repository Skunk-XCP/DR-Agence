const baseUrl = (process.env.SEO_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const pages = [
  "/",
  "/creation-site-internet-bordeaux",
  "/creation-site-vitrine",
  "/refonte-site-internet",
  "/maintenance-site-internet",
  "/offres",
];

const failures = [];

for (const path of pages) {
  const response = await fetch(`${baseUrl}${path}`);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="(.*?)"/s)?.[1] ?? "";
  const canonical = html.match(/<link rel="canonical" href="(.*?)"/s)?.[1] ?? "";
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;
  const hasNoindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  const hasJsonLd = html.includes('type="application/ld+json"');

  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  if (!title) failures.push(`${path}: title absent`);
  if (!description) failures.push(`${path}: meta description absente`);
  if (!canonical) failures.push(`${path}: canonique absente`);
  if (h1Count !== 1) failures.push(`${path}: ${h1Count} H1`);
  if (hasNoindex) failures.push(`${path}: noindex inattendu`);
  if (!hasJsonLd) failures.push(`${path}: JSON-LD absent`);

  console.log(JSON.stringify({ path, status: response.status, title, description, canonical, h1Count, hasJsonLd }));
}

const [robotsResponse, sitemapResponse] = await Promise.all([
  fetch(`${baseUrl}/robots.txt`),
  fetch(`${baseUrl}/sitemap.xml`),
]);
const [robots, sitemap] = await Promise.all([robotsResponse.text(), sitemapResponse.text()]);

if (!robotsResponse.ok || !robots.includes("Sitemap:")) failures.push("robots.txt invalide ou sans sitemap");
for (const path of pages) {
  const absoluteUrl = path === "/" ? "https://www.donatien-rouzeirol.fr/" : `https://www.donatien-rouzeirol.fr${path}`;
  if (!sitemap.includes(`<loc>${absoluteUrl}</loc>`)) failures.push(`sitemap: ${path} absent`);
}

if (failures.length) {
  console.error(`\nÉchec du contrôle SEO:\n- ${failures.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log("\nContrôle SEO réussi : pages indexables, métadonnées, canonicals, H1, JSON-LD, robots et sitemap.");
}
