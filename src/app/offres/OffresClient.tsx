"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { businessTypes, isBusinessType, isSiteType, pricingMatrix, siteTypes } from "@/lib/pricing";
import styles from "./page.module.css";

type Props = {
  initialBusinessType: string;
  initialSiteType: string;
};

const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

const formatRange = (range: [number, number]) => `${eur.format(range[0])} - ${eur.format(range[1])}`;

export default function OffresClient({ initialBusinessType, initialSiteType }: Props) {
  const [businessType, setBusinessType] = useState(initialBusinessType);
  const [siteType, setSiteType] = useState(initialSiteType);

  const ready = isBusinessType(businessType) && isSiteType(siteType);

  const estimate = useMemo(() => {
    if (!ready) {
      return null;
    }
    return pricingMatrix[businessType][siteType];
  }, [businessType, ready, siteType]);

  const configurateurHref = ready
    ? `/configurateur?businessType=${encodeURIComponent(businessType)}&siteType=${encodeURIComponent(siteType)}`
    : "#";

  return (
    <main id="main" tabIndex={-1} className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Estimation rapide</p>
        <h1 className={styles.title}>Configurez votre base projet</h1>

        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Type de commerce</span>
            <select
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            >
              <option value="">Selectionner un type de commerce</option>
              {businessTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span>Type de site</span>
            <select
              id="siteType"
              value={siteType}
              onChange={(e) => setSiteType(e.target.value)}
            >
              <option value="">Selectionner un type de site</option>
              {siteTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {estimate ? (
          <article className={styles.card} aria-live="polite">
            <h2>Estimation instantanee</h2>
            <p>
              <strong>Fourchette:</strong> {formatRange(estimate.range)}
            </p>
            <p>
              <strong>Delai typique:</strong> {estimate.timeline}
            </p>
            <p>
              <strong>Inclus:</strong>
            </p>
            <ul>
              {estimate.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>Note:</strong> {estimate.notes}
            </p>
          </article>
        ) : null}

        {ready ? (
          <div className={styles.actions}>
            <Link className={styles.primaryBtn} href={configurateurHref}>
              configuez votre offre
            </Link>
            <Link className={styles.secondaryBtn} href="/#contact">
              Demander un devis
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
