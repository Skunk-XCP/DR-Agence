export const businessTypes = [
  { id: "snack", label: "Restauration rapide / snack" },
  { id: "restaurant", label: "Restaurant independant" },
  { id: "medical", label: "Sante (cabinet / dentaire / paramedical)" },
  { id: "gastro", label: "Gastronomique / haut de gamme" },
  { id: "artisan", label: "Artisan (BTP / services)" },
  { id: "salon", label: "Salon (coiffure / esthetique)" },
  { id: "coach", label: "Coach / independant" },
  { id: "tpe", label: "TPE / PME (presence pro)" }
] as const;

export const siteTypes = [
  { id: "vitrine", label: "Site vitrine" },
  { id: "backend", label: "Vitrine + fonctionnalites" }
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

export const pricingMatrix: PricingMatrix = {
  snack: {
    vitrine: {
      fromPrice: 900,
      range: [900, 1600],
      timeline: "4-7 jours",
      included: [
        "One-page ou 3 pages max (Accueil, Menu, Contact)",
        "Menu (sections ou PDF), horaires, carte et acces",
        "CTA commande / appel (lien externe), avis et reseaux",
        "SEO de base + performance standard + mise en ligne"
      ],
      notes: "Ideal pour une presence propre et immediate."
    },
    backend: {
      fromPrice: 2200,
      range: [2200, 3800],
      timeline: "7-14 jours",
      included: [
        "Tout le site vitrine + base de donnees",
        "Gestion simple du menu (admin)",
        "Demandes / messages stockes + statuts",
        "Notifications email + export basique"
      ],
      notes: "Backend leger : pas de commande en ligne complete."
    }
  },
  restaurant: {
    vitrine: {
      fromPrice: 1500,
      range: [1500, 2800],
      timeline: "5-10 jours",
      included: [
        "4-6 pages (Accueil, Carte/Menu, Galerie, Infos, Contact)",
        "CTA reservation (TheFork/Zenchef/Google) + Map",
        "SEO de base + performance standard",
        "Mise en ligne + Analytics/Search Console"
      ],
      notes: "Pour un restaurant independant qui veut convertir (reservations)."
    },
    backend: {
      fromPrice: 3200,
      range: [3200, 6000],
      timeline: "10-30 jours",
      included: [
        "Tout le site vitrine + base de donnees",
        "Gestion du menu admin OU demandes/reservations simples",
        "Emails transactionnels (confirmation/recu)",
        "Back-office leger + logs/exports basiques"
      ],
      notes: "1-2 fonctionnalites backend max (pas une plateforme complete)."
    }
  },
  medical: {
    vitrine: {
      fromPrice: 1600,
      range: [1600, 3200],
      timeline: "5-10 jours",
      included: [
        "4-6 pages (Cabinet/Equipe, Prestations, Infos pratiques, Contact)",
        "CTA prise de RDV (Doctolib/Maiia) + itineraire Google Maps",
        "Infos essentielles : horaires, acces, urgences",
        "SEO local de base + performance + mise en ligne"
      ],
      notes: "Vitrine informative + redirection RDV externe, sans donnees de sante."
    },
    backend: {
      fromPrice: null,
      range: [2800, 5200],
      timeline: "10-30 jours",
      included: [
        "Admin simple pour modifier des contenus non sensibles",
        "Pas de stockage d'informations medicales / patients",
        "Back-office limite au contenu non critique",
        "Perimetre defini au cadrage"
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
        "Pages editoriales (histoire, experience, equipe)",
        "SEO/perf exigeants + animations sobres",
        "Option multilingue + mise en ligne"
      ],
      notes: "Pour une image de marque forte."
    },
    backend: {
      fromPrice: 6000,
      range: [6000, 12000],
      timeline: "10-30 jours",
      included: [
        "Tout le site vitrine premium + base de donnees",
        "Admin contenu + formulaires avances",
        "Emails transactionnels + anti-spam + monitoring leger",
        "Integrations (reservation externe, newsletter, etc.)"
      ],
      notes: "Sur-mesure premium : perimetre a cadrer finement."
    }
  },
  artisan: {
    vitrine: {
      fromPrice: 1200,
      range: [1200, 2500],
      timeline: "5-10 jours",
      included: [
        "4-6 pages (Services, Realisations, Zone, Contact)",
        "Galerie avant/apres + formulaire devis",
        "SEO local de base",
        "Mise en ligne + Analytics/Search Console"
      ],
      notes: "Optimise pour demandes de devis."
    },
    backend: {
      fromPrice: 2800,
      range: [2800, 5200],
      timeline: "10-30 jours",
      included: [
        "Tout le site vitrine + base de donnees",
        "Demandes de devis stockees + statuts + notes",
        "Back-office leger (liste, detail, export)",
        "Notifications email + anti-spam"
      ],
      notes: "Mini CRM de demandes integre au site."
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
        "Mise en ligne + tracking"
      ],
      notes: "Parfait si la prise de RDV est via outil externe."
    },
    backend: {
      fromPrice: 2600,
      range: [2600, 5000],
      timeline: "7-30 jours",
      included: [
        "Tout le site vitrine + base de donnees",
        "Demandes stockees + back-office leger",
        "Gestion simple contenus en admin",
        "Emails auto + export basique"
      ],
      notes: "Backend leger : pas un agenda complet."
    }
  },
  coach: {
    vitrine: {
      fromPrice: 900,
      range: [900, 1900],
      timeline: "5-10 jours",
      included: [
        "One-page ou 3-4 pages (Offre, Methode, Contact)",
        "CTA prise de RDV (Calendly/Cal) + lead form",
        "SEO de base + performance standard",
        "Mise en ligne + tracking"
      ],
      notes: "Concu pour convertir (prise de contact / RDV)."
    },
    backend: {
      fromPrice: 2200,
      range: [2200, 4200],
      timeline: "10-30 jours",
      included: [
        "Tout le site vitrine + base de donnees",
        "Formulaire avance + stockage + statuts",
        "Espace admin leger (leads, notes, export)",
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
        "4-8 pages (Institutionnel, Services, References, Contact)",
        "SEO de base + performance + structure scalable",
        "Sections de rassurance (process, FAQ)",
        "Mise en ligne + Analytics/Search Console"
      ],
      notes: "Presence pro credible pour une petite entreprise."
    },
    backend: {
      fromPrice: 3500,
      range: [3500, 8000],
      timeline: "10-30 jours",
      included: [
        "Tout le site vitrine + base de donnees",
        "Back-office leger + roles simples",
        "Emails transactionnels + logs/exports",
        "Integrations (newsletter, CRM leger, etc.)"
      ],
      notes: "1-2 fonctionnalites backend max (MVP)."
    }
  }
};

export const isBusinessType = (value: string): value is BusinessTypeId =>
  businessTypes.some((item) => item.id === value);

export const isSiteType = (value: string): value is SiteTypeId =>
  siteTypes.some((item) => item.id === value);
