import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QueEs from "@/components/QueEs";
import Funcionalidades from "@/components/Funcionalidades";
import Cobertura from "@/components/Cobertura";
import Beneficios from "@/components/Beneficios";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QueEs />
        <Funcionalidades />
        <Cobertura />
        <Beneficios />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
