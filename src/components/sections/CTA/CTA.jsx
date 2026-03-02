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
      align="center"
      className={styles.section}
      actions={
        <div className={styles.actions}>
          <Button href={`mailto:${contact.email}`} size="lg">
            Envoyer un email
          </Button>
        </div>
      }
    >
      <div className={styles.contactGrid}>
        <div>
          <p className={styles.label}>Email</p>
          <p className={styles.value}>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default CTA;
