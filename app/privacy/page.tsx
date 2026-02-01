import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy - tuck",
  description: "Privacy Policy for tuck, the modern dotfiles manager.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <div className="website-content">
        <section className="legal-section">
          <div className="legal-content">
            <Link href="/" className="legal-back">&larr; Back to home</Link>
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-updated">Last updated: January 14, 2025</p>

            <div className="legal-text">
              <h2>Overview</h2>
              <p>
                tuck is an open-source dotfiles manager. We are committed to protecting your privacy.
                This Privacy Policy explains how we handle information when you use our software and website.
              </p>

              <h2>Information We Collect</h2>
              <p>
                <strong>tuck CLI:</strong> The tuck command-line tool runs entirely on your local machine.
                We do not collect, transmit, or store any of your personal data, configuration files, or usage information.
                Your dotfiles remain on your machine and any Git repositories you configure.
              </p>
              <p>
                <strong>Website:</strong> Our website does not use cookies or tracking technologies.
                We do not collect personal information through the website.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                tuck integrates with Git for version control. When you use tuck with GitHub, GitLab, or other
                Git hosting providers, your interactions with those services are governed by their respective privacy policies.
              </p>

              <h2>Data Storage</h2>
              <p>
                All your configuration data is stored locally on your machine in the <code>~/.tuck</code> directory
                and any Git repositories you configure. We have no access to this data.
              </p>

              <h2>Open Source</h2>
              <p>
                tuck is open source software. You can review our source code at any time on{" "}
                <a href="https://github.com/Pranav-Karra-3301/tuck" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>{" "}
                to verify our privacy practices.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify users of any material changes
                by updating the &quot;Last updated&quot; date at the top of this page.
              </p>

              <h2>Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, please open an issue on our{" "}
                <a href="https://github.com/Pranav-Karra-3301/tuck/issues" target="_blank" rel="noopener noreferrer">
                  GitHub repository
                </a>.
              </p>
            </div>
          </div>
        </section>

        <Footer isSubPage />
      </div>
    </>
  );
}
