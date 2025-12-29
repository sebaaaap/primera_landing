import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import ContactSection from "./components/ContactSection";
import WhatsAppButton from "./components/WhatsAppButton";
import Carruselm from "./components/Carruselm";
import Reseñas from "./components/Reseñas";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhatsAppButton />
      <Carruselm />
      <Gallery />
      <Reseñas />
      <ContactSection />
    </>
  );
}
