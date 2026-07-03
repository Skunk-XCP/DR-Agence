import type { Metadata } from "next";
import { getGeoJsonLd } from "@/data/geo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.donatien-rouzeirol.fr"),
  alternates: {
    canonical: "/",
  },
  title: "Donatien Rouzeirol | Développeur web",
  description:
    "Développeur web freelance à Bordeaux, France. Création de sites web premium, rapides et optimisés SEO (React, JavaScript, performance).",
  keywords: [
    "Donatien Rouzeirol",
    "développeur web Bordeaux",
    "développeur freelance Bordeaux",
    "création site web Bordeaux",
    "React",
    "JavaScript",
    "SEO",
    "Generative Engine Optimization",
    "GEO",
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
    title: "Donatien Rouzeirol | Développeur web",
    description: "Développeur web freelance à Bordeaux. Sites web premium, rapides et optimisés SEO.",
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
