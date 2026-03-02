import React from "react";
import { Section, Card } from "../../ui";
import { valueProps } from "../../../data";
import styles from "./ValueProps.module.css";

const ValueProps = () => {
  return (
    <Section
      eyebrow={valueProps.eyebrow}
      title={valueProps.title}
      subtitle={valueProps.subtitle}
    >
      <div className={styles.grid}>
        {valueProps.items.map((item) => (
          <Card key={item.title} className={styles.card}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default ValueProps;
