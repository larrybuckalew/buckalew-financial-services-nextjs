import React from 'react';
import { GoogleIcon, FacebookIcon, AppleIcon } from 'lucide-react';

const SocialLogin: React.FC = () => {
  const handleSocialLogin = (provider: string) => {
    // Implement social login logic
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          onClick={() => handleSocialLogin('Google')}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <GoogleIcon className="h-5 w-5" />
        </button>

        <button
          onClick={() => handleSocialLogin('Facebook')}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <FacebookIcon className="h-5 w-5" />
        </button>

        <button
          onClick={() => handleSocialLogin('Apple')}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <AppleIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
