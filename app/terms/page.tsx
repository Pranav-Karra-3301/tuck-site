import ThemeToggle from "../components/ThemeToggle";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service - tuck",
  description: "Terms of Service for tuck, the modern dotfiles manager.",
};

export default function TermsPage() {
  return (
    <>
      <header className="site-header">
        <div className="header-content">
          <a
            href="https://github.com/Pranav-Karra-3301/tuck"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            aria-label="View on GitHub"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </header>

      <div className="website-content">
        <section className="legal-section">
          <div className="legal-content">
            <Link href="/" className="legal-back">&larr; Back to home</Link>
            <h1 className="legal-title">Terms of Service</h1>
            <p className="legal-updated">Last updated: January 14, 2025</p>

            <div className="legal-text">
              <h2>Acceptance of Terms</h2>
              <p>
                By using tuck, you agree to these Terms of Service. If you do not agree to these terms,
                please do not use the software.
              </p>

              <h2>License</h2>
              <p>
                tuck is released under the MIT License. You are free to use, copy, modify, merge, publish,
                distribute, sublicense, and/or sell copies of the software, subject to the following conditions:
              </p>
              <p>
                The above copyright notice and permission notice shall be included in all copies or
                substantial portions of the Software.
              </p>

              <h2>Disclaimer of Warranties</h2>
              <p>
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE AND NONINFRINGEMENT.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
                OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </p>

              <h2>Use at Your Own Risk</h2>
              <p>
                tuck manages your configuration files (dotfiles). While we strive to make the software reliable,
                you are responsible for maintaining backups of your important files. We recommend:
              </p>
              <ul>
                <li>Using Git to version control your dotfiles</li>
                <li>Testing changes in a safe environment before applying them system-wide</li>
                <li>Keeping backups of critical configuration files</li>
              </ul>

              <h2>Third-Party Services</h2>
              <p>
                tuck may integrate with third-party services such as GitHub, GitLab, or other Git hosting providers.
                Your use of these services is subject to their respective terms of service and privacy policies.
              </p>

              <h2>Modifications</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will notify users of
                significant changes by updating the &quot;Last updated&quot; date at the top of this page.
              </p>

              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States,
                without regard to its conflict of law provisions.
              </p>

              <h2>Contact</h2>
              <p>
                If you have any questions about these Terms of Service, please open an issue on our{" "}
                <a href="https://github.com/Pranav-Karra-3301/tuck/issues" target="_blank" rel="noopener noreferrer">
                  GitHub repository
                </a>.
              </p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">tuck</span>
              <p className="footer-tagline">The modern dotfiles manager</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="/#features">Features</a>
                <a href="/#install">Install</a>
                <a href="/#commands">Commands</a>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <a href="https://github.com/Pranav-Karra-3301/tuck">GitHub</a>
                <a href="https://github.com/Pranav-Karra-3301/tuck/issues">Issues</a>
                <a href="https://github.com/Pranav-Karra-3301/tuck#readme">Docs</a>
                <a href="/llm.txt">llm.txt</a>
              </div>
              <div className="footer-column">
                <h4>Connect</h4>
                <a href="https://twitter.com/pranavkarra">Twitter</a>
                <a href="https://github.com/Pranav-Karra-3301">GitHub</a>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-locations">
              <p className="locations-text">
                Made with love in{" "}
                <span className="location-name">San Francisco</span>
                <span className="location-map-container">
                  <img src="/sf.png" alt="San Francisco" className="location-map" />
                  <span className="location-pin"></span>
                </span>
                {" "}and{" "}
                <span className="location-name">State College</span>
                <span className="location-map-container">
                  <img src="/sc.png" alt="State College" className="location-map" />
                  <span className="location-pin"></span>
                </span>
              </p>
            </div>
            <ThemeToggle />
            <p className="footer-copyright">&copy; 2025 tuck. MIT License.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
