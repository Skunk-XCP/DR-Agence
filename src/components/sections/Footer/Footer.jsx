import React from "react";
import { Container } from "../../ui";
import { brand } from "../../../data";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <span className={styles.meta}>(c) 2026 {brand.name}</span>
        <span className={styles.meta}>Développeur web freelance - Bordeaux</span>
        <a className={styles.link} href="mailto:contact@donatien-rouzeirol.fr">
          contact@donatien-rouzeirol.fr
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
