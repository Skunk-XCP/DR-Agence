import React from "react";
import { Container, Button } from "../../ui";
import { brand } from "../../../data";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div>
          <p className={styles.name}>{brand.name}</p>
          <p className={styles.note}>{brand.footerNote}</p>
        </div>
        <div className={styles.socials}>
          {brand.socials.map((social) => {
            const isLinkedIn = social.label.toLowerCase().includes("linkedin");

            return (
              <Button
                key={social.label}
                href={social.href}
                variant="ghost"
                size="sm"
                className={isLinkedIn ? styles.linkedinButton : ""}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (nouvelle fenêtre)`}
              >
                {social.label}
              </Button>
            );
          })}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
