import React from "react";
import { Section } from "../../ui";
import Stagger, { StaggerItem } from "../../motion/Stagger";
import { process } from "../../../data";
import styles from "./Process.module.css";

const Process = () => {
  return (
    <Section
      id="process"
      eyebrow={process.eyebrow}
      title={process.title}
      subtitle={process.subtitle}
      className={`${styles.section} themeDark dark-section noise-overlay vignette-overlay`}
    >
      <Stagger className={styles.steps} stagger={0.12} delayChildren={0.08}>
        {process.steps.map((step, index) => (
          <StaggerItem key={step.title}>
            <div className={styles.step}>
              <div className={styles.index} aria-hidden="true">{`0${index + 1}`}</div>
              <div>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
};

export default Process;

