import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Terms of Service - tuck",
  description: "Terms of Service for tuck, the modern dotfiles manager.",
};

export default function TermsPage() {
  return (
    <>
      <Header />

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

        <Footer isSubPage />
      </div>
    </>
  );
}
