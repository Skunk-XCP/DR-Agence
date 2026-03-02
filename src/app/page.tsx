import { CTA, Footer, Hero, Navbar, Pricing, Process, Services, ValueProps } from "@/components/sections";

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

