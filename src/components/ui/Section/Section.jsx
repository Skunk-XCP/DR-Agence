import React from "react";
import Container from "../Container/Container";
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
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && (
              <h2 id={headingId} className={styles.title}>
                {title}
              </h2>
            )}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {actions && <div className={styles.actions}>{actions}</div>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
};

export default Section;
