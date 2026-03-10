import React from "react";
import { Section } from "../../ui";
import SlideIn from "../../motion/SlideIn";
import Stagger, { StaggerItem } from "../../motion/Stagger";
import { valueProps } from "../../../data";
import styles from "./ValueProps.module.css";

const ValueProps = () => {
  return (
    <Section
      id="why"
      eyebrow={valueProps.eyebrow}
      title={valueProps.title}
      subtitle={valueProps.subtitle}
      className={`${styles.section} themeWarm noise-overlay vignette-overlay`}
    >
      <div className={styles.layout}>
        <SlideIn className={styles.stickyBlock} direction="left" delay={0.05}>
          <p className={styles.stickyNote}>{valueProps.subtitle}</p>
        </SlideIn>

        <Stagger className={styles.list} stagger={0.12} delayChildren={0.1}>
          {valueProps.items.map((item, index) => (
            <StaggerItem key={item.title} className={styles.item}>
              <span className={styles.num} aria-hidden="true">{`${index + 1}.`}</span>
              <div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
};

export default ValueProps;
