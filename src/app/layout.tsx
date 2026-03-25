import type { Metadata } from "next";
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
  ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <a className="skipLink" href="#main">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}

