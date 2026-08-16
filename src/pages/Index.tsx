import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GridFrame from "@/components/GridFrame";
import OurStorySection from "@/components/OurStorySection";
import ServicesSection from "@/components/ServicesSection";
import ProgramsSection from "@/components/ProgramsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CtaBannerSection from "@/components/CtaBannerSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import BlogSection from "@/components/BlogSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <GridFrame>
    <Navbar />
    <HeroSection />
    <OurStorySection />
    <ServicesSection />
    <ProgramsSection />
    <HowItWorksSection />
    <CtaBannerSection />
    <BlogSection />
    <FaqSection />
    <TestimonialsSection />
    <ContactSection />
    <FinalCtaSection />
    <Footer />
  </GridFrame>
);

export default Index;
