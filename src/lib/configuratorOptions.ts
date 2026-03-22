import { businessTypes, type BusinessTypeId, type ProjectTypeId, type SiteTypeId } from "@/lib/pricing";

export type OptionKind = "checkbox" | "radio" | "quantity";

type OptionBase = {
  id: string;
  section: "Pages" | "Contenus" | "Intégrations" | "SEO/Perf" | "Admin" | "Légal";
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
          "Le menu est accessible via un bouton (ouverture/téléchargement du PDF). Le contenu n'est pas affiché sur la page.",
        price: 120,
        days: 0
      },
      {
        id: "pdf-sections-html",
        label: "Menu affiché sur la page (sans photos)",
        description:
          "Nous intégrons le menu directement sur le site : catégories + plats + prix. Plus lisible sur mobile. (PDF en téléchargement possible en plus).",
        price: 240,
        days: 1
      },
      {
        id: "sections-premium-photos",
        label: "Menu premium (avec photos)",
        description:
          "Menu affiché sur la page + mise en forme premium + photos des plats (si vous les fournissez).",
        price: 420,
        days: 2
      }
    ]
  },
  {
    id: "pages-supplementaires-vitrine",
    section: "Pages",
    label: "Pages supplémentaires",
    description: "Pages au-delà du pack de base (ex: À propos, Galerie, Accès, FAQ...).",
    kind: "quantity",
    tags: [...allBusinessTags, "vitrine-only", "existing-site-supported"],
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
    label: "Pages supplémentaires",
    description: "Pages au-delà du pack de base (ex: À propos, Galerie, Accès, FAQ...).",
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
    section: "Intégrations",
    label: "CTA commande/appel externe",
    description: "Vous nous fournissez les liens externes, nous ajoutons les boutons de commande/appel sur le site.",
    kind: "checkbox",
    tags: ["snack", "existing-site-supported"],
    price: 120,
    days: 1
  },
  {
    id: "gestion-menu-admin",
    section: "Admin",
    label: "Gestion menu admin",
    description: "Vous mettez à jour les contenus, nous livrons une gestion du menu depuis le back-office.",
    kind: "checkbox",
    tags: ["snack", "backend-only"],
    price: 480,
    days: 3
  },
  {
    id: "demandes-messages",
    section: "Admin",
    label: "Demandes/messages + statuts",
    description: "Vos prospects envoient leurs demandes, nous mettons en place le suivi des statuts côté admin.",
    kind: "checkbox",
    tags: ["snack", "association", "backend-only"],
    price: 380,
    days: 2
  },
  {
    id: "notifications-email",
    section: "Intégrations",
    label: "Notifications email",
    description: "Vous indiquez l'adresse de réception, nous configurons les notifications automatiques par email.",
    kind: "checkbox",
    tags: ["snack", "restaurant", "gastro", "artisan", "coach", "association", "tpe", "backend-only"],
    price: 180,
    days: 1
  },
  {
    id: "reservation-externe",
    section: "Intégrations",
    label: "CTA réservation externe (TheFork/Zenchef/Google)",
    description: "Vous fournissez le lien de réservation, nous ajoutons le bouton de redirection sur le site.",
    kind: "checkbox",
    tags: ["restaurant", "gastro", "existing-site-supported"],
    price: 220,
    days: 1
  },
  {
    id: "galerie-photo",
    section: "Contenus",
    label: "Galerie photo optimisée",
    description: "Vous fournissez les photos, nous créons une galerie optimisée pour le chargement.",
    kind: "checkbox",
    tags: ["restaurant", "gastro"],
    price: 280,
    days: 2
  },
  {
    id: "multilingue",
    section: "Contenus",
    label: "Version multilingue",
    description: "Vous fournissez les contenus traduits, nous intégrons les versions de langue sur le site.",
    kind: "checkbox",
    tags: ["restaurant", "gastro"],
    price: 780,
    days: 4
  },
  {
    id: "rdv-doctolib-maiia",
    section: "Intégrations",
    label: "CTA RDV externe (Doctolib/Maiia)",
    description: "Vous fournissez le lien de prise de RDV, nous ajoutons le CTA sans stocker de données médicales.",
    kind: "checkbox",
    tags: ["medical", "medical-only", "vitrine-only", "no-health-data", "existing-site-supported"],
    price: 140,
    days: 1
  },
  {
    id: "admin-contenu-non-sensible",
    section: "Admin",
    label: "Admin contenu non sensible",
    description: "Vous gérez les contenus non sensibles, nous mettons en place une administration dédiée.",
    kind: "checkbox",
    tags: ["medical", "medical-only", "backend-only", "no-health-data"],
    price: 520,
    days: 3
  },
  {
    id: "formulaire-lead-devis",
    section: "Intégrations",
    label: "Formulaire lead/devis",
    description: "Vous définissez les champs utiles, nous configurons le formulaire de contact qualifié.",
    kind: "checkbox",
    tags: ["artisan", "coach", "association", "tpe", "existing-site-supported"],
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
    label: "SEO local renforcé",
    description: "Vous validez vos zones et mots-clés, nous optimisons le référencement local des pages.",
    kind: "checkbox",
    tags: ["artisan", "coach", "association", "tpe", "medical", "salon", "existing-site-supported"],
    price: 320,
    days: 2
  },
  {
    id: "mentions-legales",
    section: "Légal",
    label: "Mentions légales + CGV/CGU",
    description: "Vous fournissez vos informations légales, nous intégrons les pages et liens obligatoires.",
    kind: "checkbox",
    tags: ["snack", "restaurant", "medical", "gastro", "artisan", "salon", "coach", "association", "tpe", "existing-site-supported"],
    price: 180,
    days: 1
  },
  {
    id: "hebergement-accompagnement",
    section: "Intégrations",
    label: "Conseil hébergement & nom de domaine",
    description: "Je vous recommande une solution et je vous guide (vous gardez la main). Hors coût récurrent.",
    kind: "checkbox",
    tags: ["snack", "restaurant", "medical", "gastro", "artisan", "salon", "coach", "association", "tpe"],
    price: 0,
    days: 0
  },
  {
    id: "setup-hebergement-dns",
    section: "Intégrations",
    label: "Mise en place hébergement & domaine (clé en main)",
    description:
      "Je m'occupe de la configuration : DNS, SSL, déploiement et tests. Hébergement/domaine restent à votre charge (coût récurrent).",
    kind: "checkbox",
    tags: ["snack", "restaurant", "medical", "gastro", "artisan", "salon", "coach", "association", "tpe", "existing-site-supported"],
    price: 180,
    days: 1
  },
  {
    id: "cta-adhesion-don-externe",
    section: "Intégrations",
    label: "CTA adhésion/don externe",
    description: "Vous fournissez le lien externe, nous ajoutons les boutons d'adhésion ou de don sur le site.",
    kind: "checkbox",
    tags: ["association", "existing-site-supported"],
    price: 120,
    days: 1
  },
  {
    id: "actus-evenements-admin",
    section: "Admin",
    label: "Actualités/événements en admin",
    description: "Vous publiez vos actualités ou événements via un back-office léger.",
    kind: "checkbox",
    tags: ["association", "backend-only"],
    price: 520,
    days: 3
  }
];

const sectionOrder: Option["section"][] = ["Pages", "Contenus", "Intégrations", "SEO/Perf", "Admin", "Légal"];

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

const matchesProjectType = (option: Option, projectType: ProjectTypeId) => {
  if (projectType === "new_site") {
    return true;
  }

  return option.tags.includes("existing-site-supported");
};

export const getOptionsFor = (
  businessType: BusinessTypeId,
  siteType: SiteTypeId,
  projectType: ProjectTypeId
): OptionSection[] => {
  const filtered = allOptions.filter(
    (option) =>
      matchesBusiness(option, businessType) &&
      matchesSite(option, siteType) &&
      matchesOnlyBusinessTags(option, businessType) &&
      matchesProjectType(option, projectType)
  );

  return sectionOrder
    .map((section) => ({
      section,
      options: filtered.filter((option) => option.section === section)
    }))
    .filter((group) => group.options.length > 0);
};
