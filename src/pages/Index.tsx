
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Features from "@/components/Features";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-uin-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <Solutions />
      <Features />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
