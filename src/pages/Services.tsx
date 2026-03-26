import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceModal from "@/components/ServiceModal";
import { services, Service } from "@/data/servicesData";

const categories = [
  { id: "all", label: "All Services", count: services.length },
  { id: "core", label: "Core Support", count: services.filter(s => s.category === "core").length },
  { id: "relationships", label: "Relationships", count: services.filter(s => s.category === "relationships").length },
  { id: "growth", label: "Growth & Coaching", count: services.filter(s => s.category === "growth").length },
  { id: "identity", label: "Identity & Inclusion", count: services.filter(s => s.category === "identity").length },
  { id: "specialist", label: "Specialist Programs", count: services.filter(s => s.category === "specialist").length },
];

export default function Services() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [search, setSearch] = useState("");

  // Open service from URL param e.g. /services?open=trauma-healing
  useEffect(() => {
    const openId = searchParams.get("open");
    if (openId) {
      const found = services.find((s) => s.id === openId);
      if (found) setSelectedService(found);
    }
  }, [searchParams]);

  // Listen for related service clicks from modal
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent).detail;
      const found = services.find((s) => s.id === id);
      if (found) setSelectedService(found);
    };
    window.addEventListener("open-service", handler);
    return () => window.removeEventListener("open-service", handler);
  }, []);

  const filtered = services.filter((s) => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const matchSearch =
      search === "" ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Navbar />

      <main className="bg-taawa-bg min-h-screen">

        {/* Hero */}
        <div className="bg-taawa-green pt-36 pb-16 px-[5%] text-center">
          <div
            className="inline-flex items-center gap-2 mb-5 rounded-full px-4 py-1.5 text-xs font-medium"
            style={{ background: "rgba(212,232,74,0.15)", border: "1px solid rgba(212,232,74,0.3)", color: "rgba(255,255,255,0.75)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-taawa-lime" />
            Eclectic & Integrative Approach
          </div>
          <h1
            className="font-syne font-bold text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: "1.05" }}
          >
            Our Counselling Services
          </h1>
          <p className="text-white/60 text-sm max-w-lg mx-auto leading-relaxed mb-8">
            Every service is tailored to you. Browse our full range of counselling
            and coaching services — click any service to learn more.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-taawa-muted text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-0 rounded-full pl-10 pr-5 py-3 font-instrument text-sm text-taawa-text outline-none placeholder:text-taawa-muted/60"
            />
          </div>
        </div>

        <div className="px-[5%] py-12">

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat.id
                    ? "bg-taawa-green text-white border-taawa-green"
                    : "bg-white text-taawa-muted border-taawa-lime/20 hover:border-taawa-lime"
                }`}
              >
                {cat.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.id
                      ? "bg-taawa-lime text-taawa-green"
                      : "bg-taawa-bg3 text-taawa-muted"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-taawa-muted text-xs uppercase tracking-widest mb-5">
            {filtered.length} service{filtered.length !== 1 ? "s" : ""} found
            {search && ` for "${search}"`}
          </p>

          {/* Services grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="bg-white rounded-[20px] border border-taawa-lime/15 p-6 text-left hover:border-taawa-lime hover:shadow-card hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-[12px] bg-taawa-bg3 flex items-center justify-center text-2xl group-hover:bg-taawa-lime/20 transition-colors">
                      {service.icon}
                    </div>
                    <span className="text-xs bg-taawa-bg3 text-taawa-muted px-3 py-1 rounded-full">
                      {service.categoryLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-syne font-bold text-taawa-text text-[0.95rem] mb-2 group-hover:text-taawa-sage transition-colors">
                    {service.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-taawa-muted text-xs leading-relaxed mb-4 line-clamp-2">
                    {service.tagline}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-taawa-bg3">
                    <span className="text-taawa-muted text-[10px]">
                      {service.sessionInfo.split("·")[0].trim()}
                    </span>
                    <span className="text-taawa-sage text-xs font-medium group-hover:translate-x-1 transition-transform">
                      Learn more →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-syne font-bold text-taawa-text text-lg mb-2">No services found</p>
              <p className="text-taawa-muted text-sm">
                Try a different search term or{" "}
                <button
                  onClick={() => { setSearch(""); setActiveCategory("all"); }}
                  className="text-taawa-sage underline"
                >
                  view all services
                </button>
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 bg-taawa-green rounded-[24px] p-10 text-center">
            <h2 className="font-syne font-bold text-white text-2xl mb-3">
              Not sure which service is right for you?
            </h2>
            <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
              Book a free 15-minute consultation and we'll help you find the
              best fit for your needs.
            </p>
            <a
              href="/book-session"
              className="bg-taawa-lime text-taawa-green font-semibold py-3 px-8 rounded-full hover:bg-taawa-lime2 transition-all text-sm inline-block hover:-translate-y-0.5"
            >
              Book a Free Consultation →
            </a>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}