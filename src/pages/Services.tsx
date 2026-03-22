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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {allServices.map((s, i) => (
            <div key={i} className="bg-white/60 border border-taawa-lime/20 rounded-[32px] p-6 flex flex-col hover:shadow-lg transition-all duration-300">
              <div className="w-full h-[280px] rounded-[24px] overflow-hidden mb-6">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-syne font-bold text-gray-900 text-2xl mb-3">{s.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{s.fullDesc}</p>
              <button className="self-start text-taawa-lime font-bold hover:text-taawa-sage transition-colors">
                Book this Service →
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
