import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/sections";
import { Container } from "@/components/ui";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Donatien Rouzeirol",
  description: "Politique de confidentialité et traitement des demandes de prestation adressées à Donatien Rouzeirol.",
  alternates: {
    canonical: "/politique-de-confidentialite",
  },
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <div className="app">
      <Navbar />
      <main id="main" tabIndex={-1} className={styles.page}>
        <Container>
          <article className={styles.content}>
            <h1>Politique de confidentialité</h1>

            <section>
              <h2>Responsable du traitement</h2>
              <address className={styles.address}>
                <span>Donatien Rouzeirol</span>
                <span>Développeur web freelance / entrepreneur individuel</span>
                <span>
                  <a href="mailto:contact@donatien-rouzeirol.fr">contact@donatien-rouzeirol.fr</a>
                </span>
              </address>
            </section>

            <section>
              <h2>Données collectées</h2>
              <p>Le formulaire de demande de prestation permet de collecter :</p>
              <ul>
                <li>le nom du client ;</li>
                <li>le nom de l’établissement ;</li>
                <li>l’adresse email ;</li>
                <li>le numéro de téléphone, lorsqu’il est renseigné ;</li>
                <li>le numéro SIRET, lorsqu’il est renseigné ;</li>
                <li>
                  la configuration de la demande : type de projet, type d’activité, type de site, options choisies,
                  estimation de prix et de délai ;
                </li>
                <li>le contenu du message généré puis validé par l’utilisateur.</li>
              </ul>
            </section>

            <section>
              <h2>Finalité</h2>
              <p>Ces données sont utilisées uniquement pour :</p>
              <ul>
                <li>recevoir une demande de prestation ;</li>
                <li>comprendre le besoin du prospect ;</li>
                <li>répondre à la demande ;</li>
                <li>préparer, le cas échéant, un devis ou une relation contractuelle.</li>
              </ul>
            </section>

            <section>
              <h2>Base juridique</h2>
              <p>
                Le traitement est fondé sur l’exécution de mesures précontractuelles prises à la demande de la
                personne concernée, qui transmet volontairement une demande de prestation afin d’obtenir une
                réponse et, éventuellement, un devis.
              </p>
            </section>

            <section>
              <h2>Destinataires et prestataires techniques</h2>
              <p>
                Les données sont destinées à Donatien Rouzeirol pour le traitement de la demande. Elles transitent
                par un service Cloudflare Worker, exploité par Cloudflare, Inc., qui assure le traitement technique
                de la requête du formulaire.
              </p>
              <p>
                Elles sont ensuite transmises à Plus Five Five, Inc. (Resend), utilisé comme sous-traitant technique
                pour l’envoi des emails issus du formulaire, puis reçues dans la messagerie de Donatien Rouzeirol.
                Resend traite les données conformément à son{" "}
                <a href="https://resend.com/legal/dpa" target="_blank" rel="noreferrer">
                  Data Processing Addendum
                </a>{" "}
                et peut recourir à ses propres sous-traitants techniques. La{" "}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noreferrer">
                  politique de confidentialité de Resend
                </a>{" "}
                est également consultable en ligne.
              </p>
              <p>
                Resend est une société américaine. Des transferts de données hors de l’Espace économique européen
                peuvent donc avoir lieu. D’après son Data Processing Addendum, ces transferts sont encadrés, lorsque
                cela est nécessaire, par les clauses contractuelles types de la Commission européenne.
              </p>
            </section>

            <section>
              <h2>Données techniques de connexion</h2>
              <p>
                Lors de la consultation du site ou de l’utilisation du formulaire, les prestataires
                d’infrastructure peuvent traiter certaines données techniques nécessaires au fonctionnement, à la
                sécurité et à l’acheminement des requêtes. Ces données peuvent notamment comprendre l’adresse IP,
                la date et l’heure de la requête, des informations techniques relatives au navigateur, à l’appareil
                ou à la requête, ainsi que des données techniques de trafic ou de journalisation.
              </p>
              <p>
                Vercel est utilisé pour l’hébergement du site et Cloudflare pour l’infrastructure du Worker servant
                au formulaire. Ces traitements techniques ne correspondent pas à un système d’analytics ou de
                profilage mis en place par Donatien Rouzeirol. Les données concernées peuvent être conservées par
                ces prestataires conformément à leurs politiques et aux paramètres applicables à leurs services.
              </p>
            </section>

            <section>
              <h2>Durée de conservation</h2>
              <p>
                Le site ne stocke pas les informations du formulaire dans sa propre base de données. Après l’envoi,
                elles sont présentes dans la messagerie utilisée par Donatien Rouzeirol pour recevoir et traiter la
                demande. Les échanges sont conservés pendant la durée nécessaire au traitement de la demande et à
                la gestion d’une éventuelle relation commerciale, sous réserve des obligations légales applicables.
              </p>
            </section>

            <section>
              <h2>Droits des personnes</h2>
              <p>
                Vous pouvez demander l’accès à vos données, leur rectification, leur effacement ou la limitation de
                leur traitement. Vous pouvez également vous opposer au traitement lorsque ce droit est applicable.
                Pour exercer ces droits, écrivez à{" "}
                <a href="mailto:contact@donatien-rouzeirol.fr">contact@donatien-rouzeirol.fr</a>.
              </p>
              <p>
                Si vous estimez, après avoir contacté Donatien Rouzeirol, que vos droits ne sont pas respectés, vous
                pouvez adresser une réclamation à la{" "}
                <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
                  CNIL
                </a>.
              </p>
            </section>

            <section>
              <h2>Cookies et traceurs</h2>
              <p>
                Le site n’utilise actuellement aucun cookie publicitaire ou traceur nécessitant le consentement
                préalable de l’utilisateur.
              </p>
            </section>
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
