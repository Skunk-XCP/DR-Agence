import Link from "next/link";
import { Footer, Navbar } from "@/components/sections";
import { Button, Container } from "@/components/ui";
import type { ServicePageData } from "@/data/servicePages";
import styles from "./ServicePage.module.css";

const baseUrl = "https://www.donatien-rouzeirol.fr";

export default function ServicePage({ data }: { data: ServicePageData }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${baseUrl}${data.slug}#service`,
        name: data.h1,
        description: data.description,
        url: `${baseUrl}${data.slug}`,
        provider: { "@id": `${baseUrl}/#person` },
        areaServed: [
          { "@type": "City", name: "Bordeaux" },
          { "@type": "Country", name: "France" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: data.h1, item: `${baseUrl}${data.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="app">
      <Navbar />
      <main id="main" tabIndex={-1}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <section className={`${styles.hero} themeDark noise-overlay vignette-overlay`}>
          <Container>
            <nav className={styles.breadcrumb} aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{data.h1}</span>
            </nav>
            <p className={styles.eyebrow}>{data.eyebrow}</p>
            <h1>{data.h1}</h1>
            <p className={styles.lead}>{data.intro}</p>
            <div className={styles.actions}>
              <Button href="/#contact" size="lg" target={undefined} rel={undefined}>Demander un devis</Button>
              <Button href="/offres" variant="ghost" size="lg" target={undefined} rel={undefined}>Estimer mon projet</Button>
            </div>
          </Container>
        </section>

        <section className={`${styles.section} themeWarm noise-overlay`}>
          <Container className={styles.narrow}>
            <p className={styles.kicker}>Pour qui et pour quoi&nbsp;?</p>
            <h2>Une prestation construite autour de votre objectif</h2>
            <p className={styles.bodyCopy}>{data.audience}</p>
            <div className={styles.cardGrid}>
              {data.problems.map((problem) => (
                <article className={styles.card} key={problem.title}>
                  <h3>{problem.title}</h3>
                  <p>{problem.text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className={`${styles.section} themeLight`}>
          <Container className={styles.twoColumns}>
            <div>
              <p className={styles.kicker}>Périmètre</p>
              <h2>Ce que la prestation peut comprendre</h2>
              <p className={styles.bodyCopy}>Le contenu précis dépend du projet et est confirmé dans le devis après cadrage.</p>
            </div>
            <ul className={styles.checkList}>
              {data.deliverables.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Container>
        </section>

        <section className={`${styles.section} themeDark noise-overlay vignette-overlay`}>
          <Container>
            <p className={styles.kicker}>Méthode</p>
            <h2>Un déroulement lisible, du besoin à la livraison</h2>
            <ol className={styles.steps}>
              {data.process.map((step, index) => (
                <li key={step.title}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className={`${styles.section} themeWarm`}>
          <Container className={styles.narrow}>
            <p className={styles.kicker}>Questions fréquentes</p>
            <h2>Avant de démarrer</h2>
            <div className={styles.faq}>
              {data.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className={`${styles.section} themeLight`}>
          <Container>
            <p className={styles.kicker}>Prestations associées</p>
            <h2>Explorer les solutions proches de votre besoin</h2>
            <div className={styles.relatedGrid}>
              {data.related.map((item) => (
                <Link className={styles.relatedCard} href={item.href} key={item.href}>
                  <h3>{item.label}</h3><p>{item.text}</p><span>En savoir plus →</span>
                </Link>
              ))}
            </div>
            <div className={styles.finalCta}>
              <h2>Parlons de votre projet</h2>
              <p>Présentez-moi votre activité, votre besoin et le résultat attendu pour recevoir une proposition adaptée.</p>
              <Button href="/#contact" size="lg" target={undefined} rel={undefined}>Demander un devis</Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
