import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

export default function Confidentiality() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <main className="bg-taawa-bg min-h-screen pt-36 pb-24 px-[5%]">
        <div className="max-w-3xl mx-auto">
          <div className="pill mb-6">
            <span className="pill-dot" />
            Our commitment to you
          </div>
          <h1
            className="font-syne font-bold text-taawa-text mb-4"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.025em" }}
          >
            Confidentiality
          </h1>
          <p className="text-taawa-muted leading-relaxed mb-10 text-base">
            Everything you share with your counsellor at Taawa is confidential.
            This is a fundamental principle of ethical counselling practice and
            one we take very seriously.
          </p>

          <div className="space-y-6">
            <div className="bg-taawa-bg2 rounded-[20px] p-6 border border-taawa-lime/15">
              <h2 className="font-syne font-bold text-taawa-text text-lg mb-3">
                🔒 What confidentiality means
              </h2>
              <p className="text-taawa-muted leading-relaxed text-sm">
                Your counsellor will not share anything you discuss in sessions
                with anyone — including family members, employers, or other
                healthcare providers — without your explicit written consent.
                What is said in the room stays in the room.
              </p>
            </div>

            <div className="bg-taawa-bg2 rounded-[20px] p-6 border border-taawa-lime/15">
              <h2 className="font-syne font-bold text-taawa-text text-lg mb-3">
                ⚠️ Limits of confidentiality
              </h2>
              <p className="text-taawa-muted leading-relaxed text-sm mb-3">
                There are rare circumstances where your counsellor may be
                required to share information without your consent. These are:
              </p>
              <ul className="list-disc list-inside text-taawa-muted space-y-2 text-sm leading-relaxed">
                <li>If there is a serious and immediate risk of harm to yourself or another person</li>
                <li>If disclosure is required by a court of law</li>
                <li>If there is reason to believe a child or vulnerable adult is at risk of abuse</li>
              </ul>
              <p className="text-taawa-muted leading-relaxed text-sm mt-3">
                In all cases, your counsellor will discuss this with you first
                wherever it is safe to do so.
              </p>
            </div>

            <div className="bg-taawa-bg2 rounded-[20px] p-6 border border-taawa-lime/15">
              <h2 className="font-syne font-bold text-taawa-text text-lg mb-3">
                📋 Clinical supervision
              </h2>
              <p className="text-taawa-muted leading-relaxed text-sm">
                Like all ethical practitioners, our counsellors receive regular
                clinical supervision. Your case may be discussed in supervision
                in an anonymised form to ensure you receive the best possible
                care. Your identity is never disclosed.
              </p>
            </div>

            <div className="bg-taawa-bg2 rounded-[20px] p-6 border border-taawa-lime/15">
              <h2 className="font-syne font-bold text-taawa-text text-lg mb-3">
                💾 Record keeping
              </h2>
              <p className="text-taawa-muted leading-relaxed text-sm">
                Brief session notes are kept securely and used only to support
                your ongoing care. You have the right to request access to your
                records at any time. Records are retained for a minimum of 7
                years in line with professional guidelines, after which they
                are securely destroyed.
              </p>
            </div>

            <div className="bg-taawa-green rounded-[20px] p-6 text-center">
              <h2 className="font-syne font-bold text-white text-lg mb-2">
                Questions about confidentiality?
              </h2>
              <p className="text-taawa-lime/70 text-sm mb-4">
                We are happy to discuss this before you book a session.
                Your comfort and trust matter deeply to us.
              </p>
              <button
                onClick={() => navigate("/book-session")}
                className="bg-taawa-lime text-taawa-green font-semibold py-3 px-6 rounded-full hover:bg-taawa-lime2 transition-all text-sm"
              >
                Book a Free Consultation →
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}