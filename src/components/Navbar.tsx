import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { ContactModal } from "./ContactModal";

const navLinks = [
  { label: "About Us", id: "about-us" },
  { label: "Services", id: "services" },
  { label: "Programs", id: "programs" },
  { label: "Blogs", id: "blog" },
  { label: "FAQs", id: "faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      // Transition when scrolled past the hero section (e.g., viewport height minus header offset)
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (hash: string) => {
    setMobileOpen(false);
    if (isHome) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + hash);
    }
  };

  const linkClass = `font-instrument text-[0.95rem] font-medium px-4 py-2 text-taawa-text hover:text-taawa-lime transition-colors duration-200 no-underline`;

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      {/* Pill shaped container matching the reference image */}
      <div className={`flex items-center justify-between w-full max-w-[1200px] h-[72px] transition-all duration-300 backdrop-blur-md rounded-full px-6 ${
        scrolled 
          ? "bg-taawa-bg/95 border border-taawa-bg3 shadow-[0_8px_30px_rgba(0,0,0,0.04)]" 
          : "bg-taawa-bg/20 border border-transparent shadow-none"
      }`}>
        
        {/* Logo Section */}
        <button onClick={() => handleAnchorClick("#hero")} className="no-underline flex-shrink-0 flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 outline-none">
          <Logo />
        </button>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleAnchorClick(`#${link.id}`)}
              className={linkClass}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setContactModalOpen(true)}
            className="font-instrument font-semibold text-taawa-text hover:text-taawa-lime transition-colors px-2"
          >
            Contact Us
          </button>
          
          <div className="w-[1px] h-6 bg-taawa-bg3"></div>
          
          <Link
            to="/book-session"
            className="flex items-center justify-center bg-taawa-lime text-taawa-green font-instrument font-bold text-[0.95rem] rounded-xl px-6 h-[44px] hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-lime/40 active:scale-[0.98] transition-all duration-300 no-underline"
          >
            Book Session
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 justify-center items-center h-10 w-10 bg-taawa-bg2 rounded-full text-taawa-text"
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-taawa-text transition-transform ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`w-5 h-0.5 bg-taawa-text transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-taawa-text transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="absolute top-[85px] left-4 right-4 md:hidden bg-taawa-bg border border-taawa-bg3 rounded-3xl shadow-xl flex flex-col p-4 gap-2 z-50">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleAnchorClick(`#${link.id}`)}
              className="font-instrument font-medium text-taawa-text py-3 px-4 rounded-xl hover:bg-taawa-bg2 text-left transition-colors"
            >
              {link.label}
            </button>
          ))}
          
          <div className="h-[1px] bg-taawa-bg3 my-2 mx-4"></div>
          
          <button
            onClick={() => {
              setMobileOpen(false);
              setContactModalOpen(true);
            }}
            className="font-instrument font-medium text-taawa-text py-3 px-4 rounded-xl hover:bg-taawa-bg2 text-left transition-colors"
          >
            Contact Us
          </button>
          <Link
            to="/book-session"
            className="bg-taawa-lime text-taawa-green font-instrument font-bold rounded-xl py-3.5 px-4 text-center mt-2 no-underline hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-lime/40 active:scale-[0.98] transition-all"
            onClick={() => setMobileOpen(false)}
          >
            Book Session
          </Link>
        </div>
      )}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </nav>
  );
};

export default Navbar;




