export const businessTypes = [
  { id: "snack", label: "Restauration rapide / snack" },
  { id: "restaurant", label: "Restaurant indépendant" },
  { id: "medical", label: "Santé (cabinet / dentaire / paramédical)" },
  { id: "gastro", label: "Gastronomique / haut de gamme" },
  { id: "artisan", label: "Artisan (BTP / services)" },
  { id: "salon", label: "Salon (coiffure / esthétique)" },
  { id: "coach", label: "Coach / indépendant" },
  { id: "tpe", label: "TPE / PME (présence pro)" }
];

export const siteTypes = [
  { id: "vitrine", label: "Site vitrine" },
  { id: "backend", label: "Vitrine + fonctionnalités" }
];

export const pricingMatrix = {
  snack: {
    vitrine: {
      fromPrice: 900,
      range: [900, 1600],
      timeline: "5–10 jours",
      included: [
        "One-page ou 3 pages max (Accueil, Menu, Contact)",
        "Menu (sections ou PDF), horaires, carte & accès",
        "CTA commande / appel (lien externe), avis & réseaux",
        "SEO de base + perf de base + mise en ligne"
      ],
      notes: "Idéal pour une présence propre et immédiate."
    },
    backend: {
      fromPrice: 2200,
      range: [2200, 3800],
      timeline: "2–4 semaines",
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
      timeline: "1–2 semaines",
      included: [
        "4–6 pages (Accueil, Carte/Menu, Galerie, Infos, Contact)",
        "CTA réservation (TheFork/Zenchef/Google) + Map",
        "SEO de base (titres/meta) + perf de base",
        "Mise en ligne + Analytics/Search Console"
      ],
      notes: "Pour un restaurant indépendant qui veut convertir (réservations)."
    },
    backend: {
      fromPrice: 3200,
      range: [3200, 6000],
      timeline: "3–6 semaines",
      included: [
        "Tout le site vitrine + base de données",
        "Gestion du menu (admin) OU demandes/réservations simples",
        "Emails transactionnels (confirmation/reçu)",
        "Back-office léger + logs/exports basiques"
      ],
      notes: "1–2 fonctionnalités backend max (pas une plateforme de réservation complète)."
    }
  },

  medical: {
    vitrine: {
      fromPrice: 1600,
      range: [1600, 3200],
      timeline: "2–3 semaines",
      included: [
        "4–6 pages (Cabinet/Équipe, Actes/Prestations, Infos pratiques, Contact)",
        "CTA prise de RDV (Doctolib/Maiia) + itinéraire Google Maps",
        "Infos essentielles : horaires, accès, urgences, documents à apporter",
        "SEO local de base + performance + mise en ligne"
      ],
      notes: "Site vitrine informatif + redirection RDV (pas de collecte de données de santé)."
    },
    backend: {
      fromPrice: null,
      range: [2800, 5200],
      timeline: "3–6 semaines",
      included: [
        "Rarement nécessaire pour un cabinet",
        "Si besoin : admin simple pour modifier contenus non sensibles",
        "Pas de stockage d'informations médicales / patients",
        "Périmètre défini au cadrage"
      ],
      notes: "Optionnel. Le plus courant : vitrine + lien RDV externe."
    }
  },

  gastro: {
    vitrine: {
      fromPrice: 3500,
      range: [3500, 8000],
      timeline: "3–6 semaines",
      included: [
        "Direction visuelle plus poussée (premium)",
        "Pages éditoriales (histoire, expérience, cuisine, équipe)",
        "SEO/perf plus exigeants + animations sobres",
        "Option multilingue (selon périmètre) + mise en ligne"
      ],
      notes: "Pour une image de marque forte (niveau premium)."
    },
    backend: {
      fromPrice: 6000,
      range: [6000, 12000],
      timeline: "6–10 semaines",
      included: [
        "Tout le site vitrine premium + base de données",
        "Admin contenu (menu/actus) + formulaires avancés",
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
      timeline: "1–2 semaines",
      included: [
        "4–6 pages (Services, Réalisations, Zone, À propos, Contact)",
        "Galerie avant/après + formulaire devis",
        "SEO local de base (structure + contenus clés)",
        "Mise en ligne + Analytics/Search Console"
      ],
      notes: "Optimisé pour demandes de devis."
    },
    backend: {
      fromPrice: 2800,
      range: [2800, 5200],
      timeline: "3–6 semaines",
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
      timeline: "1–2 semaines",
      included: [
        "3–5 pages (Prestations, Tarifs, Galerie, Contact)",
        "Horaires, Map, avis + CTA RDV (lien externe)",
        "SEO de base + perf de base",
        "Mise en ligne + tracking"
      ],
      notes: "Parfait si la prise de RDV est via outil externe."
    },
    backend: {
      fromPrice: 2600,
      range: [2600, 5000],
      timeline: "3–6 semaines",
      included: [
        "Tout le site vitrine + base de données",
        "Demandes stockées + back-office léger",
        "Gestion simple contenus (prestations/tarifs) en admin",
        "Emails auto + export basique"
      ],
      notes: "Backend léger : pas un agenda complet type Doctolib."
    }
  },

  coach: {
    vitrine: {
      fromPrice: 900,
      range: [900, 1900],
      timeline: "5–12 jours",
      included: [
        "One-page ou 3–4 pages (Offre, Méthode, Preuves, Contact)",
        "CTA prise de RDV (Calendly/Cal) + lead form",
        "SEO de base + perf de base",
        "Mise en ligne + tracking"
      ],
      notes: "Conçu pour convertir (prise de contact / RDV)."
    },
    backend: {
      fromPrice: 2200,
      range: [2200, 4200],
      timeline: "3–6 semaines",
      included: [
        "Tout le site vitrine + base de données",
        "Formulaire avancé (qualif) + stockage + statuts",
        "Espace admin léger (leads, notes, export)",
        "Emails transactionnels + anti-spam"
      ],
      notes: "Backend utile si vous voulez suivre les leads proprement."
    }
  },

  tpe: {
    vitrine: {
      fromPrice: 1600,
      range: [1600, 3500],
      timeline: "2–3 semaines",
      included: [
        "4–8 pages (Institutionnel + Services + Références + Contact)",
        "SEO de base + perf + structure scalable",
        "Contenus propres + sections rassurance (process, FAQ)",
        "Mise en ligne + Analytics/Search Console"
      ],
      notes: "Présence pro crédible pour une petite entreprise."
    },
    backend: {
      fromPrice: 3500,
      range: [3500, 8000],
      timeline: "4–8 semaines",
      included: [
        "Tout le site vitrine + base de données",
        "Back-office léger (contenus ou demandes) + rôles simples",
        "Emails transactionnels + logs/exports",
        "Intégrations (newsletter, CRM léger, etc.)"
      ],
      notes: "1–2 fonctionnalités backend max (MVP)."
    }
  }
};

