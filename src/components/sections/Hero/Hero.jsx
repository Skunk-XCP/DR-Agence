import { hero } from "../../../data";
import { Badge, Button, Container } from "../../ui";
import styles from "./Hero.module.css";

const HERO_IMAGE_SRCSET_WEBP =
  "/assets/images/cafe-cosy-480.webp 480w, /assets/images/cafe-cosy-800.webp 800w, /assets/images/cafe-cosy-1200.webp 1200w";
const HERO_IMAGE_SRCSET_AVIF =
  "/assets/images/cafe-cosy-480.avif 480w, /assets/images/cafe-cosy-800.avif 800w, /assets/images/cafe-cosy-1200.avif 1200w";
const HERO_IMAGE_SIZES = "(max-width: 768px) 90vw, 520px";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <Badge>{hero.eyebrow}</Badge>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
          <div className={styles.actions}>
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="ghost" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <div className={styles.highlights}>
            {hero.highlights.map((item) => (
              <div key={item} className={styles.highlight}>
                <span className={styles.dot} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.media}>
          <picture>
            <source type="image/avif" srcSet={HERO_IMAGE_SRCSET_AVIF} sizes={HERO_IMAGE_SIZES} />
            <source type="image/webp" srcSet={HERO_IMAGE_SRCSET_WEBP} sizes={HERO_IMAGE_SIZES} />
            <img
              src="/assets/images/cafe-cosy-800.webp"
              srcSet={HERO_IMAGE_SRCSET_WEBP}
              sizes={HERO_IMAGE_SIZES}
              width="800"
              height="574"
              alt="Ambiance cafe cozy"
              className={styles.heroImage}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </Container>
    </section>
  );
};

export default Hero;