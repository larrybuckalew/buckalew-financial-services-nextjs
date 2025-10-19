export const metadata = {
    title: 'Privacy Policy | Buckalew Financial Services',
    description: 'Buckalew Financial Services privacy policy and data handling practices.',
    keywords: ['privacy', 'data protection', 'personal information'],
};
export default function PrivacyPolicyPage() {
    return (<div>
      {/* Hero Section */}
      <section className="relative py-16 bg-cover bg-center text-white" style={{ backgroundImage: 'linear-gradient(to right, #3182ce, #2c5282)' }}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Your privacy is our priority. Learn how we protect and handle your personal information.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Privacy Policy for Buckalew Financial Services, LLC</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              At Buckalew Financial Services, LLC ("we", "us", or "our"), your privacy is a priority. This privacy policy outlines how we collect, use, and protect your personal information when you use our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
              <li>Personal identification information (name, email, phone number, address) you provide through contact forms or lead generation.</li>
              <li>Information collected automatically via cookies and tracking tools to improve your experience.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
              <li>To respond to inquiries and provide requested services</li>
              <li>To send marketing communications if you opt in</li>
              <li>To improve website functionality and user experience</li>
              <li>To comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">How We Protect Your Information</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              We implement appropriate security measures to safeguard your personal data from unauthorized access or disclosure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Rights</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              You may request to access, update, or delete your personal information by contacting us directly. You also have the right to opt out of marketing communications at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">Buckalew Financial Services, LLC</p>
              <p className="text-gray-700 mb-1">3031 Mojave Oak Dr</p>
              <p className="text-gray-700 mb-1">Valrico, FL 33594</p>
              <p className="text-gray-700 mb-1">Phone: <a href="tel:844-779-7600" className="text-blue-600 hover:text-blue-800">844-779-7600</a></p>
              <p className="text-gray-700">Email: <a href="mailto:larry@buckalewfinancialservices.com" className="text-blue-600 hover:text-blue-800">larry@buckalewfinancialservices.com</a></p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Updates to This Policy</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Last updated:</strong> January 2025
            </p>
          </section>
        </div>
      </div>
    </div>);
}
