import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import PillTag from "@/components/PillTag";

const allServices = [
  {
    title: "Mindfulness Coaching",
    desc: "Gentle guidance to build daily mindfulness habits and improve emotional awareness effectively.",
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
    fullDesc: "Our mindfulness coaching is designed to help you anchor yourself in the present moment. By learning specialized breathing techniques and awareness exercises, you can reduce anxiety and increase your daily peace. We work with you step-by-step to integrate these practices into your everyday routine so they become natural tools you can access whenever you feel overwhelmed."
  },
  {
    title: "Stress Management",
    desc: "Practical techniques to reduce tension, improve resilience, and restore mental calmness daily.",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    fullDesc: "Life's pressures can quickly build up, affecting physical and mental well-being. Our stress management programs focus on identifying personal triggers and building actionable strategies to navigate them. You'll learn cognitive reframing, boundary-setting, and practical release techniques to build long-term emotional resilience."
  },
  {
    title: "Therapy Sessions",
    desc: "Professional one-on-one support to navigate emotions, challenges, and personal mental struggles.",
    img: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&q=80",
    fullDesc: "Sometimes we need a private, safe space to untangle profound emotional experiences. Our therapy sessions pair you with certified professionals who listen, validate, and guide you without judgment. Whether you're navigating trauma, relationship issues, loss, or depression, we provide a customized therapeutic approach."
  },
  {
    title: "Group Workshops",
    desc: "Join our community discussions and collaborative emotional resilience building workshops.",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80",
    fullDesc: "Healing doesn't happen in isolation. Our group workshops provide a supportive community environment where you can learn emotional resilience alongside peers. Topics include communication skills, self-compassion, anxiety navigation, and guided group meditations."
  }
];

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-taawa-bg font-instrument selection:bg-taawa-lime selection:text-white pb-20">
      <Navbar />
      
      <main className="pt-32 px-[5%] max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <PillTag>All Services</PillTag>
          </div>
          <h1 className="font-syne font-bold text-taawa-text text-3xl md:text-4xl mb-6">
            Explore Our Healing Programs
          </h1>
          <p className="text-taawa-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Discover the full range of therapeutic services and coaching we offer to support your unique journey toward mental and emotional wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {allServices.map((s, i) => (
            <div key={i} className="bg-white rounded-[32px] p-8 flex flex-col hover:shadow-card2 hover:-translate-y-1 transition-all duration-300 border border-taawa-lime/20 group">
              <div className="w-full h-56 rounded-[24px] overflow-hidden mb-8 relative">
                <div className="absolute inset-0 bg-taawa-green/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="font-syne font-bold text-taawa-text text-2xl mb-4 group-hover:text-taawa-sage transition-colors">{s.title}</h3>
              <p className="text-taawa-muted mb-8 leading-relaxed text-sm flex-grow">{s.fullDesc}</p>
              <a href="/book-session" className="inline-flex items-center gap-2 justify-center w-full bg-taawa-bg2 text-taawa-text font-medium py-3.5 px-6 rounded-full group-hover:bg-taawa-sage group-hover:text-white transition-all duration-300">
                Book this Service <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
