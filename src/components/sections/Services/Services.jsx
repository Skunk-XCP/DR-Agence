import React from "react";
import { Section, Card, Badge } from "../../ui";
import { services } from "../../../data";
import styles from "./Services.module.css";

const Services = () => {
  return (
    <Section
      id="services"
      eyebrow={services.eyebrow}
      title={services.title}
      subtitle={services.subtitle}
    >
      <div className={styles.grid}>
        {services.items.map((item) => (
          <Card key={item.title} className={styles.card}>
            <Badge variant="dark">{item.tag}</Badge>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Services;
