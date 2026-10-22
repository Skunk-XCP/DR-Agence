const baseUrl = (process.env.SEO_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const scenarios = [
  {
    name: "site standard avec calcul automatique",
    path: "/offres?projectType=new_site&businessType=tpe&siteType=vitrine",
    includes: ["Estimation instantanée", "Fourchette", "Site vitrine ou landing page"],
    excludes: ["Estimation personnalisée"],
  },
  {
    name: "application avec estimation personnalisée",
    path: "/offres?projectType=new_site&businessType=tpe&siteType=webapp",
    includes: ["Estimation personnalisée", "Application web ou outil métier", "cadrage"],
    excludes: ["Fourchette"],
  },
  {
    name: "configurateur de site avec total calculé",
    path: "/configurateur?projectType=new_site&businessType=tpe&siteType=vitrine",
    includes: ["Addition explicite", "Total", "Site vitrine ou landing page"],
    excludes: ["Estimation personnalisée"],
  },
  {
    name: "configurateur d’application sans faux total",
    path: "/configurateur?projectType=new_site&businessType=tpe&siteType=webapp",
    includes: ["Estimation personnalisée", "Interface métier ou tableau de bord", "À cadrer"],
    excludes: ["Addition explicite", "Total : 0"],
  },
  {
    name: "intégration avec cadrage technique",
    path: "/configurateur?projectType=new_site&businessType=tpe&siteType=integration",
    includes: ["Fonctionnalité avancée ou intégration", "Connexion à une API ou un service tiers", "À cadrer"],
    excludes: ["Addition explicite", "Total : 0"],
  },
  {
    name: "évolution d’un projet existant",
    path: "/offres?projectType=existing_site&businessType=tpe&siteType=vitrine",
    includes: ["Mise à jour", "chiffrage après analyse"],
    excludes: ["Estimation instantanée"],
  },
];

const failures = [];

for (const scenario of scenarios) {
  const response = await fetch(`${baseUrl}${scenario.path}`);
  const html = await response.text();

  if (!response.ok) failures.push(`${scenario.name}: HTTP ${response.status}`);
  for (const expected of scenario.includes) {
    if (!html.includes(expected)) failures.push(`${scenario.name}: texte absent « ${expected} »`);
  }
  for (const unexpected of scenario.excludes) {
    if (html.includes(unexpected)) failures.push(`${scenario.name}: texte inattendu « ${unexpected} »`);
  }

  console.log(`✓ ${scenario.name}`);
}

const invalidResponse = await fetch(
  `${baseUrl}/configurateur?projectType=new_site&businessType=tpe&siteType=inconnu`,
  { redirect: "manual" },
);
const location = invalidResponse.headers.get("location") ?? "";
if (![307, 308].includes(invalidResponse.status) || !location.endsWith("/offres")) {
  failures.push(`paramètre invalide: redirection attendue vers /offres, reçu ${invalidResponse.status} ${location}`);
}

if (failures.length > 0) {
  console.error(`\nÉchec du contrôle configurateur:\n- ${failures.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log("\nContrôle configurateur réussi : calcul standard conservé, projets complexes sans estimation artificielle.");
}
