import { Link } from "react-router-dom";
import PillTag from "./PillTag";
import { counsellor } from "@/data/counsellorData";

const highlights = [
  {
    title: "What we offer",
    text:
      "Individual counselling, trauma support, relationships, life coaching, and practical mental wellbeing support.",
  },
  {
    title: "Sessions",
    text: "50 minutes, online or in person, with a free 15-minute consultation before you commit.",
  },
  {
    title: "Confidential",
    text: "A calm, private space with clear boundaries and a transparent confidentiality policy.",
  },
];

const steps = ["Choose a service", "Book a session", "Meet your counsellor", "Follow a clear plan"];

export default function BentoGridSection() {
  return (
    <section id="bento" className="bg-taawa-bg2 px-[5%] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <PillTag className="mb-5">A clearer path</PillTag>
          <h2
            className="font-syne font-bold text-taawa-text leading-[1.05]"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.55rem)", letterSpacing: "-0.03em" }}
          >
            A bento-style overview of how Taawa supports you.
          </h2>
          <p className="mt-4 max-w-xl text-[0.92rem] leading-relaxed text-taawa-muted">
            The layout keeps the hierarchy minimal: one big idea, a few compact supporting cards, and a clear call to action.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[170px]">
          <div className="md:col-span-5 md:row-span-2 overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_16px_50px_rgba(23,37,42,0.06)]">
            <img
              src="/counsellor-photo.jpg"
              alt={`${counsellor.fullName}, ${counsellor.title}`}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17252a]/90 via-[#17252a]/45 to-transparent p-6 text-white">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/60">Meet your counsellor</p>
              <h3 className="mt-2 font-syne text-[1.35rem] font-bold leading-tight">Joseph Wahome</h3>
              <p className="mt-1 text-[0.84rem] text-white/75">Psychologist and Life Coach · 7+ years</p>
            </div>
          </div>

          <div className="md:col-span-4 overflow-hidden rounded-[28px] border border-white/70 bg-taawa-green p-6 text-white shadow-[0_16px_50px_rgba(23,37,42,0.06)]">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/60">What it feels like</p>
            <p className="mt-4 font-syne text-[1.55rem] leading-[1.08] tracking-tight">
              A private layer for care, conversations, and healing.
            </p>
            <p className="mt-4 max-w-sm text-[0.88rem] leading-relaxed text-white/78">
              Minimal, calm, and clear. Built so visitors can understand the practice quickly without feeling overwhelmed.
            </p>
          </div>

          <div className="md:col-span-3 overflow-hidden rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_16px_50px_rgba(23,37,42,0.06)]">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-taawa-muted">Quick facts</p>
            <div className="mt-5 space-y-4">
              {highlights.map((item) => (
                <div key={item.title}>
                  <p className="font-syne text-[0.92rem] font-semibold text-taawa-text">{item.title}</p>
                  <p className="mt-1 text-[0.8rem] leading-relaxed text-taawa-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 overflow-hidden rounded-[28px] border border-white/70 bg-taawa-bg p-6 shadow-[0_16px_50px_rgba(23,37,42,0.06)]">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-taawa-muted">How it works</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {steps.map((step, index) => (
                <div key={step} className="rounded-[18px] border border-taawa-green/10 bg-white p-4">
                  <p className="text-[0.7rem] font-medium text-taawa-sage">0{index + 1}</p>
                  <p className="mt-2 text-[0.85rem] font-semibold leading-snug text-taawa-text">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 overflow-hidden rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_16px_50px_rgba(23,37,42,0.06)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-taawa-muted">Take the next step</p>
                <h3 className="mt-2 font-syne text-[1.35rem] font-bold leading-tight text-taawa-text">
                  Book with confidence.
                </h3>
              </div>
              <div className="hidden h-12 w-12 rounded-full bg-[radial-gradient(circle_at_35%_35%,#66e28f_0%,#d6ef59_48%,#355847_100%)] shadow-[inset_0_0_12px_rgba(255,255,255,0.35)] md:block" />
            </div>
            <p className="mt-4 max-w-lg text-[0.88rem] leading-relaxed text-taawa-muted">
              Use the booking flow if you already know what you need, or start with the free consultation to talk through your options.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/book-session"
                className="inline-flex items-center justify-center rounded-full bg-taawa-green px-6 py-3 text-[0.88rem] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-taawa-green/20"
              >
                Book a Session →
              </Link>
              <Link
                to="/meet-your-counsellor"
                className="inline-flex items-center justify-center rounded-full border border-taawa-green/20 px-6 py-3 text-[0.88rem] font-semibold text-taawa-text transition-all hover:-translate-y-0.5 hover:border-taawa-green hover:bg-taawa-green/5"
              >
                Meet the counsellor
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 overflow-hidden rounded-[28px] border border-white/70 bg-[#17252a] p-6 text-white shadow-[0_16px_50px_rgba(23,37,42,0.06)]">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/50">Trust cue</p>
            <p className="mt-4 font-syne text-[1.35rem] leading-tight">
              Registration is in progress, and we say that plainly.
            </p>
            <p className="mt-4 text-[0.84rem] leading-relaxed text-white/70">
              If information is not verified yet, the page will not pretend it is.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
