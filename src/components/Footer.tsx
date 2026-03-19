import Logo from "./Logo";

const footerLinks = ["Home", "About Us", "Services", "Programs", "Blogs", "Contact Us"];
const socials = ["𝕏", "in", "f", "📷"];

const Footer = () => (
  <footer className="bg-taawa-green mx-6 rounded-t-card relative overflow-hidden">
    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-syne font-extrabold text-[13rem] text-taawa-lime/[0.08] pointer-events-none select-none leading-none whitespace-nowrap hidden md:block">
      Taawa
    </span>

    <div className="relative z-10 px-[5%] pt-16 pb-10">
      <div className="flex flex-col items-center text-center border-b border-white/10 pb-10 mb-8">
        <p className="font-syne font-medium text-white/85 text-[1.05rem] max-w-[480px] leading-relaxed mb-6">
          Experience compassionate guidance crafted to help you feel more centered.
        </p>
        <div className="flex gap-3">
          {socials.map((s, i) => (
            <a
              key={i}
              href="#"
              className="w-[38px] h-[38px] rounded-full border-[1.5px] border-white/20 flex items-center justify-center text-white/70 text-[0.82rem] hover:bg-taawa-lime hover:text-taawa-green hover:border-taawa-lime transition-all duration-300"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 font-instrument text-[0.78rem]">
          © 2026 Taawa Counselling. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
              className="text-white/65 font-instrument text-[0.82rem] hover:text-taawa-lime transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
