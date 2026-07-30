import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="bg-taawa-bg min-h-screen pt-36 pb-24 px-[5%]">
        <div className="max-w-3xl mx-auto">
          <div className="pill mb-6">
            <span className="pill-dot" />
            Legal
          </div>
          <h1
            className="font-syne font-bold text-taawa-text mb-4"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.025em" }}
          >
            Privacy Policy
          </h1>
          <p className="text-taawa-muted text-sm mb-10">Last updated: March 2025</p>

          <div className="prose-content space-y-8 text-taawa-text">
            <section>
              <h2 className="font-syne font-bold text-xl mb-3">1. Who we are</h2>
              <p className="text-taawa-muted leading-relaxed">
                Taawa Counselling is a professional mental health counselling service
                operating in Kenya. We are committed to protecting your personal
                information and your right to privacy. If you have any questions
                about this policy, please contact us at{" "}
                <a
                  href="mailto:hello@taawacounselling.com"
                  className="text-taawa-sage underline"
                >
                  hello@taawacounselling.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-syne font-bold text-xl mb-3">2. What information we collect</h2>
              <p className="text-taawa-muted leading-relaxed mb-3">
                We collect information you voluntarily provide when you:
              </p>
              <ul className="list-disc list-inside text-taawa-muted space-y-2 leading-relaxed">
                <li>Fill in the contact or booking form on our website</li>
                <li>Subscribe to our newsletter</li>
                <li>Communicate with us by email or phone</li>
              </ul>
              <p className="text-taawa-muted leading-relaxed mt-3">
                This may include your name, email address, phone number, and the
                nature of your enquiry. We do not collect sensitive clinical
                information through the website.
              </p>
            </section>

            <section>
              <h2 className="font-syne font-bold text-xl mb-3">3. How we use your information</h2>
              <ul className="list-disc list-inside text-taawa-muted space-y-2 leading-relaxed">
                <li>To respond to your enquiry and arrange appointments</li>
                <li>To send you our newsletter if you have subscribed</li>
                <li>To improve our website and services</li>
                <li>We will never sell your data to third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="font-syne font-bold text-xl mb-3">4. How we store your information</h2>
              <p className="text-taawa-muted leading-relaxed">
                Your data is stored securely using Supabase, a GDPR-compliant
                cloud database provider. Contact form submissions and booking
                requests are accessible only to authorised Taawa staff. We retain
                contact data for a maximum of 24 months unless you request earlier
                deletion.
              </p>
            </section>

            <section>
              <h2 className="font-syne font-bold text-xl mb-3">5. Your rights</h2>
              <p className="text-taawa-muted leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc list-inside text-taawa-muted space-y-2 leading-relaxed">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent to marketing communications at any time</li>
              </ul>
              <p className="text-taawa-muted leading-relaxed mt-3">
                To exercise any of these rights, email us at{" "}
                <a
                  href="mailto:hello@taawacounselling.com"
                  className="text-taawa-sage underline"
                >
                  hello@taawacounselling.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-syne font-bold text-xl mb-3">6. Cookies</h2>
              <p className="text-taawa-muted leading-relaxed">
                Our website uses only essential cookies required for the site to
                function. We do not use tracking or advertising cookies.
              </p>
            </section>

            <section>
              <h2 className="font-syne font-bold text-xl mb-3">7. Contact</h2>
              <p className="text-taawa-muted leading-relaxed">
                If you have any questions about this privacy policy or how we
                handle your data, please contact: {" "}
                <a
                  href="mailto:hello@taawacounselling.com"
                  className="text-taawa-sage underline"
                >
                  hello@taawacounselling.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}