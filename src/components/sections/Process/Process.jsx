import React from "react";
import { Section } from "../../ui";
import { process } from "../../../data";
import styles from "./Process.module.css";

const Process = () => {
  return (
    <Section
      id="process"
      eyebrow={process.eyebrow}
      title={process.title}
      subtitle={process.subtitle}
    >
      <div className={styles.steps}>
        {process.steps.map((step, index) => (
          <div key={step.title} className={styles.step}>
            <div className={styles.index} aria-hidden="true">{`0${index + 1}`}</div>
            <div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Process;

