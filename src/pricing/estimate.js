import { businessTypes, siteTypes, pricingMatrix } from "./catalog";

const fallbackIncluded = [
  "Cadrage du besoin et recommandations",
  "Design propre et responsive",
  "SEO de base + performance standard",
  "Mise en ligne et suivi initial"
];

export const estimatePricing = ({ businessType, siteType }) => {
  const business = businessTypes.find((item) => item.id === businessType);
  const site = siteTypes.find((item) => item.id === siteType);
  const matrixEntry = pricingMatrix?.[businessType]?.[siteType];

  if (!business || !site || !matrixEntry) {
    return {
      fromPrice: null,
      rangeMin: null,
      rangeMax: null,
      timeline: "Sur devis",
      includedBullets: fallbackIncluded,
      notes: "Combinaison spécifique à cadrer ensemble."
    };
  }

  const rangeMin = Array.isArray(matrixEntry.range) ? matrixEntry.range[0] : null;
  const rangeMax = Array.isArray(matrixEntry.range) ? matrixEntry.range[1] : null;

  return {
    fromPrice: typeof matrixEntry.fromPrice === "number" ? matrixEntry.fromPrice : null,
    rangeMin,
    rangeMax,
    timeline: matrixEntry.timeline,
    includedBullets: matrixEntry.included,
    notes: matrixEntry.notes
  };
};

