import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Navbar } from "@/components/sections";
import { Container } from "@/components/ui";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Mentions légales | Donatien Rouzeirol",
  description: "Mentions légales du site professionnel de Donatien Rouzeirol, développeur web freelance.",
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="app">
      <Navbar />
      <main id="main" tabIndex={-1} className={styles.page}>
        <Container>
          <article className={styles.content}>
            <h1>Mentions légales</h1>

            <section>
              <h2>Éditeur du site</h2>
              <address className={styles.address}>
                <span>Donatien Rouzeirol</span>
                <span>Entrepreneur individuel (EI)</span>
                <span>Développeur web freelance</span>
                <span>Adresse : 7 rue René Descartes, 33150 Cenon</span>
                <span>SIREN : 988 073 458</span>
                <span>
                  Email : <a href="mailto:contact@donatien-rouzeirol.fr">contact@donatien-rouzeirol.fr</a>
                </span>
                <span>Téléphone : <a href="tel:+33626211808">06 26 21 18 08</a></span>
              </address>
            </section>

            <section>
              <h2>Directeur de la publication</h2>
              <p>Donatien Rouzeirol</p>
            </section>

            <section>
              <h2>Hébergement</h2>
              <address className={styles.address}>
                <span>Vercel Inc.</span>
                <span>440 N Barranca Avenue #4133</span>
                <span>Covina, CA 91723</span>
                <span>États-Unis</span>
                <span>
                  Site :{" "}
                  <a href="https://vercel.com" target="_blank" rel="noreferrer">
                    vercel.com
                  </a>
                </span>
              </address>
            </section>

            <section>
              <h2>Propriété intellectuelle</h2>
              <p>
                Sauf mention contraire, les contenus présents sur ce site, notamment les textes, éléments
                graphiques, créations et développements, sont la propriété de Donatien Rouzeirol. Toute
                reproduction, représentation ou utilisation non autorisée est interdite, sauf exceptions prévues
                par la législation applicable.
              </p>
            </section>

            <section>
              <h2>Données personnelles</h2>
              <p>
                Les modalités de traitement des données personnelles collectées sur ce site sont détaillées dans
                la <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
              </p>
            </section>
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
