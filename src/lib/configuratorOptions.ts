import { businessTypes, type BusinessTypeId, type SiteTypeId } from "@/lib/pricing";

export type OptionKind = "checkbox" | "radio";

export type Option = {
  id: string;
  section: "Pages" | "Contenus" | "Intégrations" | "SEO/Perf" | "Admin" | "Légal";
  label: string;
  description?: string;
  kind: OptionKind;
  tags: string[];
  price?: number;
  days?: number;
  choices?: Array<{
    id: string;
    label: string;
    description?: string;
    price: number;
    days: number;
  }>;
};

export type OptionSection = {
  section: Option["section"];
  options: Option[];
};

const allOptions: Option[] = [
  {
    id: "menu-affichage",
    section: "Contenus",
    label: "Menu (affichage)",
    description: "Niveau de rendu du menu selon vos besoins.",
    kind: "radio",
    tags: ["snack", "vitrine-only"],
    choices: [
      {
        id: "pdf-client",
        label: "PDF fourni par le client",
        price: 120,
        days: 0
      },
      {
        id: "pdf-sections-html",
        label: "PDF + sections HTML (categories)",
        price: 240,
        days: 1
      },
      {
        id: "sections-premium-photos",
        label: "Sections + mise en page premium (photos)",
        price: 420,
        days: 2
      }
    ]
  },
  {
    id: "cta-commande-externe",
    section: "Intégrations",
    label: "CTA commande/appel externe",
    description: "Boutons vers plateforme externe de commande/appel.",
    kind: "checkbox",
    tags: ["snack"],
    price: 120,
    days: 1
  },
  {
    id: "gestion-menu-admin",
    section: "Admin",
    label: "Gestion menu admin",
    description: "Edition menu depuis back-office.",
    kind: "checkbox",
    tags: ["snack", "backend-only"],
    price: 480,
    days: 3
  },
  {
    id: "demandes-messages",
    section: "Admin",
    label: "Demandes/messages + statuts",
    kind: "checkbox",
    tags: ["snack", "backend-only"],
    price: 380,
    days: 2
  },
  {
    id: "notifications-email",
    section: "Intégrations",
    label: "Notifications email",
    kind: "checkbox",
    tags: ["snack", "restaurant", "gastro", "artisan", "coach", "tpe", "backend-only"],
    price: 180,
    days: 1
  },
  {
    id: "reservation-externe",
    section: "Intégrations",
    label: "CTA reservation externe (TheFork/Zenchef/Google)",
    kind: "checkbox",
    tags: ["restaurant", "gastro"],
    price: 220,
    days: 1
  },
  {
    id: "galerie-photo",
    section: "Contenus",
    label: "Galerie photo optimisee",
    kind: "checkbox",
    tags: ["restaurant", "gastro"],
    price: 280,
    days: 2
  },
  {
    id: "multilingue",
    section: "Contenus",
    label: "Version multilingue",
    kind: "checkbox",
    tags: ["restaurant", "gastro"],
    price: 780,
    days: 4
  },
  {
    id: "rdv-doctolib-maiia",
    section: "Intégrations",
    label: "CTA RDV externe (Doctolib/Maiia)",
    description: "Aucun stockage de donnees medicales.",
    kind: "checkbox",
    tags: ["medical", "medical-only", "vitrine-only", "no-health-data"],
    price: 140,
    days: 1
  },
  {
    id: "admin-contenu-non-sensible",
    section: "Admin",
    label: "Admin contenu non sensible",
    kind: "checkbox",
    tags: ["medical", "medical-only", "backend-only", "no-health-data"],
    price: 520,
    days: 3
  },
  {
    id: "pages-services-references",
    section: "Pages",
    label: "Pages services/references",
    kind: "checkbox",
    tags: ["artisan", "coach", "tpe"],
    price: 420,
    days: 2
  },
  {
    id: "formulaire-lead-devis",
    section: "Intégrations",
    label: "Formulaire lead/devis",
    kind: "checkbox",
    tags: ["artisan", "coach", "tpe"],
    price: 320,
    days: 2
  },
  {
    id: "mini-crm-leads",
    section: "Admin",
    label: "Mini CRM leads (statuts/notes/export)",
    kind: "checkbox",
    tags: ["artisan", "coach", "tpe", "backend-only"],
    price: 960,
    days: 5
  },
  {
    id: "seo-local-renforce",
    section: "SEO/Perf",
    label: "SEO local renforce",
    kind: "checkbox",
    tags: ["artisan", "coach", "tpe", "medical", "salon"],
    price: 320,
    days: 2
  },
  {
    id: "mentions-legales",
    section: "Légal",
    label: "Mentions legales + CGV/CGU",
    kind: "checkbox",
    tags: ["snack", "restaurant", "medical", "gastro", "artisan", "salon", "coach", "tpe"],
    price: 180,
    days: 1
  }
];

const sectionOrder: Option["section"][] = [
  "Pages",
  "Contenus",
  "Intégrations",
  "SEO/Perf",
  "Admin",
  "Légal"
];

const businessIds = new Set<string>(businessTypes.map((item) => item.id));

const matchesBusiness = (option: Option, businessType: BusinessTypeId) => {
  const businessTags = option.tags.filter((tag) => businessIds.has(tag));
  return businessTags.length === 0 || businessTags.includes(businessType);
};

const matchesSite = (option: Option, siteType: SiteTypeId) => {
  if (option.tags.includes("vitrine-only") && siteType !== "vitrine") {
    return false;
  }
  if (option.tags.includes("backend-only") && siteType !== "backend") {
    return false;
  }
  return true;
};

const matchesOnlyBusinessTags = (option: Option, businessType: BusinessTypeId) => {
  if (option.tags.includes("medical-only") && businessType !== "medical") {
    return false;
  }
  for (const businessId of businessIds) {
    const onlyTag = `${businessId}-only`;
    if (option.tags.includes(onlyTag) && businessId !== businessType) {
      return false;
    }
  }
  return true;
};

export const getOptionsFor = (businessType: BusinessTypeId, siteType: SiteTypeId): OptionSection[] => {
  const filtered = allOptions.filter(
    (option) =>
      matchesBusiness(option, businessType) &&
      matchesSite(option, siteType) &&
      matchesOnlyBusinessTags(option, businessType)
  );

  return sectionOrder
    .map((section) => ({
      section,
      options: filtered.filter((option) => option.section === section)
    }))
    .filter((group) => group.options.length > 0);
};
