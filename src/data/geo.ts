export const geoProfile = {
  baseUrl: "https://www.donatien-rouzeirol.fr",
  name: "Donatien Rouzeirol",
  alternateName: "DR Freelance",
  jobTitle: "Développeur web freelance",
  description:
    "Développeur web freelance basé à Bordeaux, spécialisé dans la création de sites vitrines, landing pages et sites sur mesure rapides, accessibles et optimisés SEO.",
  location: {
    locality: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    country: "FR",
  },
  languages: ["fr-FR"],
  audience: [
    "indépendants",
    "commerçants",
    "petites entreprises",
    "entreprises locales à Bordeaux",
    "porteurs de projet en France",
  ],
  expertise: [
    "création de site vitrine",
    "landing page orientée conversion",
    "développement React et Next.js",
    "optimisation SEO technique",
    "performance Core Web Vitals",
    "accessibilité web",
    "maintenance évolutive",
    "intégrations API et formulaires avancés",
  ],
  offers: [
    {
      name: "Vitrine Premium",
      description:
        "Site vitrine professionnel avec design éditorial, animations sobres, SEO technique et optimisation de performance.",
    },
    {
      name: "Landing page",
      description:
        "Page unique calibrée pour la conversion, adaptée aux lancements, campagnes et offres ciblées.",
    },
    {
      name: "Vitrine avec fonctionnalités",
      description:
        "Site vitrine enrichi avec formulaires avancés, demandes stockées, mini back-office ou intégrations métier.",
    },
    {
      name: "Développement sur mesure",
      description:
        "Fonctionnalités spécifiques, intégrations API et logique métier adaptées au projet.",
    },
    {
      name: "Performance, accessibilité et maintenance",
      description:
        "Audit, amélioration continue, correctifs, évolutions et suivi après la mise en ligne.",
    },
  ],
  proofPoints: [
    "Approche structurée de cadrage, conception, développement, optimisation et livraison.",
    "Priorité donnée à la clarté du parcours utilisateur, à la performance et à la maintenabilité.",
    "Devis final établi après cadrage du périmètre, avec estimation indicative disponible en ligne.",
  ],
  contact: {
    email: "contact@donatien-rouzeirol.fr",
    linkedin: "https://www.linkedin.com/in/donatien-rouzeirol-0ab070207/",
  },
  sameAs: ["https://www.linkedin.com/in/donatien-rouzeirol-0ab070207/"],
  pages: [
    {
      url: "/",
      name: "Accueil",
      description:
        "Présentation des services de développement web freelance, méthode, offres et contact.",
    },
    {
      url: "/offres",
      name: "Offres",
      description:
        "Parcours d'estimation pour choisir une offre selon le type de commerce, de projet et de site.",
    },
    {
      url: "/geo.json",
      name: "Données GEO",
      description:
        "Résumé factuel structuré destiné aux moteurs de recherche et assistants génératifs.",
    },
  ],
} as const;

export function getGeoJsonLd() {
  const websiteId = `${geoProfile.baseUrl}/#website`;
  const personId = `${geoProfile.baseUrl}/#person`;
  const serviceId = `${geoProfile.baseUrl}/#service`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${geoProfile.baseUrl}/`,
        name: geoProfile.name,
        inLanguage: geoProfile.languages[0],
        description: geoProfile.description,
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: geoProfile.name,
        alternateName: geoProfile.alternateName,
        jobTitle: geoProfile.jobTitle,
        url: `${geoProfile.baseUrl}/`,
        email: geoProfile.contact.email,
        sameAs: geoProfile.sameAs,
        knowsAbout: geoProfile.expertise,
        address: {
          "@type": "PostalAddress",
          addressLocality: geoProfile.location.locality,
          addressRegion: geoProfile.location.region,
          addressCountry: geoProfile.location.country,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: `${geoProfile.name} - ${geoProfile.jobTitle}`,
        url: `${geoProfile.baseUrl}/`,
        image: `${geoProfile.baseUrl}/assets/images/cafe-cosy-800.webp`,
        description: geoProfile.description,
        areaServed: [
          {
            "@type": "City",
            name: geoProfile.location.locality,
          },
          {
            "@type": "Country",
            name: "France",
          },
        ],
        founder: { "@id": personId },
        provider: { "@id": personId },
        serviceType: geoProfile.expertise,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Offres de développement web",
          itemListElement: geoProfile.offers.map((offer) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: offer.name,
              description: offer.description,
            },
          })),
        },
      },
    ],
  };
}
