import { useState, useEffect } from "react";
import Logo from "./Logo";

const navLinks = ["About Us", "Services", "Programs", "Blogs"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-taawa-bg/95" : "bg-taawa-bg/[0.85]"
      } backdrop-blur-lg border-b border-taawa-green/[0.12]`}
    >
      <div className="flex items-center justify-between px-[5%] py-4">
        <Logo />

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
              className="font-instrument text-taawa-muted text-[0.88rem] px-4 py-2 rounded-pill hover:border hover:border-taawa-green/[0.12] transition-all duration-200 border border-transparent"
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex bg-taawa-green text-white font-instrument font-medium text-[0.88rem] rounded-pill px-6 py-2.5 border border-taawa-green/30 hover:-translate-y-0.5 transition-transform duration-300"
        >
          Contact Us
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-taawa-green transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-taawa-green transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-taawa-green transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-[5%] pb-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
              className="font-instrument text-taawa-muted py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-taawa-green text-white font-instrument rounded-pill px-6 py-2.5 text-center mt-2"
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
