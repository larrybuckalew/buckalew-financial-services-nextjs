import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us, including when you:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Create an account or fill out forms on our website</li>
            <li>Request insurance quotes or information about our services</li>
            <li>Contact us via email, phone, or other methods</li>
            <li>Subscribe to our newsletter or updates</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and improve our services</li>
            <li>Process your insurance applications and quotes</li>
            <li>Communicate with you about our services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational security measures to protect 
            your personal information against unauthorized access, alteration, disclosure, or 
            destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p>Buckalew Financial Services</p>
            <p>3031 Mojave Oak Dr</p>
            <p>Valrico, FL 33594</p>
            <p>Phone: 844-779-7600</p>
            <p>Email: larry@buckalewfinancialservices.com</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page 
            and, if the changes are significant, we will provide a more prominent notice. Your continued 
            use of our services after any changes to this Privacy Policy will constitute your acceptance 
            of such changes.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last Updated: February 03, 2024
          </p>
        </section>
      </div>
    </div>
  );
}