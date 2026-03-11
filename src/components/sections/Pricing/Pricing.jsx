"use client";

import React, { useMemo, useState } from "react";
import { Section } from "../../ui";
import SlideIn from "../../motion/SlideIn";
import { pricing } from "../../../data";
import { businessTypes, isBusinessType, isSiteType, pricingMatrix, siteTypes } from "@/lib/pricing";
import styles from "./Pricing.module.css";

const currency = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

const Pricing = () => {
  const [businessType, setBusinessType] = useState("");
  const [siteType, setSiteType] = useState("");

  const ready = isBusinessType(businessType) && isSiteType(siteType);
  const estimate = useMemo(() => {
    if (!ready) {
      return null;
    }
    return pricingMatrix[businessType][siteType];
  }, [businessType, ready, siteType]);

  const businessLabel = businessTypes.find((item) => item.id === businessType)?.label ?? "";
  const siteLabel = siteTypes.find((item) => item.id === siteType)?.label ?? "";
  const resultLine = ready
    ? `Estimation - ${businessLabel} - ${siteLabel} : ${currency.format(estimate?.range[0] ?? 0)} - ${currency.format(estimate?.range[1] ?? 0)} - ${estimate?.timeline ?? "Sur devis"}`
    : "Selectionnez vos options pour voir une fourchette de prix et un delai indicatif.";
  const configurateurHref = ready
    ? `/configurateur?${new URLSearchParams({
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
            <h2 className={styles.title}>Combien ca coute ?</h2>
            <p className={styles.subtitle}>
              Selectionnez votre type d&apos;activite et de projet pour une fourchette indicative{" "}
              - sans engagement, sans jargon.
            </p>
            <p className={styles.note}>Le devis final est confirme apres un premier echange.</p>
          </div>
        </SlideIn>

        <SlideIn direction="right" delay={0.12}>
          <div className={styles.form}>
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
                Selectionner un type de commerce
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
                Selectionner un type de site
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
              Demander un devis precis -&gt;
            </a>
          </div>
        </SlideIn>
      </div>
    </Section>
  );
};

export default Pricing;
