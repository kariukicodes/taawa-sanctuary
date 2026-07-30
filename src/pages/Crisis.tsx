import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Crisis() {
  return (
    <>
      <Navbar />
      <main className="bg-taawa-bg min-h-screen pt-36 pb-24 px-[5%]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-[20px] p-6 mb-10">
            <h2 className="font-syne font-bold text-red-800 text-lg mb-2">
              🆘 If you are in immediate danger
            </h2>
            <p className="text-red-700 text-sm leading-relaxed mb-3">
              If you or someone else is in immediate danger, please call
              emergency services now.
            </p>
            <a
              href="tel:999"
              className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-red-700 transition-all"
            >
              Call 999 (Emergency)
            </a>
          </div>

          <div className="pill mb-6">
            <span className="pill-dot" />
            Crisis Support
          </div>
          <h1
            className="font-syne font-bold text-taawa-text mb-4"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.025em" }}
          >
            Crisis & Emergency Support
          </h1>
          <p className="text-taawa-muted leading-relaxed mb-10">
            Taawa Counselling provides scheduled counselling sessions and is not
            a crisis service. If you are in crisis right now, please use one of
            the resources below. You deserve support — and help is available.
          </p>

          <div className="space-y-4 mb-10">
            <div className="bg-white rounded-[20px] p-6 border border-taawa-lime/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-taawa-bg3 flex items-center justify-center text-2xl flex-shrink-0">
                  📞
                </div>
                <div>
                  <h3 className="font-syne font-bold text-taawa-text mb-1">
                    Befrienders Kenya
                  </h3>
                  <p className="text-taawa-muted text-sm mb-2">
                    Free, confidential emotional support available 24 hours a day.
                  </p>
                  <a
                    href="tel:0800723253"
                    className="text-taawa-sage font-medium text-sm underline"
                  >
                    0800 723 253 (Toll free)
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 border border-taawa-lime/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-taawa-bg3 flex items-center justify-center text-2xl flex-shrink-0">
                  🏥
                </div>
                <div>
                  <h3 className="font-syne font-bold text-taawa-text mb-1">
                    Mathare Hospital — Psychiatric Emergency
                  </h3>
                  <p className="text-taawa-muted text-sm mb-2">
                    Nairobi&apos;s main psychiatric hospital provides emergency
                    mental health care.
                  </p>
                  <a
                    href="tel:+254202723990"
                    className="text-taawa-sage font-medium text-sm underline"
                  >
                    +254 20 272 3990
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 border border-taawa-lime/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-taawa-bg3 flex items-center justify-center text-2xl flex-shrink-0">
                  🆘
                </div>
                <div>
                  <h3 className="font-syne font-bold text-taawa-text mb-1">
                    Kenya Red Cross — Psychosocial Support
                  </h3>
                  <p className="text-taawa-muted text-sm mb-2">
                    Psychosocial support and crisis counselling services.
                  </p>
                  <a href="tel:1199" className="text-taawa-sage font-medium text-sm underline">
                    1199 (Toll free)
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 border border-taawa-lime/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-taawa-bg3 flex items-center justify-center text-2xl flex-shrink-0">
                  💬
                </div>
                <div>
                  <h3 className="font-syne font-bold text-taawa-text mb-1">
                    International Association for Suicide Prevention
                  </h3>
                  <p className="text-taawa-muted text-sm mb-2">
                    Directory of crisis centres worldwide.
                  </p>
                  <a
                    href="https://www.iasp.info/resources/Crisis_Centres/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-taawa-sage font-medium text-sm underline"
                  >
                    Find a crisis centre →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-taawa-bg3 rounded-[20px] p-6 text-center">
            <h2 className="font-syne font-bold text-taawa-text text-lg mb-2">
              Not in crisis, but need support?
            </h2>
            <p className="text-taawa-muted text-sm mb-4">
              We&apos;re here for you. Book a counselling session with Taawa and
              start your journey toward wellbeing.
            </p>
            <a
              href="/book-session"
              className="bg-taawa-lime text-taawa-green font-semibold py-3 px-6 rounded-full hover:bg-taawa-lime2 transition-all text-sm inline-block"
            >
              Book a Session →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}