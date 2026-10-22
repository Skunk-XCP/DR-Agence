import type { Metadata } from "next";
import { CTA, Footer, Hero, Navbar, Pricing, Process, Services, ValueProps } from "@/components/sections";

export const metadata: Metadata = {
  title: "Développeur web freelance à Bordeaux | Sites & applications",
  description:
    "Développeur web freelance à Bordeaux : sites professionnels, applications web, interfaces, intégrations, refonte et maintenance partout en France.",
  alternates: {
    canonical: "https://www.donatien-rouzeirol.fr/",
  },
  openGraph: {
    title: "Développeur web freelance à Bordeaux | Sites & applications",
    description:
      "Sites professionnels, applications web, interfaces et fonctionnalités sur mesure à Bordeaux et partout en France.",
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
    title: "Développeur web freelance à Bordeaux | Sites & applications",
    description:
      "Sites professionnels, applications web, interfaces et fonctionnalités sur mesure à Bordeaux et partout en France.",
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
