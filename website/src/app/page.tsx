import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="container">
      <Hero />
      <Services />
      <Approach />
      <Contact />
    </div>
  );
}
