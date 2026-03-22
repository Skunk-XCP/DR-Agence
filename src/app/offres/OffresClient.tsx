"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  businessTypes,
  hostingDisclaimer,
  isBusinessType,
  isProjectType,
  isSiteType,
  pricingMatrix,
  projectTypes,
  siteTypes
} from "@/lib/pricing";
import styles from "./page.module.css";

type Props = {
  initialBusinessType: string;
  initialProjectType: string;
  initialSiteType: string;
};

const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

const formatRange = (range: [number, number]) => `${eur.format(range[0])} - ${eur.format(range[1])}`;

export default function OffresClient({ initialBusinessType, initialProjectType, initialSiteType }: Props) {
  const [projectType, setProjectType] = useState(initialProjectType);
  const [businessType, setBusinessType] = useState(initialBusinessType);
  const [siteType, setSiteType] = useState(initialSiteType);

  const ready = isProjectType(projectType) && isBusinessType(businessType) && isSiteType(siteType);
  const isExistingSiteProject = projectType === "existing_site";

  const estimate = useMemo(() => {
    if (!ready || !isBusinessType(businessType) || !isSiteType(siteType)) {
      return null;
    }
    return pricingMatrix[businessType][siteType];
  }, [businessType, ready, siteType]);

  const configurateurHref = ready
    ? `/configurateur?${new URLSearchParams({
        projectType,
        businessType,
        siteType
      }).toString()}`
    : "#";

  return (
    <main id="main" tabIndex={-1} className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Estimation rapide</p>
        <h1 className={styles.title}>Configurez votre base projet</h1>

        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Mode projet</span>
            <select id="projectType" value={projectType} onChange={(e) => setProjectType(e.target.value)}>
              <option value="">Sélectionner un mode projet</option>
              {projectTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span>Type de commerce</span>
            <select id="businessType" value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
              <option value="">Sélectionner un type de commerce</option>
              {businessTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span>Type de site</span>
            <select id="siteType" value={siteType} onChange={(e) => setSiteType(e.target.value)}>
              <option value="">Sélectionner un type de site</option>
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
            <h2>{isExistingSiteProject ? "Mise à jour" : "Estimation instantanée"}</h2>
            {isExistingSiteProject ? (
              <>
                <p>Mise à jour : chiffrage après analyse. Décrivez précisément la modification demandée.</p>
                <p>
                  <strong>Base sélectionnée :</strong> {siteTypes.find((item) => item.id === siteType)?.label}
                </p>
                <p>
                  <strong>Options cohérentes ensuite :</strong> pages supplémentaires, SEO/Perf, mentions légales,
                  intégrations simples.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Fourchette:</strong> {formatRange(estimate.range)}
                </p>
                <p>
                  <strong>Délai typique :</strong> {estimate.timeline}
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
                <p className={styles.disclaimer}>
                  <strong>À noter :</strong> {hostingDisclaimer}
                </p>
              </>
            )}
          </article>
        ) : null}

        {ready ? (
          <div className={styles.actions}>
            <Link className={styles.primaryBtn} href={configurateurHref}>
              Configurez votre offre
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
