"use client";

import React from "react";
import { Section } from "../../ui";
import Stagger, { StaggerItem } from "../../motion/Stagger";
import { services } from "../../../data";
import styles from "./Services.module.css";

const Services = () => {
  const handlePointerMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  };

  const handlePointerLeave = (event) => {
    const card = event.currentTarget;
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  };

  return (
    <Section
      id="services"
      eyebrow={services.eyebrow}
      title={services.title}
      subtitle={services.subtitle}
      className={`${styles.section} themeWarm noise-overlay vignette-overlay`}
    >
      <Stagger className={styles.grid} stagger={0.1} delayChildren={0.08}>
        {services.items.map((item, index) => (
          <StaggerItem key={item.title}>
            <article
              className={`${styles.card} ${index === 0 ? styles.star : ""}`.trim()}
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
            >
              {index === 0 ? <span className={styles.starBadge}>{item.tag}</span> : null}
              {index !== 0 ? <span className={styles.category}>{item.tag}</span> : null}
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
};

export default Services;
