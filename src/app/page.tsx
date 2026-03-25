import type { Metadata } from "next";
import { CTA, Footer, Hero, Navbar, Pricing, Process, Services, ValueProps } from "@/components/sections";

export const metadata: Metadata = {
  title: "Donatien Rouzeirol | Développeur web freelance",
  description:
    "Développeur web freelance à Bordeaux. Création de sites vitrines clairs, rapides et professionnels pour indépendants et petites entreprises.",
  alternates: {
    canonical: "https://www.donatien-rouzeirol.fr/",
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
