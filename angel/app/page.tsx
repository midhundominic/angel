import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { TransportJourney } from "@/components/sections/TransportJourney";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <TransportJourney />
        <About />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
