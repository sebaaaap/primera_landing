import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import ContactForm from "./components/ContactForm";
import WhatsAppButton from "./components/WhatsAppButton";
import Location from "./components/Location";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <Location />
      <ContactForm/>
      <WhatsAppButton />
      
    </>
  );
}
