import type { Metadata } from "next";
import { getGeoJsonLd } from "@/data/geo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.donatien-rouzeirol.fr"),
  alternates: {
    canonical: "/",
  },
  title: "Donatien Rouzeirol | Développeur web freelance",
  description:
    "Développeur web freelance à Bordeaux. Création de sites, applications web, interfaces et fonctionnalités sur mesure pour les professionnels en France.",
  keywords: [
    "Donatien Rouzeirol",
    "développeur web Bordeaux",
    "développeur freelance Bordeaux",
    "création site web Bordeaux",
    "création site internet professionnel",
    "création site vitrine",
    "développement web sur mesure",
    "application web sur mesure",
    "développeur application web",
    "intégration API",
    "refonte site internet",
    "maintenance site internet",
    "site vitrine performant",
    "landing page Bordeaux",
  ],
  authors: [{ name: "Donatien Rouzeirol", url: "https://www.donatien-rouzeirol.fr" }],
  creator: "Donatien Rouzeirol",
  publisher: "Donatien Rouzeirol",
  category: "Développement web",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/images/DR-favicon.png", type: "image/png", sizes: "96x96" },
    ],
  },
  openGraph: {
    title: "Donatien Rouzeirol | Développeur web freelance",
    description: "Sites professionnels, applications web et développement sur mesure à Bordeaux et partout en France.",
    url: "https://www.donatien-rouzeirol.fr/",
    siteName: "Donatien Rouzeirol",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/assets/images/cafe-cosy-800.webp",
        width: 800,
        height: 574,
        alt: "Ambiance cafe cosy",
      },
    ],
  },
  other: {
    "ai-content-declaration": "human-authored; business facts available at /geo.json and /llms.txt",
    "llms-txt": "https://www.donatien-rouzeirol.fr/llms.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const geoJsonLd = getGeoJsonLd();

  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(geoJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a className="skipLink" href="#main">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
