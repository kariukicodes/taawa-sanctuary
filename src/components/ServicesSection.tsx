import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PillTag from "./PillTag";
import { 
  Brain, HeartCrack, ShieldAlert, HeartHandshake, Waves, CloudRain, 
  Flame, Unlock, Heart, Users, Star, Compass, Flower2, 
  Briefcase, Flag, GraduationCap, Building2, UsersRound
} from "lucide-react";

const categories = [
  {
    id: "core",
    label: "Core Support",
    headline: "Always-there support for your mental health.",
    desc: "From anxiety and depression to trauma and grief — our licensed counsellors provide compassionate, evidence-based support tailored to where you are right now.",
    cta: "Book a Session",
    bg: "#1c3028",
    accent: "#d4e84a",
    services: [
      { icon: <Brain size={14} />, name: "Individual Counselling" },
      { icon: <HeartCrack size={14} />, name: "Trauma & Emotional Healing" },
      { icon: <ShieldAlert size={14} />, name: "Narcissistic Abuse Recovery" },
      { icon: <HeartHandshake size={14} />, name: "Grief & Loss Support" },
      { icon: <Waves size={14} />, name: "Anxiety, Stress & Burnout" },
      { icon: <CloudRain size={14} />, name: "Depression & Mood Support" },
      { icon: <Flame size={14} />, name: "Anger Management" },
      { icon: <Unlock size={14} />, name: "Addiction & Habit Support" },
    ],
    quote: "I've been carrying this for years. I finally feel heard.",
    author: "Sarah M.",
    initials: "SM",
    stat: "8 services available",
    image: "servicescard1.png",
  },
  {
    id: "relationships",
    label: "Relationships",
    headline: "Heal relationships, rebuild connection.",
    desc: "Whether navigating a difficult partnership, family conflict, or patterns in dating — we help you communicate better, set healthy boundaries, and reconnect.",
    cta: "Book a Session",
    bg: "#CF5B30", // Modified to blend better with illustration
    accent: "#fff",
    services: [
      { icon: <Heart size={14} />, name: "Relationship & Dating Counselling" },
      { icon: <Users size={14} />, name: "Family Counselling & Conflict Resolution" },
    ],
    quote: "We were about to give up. Counselling saved our relationship.",
    author: "David & Emma",
    initials: "D&E",
    stat: "2 services available",
    image: "servicescard2.png",
  },
  {
    id: "growth",
    label: "Growth & Coaching",
    headline: "Grow into the best version of yourself.",
    desc: "Develop emotional intelligence, rebuild confidence, and find direction. Our growth-focused sessions combine coaching and counselling to help you thrive.",
    cta: "Start Growing",
    bg: "#3d6050",
    accent: "#d4e84a",
    services: [
      { icon: <Star size={14} />, name: "Self-Esteem & Confidence Building" },
      { icon: <Compass size={14} />, name: "Personal Development & Life Coaching" },
      { icon: <Flower2 size={14} />, name: "Emotional Intelligence & Mindfulness" },
      { icon: <Briefcase size={14} />, name: "Career & Life Transition Counselling" },
    ],
    quote: "I finally know who I am and where I'm going.",
    author: "James T.",
    initials: "JT",
    stat: "4 services available",
    image: "servicescard3.png",
  },
  {
    id: "identity",
    label: "Identity & Inclusion",
    headline: "A safe space for every identity.",
    desc: "We celebrate and affirm every identity. Our LGBTQ+ affirmative counselling provides a judgment-free space to explore who you are with full support.",
    cta: "Find Your Space",
    bg: "#6b4c8a",
    accent: "#f7c5d5",
    services: [
      { icon: <Flag size={14} />, name: "LGBTQ+ Affirmative Counselling" },
    ],
    quote: "For the first time I didn't have to explain myself. I was just accepted.",
    author: "Alex R.",
    initials: "AR",
    stat: "Safe & affirming space",
    image: "servicescard4.png",
  },
  {
    id: "specialist",
    label: "Specialist Programs",
    headline: "Expert programs for specific needs.",
    desc: "From student wellbeing to corporate wellness — our specialist programs bring professional mental health support to communities, schools, and workplaces.",
    cta: "Explore Programs",
    bg: "#2a3848",
    accent: "#7aaa88",
    services: [
      { icon: <GraduationCap size={14} />, name: "Student Counselling" },
      { icon: <UsersRound size={14} />, name: "Group Therapy & Support Groups" },
      { icon: <Building2 size={14} />, name: "Workshops, Webinars & Corporate Wellness" },
    ],
    quote: "The workshop completely changed how our team communicates.",
    author: "Corporate Client",
    initials: "CC",
    stat: "3 programs available",
    image: "servicescard5.png",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const cat = categories[active];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % categories.length);
    }, 20000); // 20 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="services" className="bg-taawa-bg py-16 px-[5%] lg:py-20">

      {/* Header */}
      <div className="text-center mb-10">
        <PillTag className="mx-auto mb-5">
          Support That Matters
        </PillTag>
        <h2
          className="font-syne font-bold text-taawa-text"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            letterSpacing: "-0.025em",
            lineHeight: "1.12",
          }}
        >
          Find the Support That Fits Your Journey
        </h2>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap justify-center mb-8">
        {categories.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            className={`font-instrument px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
              active === i
                ? "bg-taawa-text text-white border-taawa-text"
                : "bg-white text-taawa-muted border-taawa-lime/20 hover:border-taawa-lime hover:text-taawa-text"
            }`}
          >
            {active === i && (
              <span className="inline-block w-2 h-2 rounded-full bg-taawa-lime mr-2 align-middle" />
            )}
            {c.label}
          </button>
        ))}
      </div>

      {/* Feature card */}
      <div
        className="rounded-[24px] overflow-hidden transition-colors duration-500"
        style={{ background: cat.bg }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">

          {/* Left — services chips + quote */}
          <div className="p-8 md:p-12 flex flex-col justify-between gap-8 lg:col-span-5">
            <div className="flex flex-wrap gap-2">
              {cat.services.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-white"
                >
                  <span className="flex items-center justify-center">{s.icon}</span>
                  <span className="font-instrument text-xs font-medium">{s.name}</span>
                </div>
              ))}
            </div>

            {/* Quote card */}
            <div className="bg-white/10 border border-white/15 rounded-[16px] p-5">
              <p className="font-instrument font-medium text-white text-[1rem] leading-snug mb-3 italic">
                "{cat.quote}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="font-instrument w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: cat.accent, color: cat.bg }}
                  >
                    {cat.initials}
                  </div>
                  <span className="font-instrument text-white/70 text-xs">{cat.author}</span>
                </div>
                <span
                  className="font-instrument text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: cat.accent, color: cat.bg }}
                >
                  {cat.stat}
                </span>
              </div>
            </div>
          </div>

          {/* Middle — Illustration part */}
          <div className="hidden lg:flex lg:col-span-3 relative items-center justify-center p-4 xl:p-6 lg:border-l border-white/10 min-h-[420px]">
            <img 
               src={cat.image} 
               alt={`${cat.label} illustration`} 
               className="w-full h-auto max-h-[340px] xl:max-h-[380px] object-contain opacity-90 hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* Right — headline + desc + CTA */}
          <div className="p-8 md:p-12 flex flex-col justify-center gap-6 lg:border-l border-white/10 lg:col-span-4">
            <h3
              className="font-syne font-bold text-white leading-tight"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {cat.headline}
            </h3>
            <p className="font-instrument text-white/65 text-sm leading-relaxed max-w-sm">
              {cat.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/book-session")}
                className="font-semibold py-3 px-7 rounded-full text-sm transition-all hover:-translate-y-0.5 font-instrument"
                style={{ background: cat.accent, color: cat.bg }}
              >
                {cat.cta} →
              </button>
              <button
                onClick={() => navigate("/book-session")}
                className="font-medium py-3 px-7 rounded-full text-sm border border-white/25 text-white hover:bg-white/10 transition-all font-instrument"
              >
                Free Consultation
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Dot pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {categories.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: active === i ? "24px" : "8px",
              height: "8px",
              background: active === i ? "#1c3028" : "#c5cdb8",
            }}
          />
        ))}
      </div>

      {/* Explore More Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/services")}
          className="font-instrument bg-taawa-text text-white hover:bg-taawa-green transition-colors px-8 py-3 rounded-full font-medium"
        >
          Explore More
        </button>
      </div>

    </section>
  );
}