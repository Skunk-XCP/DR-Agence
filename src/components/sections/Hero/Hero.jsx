import { hero } from "../../../data";
import { Badge, Button, Container } from "../../ui";
import Reveal from "../../motion/Reveal";
import Stagger, { StaggerItem } from "../../motion/Stagger";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} aria-hidden="true" />
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={styles.heroGlow} aria-hidden="true" />
      <Container className={styles.inner}>
        <div className={styles.content}>
          <Reveal delay={0}>
            <Badge>{hero.eyebrow}</Badge>
          </Reveal>
          <Reveal delay={0.08} y={18}>
            <h1 className={styles.title}>{hero.title}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.subtitle}>{hero.subtitle}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className={styles.actions}>
              <Button href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="ghost" size="lg">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
          <Stagger className={styles.highlights} stagger={0.08} delayChildren={0.2}>
            {hero.highlights.map((item) => (
              <StaggerItem key={item}>
                <div className={styles.highlight}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
