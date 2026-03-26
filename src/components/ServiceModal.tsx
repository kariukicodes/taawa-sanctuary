import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Service, getRelatedServices } from "@/data/servicesData";

type Props = {
  service: Service;
  onClose: () => void;
};

export default function ServiceModal({ service, onClose }: Props) {
  const navigate = useNavigate();
  const related = getRelatedServices(service.relatedIds);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(16,30,24,0.7)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto"
        style={{ borderRadius: "24px 24px 0 0", ...(window.innerWidth >= 640 && { borderRadius: "24px" }) }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-taawa-lime/10"
          style={{ background: "white" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-taawa-bg3 flex items-center justify-center text-xl flex-shrink-0">
              {service.icon}
            </div>
            <div>
              <div className="text-xs text-taawa-muted font-medium uppercase tracking-wide">
                {service.categoryLabel}
              </div>
              <div className="font-syne font-bold text-taawa-text text-[0.95rem] leading-tight">
                {service.title}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-taawa-bg3 flex items-center justify-center text-taawa-muted hover:bg-taawa-bg2 transition-colors text-lg flex-shrink-0"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">

          {/* Tagline */}
          <p className="font-syne font-bold text-taawa-text text-xl leading-tight mb-4">
            {service.tagline}
          </p>

          {/* Session info pill */}
          <div className="inline-flex items-center gap-2 bg-taawa-bg3 rounded-full px-4 py-2 text-taawa-muted text-xs mb-6">
            <span>🕐</span>
            {service.sessionInfo}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="font-syne font-bold text-taawa-text text-sm uppercase tracking-wide mb-3">
              About this service
            </h4>
            <p className="text-taawa-muted text-sm leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Approach */}
          <div className="bg-taawa-bg3 rounded-[16px] p-5 mb-6">
            <h4 className="font-syne font-bold text-taawa-text text-sm uppercase tracking-wide mb-2">
              Our approach
            </h4>
            <p className="text-taawa-muted text-sm leading-relaxed">
              {service.approach}
            </p>
          </div>

          {/* Two columns — Who it's for + What to expect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Who it's for */}
            <div className="bg-taawa-bg2 rounded-[16px] p-5">
              <h4 className="font-syne font-bold text-taawa-text text-sm uppercase tracking-wide mb-3">
                Who this is for
              </h4>
              <ul className="space-y-2">
                {service.whoItsFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-taawa-lime/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-taawa-green text-[9px] font-bold">✓</span>
                    </div>
                    <span className="text-taawa-muted text-xs leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to expect */}
            <div className="bg-taawa-peach rounded-[16px] p-5">
              <h4 className="font-syne font-bold text-taawa-text text-sm uppercase tracking-wide mb-3">
                What to expect
              </h4>
              <ul className="space-y-2">
                {service.whatToExpect.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-taawa-salmon/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-taawa-salmon text-[9px] font-bold">{i + 1}</span>
                    </div>
                    <span className="text-taawa-muted text-xs leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related services */}
          {related.length > 0 && (
            <div className="mb-6">
              <h4 className="font-syne font-bold text-taawa-text text-sm uppercase tracking-wide mb-3">
                Related services
              </h4>
              <div className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent("open-service", { detail: r.id }));
                      }, 300);
                    }}
                    className="flex items-center gap-2 bg-white border border-taawa-lime/20 rounded-full px-4 py-2 text-xs text-taawa-text hover:border-taawa-lime hover:bg-taawa-bg3 transition-all"
                  >
                    <span>{r.icon}</span>
                    {r.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-taawa-green rounded-[20px] p-6 text-center">
            <h4 className="font-syne font-bold text-white text-lg mb-2">
              Ready to get started?
            </h4>
            <p className="text-taawa-lime/70 text-sm mb-4">
              Book a free 15-minute consultation for {service.title}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  onClose();
                  navigate(`/book-session?service=${encodeURIComponent(service.title)}`);
                }}
                className="bg-taawa-lime text-taawa-green font-semibold py-3 px-7 rounded-full hover:bg-taawa-lime2 transition-all text-sm hover:-translate-y-0.5"
              >
                Book {service.title} →
              </button>
              <button
                onClick={onClose}
                className="border border-white/25 text-white py-3 px-7 rounded-full text-sm hover:bg-white/10 transition-all"
              >
                Back to Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}