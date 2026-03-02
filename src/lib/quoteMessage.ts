type BuildQuoteMessageParams = {
  clientName: string;
  businessName: string;
  email: string;
  phone?: string;
  businessTypeLabel: string;
  siteTypeLabel: string;
  optionLabels: string[];
  totalPrice: number;
  totalDays: number;
};

export const buildQuoteMessage = ({
  clientName,
  businessName,
  email,
  phone,
  businessTypeLabel,
  siteTypeLabel,
  optionLabels,
  totalPrice,
  totalDays
}: BuildQuoteMessageParams): string => {
  const optionsBlock =
    optionLabels.length > 0
      ? optionLabels.map((label) => `- ${label}`).join("\n")
      : "Aucune option supplementaire pour le moment.";

  const contactLine = phone?.trim() ? `${email} (${phone.trim()})` : email;

  return [
    `Objet : Demande de devis – ${siteTypeLabel} – ${businessName}`,
    "",
    "Bonjour,",
    `Je m'appelle ${clientName}, proprietaire de ${businessName}.`,
    `Je souhaite obtenir un devis pour la creation d'un ${siteTypeLabel}.`,
    `Base selectionnee : ${businessTypeLabel} – ${siteTypeLabel}`,
    "Options souhaitees :",
    optionsBlock,
    `Estimation actuelle : ${totalPrice} €`,
    `Delai estime : ${totalDays} jours`,
    "Pouvez-vous me recontacter pour valider le perimetre et finaliser le devis ?",
    `Contact : ${contactLine}`,
    "Merci,",
    clientName
  ].join("\n");
};
