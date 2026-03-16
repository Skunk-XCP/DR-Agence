export const businessTypes = [
  { id: "snack", label: "Restauration rapide / snack" },
  { id: "restaurant", label: "Restaurant indépendant" },
  { id: "medical", label: "Santé (cabinet / dentaire / paramédical)" },
  { id: "gastro", label: "Gastronomique / haut de gamme" },
  { id: "artisan", label: "Artisan (BTP / services)" },
  { id: "salon", label: "Salon (coiffure / esthétique)" },
  { id: "coach", label: "Coach / indépendant" },
  { id: "tpe", label: "TPE / PME (présence pro)" }
] as const;

export const siteTypes = [
  { id: "vitrine", label: "Site vitrine" },
  { id: "backend", label: "Vitrine + fonctionnalités" }
] as const;

export type BusinessTypeId = (typeof businessTypes)[number]["id"];
export type SiteTypeId = (typeof siteTypes)[number]["id"];

export type PricingEntry = {
  fromPrice: number | null;
  range: [number, number];
  timeline: string;
  included: string[];
  notes: string;
};

export type PricingMatrix = Record<BusinessTypeId, Record<SiteTypeId, PricingEntry>>;

export const hostingDisclaimer =
  "Hébergement & nom de domaine : non inclus (coût récurrent).";

const deploymentIncluded = "Mise en ligne (déploiement + SSL + configuration DNS)";
const hostingNotIncluded = "Hébergement & nom de domaine : non inclus (coût récurrent)";

export const pricingMatrix: PricingMatrix = {
  snack: {
    vitrine: {
      fromPrice: 900,
      range: [900, 1600],
      timeline: "4-7 jours",
      included: [
        "One-page ou 3 pages max (Accueil, Menu, Contact)",
        "Menu (sections ou PDF), horaires, carte et accès",
        "CTA commande / appel (lien externe), avis et réseaux",
        "SEO de base + performance standard",
        deploymentIncluded,
        hostingNotIncluded
      ],
      notes: "Idéal pour une présence propre et immédiate."
    },
    backend: {
      fromPrice: 2200,
      range: [2200, 3800],
      timeline: "7-14 jours",
      included: [
        "Tout le site vitrine + base de données",
        "Gestion simple du menu (admin)",
        "Demandes / messages stockés + statuts",
        "Notifications email + export basique"
      ],
      notes: "Backend léger : pas de commande en ligne complète."
    }
  },
  restaurant: {
    vitrine: {
      fromPrice: 1500,
      range: [1500, 2800],
      timeline: "5-10 jours",
      included: [
        "4-6 pages (Accueil, Carte/Menu, Galerie, Infos, Contact)",
        "CTA réservation (TheFork/Zenchef/Google) + Map",
        "SEO de base + performance standard",
        deploymentIncluded,
        "Analytics/Search Console",
        hostingNotIncluded
      ],
      notes: "Pour un restaurant indépendant qui veut convertir (réservations)."
    },
    backend: {
      fromPrice: 3200,
      range: [3200, 6000],
      timeline: "10-30 jours",
      included: [
        "Tout le site vitrine + base de données",
        "Gestion du menu admin OU demandes/réservations simples",
        "Emails transactionnels (confirmation/reçu)",
        "Back-office léger + logs/exports basiques"
      ],
      notes: "1-2 fonctionnalités backend max (pas une plateforme complète)."
    }
  },
  medical: {
    vitrine: {
      fromPrice: 1600,
      range: [1600, 3200],
      timeline: "5-10 jours",
      included: [
        "4-6 pages (Cabinet/Équipe, Prestations, Infos pratiques, Contact)",
        "CTA prise de RDV (Doctolib/Maiia) + itinéraire Google Maps",
        "Infos essentielles : horaires, accès, urgences",
        "SEO local de base + performance",
        deploymentIncluded,
        hostingNotIncluded
      ],
      notes: "Vitrine informative + redirection RDV externe, sans données de santé."
    },
    backend: {
      fromPrice: null,
      range: [2800, 5200],
      timeline: "10-30 jours",
      included: [
        "Admin simple pour modifier des contenus non sensibles",
        "Pas de stockage d'informations médicales / patients",
        "Back-office limité au contenu non critique",
        "Périmètre défini au cadrage"
      ],
      notes: "Optionnel. Le plus courant : vitrine + lien RDV externe."
    }
  },
  gastro: {
    vitrine: {
      fromPrice: 3500,
      range: [3500, 8000],
      timeline: "5-10 jours",
      included: [
        "Direction visuelle premium",
        "Pages éditoriales (histoire, expérience, équipe)",
        "SEO/perf exigeants + animations sobres",
        "Option multilingue",
        deploymentIncluded,
        hostingNotIncluded
      ],
      notes: "Pour une image de marque forte."
    },
    backend: {
      fromPrice: 6000,
      range: [6000, 12000],
      timeline: "10-30 jours",
      included: [
        "Tout le site vitrine premium + base de données",
        "Admin contenu + formulaires avancés",
        "Emails transactionnels + anti-spam + monitoring léger",
        "Intégrations (réservation externe, newsletter, etc.)"
      ],
      notes: "Sur-mesure premium : périmètre à cadrer finement."
    }
  },
  artisan: {
    vitrine: {
      fromPrice: 1200,
      range: [1200, 2500],
      timeline: "5-10 jours",
      included: [
        "4-6 pages (Services, Réalisations, Zone, Contact)",
        "Galerie avant/après + formulaire devis",
        "SEO local de base",
        deploymentIncluded,
        "Analytics/Search Console",
        hostingNotIncluded
      ],
      notes: "Optimisé pour demandes de devis."
    },
    backend: {
      fromPrice: 2800,
      range: [2800, 5200],
      timeline: "10-30 jours",
      included: [
        "Tout le site vitrine + base de données",
        "Demandes de devis stockées + statuts + notes",
        "Back-office léger (liste, détail, export)",
        "Notifications email + anti-spam"
      ],
      notes: "Mini CRM de demandes intégré au site."
    }
  },
  salon: {
    vitrine: {
      fromPrice: 1100,
      range: [1100, 2400],
      timeline: "4-7 jours",
      included: [
        "3-5 pages (Prestations, Tarifs, Galerie, Contact)",
        "Horaires, map, avis + CTA RDV externe",
        "SEO de base + performance standard",
        deploymentIncluded,
        "Tracking",
        hostingNotIncluded
      ],
      notes: "Parfait si la prise de RDV est via outil externe."
    },
    backend: {
      fromPrice: 2600,
      range: [2600, 5000],
      timeline: "7-30 jours",
      included: [
        "Tout le site vitrine + base de données",
        "Demandes stockées + back-office léger",
        "Gestion simple contenus en admin",
        "Emails auto + export basique"
      ],
      notes: "Backend léger : pas un agenda complet."
    }
  },
  coach: {
    vitrine: {
      fromPrice: 900,
      range: [900, 1900],
      timeline: "5-10 jours",
      included: [
        "One-page ou 3-4 pages (Offre, Méthode, Contact)",
        "CTA prise de RDV (Calendly/Cal) + lead form",
        "SEO de base + performance standard",
        deploymentIncluded,
        "Tracking",
        hostingNotIncluded
      ],
      notes: "Conçu pour convertir (prise de contact / RDV)."
    },
    backend: {
      fromPrice: 2200,
      range: [2200, 4200],
      timeline: "10-30 jours",
      included: [
        "Tout le site vitrine + base de données",
        "Formulaire avancé + stockage + statuts",
        "Espace admin léger (leads, notes, export)",
        "Emails transactionnels + anti-spam"
      ],
      notes: "Backend utile pour suivre les leads proprement."
    }
  },
  tpe: {
    vitrine: {
      fromPrice: 1600,
      range: [1600, 3500],
      timeline: "5-10 jours",
      included: [
        "4-8 pages (Institutionnel, Services, Références, Contact)",
        "SEO de base + performance + structure scalable",
        "Sections de rassurance (process, FAQ)",
        deploymentIncluded,
        "Analytics/Search Console",
        hostingNotIncluded
      ],
      notes: "Présence pro crédible pour une petite entreprise."
    },
    backend: {
      fromPrice: 3500,
      range: [3500, 8000],
      timeline: "10-30 jours",
      included: [
        "Tout le site vitrine + base de données",
        "Back-office léger + rôles simples",
        "Emails transactionnels + logs/exports",
        "Intégrations (newsletter, CRM léger, etc.)"
      ],
      notes: "1-2 fonctionnalités backend max (MVP)."
    }
  }
};

export const isBusinessType = (value: string): value is BusinessTypeId =>
  businessTypes.some((item) => item.id === value);

export const isSiteType = (value: string): value is SiteTypeId =>
  siteTypes.some((item) => item.id === value);



