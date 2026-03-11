"use client";

import React from "react";
import Container from "../Container/Container";
import Reveal from "../../motion/Reveal";
import styles from "./Section.module.css";

const Section = ({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  actions,
  align = "left",
  className = "",
}) => {
  const headingId = title && id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${styles.section} ${styles[align]} ${className}`.trim()}
    >
      <Container>
        {(eyebrow || title || subtitle || actions) && (
          <header className={styles.header}>
            {eyebrow && (
              <Reveal delay={0}>
                <span className={styles.eyebrow}>{eyebrow}</span>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05} y={18}>
                <h2 id={headingId} className={styles.title}>
                  {title}
                </h2>
              </Reveal>
            )}
            {subtitle && (
              <Reveal delay={0.1}>
                <p className={styles.subtitle}>{subtitle}</p>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={0.14}>
                <div className={styles.actions}>{actions}</div>
              </Reveal>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
};

export default Section;
