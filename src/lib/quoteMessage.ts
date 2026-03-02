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
  optionLabels
}: BuildQuoteMessageParams): string => {
  const normalizedBusinessName = businessName.trim();
  const businessNameLine = normalizedBusinessName ? ` – ${normalizedBusinessName}` : "";
  const normalizedPhone = phone?.trim() ?? "";
  const clientPhoneLine = normalizedPhone ? `\n${normalizedPhone}` : "";

  const optionsBlock =
    optionLabels.length > 0
      ? `Je souhaite inclure les options suivantes :\n${optionLabels.map((label) => `- ${label}`).join("\n")}`
      : "Je n’ai pas d’option supplémentaire pour le moment.";

  return [
    "Bonjour,",
    "",
    `Je souhaiterais obtenir un devis pour la création d’un ${siteTypeLabel} pour mon activité (${businessTypeLabel}${businessNameLine}).`,
    "",
    optionsBlock,
    "",
    "Dans l’attente de votre retour,",
    "Cordialement,",
    clientName,
    "",
    `${email}${clientPhoneLine}`
  ].join("\n");
};
