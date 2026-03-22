"use client";

import React, { useMemo, useState } from "react";
import { Section } from "../../ui";
import SlideIn from "../../motion/SlideIn";
import { pricing } from "../../../data";
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
import styles from "./Pricing.module.css";

const currency = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

const Pricing = () => {
  const [projectType, setProjectType] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [siteType, setSiteType] = useState("");

  const ready = isProjectType(projectType) && isBusinessType(businessType) && isSiteType(siteType);
  const estimate = useMemo(() => {
    if (!ready || !isBusinessType(businessType) || !isSiteType(siteType)) {
      return null;
    }
    return pricingMatrix[businessType][siteType];
  }, [businessType, ready, siteType]);

  const businessLabel = businessTypes.find((item) => item.id === businessType)?.label ?? "";
  const siteLabel = siteTypes.find((item) => item.id === siteType)?.label ?? "";
  const isExistingSiteProject = projectType === "existing_site";
  const resultLine = ready
    ? isExistingSiteProject
      ? `Mise à jour - ${businessLabel} - ${siteLabel} : chiffrage après analyse. Décrivez précisément la modification demandée.`
      : `Estimation - ${businessLabel} - ${siteLabel} : ${currency.format(estimate?.range[0] ?? 0)} - ${currency.format(estimate?.range[1] ?? 0)} - ${estimate?.timeline ?? "Sur devis"}`
    : "Sélectionnez votre mode projet, votre type de commerce et votre type de site pour voir une fourchette de prix et un délai indicatif.";
  const configurateurHref = ready
    ? `/configurateur?${new URLSearchParams({
        projectType,
        businessType,
        siteType
      }).toString()}`
    : "#pricing";

  return (
    <Section id="pricing" className={`${styles.section} themeDark dark-section noise-overlay vignette-overlay`}>
      <div className={styles.layout}>
        <SlideIn direction="left" delay={0.08}>
          <div className={styles.copy}>
            <div className={styles.eyebrow}>Estimation</div>
            <h2 className={styles.title}>Combien ça coûte ?</h2>
            <p className={styles.subtitle}>
              Sélectionnez votre type d&apos;activité et de projet pour une fourchette indicative{" "}
              - sans engagement, sans jargon.
            </p>
            <p className={styles.note}>Le devis final est confirmé après un premier échange.</p>
          </div>
        </SlideIn>

        <SlideIn direction="right" delay={0.12}>
          <div className={styles.form}>
            <label className={styles.label} htmlFor="projectType">
              Mode projet
            </label>
            <select
              id="projectType"
              className={styles.select}
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
            >
              <option value="" disabled>
                Sélectionner un mode projet
              </option>
              {projectTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>

            <label className={styles.label} htmlFor="businessType">
              {pricing.labels.businessType}
            </label>
            <select
              id="businessType"
              className={styles.select}
              value={businessType}
              onChange={(event) => setBusinessType(event.target.value)}
            >
              <option value="" disabled>
                Sélectionner un type de commerce
              </option>
              {businessTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>

            <label className={styles.label} htmlFor="siteType">
              {pricing.labels.siteType}
            </label>
            <select
              id="siteType"
              className={styles.select}
              value={siteType}
              onChange={(event) => setSiteType(event.target.value)}
            >
              <option value="" disabled>
                Sélectionner un type de site
              </option>
              {siteTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>

            <div className={styles.result} aria-live="polite">
              {resultLine}
            </div>
            {ready && !isExistingSiteProject ? <p className={styles.disclaimer}>{hostingDisclaimer}</p> : null}

            <a
              className={`${styles.cta} ${!ready ? styles.ctaDisabled : ""}`.trim()}
              href={configurateurHref}
              aria-disabled={!ready}
              onClick={(event) => {
                if (!ready) {
                  event.preventDefault();
                }
              }}
            >
              Demander un devis précis -&gt;
            </a>
          </div>
        </SlideIn>
      </div>
    </Section>
  );
};

export default Pricing;
