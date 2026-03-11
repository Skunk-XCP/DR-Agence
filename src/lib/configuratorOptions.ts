import { businessTypes, type BusinessTypeId, type SiteTypeId } from "@/lib/pricing";

export type OptionKind = "checkbox" | "radio" | "quantity";

type OptionBase = {
  id: string;
  section: "Pages" | "Contenus" | "Integrations" | "SEO/Perf" | "Admin" | "Legal";
  label: string;
  description?: string;
  tags: string[];
};

type CheckboxOption = OptionBase & {
  kind: "checkbox";
  price: number;
  days: number;
};

type RadioChoice = {
  id: string;
  label: string;
  description?: string;
  price: number;
  days: number;
};

type RadioOption = OptionBase & {
  kind: "radio";
  choices: RadioChoice[];
};

type QuantityOption = OptionBase & {
  kind: "quantity";
  unitLabel: string;
  unitPrice: number;
  unitDays: number;
  min: number;
  max: number;
  defaultValue: number;
};

export type Option = CheckboxOption | RadioOption | QuantityOption;

export type OptionSection = {
  section: Option["section"];
  options: Option[];
};

const allBusinessTags = businessTypes.map((item) => item.id);

const allOptions: Option[] = [
  {
    id: "menu-affichage",
    section: "Contenus",
    label: "Menu (affichage)",
    description: "Vous fournissez le contenu du menu, nous l'affichons sur le site selon le niveau choisi.",
    kind: "radio",
    tags: ["snack", "vitrine-only"],
    choices: [
      {
        id: "pdf-client",
        label: "Menu en PDF (fourni par vous)",
        description:
          "Le menu est accessible via un bouton (ouverture/telechargement du PDF). Le contenu n'est pas affiche sur la page.",
        price: 120,
        days: 0
      },
      {
        id: "pdf-sections-html",
        label: "Menu affiche sur la page (sans photos)",
        description:
          "Nous integrons le menu directement sur le site : categories + plats + prix. Plus lisible sur mobile. (PDF en telechargement possible en plus).",
        price: 240,
        days: 1
      },
      {
        id: "sections-premium-photos",
        label: "Menu premium (avec photos)",
        description:
          "Menu affiche sur la page + mise en forme premium + photos des plats (si vous les fournissez).",
        price: 420,
        days: 2
      }
    ]
  },
  {
    id: "pages-supplementaires-vitrine",
    section: "Pages",
    label: "Pages supplementaires",
    description: "Pages au-dela du pack de base (ex: A propos, Galerie, Acces, FAQ...).",
    kind: "quantity",
    tags: [...allBusinessTags, "vitrine-only"],
    unitLabel: "page",
    unitPrice: 120,
    unitDays: 1,
    min: 0,
    max: 10,
    defaultValue: 0
  },
  {
    id: "pages-supplementaires-backend",
    section: "Pages",
    label: "Pages supplementaires",
    description: "Pages au-dela du pack de base (ex: A propos, Galerie, Acces, FAQ...).",
    kind: "quantity",
    tags: [...allBusinessTags, "backend-only"],
    unitLabel: "page",
    unitPrice: 160,
    unitDays: 1,
    min: 0,
    max: 10,
    defaultValue: 0
  },
  {
    id: "cta-commande-externe",
    section: "Integrations",
    label: "CTA commande/appel externe",
    description: "Vous nous fournissez les liens externes, nous ajoutons les boutons de commande/appel sur le site.",
    kind: "checkbox",
    tags: ["snack"],
    price: 120,
    days: 1
  },
  {
    id: "gestion-menu-admin",
    section: "Admin",
    label: "Gestion menu admin",
    description: "Vous mettez a jour les contenus, nous livrons une gestion du menu depuis le back-office.",
    kind: "checkbox",
    tags: ["snack", "backend-only"],
    price: 480,
    days: 3
  },
  {
    id: "demandes-messages",
    section: "Admin",
    label: "Demandes/messages + statuts",
    description: "Vos prospects envoient leurs demandes, nous mettons en place le suivi des statuts cote admin.",
    kind: "checkbox",
    tags: ["snack", "backend-only"],
    price: 380,
    days: 2
  },
  {
    id: "notifications-email",
    section: "Integrations",
    label: "Notifications email",
    description: "Vous indiquez l'adresse de reception, nous configurons les notifications automatiques par email.",
    kind: "checkbox",
    tags: ["snack", "restaurant", "gastro", "artisan", "coach", "tpe", "backend-only"],
    price: 180,
    days: 1
  },
  {
    id: "reservation-externe",
    section: "Integrations",
    label: "CTA reservation externe (TheFork/Zenchef/Google)",
    description: "Vous fournissez le lien de reservation, nous ajoutons le bouton de redirection sur le site.",
    kind: "checkbox",
    tags: ["restaurant", "gastro"],
    price: 220,
    days: 1
  },
  {
    id: "galerie-photo",
    section: "Contenus",
    label: "Galerie photo optimisee",
    description: "Vous fournissez les photos, nous creons une galerie optimisee pour le chargement.",
    kind: "checkbox",
    tags: ["restaurant", "gastro"],
    price: 280,
    days: 2
  },
  {
    id: "multilingue",
    section: "Contenus",
    label: "Version multilingue",
    description: "Vous fournissez les contenus traduits, nous integrons les versions de langue sur le site.",
    kind: "checkbox",
    tags: ["restaurant", "gastro"],
    price: 780,
    days: 4
  },
  {
    id: "rdv-doctolib-maiia",
    section: "Integrations",
    label: "CTA RDV externe (Doctolib/Maiia)",
    description: "Vous fournissez le lien de prise de RDV, nous ajoutons le CTA sans stocker de donnees medicales.",
    kind: "checkbox",
    tags: ["medical", "medical-only", "vitrine-only", "no-health-data"],
    price: 140,
    days: 1
  },
  {
    id: "admin-contenu-non-sensible",
    section: "Admin",
    label: "Admin contenu non sensible",
    description: "Vous gerez les contenus non sensibles, nous mettons en place une administration dediee.",
    kind: "checkbox",
    tags: ["medical", "medical-only", "backend-only", "no-health-data"],
    price: 520,
    days: 3
  },
  {
    id: "formulaire-lead-devis",
    section: "Integrations",
    label: "Formulaire lead/devis",
    description: "Vous definissez les champs utiles, nous configurons le formulaire de contact qualifie.",
    kind: "checkbox",
    tags: ["artisan", "coach", "tpe"],
    price: 320,
    days: 2
  },
  {
    id: "mini-crm-leads",
    section: "Admin",
    label: "Mini CRM leads (statuts/notes/export)",
    description: "Vous suivez vos prospects au quotidien, nous ajoutons un mini CRM dans l'interface admin.",
    kind: "checkbox",
    tags: ["artisan", "coach", "tpe", "backend-only"],
    price: 960,
    days: 5
  },
  {
    id: "seo-local-renforce",
    section: "SEO/Perf",
    label: "SEO local renforce",
    description: "Vous validez vos zones et mots-cles, nous optimisons le referencement local des pages.",
    kind: "checkbox",
    tags: ["artisan", "coach", "tpe", "medical", "salon"],
    price: 320,
    days: 2
  },
  {
    id: "mentions-legales",
    section: "Legal",
    label: "Mentions legales + CGV/CGU",
    description: "Vous fournissez vos informations legales, nous integrons les pages et liens obligatoires.",
    kind: "checkbox",
    tags: ["snack", "restaurant", "medical", "gastro", "artisan", "salon", "coach", "tpe"],
    price: 180,
    days: 1
  }
];

const sectionOrder: Option["section"][] = ["Pages", "Contenus", "Integrations", "SEO/Perf", "Admin", "Legal"];

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
