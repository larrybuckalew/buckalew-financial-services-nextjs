import Link from 'next/link';
const Footer = () => {
    return (<footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Buckalew Financial Services</h3>
            <p>3031 Mojave Oak Dr</p>
            <p>Valrico, FL 33594</p>
            <p>Phone: 844-779-7600</p>
            <p>Email: larry@buckalewfinancialservices.com</p>
          </div>

          {/* Social Media Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {/* Replace with actual social media icons and links */}
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
            </div>
          </div>

          {/* Recent Blog Posts - Placeholder */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Blog Posts</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Blog Post Title 1</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Blog Post Title 2</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Blog Post Title 3</a></li>
              {/* This section would typically fetch dynamic data */}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="/legal/terms-of-service" className="hover:text-white">
              Terms and Conditions
            </Link>
            <Link href="/legal/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Buckalew Financial Services. All rights reserved.</p>
        </div>
      </div>
    </footer>);
};
export default Footer;
