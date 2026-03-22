import { useScrollReveal } from "@/hooks/useScrollReveal";

const FinalCtaSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-taawa-bg2 py-28 px-[5%]">
      <div className="scroll-reveal bg-taawa-green rounded-[28px] py-16 px-[5%] text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 20%, rgba(58,175,169,0.16) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(43,122,120,0.14) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10">
          <div
            className="w-10 h-10 bg-taawa-lime mx-auto mb-8"
            style={{ borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)" }}
          />
          <h2 className="font-syne font-extrabold text-white max-w-[700px] mx-auto leading-tight mb-8" style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)" }}>
            Begin your personalized path to{" "}
            <em className="text-taawa-lime" style={{ fontStyle: "italic" }}>emotional clarity</em>{" "}
            and mental balance today.
          </h2>
          <a
            href="#contact"
            className="inline-flex bg-taawa-lime text-taawa-green font-instrument font-bold rounded-xl px-8 py-3 outline-none hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-lime/40 active:scale-[0.98] transition-all duration-300"
          >
            Book Your First Session →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;




