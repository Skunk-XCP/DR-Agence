import type { Metadata } from "next";
import { CTA, Footer, Hero, Navbar, Pricing, Process, Services, ValueProps } from "@/components/sections";

export const metadata: Metadata = {
  title: "Développeur web freelance à Bordeaux | Donatien Rouzeirol",
  description:
    "Développeur web freelance à Bordeaux. Création de sites vitrines clairs, rapides et professionnels pour indépendants et petites entreprises.",
  alternates: {
    canonical: "https://www.donatien-rouzeirol.fr/",
  },
  openGraph: {
    title: "Développeur web freelance à Bordeaux | Donatien Rouzeirol",
    description:
      "Développeur web freelance à Bordeaux. Création de sites vitrines clairs, rapides et professionnels pour indépendants et petites entreprises.",
    url: "https://www.donatien-rouzeirol.fr/",
    siteName: "Donatien Rouzeirol",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/assets/images/cafe-cosy-800.webp",
        width: 800,
        height: 574,
        alt: "Ambiance café cosy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développeur web freelance à Bordeaux | Donatien Rouzeirol",
    description:
      "Développeur web freelance à Bordeaux. Création de sites vitrines clairs, rapides et professionnels pour indépendants et petites entreprises.",
    images: ["/assets/images/cafe-cosy-800.webp"],
  },
};

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <ValueProps />
        <Process />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
