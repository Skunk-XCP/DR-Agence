import React from "react";
import { Section, Button } from "../../ui";
import { contact } from "../../../data";
import styles from "./CTA.module.css";

const CTA = () => {
  return (
    <Section
      id="contact"
      eyebrow={contact.eyebrow}
      title={contact.title}
      subtitle={contact.subtitle}
      align="left"
      className={`${styles.section} themeWarm noise-overlay vignette-overlay`}
      actions={
        <div className={styles.actions}>
          <Button href={`mailto:${contact.email}`} size="lg">
            Envoyer un email
          </Button>
        </div>
      }
    />
  );
};

export default CTA;
