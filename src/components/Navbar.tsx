import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const navLinks = ["About Us", "Services", "Programs", "Blogs"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const linkClass = `font-instrument text-[0.88rem] px-4 py-2 rounded-xl border border-transparent no-underline cursor-pointer transition-all duration-200 ${
    !scrolled && isHome
      ? "text-white/90 hover:text-white hover:border-white/20 hover:bg-white/10"
      : "text-taawa-muted hover:border-taawa-green/[0.12] hover:bg-black/5"
  }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled || !isHome
          ? "bg-white/95 shadow-sm border-b border-taawa-green/[0.12]"
          : "bg-transparent border-b border-white/10"
      }`}
    >
      <div className="flex items-center justify-between px-[5%] py-4">
        <Link to="/" className="no-underline">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link === "Blogs" ? (
              <Link key={link} to="/blog" className={linkClass}>
                {link}
              </Link>
            ) : (
              <button
                key={link}
                onClick={() => handleAnchorClick(`#${link.toLowerCase().replace(/\s/g, "-")}`)}
                className={linkClass}
              >
                {link}
              </button>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleAnchorClick("#contact")}
            className={`font-instrument font-medium text-[0.88rem] rounded-xl px-6 py-2.5 transition-all duration-300 cursor-pointer backdrop-blur-sm border ${
              !scrolled && isHome
                ? "text-white border-white/30 hover:bg-white/10 hover:border-white/50"
                : "border-taawa-green/20 text-taawa-green bg-white/50 hover:-translate-y-1 hover:shadow-md hover:shadow-taawa-green/10 active:scale-[0.98]"
            }`}
          >
            Contact Us
          </button>
          <Link
            to="/book-session"
            className="bg-taawa-lime text-taawa-green font-instrument font-bold text-[0.9rem] rounded-xl px-7 py-2.5 hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-lime/40 active:scale-[0.98] transition-all duration-300 no-underline text-center"
          >
            Book Session →
          </Link>
          <Link
            to="/admin/login"
            className={`text-[0.75rem] font-instrument transition-colors ${
              !scrolled && isHome ? "text-white/40 hover:text-white" : "text-taawa-muted/40 hover:text-taawa-muted"
            }`}
            title="Admin Portal"
          >
            🔐
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""} ${!scrolled && isHome ? "bg-white" : "bg-taawa-green"}`} />
          <span className={`w-6 h-0.5 transition-opacity ${mobileOpen ? "opacity-0" : ""} ${!scrolled && isHome ? "bg-white" : "bg-taawa-green"}`} />
          <span className={`w-6 h-0.5 transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""} ${!scrolled && isHome ? "bg-white" : "bg-taawa-green"}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-[5%] pb-4 flex flex-col gap-2">
          {navLinks.map((link) =>
            link === "Blogs" ? (
              <Link
                key={link}
                to="/blog"
                className="font-instrument text-taawa-muted py-2 no-underline"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </Link>
            ) : (
              <button
                key={link}
                onClick={() => handleAnchorClick(`#${link.toLowerCase().replace(/\s/g, "-")}`)}
                className="font-instrument text-taawa-muted py-2 text-left"
              >
                {link}
              </button>
            )
          )}
          <button
            onClick={() => handleAnchorClick("#contact")}
            className="font-instrument font-medium text-[0.88rem] rounded-xl px-6 py-2.5 border border-taawa-green/20 text-taawa-green hover:-translate-y-1 hover:shadow-md hover:shadow-taawa-green/10 active:scale-[0.98] transition-all duration-300 cursor-pointer bg-white/50 text-center mt-2"
          >
            Contact Us
          </button>
          <Link
            to="/book-session"
            className="bg-taawa-lime text-taawa-green font-instrument font-bold rounded-xl px-6 py-2.5 text-center no-underline hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-lime/40 active:scale-[0.98] transition-all duration-300"
            onClick={() => setMobileOpen(false)}
          >
            Book Session →
          </Link>
          <Link
            to="/admin/login"
            className="text-taawa-muted/50 font-instrument text-[0.82rem] text-center py-2"
            onClick={() => setMobileOpen(false)}
          >
            🔐 Admin Access
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;




